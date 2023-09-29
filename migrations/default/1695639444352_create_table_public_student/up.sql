CREATE TABLE "public"."student" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "full_name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "status" text NOT NULL DEFAULT '"active"', "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("email"), UNIQUE ("id"));
