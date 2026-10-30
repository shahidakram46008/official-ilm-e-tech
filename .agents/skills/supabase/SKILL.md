---
name: supabase
description: >-
  Comprehensive guide and agent skill for managing Supabase database, authentication,
  Row Level Security (RLS), storage buckets, schema migrations, and API integrations
  for Ilm E Tech Pakistan platform.
---

# Supabase Agent Skill for Ilm E Tech Pakistan

This skill provides step-by-step procedures and guidelines for interacting with the Supabase backend service and MCP server for the **Ilm E Tech Pakistan** platform (`ilmetechpakistan.com`).

---

## 1. Project Overview & Credentials

- **Project Reference:** `ntmdtbaowavrnaooklia`
- **MCP Endpoint:** `https://mcp.supabase.com/mcp?project_ref=ntmdtbaowavrnaooklia&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching`
- **Domain:** `ilmetechpakistan.com`

---

## 2. Platform Database Schema Architecture

When creating or modifying tables in Supabase for this workspace, use the following standardized schemas:

### A. `users` (Student & Admin Accounts)
```sql
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  student_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_whatsapp TEXT,
  role TEXT DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN', 'FINANCE')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### B. `admissions` (Online Admission Applications)
```sql
CREATE TABLE public.admissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL, -- e.g., APP-2026-XXXXX
  student_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  cnic_bform TEXT NOT NULL,
  selected_course TEXT NOT NULL,
  qualification TEXT,
  city TEXT NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'PAYMENT_PENDING' CHECK (status IN ('PAYMENT_PENDING', 'VERIFIED', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### C. `payments` (Payment Verification & Receipts)
```sql
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id TEXT UNIQUE NOT NULL, -- e.g., PAY-2026-XXXXX
  application_id TEXT REFERENCES public.admissions(application_id),
  payment_method TEXT NOT NULL, -- JazzCash, EasyPaisa, SadaPay, Meezan Bank
  transaction_trx_id TEXT NOT NULL,
  amount_paid NUMERIC(10, 2) NOT NULL,
  receipt_url TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VERIFIED', 'REJECTED', 'ACTION_REQUIRED')),
  approved_by TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### D. `certificates` (Certificate Verification)
```sql
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT UNIQUE NOT NULL, -- e.g., ILM-2026-000101
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  issue_date DATE NOT NULL,
  grade TEXT NOT NULL,
  status TEXT DEFAULT 'Verified'
);
```

---

## 3. Storage Buckets & Policies

- **Bucket Name:** `payment-receipts`
- **Access Level:** Private for student uploads; readable by Admin and Finance roles.

---

## 4. MCP & Integration Workflows

1. **Querying Database:** Use the Supabase MCP server tools to inspect schema, execute SQL migrations, and monitor data.
2. **Auth Integration:** Use Supabase JavaScript Client (`@supabase/supabase-js`) in front-end pages ([student-portal.html](file:///c:/Users/PC/Desktop/ilm%20e%20tech%20web/student-portal.html), [admin-dashboard.html](file:///c:/Users/PC/Desktop/ilm%20e%20tech%20web/admin-dashboard.html)).
3. **Verification Endpoints:** Integrate with Express backend in [server.js](file:///c:/Users/PC/Desktop/ilm%20e%20tech%20web/api/server.js).
