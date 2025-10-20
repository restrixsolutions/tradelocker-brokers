-- Add youtube_url column to brokers table
ALTER TABLE brokers ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add youtube_url column to prop_firms table
ALTER TABLE prop_firms ADD COLUMN IF NOT EXISTS youtube_url TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN brokers.youtube_url IS 'YouTube video URL for broker overview/tutorial';
COMMENT ON COLUMN prop_firms.youtube_url IS 'YouTube video URL for prop firm overview/tutorial';
