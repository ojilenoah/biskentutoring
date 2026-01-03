-- SQL for Supabase / PostgreSQL to create the enrollments table

CREATE TABLE public.enrollments (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: index on email for faster lookup
CREATE INDEX IF NOT EXISTS enrollments_email_idx ON public.enrollments (email);
