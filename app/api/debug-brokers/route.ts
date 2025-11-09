import { NextResponse } from "next/server"
import { getFilteredBrokers } from "@/app/actions"

export const runtime = "edge"

export async function GET() {
  try {
    const brokers = await getFilteredBrokers()

    return NextResponse.json({
      count: brokers.length,
      brokers: brokers.map((broker) => ({
        id: broker.id,
        name: broker.name,
        leverage: broker.leverage,
        minDeposit: broker.min_deposit,
        isFeatured: broker.is_featured,
      })),
    })
  } catch (error) {
    console.error("Error fetching debug brokers:", error)
    return NextResponse.json(
      { error: "Unable to fetch brokers" },
      { status: 500 }
    )
  }
}

