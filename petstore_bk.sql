--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

-- Started on 2024-04-08 23:11:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 36097)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 35945)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 36008)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    rootcategory_id integer NOT NULL,
    priority smallint NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 36007)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 220 (class 1259 OID 36020)
-- Name: childcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.childcategories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_id integer NOT NULL,
    priority smallint NOT NULL
);


ALTER TABLE public.childcategories OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 36019)
-- Name: childcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.childcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.childcategories_id_seq OWNER TO postgres;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 219
-- Name: childcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.childcategories_id_seq OWNED BY public.childcategories.id;


--
-- TOC entry 224 (class 1259 OID 36063)
-- Name: details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.details (
    id integer NOT NULL,
    product_id integer NOT NULL,
    order_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price real NOT NULL,
    "isCart" smallint DEFAULT 0 NOT NULL,
    status character varying(255),
    complete smallint NOT NULL
);


ALTER TABLE public.details OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 36062)
-- Name: details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.details_id_seq OWNER TO postgres;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 223
-- Name: details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.details_id_seq OWNED BY public.details.id;


--
-- TOC entry 226 (class 1259 OID 36081)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    secure_url character varying(255) NOT NULL,
    cloudinary_public_id character varying NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 36080)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 225
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 216 (class 1259 OID 35967)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 35966)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 222 (class 1259 OID 36049)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    price real NOT NULL,
    discount real NOT NULL,
    content text NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 36048)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 212 (class 1259 OID 35951)
-- Name: rootcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rootcategories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    priority smallint NOT NULL
);


ALTER TABLE public.rootcategories OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 35950)
-- Name: rootcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rootcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rootcategories_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 211
-- Name: rootcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rootcategories_id_seq OWNED BY public.rootcategories.id;


--
-- TOC entry 214 (class 1259 OID 35958)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    address character varying(255),
    phonenumber character varying(255),
    gender smallint,
    "roleId" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 35957)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3213 (class 2604 OID 36011)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 36023)
-- Name: childcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.childcategories ALTER COLUMN id SET DEFAULT nextval('public.childcategories_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 36066)
-- Name: details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details ALTER COLUMN id SET DEFAULT nextval('public.details_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 36084)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 35970)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 36052)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3210 (class 2604 OID 35954)
-- Name: rootcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rootcategories ALTER COLUMN id SET DEFAULT nextval('public.rootcategories_id_seq'::regclass);


--
-- TOC entry 3211 (class 2604 OID 36114)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3383 (class 0 OID 35945)
-- Dependencies: 210
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
rootcategories_migration.js
user_migration.js
order_migration.js
categories_migration.js
childcategories_migration.js
product_migration.js
detail_migration.js
images_migration.js
\.


--
-- TOC entry 3391 (class 0 OID 36008)
-- Dependencies: 218
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, rootcategory_id, priority) FROM stdin;
1	Thức ăn	1	1
6	Đồ chơi	1	6
8	Thức ăn	2	8
9	Sữa tắm	2	9
10	Dụng cụ vệ sinh	2	10
11	Đồ chơi	2	11
12	Sữa bột	2	12
2	Soup thưởng - Đồ ăn vặt	1	2
3	Vệ sinh	1	3
5	Dụng cụ	1	5
7	Sữa	1	7
4	Chuồng - Lồng	1	4
\.


--
-- TOC entry 3393 (class 0 OID 36020)
-- Dependencies: 220
-- Data for Name: childcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.childcategories (id, name, parent_id, priority) FROM stdin;
3	Pate	1	3
10	Pate	8	10
4	Gel dinh dưỡng cho mèo	1	4
11	Gel dinh dưỡng cho chó	8	11
12	Sữa tắm thơm mượt lông	9	12
13	Sữa tắm trị ve rận	9	13
7	Sữa tắm trị viêm nấm da	3	7
1	Thức ăn khô cho mèo	1	1
2	Thức ăn mềm cho mèo	1	2
8	Thức ăn khô cho chó	8	8
9	Thức ăn mềm cho chó	8	9
5	Cát vệ sinh	3	5
6	Chậu - Nhà vệ sinh	3	6
14	Xương	2	14
15	Bánh thưởng	2	15
\.


--
-- TOC entry 3397 (class 0 OID 36063)
-- Dependencies: 224
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.details (id, product_id, order_id, quantity, total_price, "isCart", status, complete) FROM stdin;
\.


--
-- TOC entry 3399 (class 0 OID 36081)
-- Dependencies: 226
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, product_id, secure_url, cloudinary_public_id) FROM stdin;
1	1	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974479/images/bjyzsfbgoy5aurpxqqxg.jpg	bjyzsfbgoy5aurpxqqxg
2	1	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974480/images/khw35tbo65d2tfnbmrri.jpg	khw35tbo65d2tfnbmrri
3	1	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974475/images/lnvazrkmra4q45aef9lt.jpg	lnvazrkmra4q45aef9lt
4	1	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974477/images/a3nspogwcnzzpdmxjo1h.jpg	a3nspogwcnzzpdmxjo1h
5	2	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974777/images/qeihrj0kvbvyeugdzdc9.jpg	qeihrj0kvbvyeugdzdc9
6	2	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974776/images/fcczllj1gvzukbxc0ekk.jpg	fcczllj1gvzukbxc0ekk
7	2	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974778/images/kwkqzlkmj0tedfpabriu.jpg	kwkqzlkmj0tedfpabriu
8	2	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711974778/images/bhion8n0qdsliknqsq8x.jpg	bhion8n0qdsliknqsq8x
9	3	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975120/images/odpzbd1vxonahbrkvwbc.jpg	odpzbd1vxonahbrkvwbc
10	3	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975119/images/f0ce6q6l1wqwtrfsnhec.jpg	f0ce6q6l1wqwtrfsnhec
11	3	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975118/images/wo6irc4vz7g9abyhyozn.jpg	wo6irc4vz7g9abyhyozn
12	3	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975118/images/yqjpjsfsssn7xzcmlp5g.jpg	yqjpjsfsssn7xzcmlp5g
13	4	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975282/images/hylrbro0ayk1h0mmukle.jpg	hylrbro0ayk1h0mmukle
14	4	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975281/images/zdzl1psgeelywk5s4io6.jpg	zdzl1psgeelywk5s4io6
15	4	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975282/images/jtpv0wx6on1iehpincyj.jpg	jtpv0wx6on1iehpincyj
16	4	https://res.cloudinary.com/dzxtqya3k/image/upload/v1711975281/images/uyod4vthvxfqxt6w7yde.jpg	uyod4vthvxfqxt6w7yde
17	5	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023349/images/apqudrv7omrf5lgvqtxa.jpg	apqudrv7omrf5lgvqtxa
18	5	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023347/images/x56789jyetp2v2xezyvd.jpg	x56789jyetp2v2xezyvd
19	5	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023347/images/woibwtsxrzp0dwebbufg.jpg	woibwtsxrzp0dwebbufg
20	5	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023347/images/xvzhitnvj4mpkqyobcte.jpg	xvzhitnvj4mpkqyobcte
21	6	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023585/images/dhaofoqw45sboyzl0llg.jpg	dhaofoqw45sboyzl0llg
22	6	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023585/images/gwe8idjxwz6uzpx3jgrc.jpg	gwe8idjxwz6uzpx3jgrc
23	6	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023585/images/b2egxssx58zvs7nw3ddp.jpg	b2egxssx58zvs7nw3ddp
24	6	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712023586/images/tqxkmz8a62d1rmc1x53i.jpg	tqxkmz8a62d1rmc1x53i
25	7	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024709/images/cuqsy6fyyba2i6nq4ldh.jpg	cuqsy6fyyba2i6nq4ldh
26	7	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024711/images/aatyurf3ypobvvdynqca.jpg	aatyurf3ypobvvdynqca
27	7	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024711/images/r3zo0olq91bujlceoacd.jpg	r3zo0olq91bujlceoacd
28	7	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024709/images/faulzfxmxuwesy78gxeu.jpg	faulzfxmxuwesy78gxeu
29	8	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024801/images/xnyvw29hmzarcgd0qtbi.jpg	xnyvw29hmzarcgd0qtbi
30	8	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024801/images/juiyfqgku8oyok6ak3zl.jpg	juiyfqgku8oyok6ak3zl
31	8	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024802/images/znavyqtjkillp3xt7wbo.jpg	znavyqtjkillp3xt7wbo
32	8	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024802/images/tsd3axlai0d8kvx28xry.jpg	tsd3axlai0d8kvx28xry
33	9	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024930/images/mgimot4exc4h9kjebsfe.jpg	mgimot4exc4h9kjebsfe
34	9	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024930/images/ca39k7sovet7eqw4q3fz.jpg	ca39k7sovet7eqw4q3fz
35	9	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024930/images/hurdrrq2bon78thzlr5d.jpg	hurdrrq2bon78thzlr5d
36	9	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712024931/images/mghpi9ydpesysqkybrvj.jpg	mghpi9ydpesysqkybrvj
37	10	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025036/images/yrbvqq9o53frjaghllpg.jpg	yrbvqq9o53frjaghllpg
38	10	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025036/images/kaythb2m5odf86plkiid.jpg	kaythb2m5odf86plkiid
39	10	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025036/images/vz5ow7heu3uy8b6eo1vn.jpg	vz5ow7heu3uy8b6eo1vn
40	10	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025036/images/swye0sixmy7szvp5ro5v.jpg	swye0sixmy7szvp5ro5v
41	11	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025124/images/uicslj2jos2jklrc8p2e.jpg	uicslj2jos2jklrc8p2e
42	11	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025122/images/fwdaghb7ou4yikbiuk5c.jpg	fwdaghb7ou4yikbiuk5c
43	11	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025123/images/fbvqmjgovsgkiws7qgm9.jpg	fbvqmjgovsgkiws7qgm9
44	11	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025122/images/mldguw4vnzazlie7lv8f.jpg	mldguw4vnzazlie7lv8f
45	12	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025327/images/zokdyxfaezewnk4tu3sn.jpg	zokdyxfaezewnk4tu3sn
46	12	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025324/images/kcfcdoe88jwk3v7zmbuk.jpg	kcfcdoe88jwk3v7zmbuk
47	12	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025324/images/gz68ezvqkpdebjejqp4g.jpg	gz68ezvqkpdebjejqp4g
48	12	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025324/images/yqo3pwhmfaepvklxbr3s.jpg	yqo3pwhmfaepvklxbr3s
49	13	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025408/images/ajyftdtxe88znymj6yj6.jpg	ajyftdtxe88znymj6yj6
50	13	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025408/images/z2hxzv7nv42fcrfnuqzc.jpg	z2hxzv7nv42fcrfnuqzc
51	13	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025411/images/rufd2zybnicvrfzcmtjm.jpg	rufd2zybnicvrfzcmtjm
52	13	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025411/images/sootxi2iangzovxcv8oo.jpg	sootxi2iangzovxcv8oo
53	14	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025516/images/qtwjf6oymrocynz2p6pn.jpg	qtwjf6oymrocynz2p6pn
54	14	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025515/images/folnhvbnunxzw4acgs4o.jpg	folnhvbnunxzw4acgs4o
55	14	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025516/images/dg6yxsph18vzs7zdvvae.jpg	dg6yxsph18vzs7zdvvae
56	14	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025515/images/ihqhbdc6aiyeqjtf3xle.jpg	ihqhbdc6aiyeqjtf3xle
57	15	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025672/images/hizw3podnpi8s38jss9c.jpg	hizw3podnpi8s38jss9c
58	15	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025670/images/o7uhuo8wkoqx6rjzfnpc.jpg	o7uhuo8wkoqx6rjzfnpc
59	15	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025670/images/zyptqsjlr4sfepb4ghbz.jpg	zyptqsjlr4sfepb4ghbz
60	15	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025670/images/g00rgxnr4cz6tdokgxgq.jpg	g00rgxnr4cz6tdokgxgq
61	16	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025956/images/sx50p2dhogryrsb9hquy.jpg	sx50p2dhogryrsb9hquy
62	16	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025956/images/wznzjhgx6z85yx30tifg.jpg	wznzjhgx6z85yx30tifg
63	16	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025956/images/tqhwxst5p01hmq2aurdi.jpg	tqhwxst5p01hmq2aurdi
64	16	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712025956/images/vnzypz5ig126xbxu4h4j.jpg	vnzypz5ig126xbxu4h4j
65	17	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026014/images/ljm5mya7pld6kzqom3n3.jpg	ljm5mya7pld6kzqom3n3
66	17	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026011/images/b7zabdcsjrselco7iea3.jpg	b7zabdcsjrselco7iea3
67	17	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026011/images/yoyez093htj7o8fmfga8.jpg	yoyez093htj7o8fmfga8
68	17	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026011/images/nki7bcmduj0uxrgxewdg.jpg	nki7bcmduj0uxrgxewdg
77	20	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026867/images/g0tozkgrqwukondhrtub.jpg	g0tozkgrqwukondhrtub
78	20	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026868/images/u54utuaoyp4bmlremoq5.jpg	u54utuaoyp4bmlremoq5
79	20	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026868/images/mn4y3bawanxnpwpvkuay.jpg	mn4y3bawanxnpwpvkuay
80	20	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026869/images/rl7xpdeniie00ql6pqtb.jpg	rl7xpdeniie00ql6pqtb
81	21	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026968/images/gbyz4eonwms346kwr3tv.jpg	gbyz4eonwms346kwr3tv
82	21	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026966/images/qc12hvz769wrs49rtvlo.jpg	qc12hvz769wrs49rtvlo
83	21	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026966/images/eq6ymkrsoucakvx9nm8i.jpg	eq6ymkrsoucakvx9nm8i
84	21	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712026967/images/yn4wnxkzmaxiou98atnw.jpg	yn4wnxkzmaxiou98atnw
85	22	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034159/images/rtaasb2ifsnwgclwfzsp.jpg	rtaasb2ifsnwgclwfzsp
86	22	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034159/images/cobtvhjgvcrymxjtlgcw.jpg	cobtvhjgvcrymxjtlgcw
87	22	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034159/images/twqcoldzde1ephlqt6ic.jpg	twqcoldzde1ephlqt6ic
88	22	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034160/images/tkb3lj3xlkuol7jno2lz.jpg	tkb3lj3xlkuol7jno2lz
89	23	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034265/images/qb1jvc4iwvlzro66oxeg.jpg	qb1jvc4iwvlzro66oxeg
90	23	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034265/images/l5l3zyorbsvgunbujr1g.jpg	l5l3zyorbsvgunbujr1g
91	23	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034266/images/osba04vijdp4feysyc6k.jpg	osba04vijdp4feysyc6k
92	23	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712034266/images/bjxt4gytcjgeqn8sbfao.jpg	bjxt4gytcjgeqn8sbfao
93	24	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040179/images/fyayi3bywyxesizfr8ar.jpg	fyayi3bywyxesizfr8ar
94	24	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040180/images/ycwofeghbnrgvn56sjso.jpg	ycwofeghbnrgvn56sjso
95	24	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040179/images/rvv41jilckhlpppljd7e.jpg	rvv41jilckhlpppljd7e
96	24	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040179/images/znauwwykhva1icjmprmx.jpg	znauwwykhva1icjmprmx
97	25	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040270/images/o4zqfctc8fsegtlktxhq.jpg	o4zqfctc8fsegtlktxhq
98	25	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040270/images/eqbna95ga4ifgflts9f9.jpg	eqbna95ga4ifgflts9f9
99	25	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040270/images/nv7u5x1aajftecxaxagn.jpg	nv7u5x1aajftecxaxagn
100	25	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040270/images/jrhemmgao1j5jvadwhbl.jpg	jrhemmgao1j5jvadwhbl
101	26	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040367/images/npqqwm0ausscwe90annj.jpg	npqqwm0ausscwe90annj
102	26	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040367/images/v94xl1izcotxu9ave1kp.jpg	v94xl1izcotxu9ave1kp
103	26	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040367/images/xympob3mmv54ryxolsar.jpg	xympob3mmv54ryxolsar
104	26	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040368/images/qe2edpzsxt9natosjzxx.jpg	qe2edpzsxt9natosjzxx
105	27	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040456/images/kcretjhkb7gpximgqaul.jpg	kcretjhkb7gpximgqaul
106	27	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040457/images/fywlykmj5tfhf8qhfap8.jpg	fywlykmj5tfhf8qhfap8
107	27	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040456/images/uon6pk1dtp05ggi6ivlp.jpg	uon6pk1dtp05ggi6ivlp
108	27	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712040456/images/o8eyhxa8pjsr7fvezgve.jpg	o8eyhxa8pjsr7fvezgve
109	28	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073343/images/humf2trs7rzzzayhjdgo.jpg	humf2trs7rzzzayhjdgo
110	28	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073355/images/qx6ld68eoscauattoqen.jpg	qx6ld68eoscauattoqen
111	28	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073355/images/z2xcrldjizczmrdv0mll.jpg	z2xcrldjizczmrdv0mll
112	28	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073346/images/od17bdvv7lilsf5t4ab3.jpg	od17bdvv7lilsf5t4ab3
113	29	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073646/images/e6dsu3y52euzzlkwdovv.jpg	e6dsu3y52euzzlkwdovv
114	29	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073646/images/alt0rvghxp4b0syjbcqz.jpg	alt0rvghxp4b0syjbcqz
115	29	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073645/images/b3ifdhbkfom2mle5kkeo.jpg	b3ifdhbkfom2mle5kkeo
116	29	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712073646/images/aaafpi8zcoxpspbrnna5.jpg	aaafpi8zcoxpspbrnna5
117	30	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712074102/images/nsmrdnac1fnpndbmx6vk.jpg	nsmrdnac1fnpndbmx6vk
118	30	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712074104/images/bakfxbkusqcdxcohm8pg.jpg	bakfxbkusqcdxcohm8pg
119	30	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712074101/images/tsygvgmvejwvezgnxf8g.jpg	tsygvgmvejwvezgnxf8g
120	30	https://res.cloudinary.com/dzxtqya3k/image/upload/v1712074102/images/r4be65cpwb2lq7g5njyx.jpg	r4be65cpwb2lq7g5njyx
\.


