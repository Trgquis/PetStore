PGDMP                         |            petstore    14.8    14.8 H    J           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            K           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            L           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            M           1262    35944    petstore    DATABASE     l   CREATE DATABASE petstore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE petstore;
                postgres    false                        3079    36097    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false            N           0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    2            �            1259    35945    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    36008 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    rootcategory_id integer NOT NULL,
    priority smallint NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    36007    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    218            O           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    217            �            1259    36020    childcategories    TABLE     �   CREATE TABLE public.childcategories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    parent_id integer NOT NULL,
    priority smallint NOT NULL
);
 #   DROP TABLE public.childcategories;
       public         heap    postgres    false            �            1259    36019    childcategories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.childcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.childcategories_id_seq;
       public          postgres    false    220            P           0    0    childcategories_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.childcategories_id_seq OWNED BY public.childcategories.id;
          public          postgres    false    219            �            1259    36063    details    TABLE     $  CREATE TABLE public.details (
    id integer NOT NULL,
    product_id integer NOT NULL,
    order_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price real NOT NULL,
    "isCart" smallint DEFAULT 0 NOT NULL,
    status character varying(255),
    complete smallint NOT NULL
);
    DROP TABLE public.details;
       public         heap    postgres    false            �            1259    36062    details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.details_id_seq;
       public          postgres    false    224            Q           0    0    details_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.details_id_seq OWNED BY public.details.id;
          public          postgres    false    223            �            1259    36081    images    TABLE     �   CREATE TABLE public.images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    secure_url character varying(255) NOT NULL,
    cloudinary_public_id character varying NOT NULL
);
    DROP TABLE public.images;
       public         heap    postgres    false            �            1259    36080    images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.images_id_seq;
       public          postgres    false    226            R           0    0    images_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;
          public          postgres    false    225            �            1259    35967    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    35966    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    216            S           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    215            �            1259    36049    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    price real NOT NULL,
    discount real NOT NULL,
    content text NOT NULL,
    amount integer NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    36048    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    222            T           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    221            �            1259    35951    rootcategories    TABLE     �   CREATE TABLE public.rootcategories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    priority smallint NOT NULL
);
 "   DROP TABLE public.rootcategories;
       public         heap    postgres    false            �            1259    35950    rootcategories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rootcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.rootcategories_id_seq;
       public          postgres    false    212            U           0    0    rootcategories_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.rootcategories_id_seq OWNED BY public.rootcategories.id;
          public          postgres    false    211            �            1259    35958    users    TABLE     �  CREATE TABLE public.users (
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
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    35957    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    214            V           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    213            �           2604    36011    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    36023    childcategories id    DEFAULT     x   ALTER TABLE ONLY public.childcategories ALTER COLUMN id SET DEFAULT nextval('public.childcategories_id_seq'::regclass);
 A   ALTER TABLE public.childcategories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    36066 
   details id    DEFAULT     h   ALTER TABLE ONLY public.details ALTER COLUMN id SET DEFAULT nextval('public.details_id_seq'::regclass);
 9   ALTER TABLE public.details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    36084 	   images id    DEFAULT     f   ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);
 8   ALTER TABLE public.images ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    35970 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    36052    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    35954    rootcategories id    DEFAULT     v   ALTER TABLE ONLY public.rootcategories ALTER COLUMN id SET DEFAULT nextval('public.rootcategories_id_seq'::regclass);
 @   ALTER TABLE public.rootcategories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    36114    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            7          0    35945    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    210   NR       ?          0    36008 
   categories 
   TABLE DATA           I   COPY public.categories (id, name, rootcategory_id, priority) FROM stdin;
    public          postgres    false    218   �R       A          0    36020    childcategories 
   TABLE DATA           H   COPY public.childcategories (id, name, parent_id, priority) FROM stdin;
    public          postgres    false    220   wS       E          0    36063    details 
   TABLE DATA           n   COPY public.details (id, product_id, order_id, quantity, total_price, "isCart", status, complete) FROM stdin;
    public          postgres    false    224   �T       G          0    36081    images 
   TABLE DATA           R   COPY public.images (id, product_id, secure_url, cloudinary_public_id) FROM stdin;
    public          postgres    false    226   �T       =          0    35967    orders 
   TABLE DATA           O   COPY public.orders (id, user_id, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   �_       C          0    36049    products 
   TABLE DATA           [   COPY public.products (id, category_id, name, price, discount, content, amount) FROM stdin;
    public          postgres    false    222   ha       9          0    35951    rootcategories 
   TABLE DATA           <   COPY public.rootcategories (id, name, priority) FROM stdin;
    public          postgres    false    212   ٍ       ;          0    35958    users 
   TABLE DATA           �   COPY public.users (id, email, password, "firstName", "lastName", address, phonenumber, gender, "roleId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   T�       W           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 1, true);
          public          postgres    false    217            X           0    0    childcategories_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.childcategories_id_seq', 2, true);
          public          postgres    false    219            Y           0    0    details_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.details_id_seq', 1, false);
          public          postgres    false    223            Z           0    0    images_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.images_id_seq', 120, true);
          public          postgres    false    225            [           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    215            \           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 30, true);
          public          postgres    false    221            ]           0    0    rootcategories_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.rootcategories_id_seq', 1, true);
          public          postgres    false    211            ^           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 61, true);
          public          postgres    false    213            �           2606    35949     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    210            �           2606    36013    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    218            �           2606    36025 $   childcategories childcategories_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.childcategories
    ADD CONSTRAINT childcategories_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.childcategories DROP CONSTRAINT childcategories_pkey;
       public            postgres    false    220            �           2606    36069    details details_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.details DROP CONSTRAINT details_pkey;
       public            postgres    false    224            �           2606    36088    images images_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.images DROP CONSTRAINT images_pkey;
       public            postgres    false    226            �           2606    35974    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    216            �           2606    36056    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    222            �           2606    35956 "   rootcategories rootcategories_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.rootcategories
    ADD CONSTRAINT rootcategories_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.rootcategories DROP CONSTRAINT rootcategories_pkey;
       public            postgres    false    212            �           2606    35965    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    36014 *   categories categories_rootcategory_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_rootcategory_id_fkey FOREIGN KEY (rootcategory_id) REFERENCES public.rootcategories(id);
 T   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_rootcategory_id_fkey;
       public          postgres    false    218    212    3222            �           2606    36026 .   childcategories childcategories_parent_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.childcategories
    ADD CONSTRAINT childcategories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id);
 X   ALTER TABLE ONLY public.childcategories DROP CONSTRAINT childcategories_parent_id_fkey;
       public          postgres    false    3228    218    220            �           2606    36075    details details_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.details DROP CONSTRAINT details_order_id_fkey;
       public          postgres    false    216    224    3226            �           2606    36070    details details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.details DROP CONSTRAINT details_product_id_fkey;
       public          postgres    false    224    222    3232            �           2606    36089    images images_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 G   ALTER TABLE ONLY public.images DROP CONSTRAINT images_product_id_fkey;
       public          postgres    false    3232    226    222            �           2606    35975    orders orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    3224    214    216            �           2606    36057 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.childcategories(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    220    3230    222            7   N   x�u�A
�0 ���ɋ
ETRKR�1���@����aH5W�w��j_y'�)�Ŝw:��h�Sn�(2�j˦�>_ ~;�F�      ?   �   x�U�/�P�u{�^ ���E��AP��M0Hظ K�B5ɞ]v�w�F�Pm��߯Sm�#��c �ɚ3ź�%B��+
"�ĚbA�-����#k��b)���H�$�2d����Y}%Kk.ه)�ɷ���i�Ud=j�$X��+��0��\���B|[��!z0ԹHݸi�{8�#�E6^Z      A     x�u��JA�뙧�P2�'�kMa-,l��#�n YӋ����*H��-W�=�M�GR\���}3�|!\e��yp��FpYΩ�)AE�u�RS�ł��\x:B��\��v#p��&#��$-�J�l�wMs�SSH���[:�B뒖��Q-⨏��oI����B!Íp�+��'E���73�X:�(�y�I������c�bc[iZ;�L+�ş�����@g4��$"Gp�l�`o5�[y�^���z��xw��{Z���      E      x������ � �      G   �
  x���˒� @���t�@���ـ�A����,s"�U��D�	H�/I_�k�zU���WR��aboG���ӈ�o�����{�w_���_��iZ��u �/��W�+�.W�m��3��+@vO[%��y8�B��6�'���6@~s�ŷ�q�����L���/m xS[~kq��*���ޯ�b'�_� �+��-?ڍ�������޷�m�/m tS���]�xƦ�7~��m:�_� �Mmu�c�<��)Ѵ�VL万#�zJK�Q��'[��8�Mm�(@���-��@�]=iSc���9H��&���/���hC,=�C�N�o�4�齶�h�4��kL����_� i���m�:�N)�K뛅�E��1 ��ox�*���I"E�ݜɲ�3�_� )��M����,]UO)s�\(8
���O�wҫI�OG:�#o������ֻ;�B�c��jt��� -_�/�Y��9��^������
֛M[RB����r�-PYՓ�z�Lf�w���� H맼�ɡ��~Mڃ�w���� K[��è���Λ�������/t�[TW��Xtb;`��p�%���� Ȳ���A�������W�O��9@�?�%��R���Q%?�]C� ���ޫ�Л�_a���\��y($c dū����u�}Su����o�������{��Wk��.w� ƴ�o�;nD �ʧ�2�"l�S�O��7!n� Ȫ����;�]�~P�ʪ�4Tu1 ��U��Vɵ^˝9�zX<�M�&�&�\� ȓ���>�n��N�Ϲg!F �ӛ�+�z����4������AD�� ��)�Vm�-�c�V��Ye��u# ������~^�qR����'JT�B�>�mp^ϥ�꒞Y`�;�F��x�;첕rˈ�e��d�o�����}>k�ڵ�yI�6;"���� ���lU~-.��JN�m�(�NN����.�# ��c�;=�l)D�Uhe�8����׏��/�Qt�wWDEjB� &����h�F��Ry�R�K ����s��4�W�>6�M�$T6�L6՚��� 0�+��Vw���!�ءg2�s��# ���8����]�^���ʭ_�H' ���xam��p�=i�LՅ{ �����<�
x/���SO>C��*�� �_�kn�����c�M���1V X>&�=��7ۼ��Lt�V"W X=&v���cX�=]��,��z�:~ ����!�?1L�!�\�[m�=��-rS:� (���>�7%70���}��� (қ��+���ͼ#|l��|��i	�t�"{L���v�F�{/�mL%B��8#�o-��Ez%�MS��[�h�ي�p�c ���L;��`߹��M�`Xq��xl�m��U�Vƫҷ����b ���6��Axtt�t����0@qF�Ö�����|-_�J�դT�S���+�L��}�Eu�b�HN���{��{��MML³MX	<s(�c ��1q�$��\��#݊����D tF���.>Ş-�5k�K'��m[ �=&><���[���<���1 ��m8��Ś�òe�l��GL?@�1�YS��c�f�����) :#׍�Jҫ`�R,�+k��7��<�I#  tW|e'Rz|(5IEY#ʑ� �����N8�:�T��[�W�� ����|K�,�>%�=/.=�p�c ��+�Ѵ�
�� ���{��,x;H��w �	@Y�_5�^�]�X���I���M[��~L�p�r��-_����q�\1 ����aJVڳd��H�dch�t�� U��n4m����'�C*��������y�*�+�{M�Ɨ�>���Ԇ��+@�?&�r�,��<[�
�:@��8<�����(��!�D ��W���-�i�9\cE��S��vt^�/1 *���D�a�M#�b'��&�8@U>&�������tئ��� UuS���K�$g�Y4ϻ`��E�B��:#�f�*�7�N���a��!aiH1 ��11+XD�~�d�d�1 ������B�@3N�
;�kP�� ����d��N7SO7^)�a�~����\�o�`�~�u�1'�p���w��2�� jxS�y��Ct��O��/��TXq��xl���N#k恭�ʦ�mj�=&�������tl�e���������\�o�`��_�
��5��:E{�fm�д� ����t#�E���uL����i�' u����r/l���i�Xlq�>1 �$y�<Ɂ.K�E:���1����8�g��}���S
�uێ%��R�A�sڶ8��cfSC���7B۽Ɔ�s�b�4珙�[VA�e1��
���+N3�k�j܍f�]����X5ykߏ\��|Ư߷n0���|n$��0��_�������Op��]s��s�2��j:�V�\����5uN[�&Eߏh4,��8��cfQQ7X\���eg��M�1p����'
e���۰/]��*���aj{��t��4Mn��O�gkQE�j���}��#�4���}f���~��I��F~�Ӝ�����ܦ%i�)��TWh�I�~����3����B�����V��+2�{��&t�1p��cf�t"M?��D��4[h,b�4w͟g{�ص�;�d��<�w��=�f��u�ΔdW��9.��~��\��ߏcJ�~�qu\����+o�b�	�E������<w�̻ښ�6bX����8��]�5f����_���ۮ��Ϭ~p��c�-!��hփdl+��O.�� �� ���}w      =   �  x���;NCAEk�UУD��ؓ��A:�_xTGJ�D��>�����ﯟ����ClYܖ߬_V>�>b�-z�}]�����nȔ�T�5d*E2��!K%j����~8t��T��2q*�꒘_!�([)I�5I,^���E�:b�m�Qo4�{e~����B��pOՐm����K�`�=�S�q����*m7���[��:9�F%��Huv��暣����ťq�T��(T��cn���6��\eGIP�ǈ=��q��?�fk���q:PPj�ΕP�8%����9�NP�s�������
�2�mo���^��۵��4z���� ��Z�~�
�2�V��	\UrD��n�U�BWs�c͔C佄j��A�Ɲ�۹[h7�trw�ޜv�PO�ݠ_��gq�}������㢔J���ܬz������,�#���Zo��� <�<      C      x��}[sG��3�+2<�r��(�l�"DH��(����gw�EUA�

���V�zf[��P�*,Z�e[!��L����4��/蟰�Y�U�b�s�ꘑA�*/'��;'O�\xu��T����@��G_o�*�}��Vtxp���i����ᕸO��zx�p��<<�4�Z<�4???�4�Z��k�p�m����Ko�g�ѯ��m��j�tbLG���['^���'΍��JC|��::������Aݪvt8|o��ڇ�O}OI�&�~d�b~�[��ݠ}�vt��+=P�}���&��A��`T��8T;�j��{ ��n8ڇG���Gj���n�x�q8���4����F]~r3A���������� _%z��8 |������9�?2=��n����k�@��vTz8�B�E�C��$��i��Ob��Q�#��HV�F�2�4F���$����p�:?B��p�B=�� �x+�q�o1v��{��e������O-,�ק�S�5���~_�q8��`j^����A��[jV�j@��=�Q�B�:��SG��������7@��[���w�؀�ށ�<��x���Y�J�J�=�R����(9�9P[8�}dq&s��f��ы�.�i� �!�	c�1�bӔGs��\����tХ~�#ֻ��"`�l������s}~�e݉��y�4��v�3_��#lx��x�Ľ����ϗ�x?�O_����耉�������[�ͯ��ѝ�������~x�p����;����j�~c5�0��@>�ee�'{�TmW� ��H���1�4��M�(s;&�^M=j(E�E�HWd�6i!="`�޹���������(�;k��0Y��bz�]����k�-'1���&�)i�[1����bG,�׸��Ӄ�l�n�S\���WĊ��>/�沇
�P?�>d�m��dXn'@�k�z�Հ&l�./�F�#���e��&�v�����yA�etp7&���*�v{6}mK7[�o�Va:������x/��[DҀ���ۼ4���daa��,�Dz|axɖ9f&���� ��~��i��`�U��|k�T�p���,s;�z������� �B1Oh)��6�}aq�!��o�����L�5@��8l2���K ���qΒ�	8�H�U �ƽ��;O����n3U���g�#���>���ߣ��W�p�n�l�VR�`���v�U�n̑لض�|�_j��az��m2�G�ԁ�F�]h��d��]ln v'�G�Cd"�+��k��1 �fA|�#�z ��ɍ_^:y^5.^:�JC�����UC�J3n������זΝ�Z8>/�?<�UL��&�"�K��n$Sk~:��m�HzM�X�zn��F����u+L反�^�#�Xt�5@Ӫ3����)�ճ�I,�?�G���t�����am�q�>�����`=�K4ư� �|l�� L7N'f����r��Śi�7�}��C��r�)_��w��?h���c͍���3�&��eiI��ht���M|�9�֞�-Dg�mĳʆ�����h!
`p����Ym{wص�S�j�孈�	k��Ɍ+�F��y�X�ȝ��f���Ʋ����m*������nu�����	~?��)�ʃ(��\nXx#㿟�����%b�${|73*���n��>؆��g�'�U�uot >����EF�K�DD��rVt�I�h[���r �C��;����s�G%�fImW��&�D�58�o�.�x�
�Rէ&�=z��*�l�1:M?�r�|����m!uiSTA�$hﾉMPE�(v��@X���\6�v�o5cokd�,�BE�cy�I���gI���梁b�e�CXd��@��>C7�F)ꦍv��ǡ�j,gqzO����O����|V���o�
i�i8��.�@��$��*�r7��zJ0"D��!�]
�-�Wly��Q���6�t���˸a�Τ�ںzD��]흠3���M�h�+�d)ģ)����z쐗�S���� �k�)�6d�FwYh33��v��2�~m��5ۢ�h��	�,Y�"+������Y2�i���c|4,-���g�h��m���ϳ���(F�@���n�`��s����]�솬�y��Bo�ֵr�H~<�ൈH
���k,Ɍ����Y"J�`�(���k�����G�:�^�5�ꭤ�~�.��0�O�� ���vk����������Z_=<��j�_�5���߬�Q�.��8����5����œ�ϟ�t����Ƹ����ƥ��' A��Z9��:��@�kgƽvn��o���w/�}�|qln�n��gȊ���@+����[d�`}�"�
9$fC��}_�P��.%{�-��Z��&~����߱L���8�-!+O�=�C�x/��X���g��
�K��v��Rk�:�f-�O�f�C�z�[�yo����rS�H]��nd��|]�'�ѫq�>$�}=$�K4v��On�4{��z=I�ԥ��Q�՜:������7`�AV��D�,�L-����=P2$�����2���^�r�U����(�:�U��Һf���Zּ�h��u�f����úߒ5�X-DM��Q�g��~��IoO�$�l�SQ��A��ٕS3V8�+�7 졡�)�ʙ>���l����W�����ފ��{�����V� ��#�&��8l����2�4}����8m��(iڄ�n�"�� �z�_�!4���Eݾ��-��&��d޻ J���@�$N @�r�5}��6G�rG��4dq~����Omg�o�����٩����G��͟�01�-��7=;�ٟ�L��f�˙��4&ZW:���V!����l���_j��n��IS�!H=6�(�n�u�M�/����(�����|��p���T��em8 �C�Q���zs� "Zb?�̯)��_覠�rxc)�]VP|u���5�y���k03����ϟJ0@[N������9ð��Suc����_D?K-��CW�{Ci�g��<sȦ�V�&�d$�;АqO�9_^f�X�f��;��sa "��� �������=��R(�*L!CS/���L
�σ�7~27�Pe�[1�7d���N�'{�S����)�r.���-! ��:*y�څο��;@[�s��%/��#z�E��\[�O�l���F_�M�5	y�W {�����fs��I^�	:�|
���A�����˞�_���yr�6H��V�	��������F�<	d;�O��a�]'d��y� �� ����9:u��650�2&����@���p�ci>��x�L�v��H���V׎��A��:�w6���z�A��^%���;����ā��`���&҃Q���,V�w�SD�q;C��*r�/�]j/j&8��'u��NW9&#_�0X��g����71p�u��`aeZ(BZ�-tfhT+��`�GlF�,�Z��Q��~Ǎ}gʓ�,@��'n�Z��7���}6�e�����v�P�,��4٢�g���q����#���{�3Tz�����7�DA�ؒS��!�����	6��E�k�4|W�B!)hJ*�R2�ȣ!������z��(7�	�cL!��Q�4�*ڝ|�X�<��8X���^��=�����aɕKZ˄�,`\��q�_�`c��9$U`�zY�QO�հ~��X/�H�lIM$֤�+�4�ŏ!ωz7��@R��ne|$,C��i�N:?�6Gx�o ����й#�bgݍ�Q��'�-���}2@K��3��ȋ���wN�߲�DR'ň���Ĵ�ܛ��5Ҿ�4�T�h?U:����96,�\��)��3ڗ�h�c��X�6q�Vr?P��<u��;f��`cS\�ѷ{�,����pʗ4��)DOm�f�Ϥ8�6d��-ۨ��1M�E��Gwƅ}J�{�n`'��lyK;���2%;����y���j�$�b���?��i֓�:��ɫ�CR%c�n35�:��    ��d����FI�"r�}���Zg�l�� N�,�g�Y��g�3�x){�=���Ð�r��mx8e�FPPZr6y4?�#uV�:��,������0�"���krl�OO���,TΣ�.���&oH��0I�\6�#I��Ѧ�XSN�u�M��v�@��>)�VG^;�; �b�#�vlγ����N��'�-j"��o�;j���F�x��d:xn����-G{vc���Ѱ�@o|�Q?���4QI;j%}?B�m5���~@�X�~��M�K�
d�ST=��:���UK��p����?�E�,I��j�A�l�A�n���ڣ�O�݊Z�����<Ȱ�p�$֊;�<�%�S
�i�v�+�|@m�[�$J����o�)4���Ǔ�G�����+u��������%)�R��(K?N�4��&��-������w3LF��Y���o���:�㌁���!o��i���1,�tb!D�F�#'���O-}�}qet'y�k��B�_=��[��1�&�_ x�Iރ���k��΋՞��Q��\��ε&�t;E��eDJ�&���.�y`8(\������A����⽙G>�,�Āe{���rA���d�׀����V�㭰%�t�>G3H#�N�N�N���.A����G+'�*�̉���I�}�m��}"���lr�>o�j/�&����a�BE�{�����iGXS�oY�Y�i�iĺ3n<��:64K%ɡ�"��Ho��T����|N��9Z��\�0Y�2�X ݀фly\�����Ag�ɶ�FY�t֩�����j�`YvՒ��_��^�g��᝞��#K�#�[�7ۍ�\뫇77T��E�8<��uR~��Pl��Z���~���ᇍ���Iq4	�>&5!��o53ؓ�fF���c��v��O��*2��12F���`��U,�?a,�ڲ�"bO{Ҁ���q�.ѫ�#֥7-�X��7{��.���.���X��j��Nݰ�%
�yj��^	��|�]�'|�o������|���rG����5i�����*�U����W�	z�X�Y�Q0�ŧ��ɋ�	�^�3��JT�����3.:�c��g����i���ً�G7��xf@m���h�/�E� �UI�0јW'f�q�`Rj�3�W�^F *���N	J�z���s�T�7�����yYw��2��젬A|�,Bn���đo���B
�!+��'�O">ʃD)y�vH��St���ǄC�9�5�4}�g�)�T�$vB�GO�Ā��@�[�j�H<r4����IVȸ�dLj�>����b�8��D}t* ��J�`��O)̪kR~`�<�
�nZ.��ID�.��vvȸ�͐U�;�;��n!�F�s�Gr�)�$��)��
�s�-D+p5K�v�NY�!���r�&��4O���q���<�}�������pln��Z�����r%���JX0�=��q<�҅6�{���<��w�ѳ�6ItP��c�t<M����18���='��z���vE'����Nb_U�-�cW��3ą*5Y0lz�5�,J����[��Nd�7�.z~D��A "{��b����R�.�𐕮E�3����١Y�ҔnD3�lx��'R��C��L
��`���x��:ʺ���#�ɭA;O�J�\ea��ɕM�lre�+�\���&?w���+r6�����.�]�8}y��|=�J��c�*ڐ��w`��W����g(r�������Sm���/�r}tRMۧ�g�����>�̰��'��ξs�
��ZZ#O�9u6]������M�����:��Fpd?v�0kc��X��R����)�u,h밴BE��$�	��g|�2+/�����-t�Ȃ�1�K:V��';+�5�EK�V�x��7�D�(��p�M�
��q����p�H0S��zF�L�H�
mԞ_�	n�H�\�M;Ud�E�����Թ��@�5G2w-Zu܅�m'2�����;W��EY�Y ��̦�Ð-����tC �Q3H}pN�e/��<�t���S�ne�1�3_(g��O�*�aϢ+��@UA�� PU�*tbji��F���
�@]n��Q��%�"?�T[�A��+�|���#���8���~��^��gw+�RI���+X�Q�s½�!&MhzZ�{��q�0�	�llM��fz����cc&�RδGuk�GK��<��k�s��\H�
�R�_yb����3��-�	4���~"jcq�e�ȜTU_xY���#�	�pB�Q�9��1��2��L���&ӑ<��dw�=��^�2u���||���e\��C�Hf9:�X������J�o0�ӫ~��Dl$1,w{&W�!W�T/�G�YX�C�8S��o�@���:5'"))�N�Y����G;���'��|�ItC��B֋]�%��$d���H}	�w#�b��f��!"c��,�m"	]%G�q}%��բN.y;oF���#���U�˧@�c���?|�ʅ�u�"���������)�@ȁ���>f��d�r%���Y(�:Ȍ��A8>�N�8E�:��gs�D10�e<���V�S��Ď�zRʌ���[���]���(���Ț�E6�� �����.���MY��;,�3��Δ�E�h=	/��K�J����nM���cł�����V�/�̃�S�ae(��4��EΊ$t�K����䨏dD��NO�b¯�Ҏ�!���f���M��X[Ϗ��[�Rz�t�����.���t.��+�a
j�ٰTEl �;�90.�S2Y	��t;[]MSy�@�3<� 6q�,~;�Kb�W�Ll0�R*n ����l�lm��_Vx��� �R'�R%��%8g�*-$\OU�i���Q��Y���E�k]ثZ�5S��rc;��BG@�3)����1���rj�l�S�!��ѝZch���ӕ��į�����[ˮv����{��A!0�Gb��%�hm�AD�F��(t-V���W�a�)R�_�u�`����H�A\čt,6�ौ�k>�_���vs$�r�����a��~�3�!��=M��[Y
ǅLG�-0Lc�=��~��3:\��X>t��p������+_lᲑ>6�}>:i�� �Z�LEk�m�e��_ǁ����s�Z��j��q��,���a����~��n���)�9x�)3#@5}H���q����;���:��k����t˕'y����C�9����E���w�����o<�*~<v�K��]�U�t���m�N��ʩ�O��F8�y�f~fRn�%�g�(:��EE����ߒ�4m����h���4Ns��p\~���<"}�V�Ӷs�n���с޺D��V���q��n�5r>���_E�:�Q��
W�������w��+�]��
W�;��_y.����*�]��
W�������w��+�]��
O����4���*i�J��ƞs���V��ﺟ6�)��)
�w�{6G_�l�:{����j= �W�ͷ�^ዋ�`k�&6{�Im��DƜC%lҳC�I�/��e '��̐{vV3��O�fW�g^����%[�:�}�;跥j��os��ɴ���.p&/�L����:<�Y��`tk�l��E��mZgCb��脣��T��p���˝�%��'׉�j��V����$n��˟���M}��=�WPџw;�.&���-�tE�a��vO�@��ˤ�N�vIT:���c�1�p�����k�Xr�ї����h��*�� �3��'�j:�������1/r1N�ܩ}[W^3�2	��Q۫�CwI��4�Y3ζ��.Ø�S�N�5�Aʹr�Y�fOVO�5��ЂX���bu��܊Zxwy��⒤;���Ë߷��,�h���5l�n�C�Җ�2q�	�8����*zz���)֎�wVcￜ��z�̪���8�L/j��x�� �����Pgc���ٛZ�Be*�P�� ��0�q�l�U�<��,��T�^."h��|�-ģ'_8x)��^s���� ǒӸ�(��>�9�C%XFEm?��Nikc����� W  �EM��g�����1�w�E]�K�+,�/�`kO��������X�3/�^�s�f�;�������\K��t;H���&�'��d�U�T�Zq���L5�͛}.t?���K��Z��̽�����.+���Mͼ��U��c������N�B�p���9�-������[��"�� �:���$�Bj��;���e�N�����C�`W�~��;r?
5-�Vy��"(�/��{ϗΤo��t�p��>	�1N�{U��5i�"t)E��K�3 Vv�� o�������,���WX��.�4��������V�;�~��{>_�r�_b=�(��U�s)�,[�򀳤V1k�_���肑H1��;<��u��O��UGl-�=y��W��rAq'��*���<E���>���".����~�*��gv��q�Q5& �:�������g7ξ1�6�S>8���H30^.������x#G�����I>�tl�f���U���)CB6aO��k	u��I�n��U2[`涕r;��ҏ��ǲr�le,&%�s�H9���v�+���+��C;g�K����*�BVܬx��SU:�G�_в�Te{
ҍ�o�Y4�ˡ�ד�^7l�I�V������G�^���tc��"��
9^�=p���6&� nJ3�z|u���ꟲ����Km�S��ڿ+*+.�2;�hme;���t"�%d���M-eU:I�;J����w>�o�ig&Ӎp�\��B;�{�Z���tBg���n�ǻ0��V�	�Y�Q,��.X9��,�7Ԓuu�
t޿ϖ�/��C�g�S��d\�� ۥ����ud���9�XtH�l�%ZΥjں�$��ؾ�L�?���^�lI\�8�7R��ǻ��ژ^�H�"��|f���O(�H�y9��7x4�i�ZMr�F�1#�|�q��H/߈j�T�dBh��K��h �}�#0@8
�x�̅���kQ*:c`EO�/1:}��K�Ŋf�l@�qds�r�n�mYO���$ȓ�Y�u��/��P�N����tU�EV�^O�@g��u��r%�������rGѥ��A���0צ��Z�,'�.��K&ZYz��!_'�YTӹ,I�	�z%�[�ZQ_v)�nт�����M�t�l��dOGw���K�G 	�\txlLA�!Ā:}���d'�����\��U���?f+g�d���
A	�p�ݢ� P*��d�=�Rsw�����ܩ=iv�Y��'.��I�0L2I��²?V�ua6P�@�}�Y�rY��-���%@��+7Ț�T���aV϶'�ҹ�8t-b�
��KÜ���1�$e��>�~I�����5Z�/cCyg�H��,>�M��DgK�_�xvy�pv�c��h��q�[9�� 0�RHX,1�N˕��Y����.�OI3?b�&ă��j�A�e[����%�[O�l��ˊǱԘ�q��An���\��þ�li(z����Ҩ+��Y6MuN���v�^��s��k'?_�8��kw��ѭZ$,�|K7���ϸ�ډ�`�M�"R(�����#�}�[y7ל�
��6Z�1l.U��\�����y[Z���r��*\#��U���Xטn�,(MG��\܂bv�`��$�t�4��"�'pr�SL�r]�Q�!�6�mq��tv��Pk��^rD�@f'������Ey���]�Ք���o鬣����9���DO͉�7��巔8]Y�ۼ���0J<Å7��ٞ��{�7J!��m�u� �ܧZ�V��Ρ�:���b<Dy�qݱ�F�r!��^,(K���@7W?�v./IdB|*����������rU�e��`��Ү�^#2�z�K����d(Z&ϼO#Z�%�O������_g[�	�XE��N�ֳ�;�^�����2h�Z�dJ����v�p_NsQ$�� ���40��-7G>��Zg���4�\��1�f3�g-��M���	�ۛ�w�w���u�Q\��4�mg.�K�4��u&�d/��|�z/��mͻ]%<�n�L�Sw�θQA��������~���l�ﵚ/��a=��^{Q��{���
�vM��k���O\τ��?��Q�^B$��P��j���q@��D�l 8cft�T��c��L徯$C�9��`6��xG����K�1أ�̜?К�x�`A��/����o9����4�~�k�'�Wyȗb�H�������-�����$0g�nh�M>�|%��=W{��Ɖ�f�%E�7���[�ThjƦ�π�]����(�	��	0�o5��]Ȃ�l�3�Y�Qi���e�1pS��f)�RG��Nr�aIr][dע�	�4i�������J�I/�Q��q�!uo��-��];%�:l�4�(9�P�\�▿���^�fy~���ٳ�1��=��M�YgO��J�5!�����o1/�'SNFX� �l��-9Ѡ,���9�Q�mV���C�6,k��=�e�1�oQ��g�OǺ��]Cd6�yS�-��X���z[�Jr�<�]�Z>�cc�R��쩚<lΤ3rkVT��C�`�̹)���7����V�w%�JM!d����:��'3n��<YRR��;.QA���T��<���=�?Yz� Rd�ܾ���әC�����1GY_1ڟq�+���nc�E��=�:7��M������{/�H%ė*��j�gKmˢ����&��
Ι62��hu7�¥I��܆M�]�4U=G�٩�%���g���cN��>�pN��@�ܳ��	���סᬨT-��{Rtp�����F�W�u��U1� ��;t|�����M���W`3�������-%�B�F��g������ҹ�Vo(����*L�_^�%&��8*�b"i��>���g����IjO���1(��ie���!�b���z�p8�/g?-�o�#C
׏�w8��l��_ :��#��>#̢?äk�W�����!�V7I��ͬ��ѧv�V��/ګ��G��U]��U]��U]��U]��U]��U]�бCw���~B��?�f���[��U^��U^��U^��U^��U^��U^�ృ��S;xV	���=��ʹ���ʹ���ʹ���ʹ���ʹ���ʹ���ʹ#��׎9�� ��`      9   k   x�3���(�|�k�B��ř�&\���w��T(� �����\f�>��W�)d ��f\F���
��@|x3��!B$���|NC.cN�����3��^�i����� %'�      ;      x���9��Lv�c~����C�Xť�h�/�D��VLB�Iq�$��G���av4��݁����⢖��3��vw���}�s��E����S#�m݌ �-��ϼ�3�~����X^����_z���Ǽu�vQk��X(�������?����T��;߿�5��߿�KHq�������w5J
`L#�x�#_���??Aʉ&v� 6	�F���6ؙ���n��\��Ɵ��S���:pが�H:��6�RS�j������@DIxr-ߤ;i�enhSr�,
4�1��5���й�5ɑ��5!�w6���|5^��Zb�kx�J&k���d���j٪�]0���g����t'*Ҝ"?��!Q!����p
Ʒ�&	�2�P��c��ìs�Y+g�ښ�ɝx����q���I���)�ɷ�$�u�����1F4�!�FoU��0B&���
����0�eO��o��-���ϧ� 8��4<��5�ɞ��>�D?�.U@���/�R3���_�*�����#=��2O-���HcQ��7E��1NQ���$h�hkm�׭z
��R+������8a�M����Nf���h��홺a��SD��_���i�4Bz�aNI��(�"R>G~�n��c��=kijv}C�cҸu��,�J��b>ce}"��
�%{��Wi�MBZ�c�FZ�zj�>�ːELC��7)�2H�>�	7iiO��CH,��|�G[cY���s}�!��iX؝K���#cQ-R�g�˜,���b�D	=��ʠ 4��� �N	p��y(\���t����R�DՎ�������x-��Å��m3�<�����g�~���� ��7R2�V�[)%`��G��> ��)4��գ��˒a?<��x����8I�2څ�M`.����w �\6b�/e�>M?�HP� �<:EZѭ�8�	𠄄wA<��G�[���/��ִ�=Ϭ��;���L�9V�%`\���|�5��!�5y�T�E	�Hy��9 њk��ao�Q�4�6���@*v�(�k5�����6���~�LYWe�df���A�Ԁ�17e��w�E��X�%����K[�Ia����9T"/�2/�?�AT�Za-���Ɣ��b��/���ݫϫ�G� ��`4 yd@]�ֳ7�lH��~����0�G���/��Zd��9Z�d��		Th�>
A#~�츜Cm0��$�f����[Jܵ�ċ�Ce�\3�Xݦk8'�{[*��Ha��EQ��fy�H��G�d��X3�c�9|���L����nGhߎV�qb�c{�ZV�
�AZ��c���z��$�<A��VJ6ø�����D�D���	��� i|�δI��P�r�P�Y��ZYtnr,: v�`�J���qԫZʟ�H#?8X����y��dm�<&��&�P� �~�j$�o�W��$�'�.-�r%�p;`��&CC-�F����8M����["A2y�(ҷ<YV�g�*3!����a*'}����[|9���Þ.������di���Б�g�R��!�FO0
Y�~|�A��UK�ȝ�tz̻�DZ�%����
�9R����|�h���z�]���Nu豧�W{L{�N����_*������'k7U�ɶ�Ϸ/���B�R}l~t}r��r�%L'��C�|�jf�.�7m�b��-0��Gɲ�XJ���d������05{g��r��P�w��/�K� �]������UA��{�M�Syd���l�T���W�`g��^K}+�6^�݂J(����A�]W�o��`���(����ABB�i�G㵹j�iN�y�C*�7i�!��c��R܉.�9t��	yz1چ&�N��)���|۵{J��݄��{���Fi}�s�PI<��ޕ �>�4<߈f?>ް]��9�YA�{���0�pa��eL���K��^gh���y��b�J�����3���.rR���_+T&�u�=����+hF|#�Q�/���%�}��V��a�MloG�ئ����PϜN�ʚ�2�D�׿'@�d�#ˍǌם�		���{�T`����<��~/h�G�\sbK�@�cz�ީ��m;06\o�'��l1�5M(�>F�Â �AjX����ɵ y��f^�|����i�2so5�ϛ���&�>ٯw���$}?,�R�Ҥ�g�2^̽�7Y�	5!�ro��;>��C-����2��?^��:2I�$���k[�������n�0�@�3���u�z+ݳ�x�������s�~�w�>H��д�,zM��9�dZ�ѧ�ŏf���o����G̑}<.�򹞱,�'���{n�^�6�t�q2�ؼx�� ��)9E��˱h:�K�ھ�rBfoN�VH���w��K��B#ɐ>gCD�DfB~�	��NFw��F��#��/�~Z�8n_��u�i�~�B-�8���E=�x�K6p��j�F/�����,�b��d*D�x�����:��wz�=b�F�bo�3�1ɱK��+{��o'a��;���WH�'8}�ǀn�e�A�$Y���!��񥩑��g�mn0^�:�������N׃u(^���tQ]��e��+d��r������o�h*߆��i"i��������lݯ�;tZ��z�ң㈭��8�-�e��e�[��1+lJ�ؑ�p2x����̓a!��`�=8�Bi%I����<iF���q�X�6K�̊`��
������X�Ă�}ŋz;�ъ����&�X%C�.ҐT��D�I]�'�x`
�{�$��^;d��چ���y������ds/)����"���0�`\�y�8N6�u0,�K�-@����L�G�Ȥ��A&�@��5,�Ui$*r�DIO�vz���~*�����w�M��|��M���Y�׼�E͜�<��QmB��a|Dl���$һ��k��F�
�5���=���^�=O:�ԼꝖ�g{�mS<��p���d9���?H+i�^ᄴ	 ��	����,9�Q����X>���vVE�l�q��a
4�/����9
E��by����NJ椒	r��Ƴ.2==څ�Z�%%���I+oB��+�F���y<S
�y����%�q|	��j���Z�9��1���|&zK��/o���{�G�������d������[�İ��]ܯ���hS)����TB|�V��`�G���g7/+�v�/r�Ll�ޕ	Y�,�əY/	�{�l*��$�l�g�9�ͨuʱ��� Êչb�jxΊd�L�K�is�R���#�:��kS���L|+4���WV ���uE,ɚ�'j��\���)�p�H�g�2+�������o�i˝Ϲ}��h\v~.3԰����=�R�p�����r� ɟn��ֺOw=N�����4Q�o�"˛�J�;V�:�OC�{��e'WN��¡ߝq�z���L</@�nVJlH�V�G�z��9��]���Qݗj����Z���/l	 H���M�U��PO1���>՗��K"�Hb��~���Q�
\d/�[���w�m��J�H~�ʀ�-���n,2^���!����F����rO$+���AR�_����a5¸�s{|���r���l/Nvq6����5t�?0��Y{����iU�	��������ǁazh��妏<��Bc�����WlE� }?�,Z�ad��V\�]��H�o1��e׳u��A	sn+�|�����[R}mY}y�
i��|�WD��� 5��<X��@��U`��[�&1�v=/�����;�j�f-���K3�2��dŮ{#��S-9�-��QL(/�/�$ڽ�
'���®�+�kpE#T�mn5���^�vҕ'���}�9z��̎R3z�EyJ��h��O �_����b�O�C���̠{j�B7�B!�z��.��ۨ�/��/Zkf2���8�����Ę��K�nNwS�bQO)���wO,�j(�w8Kge}�Etp�$A��qΙY���B�G{�kw�_��Q�G��2��'l޶U�D�k���~�����n��%j\�s��[s�m6�j�ˡ��X(b���v�]��Y���W 5  ���q�zȉ<���_{��P�����ʓ���;��*��yZ�;�+�uw����v^���K��p�������m�kv>Z�����}��'�"s�����!"N�iA@��=���3pû�����J�����\�Cn��������4�0�ǧ�a�+7y+#�d*���͊Ʋ�k���x�+��'�_��H&��'����I�	�,��~q�T�N/��m��-��Gb�����i&/�8g����d� |V�R�j[Ԧ�O��s�Y�DFBX��ϕ��w���O?���V�     