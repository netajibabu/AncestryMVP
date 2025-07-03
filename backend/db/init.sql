-- Create database if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'ancestry_db') THEN
        CREATE DATABASE ancestry_db;
    END IF;
END
$$;

-- Connect to the database
\c ancestry_db;

-- Create persons table if it doesn't exist
CREATE TABLE IF NOT EXISTS persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    father_id INTEGER REFERENCES persons(id),
    mother_id INTEGER REFERENCES persons(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on names for faster searches
CREATE INDEX IF NOT EXISTS idx_persons_names ON persons ("first_name", "last_name");

-- Create indexes for parent relationships
CREATE INDEX IF NOT EXISTS idx_persons_father ON persons (father_id);
CREATE INDEX IF NOT EXISTS idx_persons_mother ON persons (mother_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updated_at" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_persons_updated_at ON persons;
CREATE TRIGGER update_persons_updated_at
    BEFORE UPDATE ON persons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 