--
-- TOC entry 3389 (class 0 OID 35967)
-- Dependencies: 216
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, status, "createdAt", "updatedAt") FROM stdin;
1	19	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
2	16	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
3	9	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
4	28	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
5	15	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
6	3	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
7	12	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
8	29	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
9	16	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
10	16	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
11	11	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
12	33	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
13	51	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
14	40	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
15	52	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
16	43	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
17	52	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
18	37	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
19	23	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
20	22	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
21	11	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
22	16	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
23	52	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
24	13	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
25	50	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
26	9	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
27	21	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
28	30	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
29	35	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
30	52	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
31	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
32	5	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
33	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
34	50	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
35	8	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
36	41	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
37	32	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
38	40	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
39	44	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
40	50	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
41	18	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
42	27	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
43	8	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
44	18	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
45	19	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
46	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
47	42	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
48	38	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
49	26	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
50	46	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
51	14	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
52	45	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
53	27	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
54	31	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
55	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
56	32	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
57	32	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
58	48	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
59	14	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
60	46	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
61	46	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
62	41	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
63	21	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
64	23	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
65	51	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
66	42	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
67	32	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
68	46	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
69	35	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
70	31	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
71	2	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
72	12	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
73	5	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
74	21	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
75	46	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
76	28	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
77	48	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
78	52	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
79	20	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
80	7	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
81	2	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
82	15	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
83	33	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
84	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
85	11	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
86	31	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
87	49	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
88	31	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
89	51	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
90	48	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
91	37	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
92	26	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
93	10	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
94	17	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
95	14	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
96	32	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
97	18	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
98	6	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
99	25	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
100	10	completed	2024-03-28 05:01:40.248024+07	2024-03-28 05:01:40.248024+07
\.


