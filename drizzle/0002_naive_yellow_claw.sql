CREATE TABLE `instagram_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_url` text,
	`image_url` text NOT NULL,
	`caption` text,
	`likes_count` integer DEFAULT 0,
	`comments_count` integer DEFAULT 0,
	`posted_at` integer NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`category` text,
	`image_url` text NOT NULL,
	`badge` text,
	`health_goal` text,
	`rating` text,
	`reviews_count` integer DEFAULT 0,
	`description` text,
	`protein` text,
	`carbs` text,
	`fat` text,
	`calories` text,
	`is_active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`setting_key` text NOT NULL,
	`setting_value` text NOT NULL,
	`setting_type` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `site_settings_setting_key_unique` ON `site_settings` (`setting_key`);--> statement-breakpoint
CREATE TABLE `social_credentials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`platform` text NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`expires_at` integer,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
