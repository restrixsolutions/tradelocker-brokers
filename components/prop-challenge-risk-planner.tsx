"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PlannerInput = {
  accountSize: number
  dailyDrawdownPct: number
  maxDrawdownPct: number
  currentEquity: number
  riskPerTradePct: number
  stopLossPips: number
  pipValuePerLot: number
  plannedTradesPerDay: number
}

type PlannerOutput = {
  dailyLimitAmount: number
  maxLimitAmount: number
  dailyBufferRemaining: number
  maxBufferRemaining: number
  requestedRiskAmount: number
  dailyConstrainedRiskPerTrade: number
  maxConstrainedRiskPerTrade: number
  safeMaxRiskPerTrade: number
  recommendedRiskAmount: number
  recommendedLotSize: number
  lossesLeftAtCurrentRisk: number
  riskStatus: "safe" | "caution" | "breach risk"
}

const PIP_PRESETS: Array<{ label: string; value: number }> = [
  { label: "EURUSD (~$10/pip per 1 lot)", value: 10 },
  { label: "GBPUSD (~$10/pip per 1 lot)", value: 10 },
  { label: "USDJPY (~$9.1/pip per 1 lot)", value: 9.1 },
  { label: "XAUUSD (~$1/point per 1 lot)", value: 1 },
  { label: "US30 (~$1/point per 1 lot)", value: 1 },
]

function clampNumber(value: number, min: number): number {
  if (!Number.isFinite(value)) return min
  return Math.max(value, min)
}

function calculatePlan(input: PlannerInput): PlannerOutput {
  const accountSize = clampNumber(input.accountSize, 1)
  const currentEquity = clampNumber(input.currentEquity, 0)
  const dailyDrawdownPct = clampNumber(input.dailyDrawdownPct, 0)
  const maxDrawdownPct = clampNumber(input.maxDrawdownPct, 0)
  const riskPerTradePct = clampNumber(input.riskPerTradePct, 0)
  const stopLossPips = clampNumber(input.stopLossPips, 0.1)
  const pipValuePerLot = clampNumber(input.pipValuePerLot, 0.01)
  const plannedTradesPerDay = clampNumber(input.plannedTradesPerDay, 1)

  const dailyLimitAmount = accountSize * (dailyDrawdownPct / 100)
  const maxLimitAmount = accountSize * (maxDrawdownPct / 100)

  // Conservative: if equity is below starting size, that drawdown is considered already "used".
  const drawdownUsed = Math.max(accountSize - currentEquity, 0)
  const dailyBufferRemaining = Math.max(dailyLimitAmount - drawdownUsed, 0)
  const maxBufferRemaining = Math.max(maxLimitAmount - drawdownUsed, 0)

  // Requested risk based on current equity keeps sizing adaptive as account changes.
  const requestedRiskAmount = currentEquity * (riskPerTradePct / 100)

  const dailyConstrainedRiskPerTrade = dailyBufferRemaining / plannedTradesPerDay
  const maxConstrainedRiskPerTrade = maxBufferRemaining
  const safeMaxRiskPerTrade = Math.max(Math.min(dailyConstrainedRiskPerTrade, maxConstrainedRiskPerTrade), 0)
  const recommendedRiskAmount = Math.min(requestedRiskAmount, safeMaxRiskPerTrade)

  const riskPerLotAtStop = stopLossPips * pipValuePerLot
  const recommendedLotSize = riskPerLotAtStop > 0 ? recommendedRiskAmount / riskPerLotAtStop : 0

  const lossesLeftAtCurrentRisk =
    requestedRiskAmount > 0 ? Math.floor(dailyBufferRemaining / requestedRiskAmount) : 0

  let riskStatus: PlannerOutput["riskStatus"] = "safe"
  if (safeMaxRiskPerTrade <= 0 || dailyBufferRemaining <= 0 || maxBufferRemaining <= 0) {
    riskStatus = "breach risk"
  } else if (recommendedRiskAmount < requestedRiskAmount) {
    riskStatus = "caution"
  }

  return {
    dailyLimitAmount,
    maxLimitAmount,
    dailyBufferRemaining,
    maxBufferRemaining,
    requestedRiskAmount,
    dailyConstrainedRiskPerTrade,
    maxConstrainedRiskPerTrade,
    safeMaxRiskPerTrade,
    recommendedRiskAmount,
    recommendedLotSize,
    lossesLeftAtCurrentRisk,
    riskStatus,
  }
}