--
-- TOC entry 3395 (class 0 OID 36049)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, category_id, name, price, discount, content, amount) FROM stdin;
29	6	Cầu trượt cho mèo giảm stress tăng trao đổi chất	365000	5	<p><strong className="ql-size-large">Cầu trượt cho mèo</strong></p><p>Kích thước 40*40*9cm</p><p>Chất liệu: lụa, cotton</p><p>Công dụng:</p><ul><li>Mèo có nơi cào móng, tránh việc mèo quấy phá các đồ vật trong nhà</li><li>Giúp các boss thư giản và giải phóng năng lượng, và là nơi cào móng sạch sẽ</li><li>Bàn cào được làm từ chất liệu giấy carton, thân thiện với môi trường</li><li>Cách sử dụng: đặt cầu trượt ở những nơi mèo qua lại hoặc chơi nhiều</li></ul><p><br></p>	25
11	1	Whiskas Vị Cá Biển Túi 3kg - Xuất xứ Thái Lan	450000	15	<h2>Mô tả</h2><p><strong>Thức ăn cho mèo</strong>&nbsp;ngon tuyệt hảo, giàu dưỡng chất giúp mèo ăn ngon miệng, mau lớn.</p><p>Whiskas với công thức cải tiến cung cấp chế độ dinh dưỡng cân bằng 100%.</p><p><strong>Là thức ăn khô cho mèo</strong>&nbsp;với hương vị hải sản thơm ngon giúp làm hài lòng những chú mèo nhà bạn, ngay cả những chú mèo kén ăn</p><p><strong>ĐẶC ĐIỂM VÀ LỢI ÍCH</strong></p><p><strong>Đồ ăn cho mèo lớn</strong>&nbsp;vị cá biển&nbsp;được lựa chọn từ những thành phần thịt, cá tươi để chế biến, sảm phẩm giàu protein, các vitamin và khoáng chất thiết yếu đồng thời không có chất bảo quản, mang đến tác dụng cân bằng dinh dưỡng hàng ngày cho thú cưng của bạn.</p><p>Được phát triển bởi các chất dinh dưỡng tối ưu và được các chuyên gia vật nuôi trên khắp thế giới công nhận là sản phẩm dinh dưỡng được khuyên dùng.</p><p>Được thiết kế dành riêng cho đặc thù dinh dưỡng của mèo, các hạt giàu các chất dinh dưỡng từ thịt, hải sản để đảm bảo cho sự phát triển toàn diện cho mèo của bạn mỗi ngày&nbsp;.</p>	190
28	6	Nhà giấy có bàn cào giúp giảm stress thú cưng	455000	8	<p><strong className="ql-size-large">Bàn cào móng ổ cào móng cho Mèo hình tròn chất liệu carton 40cm</strong></p><p>Bàn cào móng, ổ cào móng cho mèo hình tròn chất liệu carton Mitapet CM01</p><p>Kích thước 40*40*9cm</p><p>Chất liệu: giấy carton chắc chắn chịu trọng lượng lớn</p><p>Đặc điểm: Bàn cào móng dành cho mèo hoặc ổ dành cho mèo. Bàn được thiết kế hình tròn lõm đáp ứng đặc tính cuộc tròn khi ngủ của mèo.</p><p>Công dụng:</p><ul><li>Mèo có nơi cào móng, tránh việc mèo quấy phá các đồ vật trong nhà</li><li>Giúp các boss thư giản và giải phóng năng lượng, và là nơi cào móng sạch sẽ</li><li>Bàn cào được làm từ chất liệu giấy carton, thân thiện với môi trường</li><li>Cách sử dụng: đặt bàn cào móng ở những nơi mèo qua lại hoặc chơi nhiều</li></ul><p><br></p>	25
7	1	NATURAL CORE - Thức Ăn Dành Cho Mèo Bene 3012 1.5KG	280000	5	<h4><strong>Đặc điểm nổi bật&nbsp;</strong></h4><p>Thức ăn cho mèo Natural Core C3 Bene 3012 là thức ăn giàu dinh dưỡng cho mèo trưởng thành:&nbsp;</p><ul><li>Nguồn protein dồi dào từ thịt gà và cá hồi tươi.&nbsp;</li><li>Nguyên liệu không chứa kháng sinh, phân bón hóa học, màu nhân tạo, GMO.</li><li>Không gây dị ứng, an toàn cho sức khỏe của mèo.&nbsp;&nbsp;</li><li>Cải thiện chức năng tiêu hóa, ngăn ngừa tiêu chảy, giảm mùi phân.</li><li>Chứa yến mạch tốt cho da, giúp lông bóng mượt.&nbsp;</li><li>Có lợi cho tiết niệu và tim mạch.&nbsp;</li></ul><h4><strong>Đặc tính - Công dụng&nbsp;</strong></h4><p>Thành phần tốt cho sức khỏe, thích hợp với mèo ở mọi lứa tuổi</p><p>Natural Core C3 Bene 3012 cho mèo Thịt gà &amp; Cá hồi nổi bật về lượng protein chất lượng cao. Ức gà tươi và cá rút xương đảm bảo nguồn đạm dồi dồi cho mèo cưng phát triển cơ bắp, đồng thời, bổ sung nguồn khoáng chất và vitamin.&nbsp;</p><p>Giúp bộ lông đẹp bóng mượt, mắt sáng và trí não phát triển&nbsp;</p><p>Natural Core C3 Bene 3012 cho mèo chỉ sử dụng thịt gà tươi rút xương an toàn không hooc môn tăng trưởng và không chất kháng sinh. Thành phần collagen của thịt gà làm bộ lông bóng mượt. Cá cung cấp omega-3, giữ cho đôi mắt của mèo cưng giảm đổ ghèn, sáng khỏe long lanh.&nbsp;</p><p>Công nghệ đạm thủy phân, tối đa hóa khả năng hấp thu</p><p>Sản phẩm được làm từ những nguyên liệu được lựa chọn một cách cẩn thận có hương vị thơm ngon và tốt cho sức khỏe. Natural Core C3 Bene 3012 chỉ sử dụng các nguyên liệu được chế biến bằng phương pháp riêng biệt theo đặc điểm của từng nguyên liệu, có tác dụng tuyệt vời cho hệ tiêu hóa, giúp cho lượng phân ít và mùi phân hầu như không còn.</p><p>Ngăn ngừa rối loạn tiêu hóa và bảo vệ hệ tiết niệu&nbsp;</p><p>Thành phấn chứa yến mạch nguyên chất và lúa mạch nảy mầm phù hợp với cả những chú mèo con, mèo có hệ tiêu hóa nhạy cảm, ngăn ngừa các bệnh về đường ruột. Nguồn khoáng chất cân đối còn góp phần tăng sức khỏe đường tiết niệu.&nbsp;</p>	190
14	1	ANF Organic 6 Free for Cat Salmon & Tuna 2kg	620000	10	<p><strong>THỰC PHẨM CHỨC NĂNG ROYAL CANIN HYPOALLERGENIC</strong></p><p><strong>HỖ TRỢ MÈO BỊ DỊ ỨNG</strong></p><p><strong>KHUYẾN CÁO</strong></p><p><strong>Khi nghi ngờ mèo bị dị ứng thực phẩm hoặc không dung nạp thức ăn, có thể cho mèo đổi sang chế độ ăn Royal Canin Hypoallergenic mà không cần bước chuyển đổi (quy tắc đổi thức ăn 7 ngày). Những chú mèo bị viêm da mạn tính cần kiểm soát dinh dưỡng có thể duy trì sử dụng Hypoallergenic suốt đời.&nbsp;</strong></p><p><strong>Chỉ định</strong></p><ul><li>Phản ứng dị ứng thực phẩm (Adverse Food Reactions / AFR) với các triệu chứng trên da hoặc/và tiêu hóa:&nbsp;</li></ul><p>- Chẩn đoán: Thử nghiệm loại bỏ thực phẩm.</p><p>- Kiểm soát dinh dưỡng.</p><ul><li>Viêm da dị ứng liên quan đến AFR.</li><li>Tiêu chảy mãn tính.</li><li>Bệnh viêm ruột (Inflammatory Bowel Disease / IBD).</li><li>Thiểu năng tụy ngoại tiết (Exocrine Pancreatic Insufficiency / EPI).</li><li>Hội chứng Loạn khuẩn ruột non (Small intestinal bacterial overgrowth / SIBO).</li></ul><p><strong>Chống chỉ định</strong></p><ul><li>Mèo con đang lớn / mèo mẹ mang thai hoặc cho con bú.</li></ul><p><br></p>	150
30	6	Trụ cào móng mini giảm stress cho thú cưng	160000	10	<p><strong style="color: var(--bs-body-color);" className="ql-size-large">Trụ cào móng mini</strong></p><p>Công dụng:</p><ul><li>Mèo có nơi cào móng, tránh việc mèo quấy phá các đồ vật trong nhà</li><li>Giúp các boss thư giản và giải phóng năng lượng, và là nơi cào móng sạch sẽ</li><li>Bàn cào được làm từ chất liệu giấy carton, thân thiện với môi trường</li><li>Cách sử dụng: đặt cầu trượt ở những nơi mèo qua lại hoặc chơi nhiều</li></ul><p><br></p>	25
6	1	Reflex Kitten Food Chicken & Rice 2kg, 15kg	188000	0	<p>– Thức ăn khô cho mèo với công thức cân bằng và hoàn chỉnh dành cho mèo con.</p><p>– Dành cho tất cả giống mèo từ 2 tháng đến 12 tháng tuổi. Thể trọng từ 0.5kg – 5kg</p><p>+ Công thức đặc biệt dành cho các giống mèo con.</p><p>+ Sự cân bằng của Omega 3 &amp; Omega 6 đã đạt được bằng cách sử dụng hạt lanh giúp lông bóng mượt.</p><p>+ Chiết xuất cây Yucca giúp tăng khả năng hấp thụ dinh dưỡng, kiểm soát mùi. Men bia giúp hệ thống miễn dịch được tăng cường &amp; năng suất vật nuôi được cải thiện.</p><p>+ Bổ sung Vitamin A, D3, E, C và khoáng chất.</p><p><strong>– Trọng lượng:</strong>&nbsp;2kg / gói</p><p><strong>– Xuất xứ:</strong>&nbsp;Thổ Nhĩ Kỳ</p><p><strong>– Hướng dẫn sử dụng:</strong>&nbsp;ghi trên bao bì.</p><p><strong>– Cách cho ăn: Chia làm 2-3 bữa ăn / ngày</strong></p>	90
8	1	NATURAL CORE - Thức Ăn Đa Đạm Dành Cho Mèo Mọi Lứa Tuổi 800gr	190000	5	<p>Thức ăn cho mèo Natural Core ECOC1 đa đạm cho mèo là thức ăn giàu dinh dưỡng cho mèo:&nbsp;</p><ul><li>Nguồn protein dồi dào từ thịt gà rút xương và cá hồi.&nbsp;</li><li>Nguyên liệu không chứa kháng sinh, phân bón hóa học, màu nhân tạo, GMO.</li><li>Không gây dị ứng, an toàn cho sức khỏe của mèo.&nbsp;&nbsp;</li><li>Cải thiện chức năng tiêu hóa, ngăn ngừa tiêu chảy, giảm mùi phân.</li><li>Chứa yến mạch tốt cho da, giúp lông bóng mượt.&nbsp;</li><li>Có lợi cho tiết niệu và tim mạch.&nbsp;</li></ul><p><br></p>	180
4	8	NATURAL CORE - Thức Ăn Dành Cho Chó Mọi Lứa Tuổi Vị Cừu 1Kg, 2KG	250000	5	<p><strong>Giới thiệu</strong></p><p>Hạt Natural Core Organic Duck - Lamb Forrmula Vị Thịt Vịt - Thịt Cừu là thức ăn hạt khô hữu cơ organic được sản xuất bởi thương hiệu Natural Core, Hàn Quốc.</p><p>Hạt Natural Core Organic Duck - Lamb Forrmula Vị Thịt Vịt - Thịt Cừu có 2 vị là thịt vịt và thịt cừu, kèm rau bina, khoai lang, gạo lứt, hạt hướng dương, cà rốt, yến mạch, hạt lanh.... nhằm đảm bảo bữa ăn của chó đầy đủ dinh dưỡng, cân bằng đạm - xơ mà vẫn ngon miệng.</p><p>Natural Core là dòng thức ăn hữu cơ cho chó mèo có tác dụng làm chậm quá trình lão hoá trong cơ thể chó, bổ sung dinh dưỡng cho da lông bóng khỏe, tăng cường sức đề kháng nhằm phòng ngừa các bệnh tật ảnh hưởng từ môi trường bên ngoài. Bao gồm các nguyên liệu từ thiên nhiên như thịt vịt tươi, thịt gà tươi, cá hồi, thịt cừu tươi.... kèm rau Bina, khoai lang hữu cơ và nhiều loại ngũ cốc hữu cơ khác giúp chó mèo bảo vệ hệ tiêu hoá, cải thiện mùi hôi cơ thể và mùi chất thải, quan trọng nhất là giúp cơ thể ngăn ngừa tình trạng lão hoá, bổ lông, mượt da, tăng cường đề kháng, đánh bật bệnh tật. Natural Core đảm bảo không sử dụng thuốc bảo quản, thuốc trừ sâu, phụ gia thực phẩm, màu thực phẩm, hương vị nhân tạo và sản phẩm phụ từ thịt ( by-products meat ).</p><p>Do không sử dụng chất bảo quản, nên hạt Natural Core được nhà máy phân chia sẵn trong các gói nhỏ 200g, 400g, 500g chứa khí nitơ tùy mỗi loại, phù hợp dùng 2-5 bữa ăn, do đó, các chủ nuôi không cần lo lắng về mặt bảo quản chất lượng hạt.</p><p><strong>Tác Dụng</strong></p><p>- Vị thịt cừu ngon miệng.</p><p>- Không gây dị ứng</p><p>- Dành cho tất cả giống chó, chó con, chó lớn, chó già</p><p>- Kích thước hạt nhỏ vừa miệng với chó, đặc biệt phù hợp cho chó con và chó già</p><p>- Thành phần thịt tự nhiên và hữu cơ, an toàn cho sức khỏe lâu dài của chó</p><p>- Bảo quản hạt với khí nitơ</p><p>- Bao bì đóng gói nhỏ 200g tùy loại cực kì tiện lợi</p><p>&nbsp;</p><p><strong>Phù Hợp Cho</strong></p><p>- Tất cả các giống chó ở các giai đoạn sống</p><p>- Chó con trong giai đoạn phát triển</p><p>- Chó bầu và nuôi con</p><p>- Chó già răng yếu</p><p>- Chó con có sức đề kháng yếu và hệ tiêu hoá kém</p><p>- Chó bệnh, sau ốm và hậu phẫu</p><p><strong>Nguyên Liệu / Thành Phần</strong></p><p>Thịt cừu không xương, lúa mạch hữu cơ nguyên hạt, khoai lang hữu cơ, gạo lứt hữu cơ nguyên hạt, bột hạt hướng dương hữu cơ, mỡ gà, hạt lanh hữu cơ nguyên hạt, isomalto oligosaccharide hữu cơ, sụn vịt, yến mạch hữu cơ, cà rốt hữu cơ, rau mùi tây hữu cơ, rau bina hữu cơ, muối khô, chitosan oligosaccharide, canxi photphat, lactobacillus, chiết xuất yucca schidigera, choline chloride, quả hắc mai biển, cà chua, bột nhân sâm đỏ, chondroitin sulfate, vitamin C, vitamin A, vitamin D3, vitamin K3, vitamin B1, vitamin B2, vitamin B6, vitamin B12, biotin, axit pantothenic, axit folic, axit nicotinic, sắt, đồng, kẽm, selen, mangan, coban, iot.</p><p><strong>Phân Tích Đảm Bảo</strong></p><p>Chất Đạm................................. 24%</p><p>Chất Béo..................................12%</p><p>Chất Xơ....................................6%</p><p>Độ Ẩm ......................................10%</p><p>Năng Lượng............................4400 Kcal/Kg</p><p>&nbsp;</p><p><strong>Hướng Dẫn Sử Dụng</strong></p><p>Cho ăn trực tiếp ngay khi mở bao bì.</p><p>- Bảng tham khảo lượng thức ăn khuyến khích sử dụng hằng ngày. Tùy vào môi trường sống, thời tiết, mức độ vận động và giai đoạn phát triển mà thú cưng sẽ ăn nhiều hoặc ít hơn, do đó, bảng bên dưới chỉ mang tính chất tham khảo.</p><p><strong>Hướng Dẫn Bảo Quản</strong></p><p>- Giữ kín phần hạt còn lại sau khi sử dụng để giữ mùi thơm, vị ngon và độ giòn.</p><p>- Bảo quản nơi khô ráo, thoáng mát.</p><p><strong>Khuyến Khích</strong></p><p>- Luôn có sẵn nước uống sạch bên cạnh thức ăn</p><p><strong>Đóng Gói / Thể Tích</strong></p><p>Túi 1kg ( 200 gram x 5 )</p><p>Túi 2kg ( 200 gram x 10&nbsp;)</p>	200
5	8	NATURAL CORE - Thức Ăn Dành Cho Chó Mọi Lứa Tuổi Vị Vịt 1Kg, 2KG	300000	10	<h2>NATURAL CORE - HẠT CAO CẤP ĐẾN TỪ HÀN QUỐC</h2><p><strong>Giới thiệu</strong></p><ul><li>Hạt Natural Core Organic DuckForrmula Vị Thịt Vịt là thức ăn hạt khô hữu cơ organic được sản xuất bởi thương hiệu Natural Core, Hàn Quốc.</li><li>Hạt Natural Core Organic Duck Forrmula Vị Thịt Vịt có vị là&nbsp;thịt vịt&nbsp;kèm rau bina, khoai lang, gạo lứt, hạt hướng dương, cà rốt, yến mạch, hạt lanh.... nhằm đảm bảo bữa ăn của chó đầy đủ dinh dưỡng, cân bằng đạm - xơ mà vẫn ngon miệng.</li><li>Natural Core là dòng thức ăn hữu cơ cho chó mèo có tác dụng làm chậm quá trình lão hoá trong cơ thể chó, bổ sung dinh dưỡng cho da lông bóng khỏe, tăng cường sức đề kháng nhằm phòng ngừa các bệnh tật ảnh hưởng từ môi trường bên ngoài. Bao gồm các nguyên liệu từ thiên nhiên như thịt vịt tươi, thịt gà tươi, cá hồi, .... kèm rau Bina, khoai lang hữu cơ và nhiều loại ngũ cốc hữu cơ khác giúp&nbsp;chó mèo bảo vệ hệ tiêu hoá, cải thiện mùi hôi cơ thể và mùi chất thải, quan trọng nhất là giúp cơ thể ngăn ngừa tình trạng lão hoá, bổ lông, mượt da, tăng cường đề kháng, đánh bật bệnh tật. Natural Core đảm bảo không sử dụng thuốc bảo quản, thuốc trừ sâu, phụ gia thực phẩm, màu thực phẩm, hương vị nhân tạo và sản phẩm phụ từ thịt ( by-products meat ).</li></ul><p>Do không sử dụng chất bảo quản, nên hạt Natural Core được nhà máy phân chia sẵn trong các gói nhỏ 200g, 400g, 500g chứa khí nitơ tùy mỗi loại, phù hợp dùng 2-5 bữa ăn, do đó, các chủ nuôi không cần lo lắng về mặt bảo quản chất lượng hạt</p><p><strong>Tác Dụng</strong></p><ul><li>Không gây dị ứng</li><li>Dành cho tất cả giống chó, chó con, chó lớn, chó già</li><li>Kích thước hạt nhỏ vừa miệng với chó, đặc biệt phù hợp cho chó con và chó già</li><li>Thành phần thịt tự nhiên và hữu cơ, an toàn cho sức khỏe lâu dài của chó</li><li>Bảo quản hạt với khí nitơ</li><li>Bao bì đóng gói nhỏ 200g, 400g, 500g tùy loài cực kì tiện sử dụng</li></ul><p><strong>Phù Hợp Cho</strong></p><ol><li>Tất cả các giống chó ở các giai đoạn sống</li><li>Chó con trong giai đoạn phát triển</li><li>Chó bầu và nuôi con</li><li>Chó già răng yếu</li><li>Chó con có sức đề kháng yếu và hệ tiêu hoá kém</li><li>Chó bệnh, sau ốm và hậu phẫu</li></ol><p><strong>Nguyên Liệu / Thành Phần</strong></p><p>Thịt vịt không xương, lúa mạch hữu cơ nguyên hạt, khoai lang hữu cơ, gạo lứt hữu cơ nguyên hạt, bột hạt hướng dương hữu cơ, mỡ gà, hạt lanh hữu cơ nguyên hạt, isomalto oligosaccharide hữu cơ, sụn vịt, yến mạch hữu cơ, cà rốt hữu cơ, rau mùi tây hữu cơ, rau bina hữu cơ, muối khô, chitosan oligosaccharide, canxi photphat, lactobacillus, chiết xuất yucca schidigera, choline chloride, quả hắc mai biển, cà chua, bột nhân sâm đỏ, chondroitin sulfate, vitamin C, vitamin A, vitamin D3, vitamin K3, vitamin B1, vitamin B2, vitamin B6, vitamin B12, biotin, axit pantothenic, axit folic, axit nicotinic, sắt, đồng, kẽm, selen, mangan, coban, iot.</p><p><strong>Phân Tích Đảm Bảo</strong></p><ul><li>Chất Đạm................................. 24%</li><li>Chất Béo..................................12%</li><li>Chất Xơ....................................6%</li><li>Độ Ẩm ......................................10%</li><li>Năng Lượng............................4400 Kcal/Kg</li></ul><p><strong>Hướng Dẫn Sử Dụng</strong></p><p>Cho ăn trực tiếp ngay khi mở bao bì.</p><p>-Bảng tham khảo lượng thức ăn khuyến khích sử dụng hằng ngày. Tùy vào môi trường sống, thời tiết, mức độ vận động và giai đoạn phát triển mà thú cưng sẽ ăn nhiều hoặc ít hơn.</p><p><strong>Nhà Sản Xuất</strong>: Natural Core ( The-O Corporation THEO )</p><p><strong>Xuất Xứ:</strong>&nbsp;Hàn Quốc</p>	200
9	1	NATURAL CORE - Thức Ăn Hạt Cho Mèo Mọi Lứa Tuổi Natural Core 95% Hữu Cơ 1KG	255000	8	<p><strong>NATURAL CORE - Thức Ăn Hạt Cho Mèo Mọi Lứa Tuổi Natural Core 95% Hữu Cơ 1KG</strong></p><ul><li>Thương hiệu:&nbsp;Natural Core</li><li>Phù hợp cho: Mèo mọi lứa tuổi</li><li>Thức ăn cho mèo&nbsp;mọi lứa tuổi Natural Core 95% Hữu Cơ 1kg là sản phẩm thức ăn hạt hữu cơ cao cấp cho mèo, được sản xuất tại Hàn Quốc. Sản phẩm được chế biến từ 95% nguyên liệu hữu cơ, bao gồm thịt gà, thịt cá hồi, thịt vịt rút xương, hồng sâm,... cùng các loại rau củ quả tươi ngon, mang đến cho mèo nguồn dinh dưỡng đầy đủ và cân bằng, giúp mèo phát triển khỏe mạnh và toàn diện.</li></ul><p><strong>Lợi ích:</strong></p><ul><li>95% nguyên liệu hữu cơ và 5% là vitamin và khoáng chất tồn tại ở dạng vô cơ</li><li>Chăm sóc da, làm đẹp lông</li><li>Tăng cường khả năng tiêu hoá và hấp thụ dưỡng chất</li><li>Giảm thiểu mùi phân</li><li>Loại bỏ lông trong dạ dày</li><li>Giúp tăng cường sức đề kháng và phòng ngừa bệnh tật</li><li>Dành cho mèo thuộc mọi lứa tuổi, cân nặng</li></ul><p><strong>Thành phần</strong></p><ul><li>Được chế biến từ thịt gà, thịt cá hồi, thịt vịt rút xương, hồng sâm…, protein, chất béo, chất xơ, vitamin và khoáng chất</li></ul><p><strong>Hướng dẫn sử dụng</strong></p><ul><li>Chia làm 2-3 bữa/ngày</li><li>Lượng cho ăn hàng ngày được khuyến nghị (gam mỗi ngày) theo trọng lượng cơ thể (kg) và hình dáng của mèo.</li><li>Khẩu phần ăn hàng ngày có thể thay đổi liên quan đến nhiệt độ môi trường, lối sống của mèo (trong nhà-ngoài trời), tính khí và hoạt động của mèo.</li></ul><p><br></p>	100
10	1	ROYAL CANIN Persian Adult 400g, 2KG	180000	20	<p><strong>NATURAL CORE - Thức Ăn Hạt Cho Mèo Mọi Lứa Tuổi Natural Core 95% Hữu Cơ 1KG</strong></p><ul><li>Thương hiệu:&nbsp;Natural Core</li><li>Phù hợp cho: Mèo mọi lứa tuổi</li><li>Thức ăn cho mèo&nbsp;mọi lứa tuổi Natural Core 95% Hữu Cơ 1kg là sản phẩm thức ăn hạt hữu cơ cao cấp cho mèo, được sản xuất tại Hàn Quốc. Sản phẩm được chế biến từ 95% nguyên liệu hữu cơ, bao gồm thịt gà, thịt cá hồi, thịt vịt rút xương, hồng sâm,... cùng các loại rau củ quả tươi ngon, mang đến cho mèo nguồn dinh dưỡng đầy đủ và cân bằng, giúp mèo phát triển khỏe mạnh và toàn diện.</li></ul><p><strong>Lợi ích:</strong></p><ul><li>95% nguyên liệu hữu cơ và 5% là vitamin và khoáng chất tồn tại ở dạng vô cơ</li><li>Chăm sóc da, làm đẹp lông</li><li>Tăng cường khả năng tiêu hoá và hấp thụ dưỡng chất</li><li>Giảm thiểu mùi phân</li><li>Loại bỏ lông trong dạ dày</li><li>Giúp tăng cường sức đề kháng và phòng ngừa bệnh tật</li><li>Dành cho mèo thuộc mọi lứa tuổi, cân nặng</li></ul><p><strong>Thành phần</strong></p><ul><li>Được chế biến từ thịt gà, thịt cá hồi, thịt vịt rút xương, hồng sâm…, protein, chất béo, chất xơ, vitamin và khoáng chất</li></ul><p><strong>Hướng dẫn sử dụng</strong></p><ul><li>Chia làm 2-3 bữa/ngày</li><li>Lượng cho ăn hàng ngày được khuyến nghị (gam mỗi ngày) theo trọng lượng cơ thể (kg) và hình dáng của mèo.</li><li>Khẩu phần ăn hàng ngày có thể thay đổi liên quan đến nhiệt độ môi trường, lối sống của mèo (trong nhà-ngoài trời), tính khí và hoạt động của mèo.</li></ul><p><br></p>	190
12	1	ROYAL CANIN GASTROINTESTINAL - Thức ăn cho mèo có vấn đề về tiêu hóa 2kg	750000	8	<p><strong>THỰC PHẨM CHỨC NĂNG ROYAL CANIN GASTROINTESTINAL</strong></p><p><strong>HỖ TRỢ HỆ TIÊU HÓA (Tiêu chảy)</strong></p><p><strong>KHUYẾN CÁO</strong></p><p>Trong trường hợp mèo mắc các bệnh đường ruột cấp tính, để cải thiện sức khỏe&nbsp;đường ruột yêu cầu phải kiểm soát dinh dưỡng ít nhất 3 tuần. Đối với những chú mèo mắc bệnh mạn tính nên duy trì sử dụng chế độ ăn&nbsp;<strong>Royal Canin Gastrointestinal</strong>&nbsp;suốt đời.</p><p>Khẩu phần ăn trong bảng hướng dẫn bên dưới nên chia thành nhiều bữa nhỏ trong ngày.&nbsp;Sản phẩm này có thể dụng cho mèo con.</p><p><strong>Chỉ định</strong></p><ul><li>Tiêu chảy cấp và mạn tính.</li><li>Viêm dạ dày.</li><li>Bệnh viêm ruột (Inflammatory Bowel Disease / IBD).</li><li>Viêm đại tràng.</li><li>Hội chứng Loạn khuẩn ruột non (Small intestinal bacterial overgrowth / SIBO).</li><li>Khó tiêu / Kém hấp thụ.</li><li>Biếng ăn sau phẫu thuật.​</li></ul><p><strong>Chống chỉ định&nbsp;</strong></p><ul><li>Giãn mạch bạch huyết (Lymphangiectasia).</li></ul><p><br></p>	85
13	1	ROYAL CANIN HYPOALLERGENIC - Thức ăn cho mèo bị dị ứng 2.5kg	900000	18	<p><strong>THỰC PHẨM CHỨC NĂNG ROYAL CANIN HYPOALLERGENIC</strong></p><p><strong>HỖ TRỢ MÈO BỊ DỊ ỨNG</strong></p><p><strong>KHUYẾN CÁO</strong></p><p><strong>Khi nghi ngờ mèo bị dị ứng thực phẩm hoặc không dung nạp thức ăn, có thể cho mèo đổi sang chế độ ăn Royal Canin Hypoallergenic mà không cần bước chuyển đổi (quy tắc đổi thức ăn 7 ngày). Những chú mèo bị viêm da mạn tính cần kiểm soát dinh dưỡng có thể duy trì sử dụng Hypoallergenic suốt đời.&nbsp;</strong></p><p><strong>Chỉ định</strong></p><ul><li>Phản ứng dị ứng thực phẩm (Adverse Food Reactions / AFR) với các triệu chứng trên da hoặc/và tiêu hóa:&nbsp;</li></ul><p>- Chẩn đoán: Thử nghiệm loại bỏ thực phẩm.</p><p>- Kiểm soát dinh dưỡng.</p><ul><li>Viêm da dị ứng liên quan đến AFR.</li><li>Tiêu chảy mãn tính.</li><li>Bệnh viêm ruột (Inflammatory Bowel Disease / IBD).</li><li>Thiểu năng tụy ngoại tiết (Exocrine Pancreatic Insufficiency / EPI).</li><li>Hội chứng Loạn khuẩn ruột non (Small intestinal bacterial overgrowth / SIBO).</li></ul><p><strong>Chống chỉ định</strong></p><ul><li>Mèo con đang lớn / mèo mẹ mang thai hoặc cho con bú.</li></ul><p><br></p>	50
20	1	[Best Selling] Thức Ăn Hạt Cao Cấp Tiêu Búi Lông Cho Mèo PET8 Catz Kitchen Vị Cá Hồi 2.7kg	150000	35	<p><strong>Thức Ăn Hạt Khô Cho Mèo PET8 Catz Kitchen-Hỗ Trợ Tiêu Búi Lông&nbsp;</strong></p><ul><li>Thức ăn khô cho mèo Pet8 Thức ăn cho mèo loại cao cấp túi 1,2kg, loại thức ăn viên cao cấp. cá ngừ chất lượng công nghệ cao đến từ Úc cho mèo</li><li>Hàm lượng Protein cao trên 30% Chất béo 12% Giàu nhiều vitamin và khoáng chất giúp nuôi dưỡng lông và da luôn săn chắt,kết hợp chống oxy hóa Prebiotic MOS tăng cường khả năng miễn dịch Chứa taurine Giúp kiểm soát BÚI LÔNG (Hairball Control)&nbsp;</li><li>Thành phần cá ngừ, 100% cá ngừ thật, Dầu cá hồi,giàu Omega 3.</li><li>Thịt gà bổ sung nguyền dạm chất lượng cao, dễ tiêu hóa và ít chất béo.</li><li>Xuất xứ: Thái Lan</li></ul>	450
15	1	[Top Sale] Thức Ăn Hạt Cho Mèo Pet8 Tasty Cat Food Vị Hải Sản 1kg	100000	30	<p><strong>Pet8 Tasty Cat Food</strong></p><p>🐈 HẠT Khô Cho Mèo PET 8 Tasty Cat Dry Food:&nbsp;</p><p>👑 Thương hiệu đạt Top Vương Miện yêu thích hàng đầu tại Thái Lan&nbsp;</p><p>- Chất lượng tốt dành cho mèo trưởng thành từ 1 tuổi trở lên.</p><p>- Công thức mới kiểm soát độ mặn dưới 1% giúp cho mèo khỏe mạnh,tránh các tác động xấu đến thận của mèo</p><p>- Cung cấp đầy đủ các loại dinh dưỡng giúp thú cưng luôn khỏe mạnh, vui tươi và lanh lợi, cùng với chi phí hợp lý, ổn định và dễ kiểm soát được lượng thức ăn đầy đủ trong mỗi bữa ăn tùy theo trọng lượng, giống loài và tuổi của thú cưng. Bảo đảm an toàn, không bị hư hỏng khi để bên ngoài và thời gian bảo quản sử dụng lâu (18 tháng) giúp giữ vệ sinh, giảm sự tích tụ cao răng làm hư răng và đặc biệt nhất là giúp chất thải (phân) của thú cưng giảm hẳn những mùi hôi khó chịu.</p><p>- Thông tin chi tiết sản phẩm:</p><p>+ Taurine: Là Acid Amino cần thiết cho chức năng của mắt và cải thiện thị giác của mèo.&nbsp;</p><p>+ Vitamin C: Tăng cường hệ thống miễn dịch và giúp giảm tác động của stress lên sức khỏe của mèo.&nbsp;</p><p>+ Canxi,Photpho và Vitamin D: Giúp làm chắc răng và xương.&nbsp;</p><p>+ Flutd: Công thức này giúp ngăn ngừa bệnh đường tiết niệu trên mèo và sỏi bàng quang.&nbsp;</p><p>+ Omega 3&amp;6 và Kẽm: Omega 3 và Omega 6 từ dầu chất lượng cao trong hợp chất với kẽm giúp nuôi dưỡng lông và da mèo.&nbsp;</p><p>+ Natri thấp: Công thức Natri thấp giúp giảm nguy cơ cao huyết áp, bệnh thận, tiết liệu và tim ở Mèo</p><p>+ Với 3 hương vị phổ biến mà bất kỳ chú mèo nào cũng ưa thích:</p><p>- Hải sản</p><p>- Cá hồi</p><p>- Cá ngừ</p><p>+ Trọng Lượng: 1KG</p><p>+ Xuất xứ: Thái Lan</p><p>&nbsp;- Hướng dẫn sử dụng:</p><p>+ Để tránh tình trạng khó tiêu với những thay đổi đột ngột, hãy thay thế từ từ lượng thức ăn cũ bằng thức ăn PET 8 cho đến khi tất cả thức ăn cũ được thay thế hoàn toàn trong 1 tuần.&nbsp;</p><p>+ Luôn bảo quản thức ăn trong túi bịt kín hoặc hộp kín.&nbsp;</p><p>+ Bảo quản thức ăn ở nơi khô ráo và thoáng mát, tránh ánh nắng chiếu trực tiếp.&nbsp;</p><p>+ Lượng thức ăn để cho ăn cần được điều chỉnh theo giống, trọng lượng và sự vận động của chú mèo nhà bạn.&nbsp;</p><p>+ Hãy để nước sạch luôn có sẵn cho mèo mọi lúc mọi nơi.</p>	300
16	1	[Top Sale] Thức Ăn Hạt Cho Mèo Pet8 Tasty Cat Food Vị Cá Ngừ (Túi Zip) 500g	100000	30	<p><strong>Pet8 Tasty Cat Food</strong></p><p>🐈 HẠT Khô Cho Mèo PET 8 Tasty Cat Dry Food:&nbsp;</p><p>👑 Thương hiệu đạt Top Vương Miện yêu thích hàng đầu tại Thái Lan&nbsp;</p><p>- Chất lượng tốt dành cho mèo trưởng thành từ 1 tuổi trở lên.</p><p>- Công thức mới kiểm soát độ mặn dưới 1% giúp cho mèo khỏe mạnh,tránh các tác động xấu đến thận của mèo</p><p>- Cung cấp đầy đủ các loại dinh dưỡng giúp thú cưng luôn khỏe mạnh, vui tươi và lanh lợi, cùng với chi phí hợp lý, ổn định và dễ kiểm soát được lượng thức ăn đầy đủ trong mỗi bữa ăn tùy theo trọng lượng, giống loài và tuổi của thú cưng. Bảo đảm an toàn, không bị hư hỏng khi để bên ngoài và thời gian bảo quản sử dụng lâu (18 tháng) giúp giữ vệ sinh, giảm sự tích tụ cao răng làm hư răng và đặc biệt nhất là giúp chất thải (phân) của thú cưng giảm hẳn những mùi hôi khó chịu.</p><p>- Thông tin chi tiết sản phẩm:</p><p>+ Taurine: Là Acid Amino cần thiết cho chức năng của mắt và cải thiện thị giác của mèo.&nbsp;</p><p>+ Vitamin C: Tăng cường hệ thống miễn dịch và giúp giảm tác động của stress lên sức khỏe của mèo.&nbsp;</p><p>+ Canxi,Photpho và Vitamin D: Giúp làm chắc răng và xương.&nbsp;</p><p>+ Flutd: Công thức này giúp ngăn ngừa bệnh đường tiết niệu trên mèo và sỏi bàng quang.&nbsp;</p><p>+ Omega 3&amp;6 và Kẽm: Omega 3 và Omega 6 từ dầu chất lượng cao trong hợp chất với kẽm giúp nuôi dưỡng lông và da mèo.&nbsp;</p><p>+ Natri thấp: Công thức Natri thấp giúp giảm nguy cơ cao huyết áp, bệnh thận, tiết liệu và tim ở Mèo</p><p>+ Với 3 hương vị phổ biến mà bất kỳ chú mèo nào cũng ưa thích:</p><p>- Hải sản</p><p>- Cá hồi</p><p>- Cá ngừ</p><p>+ Trọng Lượng: 1KG</p><p>+ Xuất xứ: Thái Lan</p><p>&nbsp;- Hướng dẫn sử dụng:</p><p>+ Để tránh tình trạng khó tiêu với những thay đổi đột ngột, hãy thay thế từ từ lượng thức ăn cũ bằng thức ăn PET 8 cho đến khi tất cả thức ăn cũ được thay thế hoàn toàn trong 1 tuần.&nbsp;</p><p>+ Luôn bảo quản thức ăn trong túi bịt kín hoặc hộp kín.&nbsp;</p><p>+ Bảo quản thức ăn ở nơi khô ráo và thoáng mát, tránh ánh nắng chiếu trực tiếp.&nbsp;</p><p>+ Lượng thức ăn để cho ăn cần được điều chỉnh theo giống, trọng lượng và sự vận động của chú mèo nhà bạn.&nbsp;</p><p>+ Hãy để nước sạch luôn có sẵn cho mèo mọi lúc mọi nơi.</p>	300
17	1	[Top Sale] Thức Ăn Hạt Cho Mèo Pet8 Tasty Cat Food Vị Cá Hồi (Túi Zip) 500g	100000	30	<p><strong>Pet8 Tasty Cat Food</strong></p><p>🐈 HẠT Khô Cho Mèo PET 8 Tasty Cat Dry Food:&nbsp;</p><p>👑 Thương hiệu đạt Top Vương Miện yêu thích hàng đầu tại Thái Lan&nbsp;</p><p>- Chất lượng tốt dành cho mèo trưởng thành từ 1 tuổi trở lên.</p><p>- Công thức mới kiểm soát độ mặn dưới 1% giúp cho mèo khỏe mạnh,tránh các tác động xấu đến thận của mèo</p><p>- Cung cấp đầy đủ các loại dinh dưỡng giúp thú cưng luôn khỏe mạnh, vui tươi và lanh lợi, cùng với chi phí hợp lý, ổn định và dễ kiểm soát được lượng thức ăn đầy đủ trong mỗi bữa ăn tùy theo trọng lượng, giống loài và tuổi của thú cưng. Bảo đảm an toàn, không bị hư hỏng khi để bên ngoài và thời gian bảo quản sử dụng lâu (18 tháng) giúp giữ vệ sinh, giảm sự tích tụ cao răng làm hư răng và đặc biệt nhất là giúp chất thải (phân) của thú cưng giảm hẳn những mùi hôi khó chịu.</p><p>- Thông tin chi tiết sản phẩm:</p><p>+ Taurine: Là Acid Amino cần thiết cho chức năng của mắt và cải thiện thị giác của mèo.&nbsp;</p><p>+ Vitamin C: Tăng cường hệ thống miễn dịch và giúp giảm tác động của stress lên sức khỏe của mèo.&nbsp;</p><p>+ Canxi,Photpho và Vitamin D: Giúp làm chắc răng và xương.&nbsp;</p><p>+ Flutd: Công thức này giúp ngăn ngừa bệnh đường tiết niệu trên mèo và sỏi bàng quang.&nbsp;</p><p>+ Omega 3&amp;6 và Kẽm: Omega 3 và Omega 6 từ dầu chất lượng cao trong hợp chất với kẽm giúp nuôi dưỡng lông và da mèo.&nbsp;</p><p>+ Natri thấp: Công thức Natri thấp giúp giảm nguy cơ cao huyết áp, bệnh thận, tiết liệu và tim ở Mèo</p><p>+ Với 3 hương vị phổ biến mà bất kỳ chú mèo nào cũng ưa thích:</p><p>- Hải sản</p><p>- Cá hồi</p><p>- Cá ngừ</p><p>+ Trọng Lượng: 1KG</p><p>+ Xuất xứ: Thái Lan</p><p>&nbsp;- Hướng dẫn sử dụng:</p><p>+ Để tránh tình trạng khó tiêu với những thay đổi đột ngột, hãy thay thế từ từ lượng thức ăn cũ bằng thức ăn PET 8 cho đến khi tất cả thức ăn cũ được thay thế hoàn toàn trong 1 tuần.&nbsp;</p><p>+ Luôn bảo quản thức ăn trong túi bịt kín hoặc hộp kín.&nbsp;</p><p>+ Bảo quản thức ăn ở nơi khô ráo và thoáng mát, tránh ánh nắng chiếu trực tiếp.&nbsp;</p><p>+ Lượng thức ăn để cho ăn cần được điều chỉnh theo giống, trọng lượng và sự vận động của chú mèo nhà bạn.&nbsp;</p><p>+ Hãy để nước sạch luôn có sẵn cho mèo mọi lúc mọi nơi.</p>	300
21	1	[Best Selling] Thức Ăn Hạt Cao Cấp Tiêu Búi Lông Cho Mèo PET8 Catz Kitchen Vị Cá Ngừ 2.7kg	150000	35	<p><strong>Thức Ăn Hạt Khô Cho Mèo PET8 Catz Kitchen-Hỗ Trợ Tiêu Búi Lông&nbsp;</strong></p><ul><li>Thức ăn khô cho mèo Pet8 Thức ăn cho mèo loại cao cấp túi 1,2kg, loại thức ăn viên cao cấp. cá ngừ chất lượng công nghệ cao đến từ Úc cho mèo</li><li>Hàm lượng Protein cao trên 30% Chất béo 12% Giàu nhiều vitamin và khoáng chất giúp nuôi dưỡng lông và da luôn săn chắt,kết hợp chống oxy hóa Prebiotic MOS tăng cường khả năng miễn dịch Chứa taurine Giúp kiểm soát BÚI LÔNG (Hairball Control)&nbsp;</li><li>Thành phần cá ngừ, 100% cá ngừ thật, Dầu cá hồi,giàu Omega 3.</li><li>Thịt gà bổ sung nguyền dạm chất lượng cao, dễ tiêu hóa và ít chất béo.</li><li>Xuất xứ: Thái Lan</li></ul>	450
22	10	[Best Selling] Pate cho chó nước sốt vị thịt bò PEDIGREE Pouch Beef	70000	50	<h2><strong>Lợi ích chính</strong></h2><ul><li>Sản phẩm cũng được coi là thức ăn phụ bổ sung dinh dưỡng cho thú cưng</li><li>Cung cấp nguồn dinh dưỡng tối đa giúp cho thú cưng của bạn luôn khỏe mạnh</li><li>Đồng thời, kích thích sự ăn ngon. Mang lại cảm giác thèm ăn cho cún cưng. Phù hợp với cả những chú chó biếng ăn nhất</li><li>Tăng cường khả năng miễn dịch</li><li>Thúc đẩy phát triển răng</li><li>Nâng cao khả năng tiêu hóa</li><li>Thúc đẩy sự phát triển xương</li><li>Thúc đẩy da và lông chắc khỏe, mềm mượt hơn</li></ul><h2><strong>Thành phần dinh dưỡng</strong></h2><p>Pate cho chó nước sốt vị thịt bò PEDIGREE Pouch Beef gồm các thành phần như thịt gà, gan thịt bò, cà rốt, nước thịt, Gluten lúa mì, huyết tương thịt bò, chất xơ, đậu nành, Axit Amin, Vitamin, đường, chất tạo màu.</p><p>Sản phẩm cung cấp cho chú chó của bạn dinh dưỡng cần thiết. Được tuyển chọn từ những miếng thịt tươi ngon nhất cung cấp lượng Vitamin, khoáng chất và Axit béo cho sự phát triển của chú chó nhà bạn. Pate Pedigree vị thịt bò cho chó cưng được ninh hầm kĩ, để cho chú chó nhỏ của bạn cảm nhận được hương vị tốt nhất.</p>	600
23	10	[Best Selling] Pate cho chó vị bò gà nướng sốt cà rốt JERHIGH Chicken Beef Grilled Chunks Carrot In Gravy	50000	50	<h2><strong>Lợi ích chính</strong></h2><ul><li>Sản phẩm cũng được coi là thức ăn phụ bổ sung dinh dưỡng cho thú cưng</li><li>Cung cấp nguồn dinh dưỡng tối đa giúp cho thú cưng của bạn luôn khỏe mạnh</li><li>Đồng thời, kích thích sự ăn ngon. Mang lại cảm giác thèm ăn cho cún cưng. Phù hợp với cả những chú chó biếng ăn nhất</li><li>Tăng cường khả năng miễn dịch</li><li>Thúc đẩy phát triển răng</li><li>Nâng cao khả năng tiêu hóa</li><li>Thúc đẩy sự phát triển xương</li><li>Thúc đẩy da và lông chắc khỏe, mềm mượt hơn</li></ul><h2><strong>Thành phần dinh dưỡng</strong></h2><p>Pate cho chó nước sốt vị thịt bò PEDIGREE Pouch Beef gồm các thành phần như thịt gà, gan thịt bò, cà rốt, nước thịt, Gluten lúa mì, huyết tương thịt bò, chất xơ, đậu nành, Axit Amin, Vitamin, đường, chất tạo màu.</p><p>Sản phẩm cung cấp cho chú chó của bạn dinh dưỡng cần thiết. Được tuyển chọn từ những miếng thịt tươi ngon nhất cung cấp lượng Vitamin, khoáng chất và Axit béo cho sự phát triển của chú chó nhà bạn. Pate Pedigree vị thịt bò cho chó cưng được ninh hầm kĩ, để cho chú chó nhỏ của bạn cảm nhận được hương vị tốt nhất.</p>	800
1	8	NATURAL CORE - Thức Ăn Chay Dành Cho Chó Mọi Lứa Tuổi 1KG	350000	10	<p><strong>Hạt CHAY Natural Core cho chó</strong></p><p><br></p><p>Thức ăn hạt chay cho thú cưng NaturalCore&nbsp;duy trì vóc dáng cho thú cưng được chế biến từ các loại rau củ tươi và các nguyên liệu được chứng nhận hữu cơ ECOCERT: khoai lang hữu cơ, nhân sâm đỏ, yến mạch, gạo lứt, cà rốt, rau bina hữu cơ, các loại ngũ cốc hữu cơ… Với nhiều chất dinh dưỡng tốt cho sức khỏe, ECO10 có tác dụng nổi bật trong việc detox giải độc cơ thể, duy trì vóc dáng đẹp, bổ sung chất xơ và đạm thực vật chất lượng cao.</p><p><br></p><p><strong>✅ Công dụng</strong></p><p>Đào thải chất bẩn và độc tố tích tụ trong cơ thể</p><p>Công thức giúp cải thiện chế độ ăn uống không cân bằng do thói quen dùng quá nhiều thịt trước đó</p><p>Phòng ngừa và điều trị các bệnh do dị ứng với thịt hoặc bệnh béo phì gây ra</p><p>Giảm stress, giảm sự mệt mỏi cho đôi mắt của thú cưng</p><p>Hỗ trợ tiêu hóa, tối đa khả năng hấp thu dinh dưỡng</p><p>Giữ đẹp vóc dáng, đẹp da, đẹp lông.</p><p><br></p><p><strong>💠 HƯỚNG DẪN SỬ DỤNG</strong></p><p>- Cho ăn trực tiếp và tránh cho ăn quá nhiều mỗi ngày.</p><p>- Tránh xa tầm tay trẻ em.</p><p>- Chỉ sử dụng cho thú cưng.</p><p>- Lưu trữ ở nơi khô mát, tránh xa sức nóng và ánh sáng mặt trời trực tiếp.</p><p>- Zip túi lại sau mỗi lần cho ăn.</p>	150
2	8	NATURAL CORE SENSITIVE - Thức Ăn Dành Cho Chó Da Nhạy Cảm Vị Cá Hồi 1Kg, 2.4KG	350000	5	<h4><strong>Đặc điểm nổi bật</strong></h4><p>Thức ăn hữu cơ cho chó có dạ dày nhạy cảm Natural Core cá hồi được chế biến từ các loại thịt tươi và các nguyên liệu được chứng nhận hữu cơ ECOCERT: Cá hồi tươi, khoai lang hữu cơ, thịt vịt tươi, gạo lứt hữu cơ... Với nhiều chất dinh dưỡng tốt cho sức khỏe thú cưng, ECO6 có đặc biệt phù hợp với các chú chó có dạ dày nhạy cảm, không ăn được một số loại thức ăn khó tiêu hóa.</p><ul><li>Dành cho các giống chó thuộc mọi lứa tuổi, cân nặng</li><li>Thành phần: Cá hồi tươi, khoai lang hữu cơ, thịt vịt tươi, gạo lứt hữu cơ...</li><li>Dành cho các chú chó có dạ dày nhạy cảm, dị ứng thực phẩm, khó tiêu</li><li>Chứa Polyphenol - chất chống oxy hoá tự nhiên, phòng ngừa lão hóa</li><li>Đặc biệt tốt cho da và lông nhạy cảm</li><li>Hỗ trợ điều trị các bệnh tim mạch</li><li>Giảm thiểu mùi phân và mùi hôi cơ thể</li><li>Hỗ trợ tiêu hóa, tối đa hóa khả năng hấp thu</li></ul><p>&nbsp;</p><h4><strong>Đặc tính - Công dụng</strong></h4><p>Thành phần hữu cơ tốt cho sức khỏe, thích hợp với mọi giống chó, mọi lứa tuổi</p><p>Natural Core ECO6 – Thức ăn cho chó nhạy cảm với thành phần thịt cá hồi tươi ngon nguyên chất, chứa hàm lượng axit béo, Omega-3, protein, vitamin và khoáng chất phong phú, giúp phòng ngừa các bệnh tim mạch và bảo vệ mắt. Các thành phần hữu cơ khác nhau chứa nhiều chất xơ chất lượng cao không gây dị ứng.</p><p>Đặc biệt thích hợp với các chú chó bị dị ứng thực phẩm</p><p>Ngũ cốc hữu cơ nguyên hạt (lúa mạch, gạo lứt, yến mạch) cung cấp lượng chất xơ và chất khoáng phong phú cho chú chó, phòng ngừa táo bón và đào thải các chất độc ra khỏi cơ thể, làm giảm hàm lượng cholesterol trong máu một cách tuyệt vời. Do hoàn toàn không chứa lúa mì, ngô, đậu, gluten, GMO, thức ăn cho chó nhạy cảm Natural Core cá hồi rất tốt cho các chú chó có dạ dày nhạy cảm, dễ bị dị ứng với các thành phần khó tiêu.</p><p>Công nghệ đạm thủy phân, tối đa hóa khả năng hấp thu</p><p>Những nguyên liệu tươi sạch được chế biến theo phương pháp riêng lẻ, phù hợp với đặc trưng của từng loại, giúp giữ nguyên vẹn mùi vị ban đầu. Sử dụng thức ăn trong thời gian dài sẽ giúp làm giảm mùi cơ thể.</p><p>Tăng cường hệ miễn dịch, sức đề kháng, phòng ngừa lão hóa và bệnh tật</p><p>Thành phần Astaxanthin có trong thịt vịt và thịt cá hồi nguyên chất mang lại hiệu quả nổi bật trong việc phòng chống ung thư và ngăn ngừa lão hóa. Hồng sâm và carotene, thành phần toko phenol và lượng vitamin A, C, E lớn trong trái hắc mai biển mang lại hiệu quả tuyệt vời trong việc tăng cường khả năng miễn dịch, phòng bệnh béo phì và chống oxy hóa.</p><p>Tốt cho các chú chó có làn da nhạy cảm, dễ bị viêm da</p><p>Polyphenol tự nhiên chứa nhiều trong các nguyên liệu hữu cơ có tác dụng chống oxy hóa rất tốt cho da nhạy cảm. Rau bina hữu cơ chứa nhiều vitamin A và chất xơ có hiệu quả đáng kể trong việc ngăn chặn lão hóa da. Các loại ngũ cốc hữu cơ nguyên cám giúp giữ gìn làn da khỏe mạnh.</p>	320
3	8	NATURAL CORE - Thức Ăn Dành Cho Chó Con Vị Cừu 1Kg, 2.4KG	380000	10	<h4><strong>Đặc điểm nổi bật</strong></h4><p>Thức ăn hữu cơ cho chó con Natural Core thịt cừu được chế biến từ các loại thịt tươi và các nguyên liệu được chứng nhận hữu cơ ECOCERT: thịt cừu Úc và thịt nạc gà hữu cơ, khoai lang hữu cơ và ngũ cốc. Với nhiều chất dinh dưỡng tốt cho sức khỏe thú cưng, ECO5a có tác dụng nổi bật trong việc hỗ trợ sự phát triển của chó con.</p><ul><li>Dành cho chó con dưới 1&nbsp;tuổi, chó mẹ đang mang thai và cho con bú</li><li>Thành phần: thịt cừu Úc và thịt nạc gà hữu cơ, khoai lang hữu cơ và ngũ cốc</li><li>Không chứa thành phần gây dị ứng cho chó con như bắp, đậu nành, lúa mì</li><li>Tốt cho việc hình thành xương và giúp tăng cường chức năng đường ruột</li><li>Ngăn ngừa tình trạng dị ứng thức ăn ngay từ khi còn nhỏ</li><li>Tăng cường chức năng đường ruột và nâng cao hệ miễn dịch</li><li>Cung cấp protein chất lượng cao cho cún con tăng trưởng và phát triển</li><li>Cho cún con một làn da khỏe mạnh và bộ lông óng mượt</li></ul><p><br></p><h4><strong>Đặc tính - Công dụng</strong></h4><p>Thành phần hữu cơ tốt cho sức khỏe, đặc biệt phù hợp với chó con và chó mẹ</p><p>Natural Core Eco5 – Thức ăn cho chó con chế biến từ thịt nạc cừu Úc và thịt nạc gà hữu cơ, cung cấp nguồn đạm chất lượng cao, tốt cho việc hình thành hệ xương và sự tăng trưởng của chó con. Ngũ cốc nguyên hạt không loại bỏ vỏ cám cung cấp chất xơ và nhiều khoáng chất cần thiết cho cơ thể.&nbsp;</p><p>Ngăn ngừa tình trạng dị ứng thức ăn thường gặp ở cún con</p><p>Thức ăn cho chó con thịt cừu không chứa lúa mì/ ngô/ đậu/ gluten/ GMO là các thành phần có thể gây dị ứng thức ăn cho cún. Bởi vậy, sản phẩm giúp phòng tránh tình trạng dị ứng thức ăn ở các chú chó con có dạ dày nhạy cảm.</p><p>Công nghệ đạm thủy phân, tối đa hóa khả năng hấp thu</p><p>Những nguyên liệu của sản phẩm được chế biến theo phương pháp riêng lẻ, phù hợp với đặc trưng riêng của từng nguyên liệu, thích hợp với chó con có hệ tiêu hóa non yếu.</p><p>Tăng cường hệ miễn dịch, sức đề kháng, cho hệ tiêu hóa khỏe mạnh</p><p>Các thành phần hữu cơ chứa nhiều polyphenol tự nhiên giúp tăng cường chức năng đường ruột và nâng cao hệ miễn dịch. Thành phần Saponin giúp tăng cường hệ miễn dịch. Vi khuẩn có lợi trong ruột là Prebiotics và Probiotics có vai trò duy trì hệ tiêu hóa khỏe mạnh cho cún con.</p><p>Cho cún cưng làn da khỏe mạnh và bộ lông óng mượt</p><p>Thịt cừu là loại thịt đỏ có chứa lượng calo cao và mỡ thấp, giàu protein cần thiết và các chất béo không bão hòa giúp duy trì làn da khỏe mạnh. Khoai lang hữu cơ chứa nhiều beta- carotene, có hiệu quả tuyệt vời trong việc ngăn ngừa ung thư và lão hóa da. Yến mạch nguyên cám ngừa viêm da, gạo lứt nguyên hạt giúp giữ gìn làn da khỏe mạnh.</p>	150
25	10	[Best Selling] Pate Cho Chó Pate Monge Vị Gà Tây 100g (Nhập Khẩu Ý)	80000	60	<p><strong className="ql-size-large">Pate Cho Chó Pate Monge Vị Gà Tây 100g (Nhập Khẩu Ý)</strong></p><ul><li>Thương hiệu:&nbsp;<strong>Monge</strong></li><li>Phù hợp cho: Chó mọi lứa tuổi (Đặc biệt là Chó mẹ mang thai và đang cho con bú, Chó đang bệnh hoặc sau phẫu thuật và đang trong giai đoạn phục hồi sức khỏe)</li><li>Một trong những lựa chọn phổ biến nhất khi nghĩ đến&nbsp;đồ ăn chó&nbsp;là&nbsp;Pate hộp. Nếu bạn đang tìm kiếm một loại&nbsp;pate cho chó&nbsp;chất lượng thì không thể bỏ qua Pate Monge, một thương hiệu đến từ Ý. Với hương vị thơm ngon từ những loại thịt như gà, gà tây và cá ngừ, đây là dòng pate được ưa chuộng tại nhiều nước Châu Âu.&nbsp;Pate chó&nbsp;của Monge an toàn và đạt chất lượng cao vì không chứa gluten hay các chất gây dị ứng cho cả động vật và con người. Thành phần chính từ thịt thơm ngon, Pate Monge giúp kích thích khả năng ăn uống của chó, nuôi dưỡng lông và da, hạn chế các tác động tiêu cực đến sức khỏe của chúng.</li></ul><p><strong className="ql-size-large">Lợi ích:</strong></p><p><br></p><ul><li>Kích thích vị giác, giúp chó thèm ăn và ăn ngon miệng hơn, nhanh chóng tăng cân.</li><li>Có tới nhiều mùi vị khác nhau, giúp chó đổi khẩu vị ăn hàng ngày.</li><li>Dễ tiêu hóa, giúp cơ thể chó luôn trong tình trạng khỏe mạnh.</li><li>Giúp lông bóng đẹp và da dẻ hồng hào .</li><li>Không gây dị ứng, không màu thực phẩm và không chất bảo quản.</li><li>Ngoài ra, Monge tập trung đưa ra những sản phẩm không chứa đường, gluten giúp hạn chế các ảnh hưởng tiêu cực đến sức khoẻ của chó như dị ứng, mẩn ngứa, khó tiêu, bệnh tiểu đường</li></ul><p><strong className="ql-size-large">Thành phần dinh dưỡng</strong></p><p><br></p><ul><li>Thịt và sản phẩm từ thịt (thường là thịt gà, bò hoặc cá), cung cấp protein và các chất dinh dưỡng cần thiết cho chó.</li><li>Rau quả và ngũ cốc, cung cấp chất xơ và các loại vitamin và khoáng chất, giúp duy trì sức khỏe và hỗ trợ hệ tiêu hóa của chó.</li><li>Dầu cá, dầu thực vật và/hoặc chất béo động vật, cung cấp năng lượng và giúp hấp thụ các vitamin hòa tan trong chất béo.</li><li>Các chất bổ sung dinh dưỡng như vitamin và khoáng chất, giúp cân bằng dinh dưỡng và hỗ trợ hệ miễn dịch của chó.</li></ul><p>*Tùy thuộc vào loại sản phẩm và hương vị, Pate Monge Cho Chó có thể có các thành phần bổ sung khác như tảo biển, trứng, tảo xoắn, và các loại thảo mộc để cung cấp thêm dinh dưỡng và hương vị.</p><p><br></p><p><strong className="ql-size-large">Hướng dẫn sử dụng</strong></p><ul><li>Có thể cho chó ăn Pate Monge Cho Chó trực tiếp hoặc trộn với hạt khô theo tỉ lệ 1/3. Nếu chó của bạn có cân nặng 10kg, thức ăn cần cho mỗi ngày là khoảng 500gr, trong đó khoảng 340g hạt khô và 160g Pate.</li></ul><p><br></p><p>#patemonge #patechocho #patechochocon #patehop #patecho #doancho #doanchocho #patechochopoodle</p>	300
24	10	[Best Selling] Pate Cho Chó Pate Monge Vị Heo 100g (Nhập Khẩu Ý)	80000	60	<p><strong className="ql-size-large">Pate Cho Chó Pate Monge Vị Heo 100g (Nhập Khẩu Ý)</strong></p><ul><li>Thương hiệu:&nbsp;<strong>Monge</strong></li><li>Phù hợp cho: Chó mọi lứa tuổi (Đặc biệt là Chó mẹ mang thai và đang cho con bú, Chó đang bệnh hoặc sau phẫu thuật và đang trong giai đoạn phục hồi sức khỏe)</li><li>Một trong những lựa chọn phổ biến nhất khi nghĩ đến&nbsp;đồ ăn chó&nbsp;là&nbsp;Pate hộp. Nếu bạn đang tìm kiếm một loại&nbsp;pate cho chó&nbsp;chất lượng thì không thể bỏ qua Pate Monge, một thương hiệu đến từ Ý. Với hương vị thơm ngon từ những loại thịt như gà, gà tây và cá ngừ, đây là dòng pate được ưa chuộng tại nhiều nước Châu Âu.&nbsp;Pate chó&nbsp;của Monge an toàn và đạt chất lượng cao vì không chứa gluten hay các chất gây dị ứng cho cả động vật và con người. Thành phần chính từ thịt thơm ngon, Pate Monge giúp kích thích khả năng ăn uống của chó, nuôi dưỡng lông và da, hạn chế các tác động tiêu cực đến sức khỏe của chúng.</li></ul><p><strong className="ql-size-large">Lợi ích:</strong></p><p><br></p><ul><li>Kích thích vị giác, giúp chó thèm ăn và ăn ngon miệng hơn, nhanh chóng tăng cân.</li><li>Có tới nhiều mùi vị khác nhau, giúp chó đổi khẩu vị ăn hàng ngày.</li><li>Dễ tiêu hóa, giúp cơ thể chó luôn trong tình trạng khỏe mạnh.</li><li>Giúp lông bóng đẹp và da dẻ hồng hào .</li><li>Không gây dị ứng, không màu thực phẩm và không chất bảo quản.</li><li>Ngoài ra, Monge tập trung đưa ra những sản phẩm không chứa đường, gluten giúp hạn chế các ảnh hưởng tiêu cực đến sức khoẻ của chó như dị ứng, mẩn ngứa, khó tiêu, bệnh tiểu đường</li></ul><p><strong className="ql-size-large">Thành phần dinh dưỡng</strong></p><p><br></p><ul><li>Thịt và sản phẩm từ thịt (thường là thịt gà, bò hoặc cá), cung cấp protein và các chất dinh dưỡng cần thiết cho chó.</li><li>Rau quả và ngũ cốc, cung cấp chất xơ và các loại vitamin và khoáng chất, giúp duy trì sức khỏe và hỗ trợ hệ tiêu hóa của chó.</li><li>Dầu cá, dầu thực vật và/hoặc chất béo động vật, cung cấp năng lượng và giúp hấp thụ các vitamin hòa tan trong chất béo.</li><li>Các chất bổ sung dinh dưỡng như vitamin và khoáng chất, giúp cân bằng dinh dưỡng và hỗ trợ hệ miễn dịch của chó.</li></ul><p>*Tùy thuộc vào loại sản phẩm và hương vị, Pate Monge Cho Chó có thể có các thành phần bổ sung khác như tảo biển, trứng, tảo xoắn, và các loại thảo mộc để cung cấp thêm dinh dưỡng và hương vị.</p><p><br></p><p><strong className="ql-size-large">Hướng dẫn sử dụng</strong></p><ul><li>Có thể cho chó ăn Pate Monge Cho Chó trực tiếp hoặc trộn với hạt khô theo tỉ lệ 1/3. Nếu chó của bạn có cân nặng 10kg, thức ăn cần cho mỗi ngày là khoảng 500gr, trong đó khoảng 340g hạt khô và 160g Pate.</li></ul><p><br></p><p>#patemonge #patechocho #patechochocon #patehop #patecho #doancho #doanchocho #patechochopoodle</p>	300
26	10	[Best Selling] Pate Cho Chó Pate Monge Vị Gà & Rau 100g (Nhập Khẩu Ý)	80000	60	<p><strong className="ql-size-large">Pate Cho Chó Pate Monge Vị Gà &amp; Rau 100g (Nhập Khẩu Ý)</strong></p><ul><li>Thương hiệu:&nbsp;<strong>Monge</strong></li><li>Phù hợp cho: Chó mọi lứa tuổi (Đặc biệt là Chó mẹ mang thai và đang cho con bú, Chó đang bệnh hoặc sau phẫu thuật và đang trong giai đoạn phục hồi sức khỏe)</li><li>Một trong những lựa chọn phổ biến nhất khi nghĩ đến&nbsp;đồ ăn chó&nbsp;là&nbsp;Pate hộp. Nếu bạn đang tìm kiếm một loại&nbsp;pate cho chó&nbsp;chất lượng thì không thể bỏ qua Pate Monge, một thương hiệu đến từ Ý. Với hương vị thơm ngon từ những loại thịt như gà, gà tây và cá ngừ, đây là dòng pate được ưa chuộng tại nhiều nước Châu Âu.&nbsp;Pate chó&nbsp;của Monge an toàn và đạt chất lượng cao vì không chứa gluten hay các chất gây dị ứng cho cả động vật và con người. Thành phần chính từ thịt thơm ngon, Pate Monge giúp kích thích khả năng ăn uống của chó, nuôi dưỡng lông và da, hạn chế các tác động tiêu cực đến sức khỏe của chúng.</li></ul><p><strong className="ql-size-large">Lợi ích:</strong></p><p><br></p><ul><li>Kích thích vị giác, giúp chó thèm ăn và ăn ngon miệng hơn, nhanh chóng tăng cân.</li><li>Có tới nhiều mùi vị khác nhau, giúp chó đổi khẩu vị ăn hàng ngày.</li><li>Dễ tiêu hóa, giúp cơ thể chó luôn trong tình trạng khỏe mạnh.</li><li>Giúp lông bóng đẹp và da dẻ hồng hào .</li><li>Không gây dị ứng, không màu thực phẩm và không chất bảo quản.</li><li>Ngoài ra, Monge tập trung đưa ra những sản phẩm không chứa đường, gluten giúp hạn chế các ảnh hưởng tiêu cực đến sức khoẻ của chó như dị ứng, mẩn ngứa, khó tiêu, bệnh tiểu đường</li></ul><p><strong className="ql-size-large">Thành phần dinh dưỡng</strong></p><p><br></p><ul><li>Thịt và sản phẩm từ thịt (thường là thịt gà, bò hoặc cá), cung cấp protein và các chất dinh dưỡng cần thiết cho chó.</li><li>Rau quả và ngũ cốc, cung cấp chất xơ và các loại vitamin và khoáng chất, giúp duy trì sức khỏe và hỗ trợ hệ tiêu hóa của chó.</li><li>Dầu cá, dầu thực vật và/hoặc chất béo động vật, cung cấp năng lượng và giúp hấp thụ các vitamin hòa tan trong chất béo.</li><li>Các chất bổ sung dinh dưỡng như vitamin và khoáng chất, giúp cân bằng dinh dưỡng và hỗ trợ hệ miễn dịch của chó.</li></ul><p>*Tùy thuộc vào loại sản phẩm và hương vị, Pate Monge Cho Chó có thể có các thành phần bổ sung khác như tảo biển, trứng, tảo xoắn, và các loại thảo mộc để cung cấp thêm dinh dưỡng và hương vị.</p><p><br></p><p><strong className="ql-size-large">Hướng dẫn sử dụng</strong></p><ul><li>Có thể cho chó ăn Pate Monge Cho Chó trực tiếp hoặc trộn với hạt khô theo tỉ lệ 1/3. Nếu chó của bạn có cân nặng 10kg, thức ăn cần cho mỗi ngày là khoảng 500gr, trong đó khoảng 340g hạt khô và 160g Pate.</li></ul><p><br></p><p>#patemonge #patechocho #patechochocon #patehop #patecho #doancho #doanchocho #patechochopoodle</p>	300
27	10	[Best Selling] Pate Cho Chó Pate Monge Vị Cá Hồi 100g (Nhập Khẩu Ý)	80000	60	<p><strong className="ql-size-large">Pate Cho Chó Pate Monge Vị Cá Hồi 100g (Nhập Khẩu Ý)</strong></p><ul><li>Thương hiệu:&nbsp;<strong>Monge</strong></li><li>Phù hợp cho: Chó mọi lứa tuổi (Đặc biệt là Chó mẹ mang thai và đang cho con bú, Chó đang bệnh hoặc sau phẫu thuật và đang trong giai đoạn phục hồi sức khỏe)</li><li>Một trong những lựa chọn phổ biến nhất khi nghĩ đến&nbsp;đồ ăn chó&nbsp;là&nbsp;Pate hộp. Nếu bạn đang tìm kiếm một loại&nbsp;pate cho chó&nbsp;chất lượng thì không thể bỏ qua Pate Monge, một thương hiệu đến từ Ý. Với hương vị thơm ngon từ những loại thịt như gà, gà tây và cá ngừ, đây là dòng pate được ưa chuộng tại nhiều nước Châu Âu.&nbsp;Pate chó&nbsp;của Monge an toàn và đạt chất lượng cao vì không chứa gluten hay các chất gây dị ứng cho cả động vật và con người. Thành phần chính từ thịt thơm ngon, Pate Monge giúp kích thích khả năng ăn uống của chó, nuôi dưỡng lông và da, hạn chế các tác động tiêu cực đến sức khỏe của chúng.</li></ul><p><strong className="ql-size-large">Lợi ích:</strong></p><p><br></p><ul><li>Kích thích vị giác, giúp chó thèm ăn và ăn ngon miệng hơn, nhanh chóng tăng cân.</li><li>Có tới nhiều mùi vị khác nhau, giúp chó đổi khẩu vị ăn hàng ngày.</li><li>Dễ tiêu hóa, giúp cơ thể chó luôn trong tình trạng khỏe mạnh.</li><li>Giúp lông bóng đẹp và da dẻ hồng hào .</li><li>Không gây dị ứng, không màu thực phẩm và không chất bảo quản.</li><li>Ngoài ra, Monge tập trung đưa ra những sản phẩm không chứa đường, gluten giúp hạn chế các ảnh hưởng tiêu cực đến sức khoẻ của chó như dị ứng, mẩn ngứa, khó tiêu, bệnh tiểu đường</li></ul><p><strong className="ql-size-large">Thành phần dinh dưỡng</strong></p><p><br></p><ul><li>Thịt và sản phẩm từ thịt (thường là thịt gà, bò hoặc cá), cung cấp protein và các chất dinh dưỡng cần thiết cho chó.</li><li>Rau quả và ngũ cốc, cung cấp chất xơ và các loại vitamin và khoáng chất, giúp duy trì sức khỏe và hỗ trợ hệ tiêu hóa của chó.</li><li>Dầu cá, dầu thực vật và/hoặc chất béo động vật, cung cấp năng lượng và giúp hấp thụ các vitamin hòa tan trong chất béo.</li><li>Các chất bổ sung dinh dưỡng như vitamin và khoáng chất, giúp cân bằng dinh dưỡng và hỗ trợ hệ miễn dịch của chó.</li></ul><p>*Tùy thuộc vào loại sản phẩm và hương vị, Pate Monge Cho Chó có thể có các thành phần bổ sung khác như tảo biển, trứng, tảo xoắn, và các loại thảo mộc để cung cấp thêm dinh dưỡng và hương vị.</p><p><br></p><p><strong className="ql-size-large">Hướng dẫn sử dụng</strong></p><ul><li>Có thể cho chó ăn Pate Monge Cho Chó trực tiếp hoặc trộn với hạt khô theo tỉ lệ 1/3. Nếu chó của bạn có cân nặng 10kg, thức ăn cần cho mỗi ngày là khoảng 500gr, trong đó khoảng 340g hạt khô và 160g Pate.</li></ul><p><br></p><p>#patemonge #patechocho #patechochocon #patehop #patecho #doancho #doanchocho #patechochopoodle</p>	300
\.


