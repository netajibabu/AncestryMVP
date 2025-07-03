-- Migration script to add parent relationships to persons table
-- Run this if you have an existing database without father_id and mother_id columns

-- Add father_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'persons' AND column_name = 'father_id') THEN
        ALTER TABLE persons ADD COLUMN father_id INTEGER REFERENCES persons(id);
    END IF;
END $$;

-- Add mother_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'persons' AND column_name = 'mother_id') THEN
        ALTER TABLE persons ADD COLUMN mother_id INTEGER REFERENCES persons(id);
    END IF;
END $$;

-- Create indexes for parent relationships if they don't exist
CREATE INDEX IF NOT EXISTS idx_persons_father ON persons (father_id);
CREATE INDEX IF NOT EXISTS idx_persons_mother ON persons (mother_id); 