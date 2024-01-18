CREATE DATABASE propacity
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

\c propacity
  

CREATE TABLE IF NOT EXISTS public.files
(
    file_id integer NOT NULL DEFAULT nextval('files_file_id_seq'::regclass),
    file_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    file_size integer NOT NULL,
    folder_id integer,
    user_id integer,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT files_pkey PRIMARY KEY (file_id),
    CONSTRAINT unique_file_name UNIQUE (file_name, folder_id),
    CONSTRAINT files_folder_id_fkey FOREIGN KEY (folder_id)
        REFERENCES public.folders (folder_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT files_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.files
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.folders
(
    folder_id integer NOT NULL DEFAULT nextval('folders_folder_id_seq'::regclass),
    folder_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_id integer,
    parent_folder_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT folders_pkey PRIMARY KEY (folder_id),
    CONSTRAINT same_folder_name UNIQUE (folder_name, parent_folder_id),
    CONSTRAINT folders_parent_folder_id_fkey FOREIGN KEY (parent_folder_id)
        REFERENCES public.folders (folder_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.folders
    OWNER to postgres;
-- Index: fki_folders_parent_folder_id_fkey

-- DROP INDEX IF EXISTS public.fki_folders_parent_folder_id_fkey;

CREATE INDEX IF NOT EXISTS fki_folders_parent_folder_id_fkey
    ON public.folders USING btree
    (parent_folder_id ASC NULLS LAST)
    TABLESPACE pg_default;



CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
