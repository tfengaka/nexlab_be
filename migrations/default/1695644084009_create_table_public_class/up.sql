CREATE TABLE "public"."class" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "class_name" text NOT NULL, "status" text NOT NULL DEFAULT '"active"', "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("class_name"));
