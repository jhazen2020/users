import { MigrationInterface, QueryRunner } from "typeorm"

export class UsersAndRoles1687818228323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users.users (
                id integer NOT NULL,
                first_name character varying,
                last_name character varying,
                phone_number character varying,
                email character varying
            );


            --
            -- TOC entry 212 (class 1259 OID 16443)
            -- Name: users_categories; Type: TABLE; Schema: users; Owner: -
            --

            CREATE TABLE users.users_categories (
                id uuid DEFAULT users.uuid_generate_v4() NOT NULL,
                name character varying
            );


            --
            -- TOC entry 210 (class 1259 OID 16431)
            -- Name: users_id_seq; Type: SEQUENCE; Schema: users; Owner: -
            --

            ALTER TABLE users.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
                SEQUENCE NAME users.users_id_seq
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1
            );


            --
            -- TOC entry 4288 (class 0 OID 16432)
            -- Dependencies: 211
            -- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: -
            --



            --
            -- TOC entry 4289 (class 0 OID 16443)
            -- Dependencies: 212
            -- Data for Name: users_categories; Type: TABLE DATA; Schema: users; Owner: -
            --

            INSERT INTO users.users_categories VALUES ('bc545f48-29bc-4a6a-9b3e-6d9aaa8a201f', 'basic');
            INSERT INTO users.users_categories VALUES ('61899f60-939c-4abf-a5b4-aeee2fde436f', 'verified');


            --
            -- TOC entry 4296 (class 0 OID 0)
            -- Dependencies: 210
            -- Name: users_id_seq; Type: SEQUENCE SET; Schema: users; Owner: -
            --

            SELECT pg_catalog.setval('users.users_id_seq', 1, false);


            --
            -- TOC entry 4146 (class 2606 OID 16442)
            -- Name: users users_pk; Type: CONSTRAINT; Schema: users; Owner: -
            --

            ALTER TABLE ONLY users.users
                ADD CONSTRAINT users_pk PRIMARY KEY (id);


            --
            -- TOC entry 4147 (class 1259 OID 16448)
            -- Name: users_categories_id_idx; Type: INDEX; Schema: users; Owner: -
            --

            CREATE UNIQUE INDEX users_categories_id_idx ON users.users_categories USING btree (id);


            --
            -- TOC entry 4143 (class 1259 OID 16440)
            -- Name: users_email_idx; Type: INDEX; Schema: users; Owner: -
            --

            CREATE INDEX users_email_idx ON users.users USING btree (email);


            --
            -- TOC entry 4144 (class 1259 OID 16437)
            -- Name: users_id_idx; Type: INDEX; Schema: users; Owner: -
            --

            CREATE UNIQUE INDEX users_id_idx ON users.users USING btree (id);


            -- Completed on 2023-07-07 07:53:23 MDT

            --
            -- PostgreSQL database dump complete
            --
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
