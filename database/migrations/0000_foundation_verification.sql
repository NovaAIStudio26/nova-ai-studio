CREATE TABLE "foundation_verification" (
	"id" serial PRIMARY KEY NOT NULL,
	"check_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