--
-- TOC entry 3385 (class 0 OID 35951)
-- Dependencies: 212
-- Data for Name: rootcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rootcategories (id, name, priority) FROM stdin;
4	Khuyến mãi	4
5	Giới thiệu	5
6	Liên hệ	6
2	Shop cho chó	0
1	Shop cho mèo	1
3	Dịch vụ	2
\.


--
-- TOC entry 3387 (class 0 OID 35958)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "firstName", "lastName", address, phonenumber, gender, "roleId", "createdAt", "updatedAt") FROM stdin;
2	thi.tran2@example.com	$2a$04$FFbVUJ8UFXO6tvEm5E2J2ew7YoAP1FJp5yB7ckYt6PlcF.WffzNGu	Thị	Trần	0 Sugar Parkway	199 403 5952	0	0	\N	\N
3	hoa.pham3@example.com	$2a$04$zIIVYxGYdNbRBA8gP7D8L.lMJ8fn12pbAb0JG898o7f//RJordOkq	Hoa	Phạm	9414 Sunfield Crossing	430 865 3893	1	0	\N	\N
4	linh.tran4@example.com	$2a$04$75Uwq430NL3WQPUJS1HV7.Kwnxky.sAraZ1HuqHSgFOyAziYmN6ui	Linh	Trần	1 Main Court	389 235 3542	0	0	\N	\N
5	thu.le5@example.com	$2a$04$/S/H.Cabz2HcoYgnsCv8/et/qk1pRV.E8CpWi2/lRZbNJF1fDZLpO	Thu	Lê	7 Acker Court	994 123 4494	1	0	\N	\N
6	tuan.nguyen6@example.com	$2a$04$Fv.PSE7xJx9FXuov5FtMhem43I9zMnff56AN0a7gMOaTH06lm0vzm	Tuấn	Nguyễn	98455 Marcy Street	386 968 5639	1	0	\N	\N
7	thao.huynh7@example.com	$2a$04$UhRVRUtmwXTmmTqn5ExSRusr94fKXp8pq.1x8sVwIY8/HBZINQNZ.	Thảo	Huỳnh	73 Ryan Point	177 467 7439	0	0	\N	\N
8	tuan.tran8@example.com	$2a$04$z.XgJJRC7MdDla6F9bRBWOIYLQ4UKwEp2s.mKVw1615j1w1uS/v7a	Tuấn	Trần	35 Canary Trail	283 669 3990	0	0	\N	\N
9	anh.nguyen9@example.com	$2a$04$BLBPbC17/24ytYtoXaMoeu.XFTbdVbY46yH2IMs1/3DP7T6Tmfc.e	Anh	Nguyễn	28088 Dovetail Plaza	411 339 7336	1	0	\N	\N
10	linh.nguyen10@example.com	$2a$04$xMU2Y2seKaqORcZsllF0ROmzJZoQkbh0nBXgg.88GgFLKDVGFNkZS	Linh	Nguyễn	3 Mallard Center	598 970 5990	0	0	\N	\N
11	thu.nguyen11@example.com	$2a$04$tOcR48u0sqHFnbJlpWO6aeQf7DyoYnjWmdQwVSYlh3/hvW6qXJS82	Thu	Nguyễn	73771 Schurz Avenue	102 699 3745	0	0	\N	\N
12	hanh.le12@example.com	$2a$04$z/TQM8XdepZ2.UtzkccFTeqLuP9OMy1.iTvK82uXdS7bnTR8PqzKe	Hạnh	Lê	6017 Ridge Oak Pass	938 161 3680	0	0	\N	\N
13	phuong.le13@example.com	$2a$04$gPwUXpLfDlAdr/iO.bkLNeuhR/Z1AdR1ei/p0Gn8gFtCPutqT98xq	Phương	Lê	81 Shelley Point	626 828 7160	0	0	\N	\N
14	tien.le14@example.com	$2a$04$aM2v4uQp4El7uqe9cDwl2O/L9otG1VlmIG1L8Mms1OQIVNN0P3/nO	Tiến	Lê	6924 Melvin Road	920 633 5165	0	0	\N	\N
15	nam.phan15@example.com	$2a$04$KscSP3RGLDE7lxejeMjuFeKpDe3LkoPHKZhws/uUxMV3NnLLdDxSK	Nam	Phan	66659 Schurz Plaza	635 240 4812	0	0	\N	\N
16	thanh.nguyen16@example.com	$2a$04$bkGl7.5.pX953DliC5Bxcets06nTaJgLreQ/8M5obT5Akk290y7gO	Thanh	Nguyễn	56277 Thierer Junction	547 840 8383	1	0	\N	\N
17	tuan.nguyen17@example.com	$2a$04$xwNRLC9d6HO2kyX3Tn59suOiRyuCx8p6h19bYgGWlIyRhXtpoEzAK	Tuấn	Nguyễn	3 Holmberg Crossing	238 984 2980	1	0	\N	\N
18	trang.nguyen18@example.com	$2a$04$SFaFUtfyRGL6xvA9iAtKse9Bm.iwWs4HRrzIAnz5oW6MqJZFwA3A6	Trang	Nguyễn	1602 Stang Road	994 830 7612	1	0	\N	\N
19	tam.nguyen19@example.com	$2a$04$xpvclXyjt3ET51FkQ7qu1u5LSadZSHh7Vje4u1vyi.bmnDaE6G.Ka	Tâm	Nguyễn	43199 Sauthoff Pass	746 527 0299	1	0	\N	\N
20	truc.tran20@example.com	$2a$04$3siOkSYuUEphzbE/frlOE.BP4fqRVgqr9vz7g5JaNhYlfeYMKDqX6	Trúc	Trần	45397 Hollow Ridge Crossing	429 679 5507	1	0	\N	\N
21	thuy.tran21@example.com	$2a$04$tT5PWB/e.qRiEQ902HVc7ee1J7qZe8S.MzOV7BFnrdEjOxO0fbHT.	Thúy	Trần	56 Dawn Point	504 599 2235	0	0	\N	\N
22	toan.le22@example.com	$2a$04$dUOlxtnwhu/NUMZRqQFeseWknDX1z5yTJ71JBGrDVz2lalZmS4zzy	Toàn	Lê	33326 Monica Center	626 149 0850	0	0	\N	\N
23	minh.phan23@example.com	$2a$04$J4K9v4KiLT7B04xzzL332uIXnv.nDMyJfmHtjE45ztXDgEKFy6BDq	Minh	Phan	24 Mayer Parkway	628 472 1974	0	0	\N	\N
24	huy.dang24@example.com	$2a$04$lpcx9gz4Njq8/568Efzx..wnQaA.kAaLhJOhaS3KtkCHdVRZjIsOC	Huy	Đặng	2287 Butternut Avenue	894 283 6108	0	0	\N	\N
25	thao.do25@example.com	$2a$04$4nlQSCHvtEJl/DW5./O0we/W.eWpgXIpNuXrLnkYb5n6JNhCmr8RO	Thảo	Đỗ	6332 Shasta Road	429 940 1841	1	0	\N	\N
26	mai.nguyen26@example.com	$2a$04$NRnFEmBJIKPRhG6AK01pY.ECEfuezXBmaWk3VWbJpE7f2sQM2RR5m	Mai	Nguyễn	09551 Graedel Street	311 353 3243	1	0	\N	\N
27	lan.phan27@example.com	$2a$04$So1PkUPtjWZgtYLmZqZVYOOiN7TZHu4KufrqyZs..4s26tkZkLQiq	Lan	Phan	50 Clove Crossing	533 471 1822	1	0	\N	\N
28	hoa.le28@example.com	$2a$04$0JFwB67FbC.Sg5HYWQdw1OF.3x3mAwJ/kUTkg16x5HsKpETBgW9Pi	Hòa	Lê	51 Anderson Point	890 258 6844	0	0	\N	\N
29	thao.phan29@example.com	$2a$04$7lTWd	Thảo	Phan	9035 Judy Plaza	985 708 3466	0	0	\N	\N
30	tien.le30@example.com	$2a$04$NChs3.g26v0lm4dRfqfH6.bRPyJ6dhwvzrgl8/05sgWfb5xu7pT4K	Tiến	Lê	27958 Warner Avenue	934 387 6188	0	0	\N	\N
31	quynh.tran31@example.com	$2a$04$6Ia0TvqZMzN00ZylyejNRuZJ4nRmk09RlDQ8Efz9V1nvymGW3GBRq	Quỳnh	Trần	48 Lakeland Point	840 600 4944	0	0	\N	\N
32	hoang.nguyen32@example.com	$2a$04$FTE15DZ4/XaF3aBY4/xEE.Gg91pRS5hRbUgXX2xf5XQn9iGmMrLlK	Hoàng	Nguyễn	11 Badeau Junction	300 321 2319	0	0	\N	\N
33	ngoc.nguyen33@example.com	$2a$04$SQ0aFg0GJVUCmXdIjcbf8OMVGVn6wDWMMQzwsjHAd8Fw3.1wehXva	Ngọc	Nguyễn	73 Bay Crossing	522 439 9997	1	0	\N	\N
34	tuan.pham34@example.com	$2a$04$ZVJY4fQylVZATocI/zyMMufgA6Ag/7vVEQG1OC1p/5XGKDcC7inLG	Tuấn	Phạm	82 Annamark Street	307 654 3778	1	0	\N	\N
35	anh.do35@example.com	$2a$04$pp.e1gdylj/6G1glzU4U4OKF2FW1ez/S95K9lKkoEY4CRuWIk6bqG	Anh	Đỗ	608 Burning Wood Hill	593 189 8246	1	0	\N	\N
36	huy.le36@example.com	$2a$04$B3CGO0ktiE6tGwzLsPkqyeze66jQtZghQkL.BmJy4Pn.hhsJlT1Hy	Huy	Lê	153 Bluejay Junction	848 290 6369	0	0	\N	\N
37	nhan.do37@example.com	$2a$04$15t4S4qE7oh/MvROIZM6lOcM6lClYxWnFEmtNlmNWrSP2YNoFRkXe	Nhàn	Đỗ	1 International Plaza	417 317 7557	0	0	\N	\N
38	linh.phan38@example.com	$2a$04$5iwtmoj6Xjy9j/wtXgPqCuMdwTCAe4QjgGsW.d6c/W7bfYtUwLSHe	Linh	Phan	3 Kropf Plaza	682 838 8059	0	0	\N	\N
39	nghia.do39@example.com	$2a$04$98jOuRiCUup.W1cWny3..u4NlvwMH3nvP4n6lQ.Ep8N9gDSgqy.fO	Nghĩa	Đỗ	8 Mcguire Way	867 491 4562	0	0	\N	\N
40	tu.nguyen40@example.com	$2a$04$GHylpltpNKu10kVoyJB.Ze5B9pvmtXUZq8aV8YhLQcqg/MPN6kR/2	Tú	Nguyễn	5 Morningstar Court	911 329 8471	0	0	\N	\N
41	thanh.le41@example.com	$2a$04$3y8tYpFz2n/nloWzKg6Sz.f3Kn9bXzYGGYToTIlFsxksudBqlHv8u	Thanh	Lê	1538 Crest Line Center	328 195 7621	0	0	\N	\N
42	tien.nguyen42@example.com	$2a$04$9doAft9a0ue0Wz3./6zjz.KzHjsuqJhMSSl.B0zKz16DZnec9kCXC	Tiến	Nguyễn	8 Glendale Crossing	669 518 9498	0	0	\N	\N
43	hieu.le43@example.com	$2a$04$V1vTrcXIKO5vlb4TpNkKNuQRRRISQHk2X2MAiPP0ZzO/v3avYlt8.	Hiếu	Lê	04361 Lerdahl Road	123 456 7890	0	0	\N	\N
44	nhan.phan44@example.com	$2a$04$l3sfLO1/FAEQ6/2dwzOPhezrhz9ZMng1TZ3.H4egqw05Nr5bFDN0S	Nhân	Phan	22536 American Terrace	456 789 0123	0	0	\N	\N
45	tuyen.pham45@example.com	$2a$04$75Uwq430NL3WQPUJS1HV7.Kwnxky.sAraZ1HuqHSgFOyAziYmN6ui	Tuyền	Phạm	7113 Gerald Alley	789 012 3456	0	0	\N	\N
46	tung.le46@example.com	$2a$04$9T4FmTxdIm/50ogQOxtWl.3tD3gegVz7C7G2JUs1e13g7YbLO.MWe	Tùng	Lê	787 Moulton Point	012 345 6789	0	0	\N	\N
47	truong.phan47@example.com	$2a$04$EYiE2rY6SPyWh8aNHpQfgujdRqDCHmDV3h4lJ59/tOsBPTjoXfUy6	Trường	Phan	29 Hanover Pass	345 678 9012	0	0	\N	\N
48	huy.tran48@example.com	$2a$04$6llsnB/4STnoe/xApy8Dl.W7jsFe.FX6oswjev0Jmy3t0X3zOjjxi	Huy	Trần	773 Ramsey Parkway	678 901 2345	0	0	\N	\N
49	thu.le49@example.com	$2a$04$jGUdcm77zG3Iz1QXTArR7.G/xwjS13POohXTC3zBENAKfnyNvFWN6	Thu	Lê	3424 Dixon Center	901 234 5678	0	0	\N	\N
50	thanh.le50@example.com	$2a$04$gqy7ZvR77bBEGO3bfT/ltugz2p9KZwmw4I4ytB0UMzSOZ7zY7w2Dq	Thanh	Lê	7980 Loftsgordon Court	234 567 8901	0	0	\N	\N
51	thao.tran51@example.com	$2a$04$4Zq2bE.pF.GDfAy5Dq2c5u6tTpAkvRk2g4A2S4aZuAV.LP8aD6JZu	Thảo	Trần	49 Caliangt Drive	567 890 1234	0	0	\N	\N
53	nhan.nguyen53@example.com	$2a$04$bj7jKVf9uobikqq4FXajt.NCB9D5yKucgLKuViMTvwmc78IRxvLe.	Nhân	Nguyễn	5 Eastwood Street	123 456 7890	0	0	\N	\N
52	phuong.tran52@example.com	$2a$04$UjA0ebXdSsWW8UIUJHyHe.mt6uK6p1mG7iD5gkIwS9hSJlA7pzLPK	Phương	Trần	0062 Kipling Pass	6767676767	0	0	\N	\N
1	hong.nguyen1@example.com	$2a$04$guH.dfSpYgEpKMVDUYLYhOxjU1JZkqwm5jWcyAu.ljchEWMV/PIUy	Hồng	Nguyễn	142 Washington Center	343 106 5548	0	0	\N	\N
54	truongqui@admin	$2a$10$4HWzO0wzb3m589.r1wnbteAVZIlSMlKV1GRKbLFpfHbQYyWtAsoc.	Qui	Truong	328/6	364998896	0	1	2024-03-23 05:01:40.248024+07	2024-03-23 05:01:40.248024+07
55	xuanquynh@mail	$2a$10$iMvkasXOcxqkjGh7/GlZzeV.fN8Sm512klKhe0dO3yFGPIqZq49jO	Quynh	Xuan	328/6	364998896	1	0	2024-03-23 05:23:06.749533+07	2024-03-23 05:23:06.749533+07
\.


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 219
-- Name: childcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.childcategories_id_seq', 2, true);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 223
-- Name: details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.details_id_seq', 1, false);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 225
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 120, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 215
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 30, true);


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 211
-- Name: rootcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rootcategories_id_seq', 1, true);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 61, true);


--
-- TOC entry 3220 (class 2606 OID 35949)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3228 (class 2606 OID 36013)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 36025)
-- Name: childcategories childcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.childcategories
    ADD CONSTRAINT childcategories_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 36069)
-- Name: details details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 36088)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 35974)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 36056)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 35956)
-- Name: rootcategories rootcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rootcategories
    ADD CONSTRAINT rootcategories_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 35965)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 36014)
-- Name: categories categories_rootcategory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_rootcategory_id_fkey FOREIGN KEY (rootcategory_id) REFERENCES public.rootcategories(id);


--
-- TOC entry 3239 (class 2606 OID 36026)
-- Name: childcategories childcategories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.childcategories
    ADD CONSTRAINT childcategories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id);


--
-- TOC entry 3242 (class 2606 OID 36075)
-- Name: details details_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3241 (class 2606 OID 36070)
-- Name: details details_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 36089)
-- Name: images images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 3237 (class 2606 OID 35975)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3240 (class 2606 OID 36057)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.childcategories(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-04-08 23:11:36

--
-- PostgreSQL database dump complete
--