function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`
}

function formatNumber(value: number, digits = 2): string {
  return value.toFixed(digits)
}

function captureEvent(eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const posthog = (window as Window & { posthog?: { capture?: (event: string, p?: Record<string, unknown>) => void } })
    .posthog
  if (posthog?.capture) {
    posthog.capture(eventName, props)
  }
}

const SCENARIO_FIXTURES: Array<{ name: string; input: PlannerInput }> = [
  {
    name: "Healthy account, moderate risk",
    input: {
      accountSize: 100000,
      dailyDrawdownPct: 5,
      maxDrawdownPct: 10,
      currentEquity: 100000,
      riskPerTradePct: 1,
      stopLossPips: 20,
      pipValuePerLot: 10,
      plannedTradesPerDay: 3,
    },
  },
  {
    name: "Near daily limit",
    input: {
      accountSize: 100000,
      dailyDrawdownPct: 5,
      maxDrawdownPct: 10,
      currentEquity: 96000,
      riskPerTradePct: 1,
      stopLossPips: 20,
      pipValuePerLot: 10,
      plannedTradesPerDay: 3,
    },
  },
  {
    name: "Drawdown already breached",
    input: {
      accountSize: 100000,
      dailyDrawdownPct: 5,
      maxDrawdownPct: 10,
      currentEquity: 94000,
      riskPerTradePct: 1,
      stopLossPips: 20,
      pipValuePerLot: 10,
      plannedTradesPerDay: 3,
    },
  },
]

export function PropChallengeRiskPlanner() {
  const [input, setInput] = useState<PlannerInput>({
    accountSize: 100000,
    dailyDrawdownPct: 5,
    maxDrawdownPct: 10,
    currentEquity: 100000,
    riskPerTradePct: 1,
    stopLossPips: 20,
    pipValuePerLot: 10,
    plannedTradesPerDay: 3,
  })

  const output = useMemo(() => calculatePlan(input), [input])

  const scenarioChecks = useMemo(() => {
    return SCENARIO_FIXTURES.map((fixture) => {
      const result = calculatePlan(fixture.input)
      return {
        name: fixture.name,
        riskStatus: result.riskStatus,
        safeMaxRiskPerTrade: result.safeMaxRiskPerTrade,
        lotSize: result.recommendedLotSize,
      }
    })
  }, [])

  function setNumberField(field: keyof PlannerInput, value: string) {
    const parsed = Number.parseFloat(value)
    setInput((prev) => ({
      ...prev,
      [field]: Number.isFinite(parsed) ? parsed : 0,
    }))
  }

  const statusVariant =
    output.riskStatus === "safe" ? "default" : output.riskStatus === "caution" ? "secondary" : "destructive"

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">TradeLocker Prop Challenge Risk Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account-size">Account Size (USD)</Label>
              <Input
                id="account-size"
                type="number"
                min={1}
                step={100}
                value={input.accountSize}
                onChange={(e) => setNumberField("accountSize", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-equity">Current Equity (USD)</Label>
              <Input
                id="current-equity"
                type="number"
                min={0}
                step={100}
                value={input.currentEquity}
                onChange={(e) => setNumberField("currentEquity", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="daily-dd">Daily Drawdown Limit (%)</Label>
              <Input
                id="daily-dd"
                type="number"
                min={0}
                step={0.1}
                value={input.dailyDrawdownPct}
                onChange={(e) => setNumberField("dailyDrawdownPct", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-dd">Max Drawdown Limit (%)</Label>
              <Input
                id="max-dd"
                type="number"
                min={0}
                step={0.1}
                value={input.maxDrawdownPct}
                onChange={(e) => setNumberField("maxDrawdownPct", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-trade">Risk Per Trade (%)</Label>
              <Input
                id="risk-trade"
                type="number"
                min={0}
                step={0.1}
                value={input.riskPerTradePct}
                onChange={(e) => setNumberField("riskPerTradePct", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="planned-trades">Planned Trades Per Day</Label>
              <Input
                id="planned-trades"
                type="number"
                min={1}
                step={1}
                value={input.plannedTradesPerDay}
                onChange={(e) => setNumberField("plannedTradesPerDay", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stop-loss">Stop Loss (pips/points)</Label>
              <Input
                id="stop-loss"
                type="number"
                min={0.1}
                step={0.1}
                value={input.stopLossPips}
                onChange={(e) => setNumberField("stopLossPips", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pip-preset">Pip Value Preset (USD per 1 lot)</Label>
              <select
                id="pip-preset"
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                defaultValue={String(input.pipValuePerLot)}
                onChange={(e) => setNumberField("pipValuePerLot", e.target.value)}
              >
                {PIP_PRESETS.map((preset) => (
                  <option key={preset.label} value={preset.value} className="bg-background text-foreground">
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="pip-value">Manual Pip Value Override (USD per 1 lot)</Label>
              <Input
                id="pip-value"
                type="number"
                min={0.01}
                step={0.01}
                value={input.pipValuePerLot}
                onChange={(e) => setNumberField("pipValuePerLot", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                captureEvent("prop_calculator_used", {
                  status: output.riskStatus,
                  accountSize: input.accountSize,
                  riskPerTradePct: input.riskPerTradePct,
                })
                if (output.riskStatus !== "safe") {
                  captureEvent("prop_calculator_risk_alert", { status: output.riskStatus })
                }
              }}
            >
              Update Risk Plan
            </Button>
            <Badge variant={statusVariant}>Status: {output.riskStatus}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Buffers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Daily loss limit: {formatMoney(output.dailyLimitAmount)}</p>
            <p>Max loss limit: {formatMoney(output.maxLimitAmount)}</p>
            <p>Daily buffer remaining: {formatMoney(output.dailyBufferRemaining)}</p>
            <p>Max buffer remaining: {formatMoney(output.maxBufferRemaining)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Safe Risk Per Trade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Requested risk/trade: {formatMoney(output.requestedRiskAmount)}</p>
            <p>Daily-constrained risk/trade: {formatMoney(output.dailyConstrainedRiskPerTrade)}</p>
            <p>Max-constrained risk/trade: {formatMoney(output.maxConstrainedRiskPerTrade)}</p>
            <p className="font-semibold">Safe max risk/trade: {formatMoney(output.safeMaxRiskPerTrade)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Position Sizing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Recommended risk amount: {formatMoney(output.recommendedRiskAmount)}</p>
            <p className="font-semibold">Recommended lot size: {formatNumber(output.recommendedLotSize, 3)} lots</p>
            <p>
              Assumes stop loss of {formatNumber(input.stopLossPips, 1)} pips/points and pip value{" "}
              {formatMoney(input.pipValuePerLot)} per lot.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Survival</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Planned trades today: {input.plannedTradesPerDay}</p>
            <p>Losses left at current risk: {output.lossesLeftAtCurrentRisk}</p>
            <p>
              If this number is low, reduce risk per trade or reduce total planned trades to avoid violating daily
              drawdown rules.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Validation Scenarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {scenarioChecks.map((scenario) => (
            <p key={scenario.name}>
              {scenario.name}: {scenario.riskStatus} | safe risk {formatMoney(scenario.safeMaxRiskPerTrade)} | lot size{" "}
              {formatNumber(scenario.lotSize, 3)}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <p className="text-sm mb-4">
            Ready to apply your risk plan with real broker data? Compare execution quality and costs before you start a
            challenge.
          </p>
          <Button asChild>
            <Link
              href="/brokers"
              onClick={() =>
                captureEvent("prop_calculator_brokers_click", {
                  status: output.riskStatus,
                })
              }
            >
              Find Prop-Friendly TradeLocker Brokers
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

