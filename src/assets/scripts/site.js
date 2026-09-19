(function () {
  'use strict';

  const page = document.body.dataset.page || '';
  const localeOptions = [
    { code: 'en', label: 'English' },
    { code: 'ka', label: 'ქართული' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
    { code: 'ar', label: 'العربية' },
    { code: 'tr', label: 'Türkçe' }
  ];

  const localeMessages = {
    ka: {
      'Skip to content': 'გადასვლა მთავარ შინაარსზე',
      'GLOBAL TRADE & INVESTMENT MARKETPLACE': 'გლობალური ვაჭრობისა და ინვესტიციების მარკეტპლეისი',
      Marketplace: 'მარკეტპლეისი', Categories: 'კატეგორიები', Suppliers: 'მომწოდებლები', Investments: 'ინვესტიციები', About: 'ჩვენ შესახებ', Contact: 'კონტაქტი', 'Post an RFQ': 'RFQ-ის განთავსება', Menu: 'მენიუ',
      'Source Products': 'პროდუქტების მოძიება', 'Browse export-ready offers': 'საექსპორტო შეთავაზებების ნახვა', 'Find Suppliers': 'მომწოდებლების პოვნა', 'Meet qualified partners': 'კვალიფიციურ პარტნიორებთან შეხვედრა', 'Receive tailored matches': 'მორგებული შეთავაზებების მიღება', 'Explore Investments': 'ინვესტიციების ნახვა', 'Access regional growth': 'რეგიონულ ზრდაზე წვდომა',
      'THE GATEWAY TO EURASIAN COMMERCE': 'ევრაზიული ვაჭრობის კარიბჭე', 'Trade beyond borders.': 'ვაჭრობა საზღვრებს მიღმა.', 'Invest with confidence.': 'ინვესტირება თავდაჯერებით.', 'Search products or suppliers': 'მოძებნეთ პროდუქტები ან მომწოდებლები', Category: 'კატეგორია', 'All product categories': 'პროდუქტის ყველა კატეგორია', 'Search marketplace': 'მარკეტპლეისის ძიება', 'POPULAR:': 'პოპულარული:', 'Human-reviewed introductions': 'ადამიანის მიერ შემოწმებული გაცნობები',
      'ONE NETWORK, FOUR WAYS IN': 'ერთი ქსელი, ოთხი გზა', 'Move from interest': 'ინტერესიდან მოქმედებამდე', 'EXPLORE THE PLATFORM': 'პლატფორმის გაცნობა', 'Choose your next': 'აირჩიეთ შემდეგი', 'Browse by sector': 'დათვალიერება სექტორით', 'Meet a supplier': 'გაეცანით მომწოდებელს', 'Explore an opportunity': 'ნახეთ შესაძლებლობა', 'FEATURED INVESTMENT · REAL ESTATE': 'რჩეული ინვესტიცია · უძრავი ქონება', 'Explore project': 'პროექტის ნახვა',
      'B2B LEAD MARKETPLACE': 'B2B ლიდების მარკეტპლეისი', 'Products ready for': 'პროდუქტები მზად არის', 'PRODUCTS': 'პროდუქტები', 'Browse products by category.': 'დაათვალიერეთ პროდუქტები კატეგორიით.', 'Product category': 'პროდუქტის კატეგორია', 'Search products': 'პროდუქტების ძიება', 'Clear filters': 'ფილტრების გასუფთავება', 'Request a quote': 'მოითხოვეთ შეთავაზება', 'Request a Quote': 'მოითხოვეთ შეთავაზება', 'Request an introduction': 'მოითხოვეთ გაცნობა', 'View product details': 'პროდუქტის დეტალების ნახვა', 'FEATURED SOURCE PRODUCT': 'რჩეული წყაროს პროდუქტი', 'SERVICES · SEPARATE FROM PRODUCTS': 'სერვისები · პროდუქტებისგან ცალკე', 'CAN’T FIND THE RIGHT LISTING?': 'სასურველი შეთავაზება ვერ იპოვეთ?', 'Make the request': 'გააკეთეთ მოთხოვნა',
      'EXPLORE THE MARKETPLACE': 'მარკეტპლეისის გაცნობა', 'Trade opportunities,': 'სავაჭრო შესაძლებლობები,', 'PRODUCTS · MARKETPLACE': 'პროდუქტები · მარკეტპლეისი', 'SERVICES · SEPARATE DIRECTORY': 'სერვისები · ცალკე დირექტორია', 'HOW TO USE CATEGORIES': 'როგორ გამოიყენოთ კატეგორიები', 'READY TO SOURCE?': 'მზად ხართ მოძიებისთვის?',
      'TRUSTED BUSINESS NETWORK': 'სანდო ბიზნეს-ქსელი', 'Meet suppliers built': 'გაეცანით მომწოდებლებს', 'Search directory': 'დირექტორიის ძიება', Sector: 'სექტორი', 'All sectors': 'ყველა სექტორი', Reset: 'გასუფთავება', 'Profiles reviewed by the GI-Hub team': 'GI-Hub-ის გუნდის მიერ განხილული პროფილები', 'Request an introduction →': 'მოითხოვეთ გაცნობა →', 'Request a quote →': 'მოითხოვეთ შეთავაზება →', 'VERIFICATION FRAMEWORK': 'ვერიფიკაციის ჩარჩო', 'Trust made': 'ნდობა გამჭვირვალედ', Registered: 'რეგისტრირებული', 'Business Verified': 'ბიზნესი დადასტურებულია', 'GI-Hub Verified': 'GI-Hub-ის მიერ დადასტურებული', 'REGISTERED': 'რეგისტრირებული', '✓ BUSINESS VERIFIED': '✓ ბიზნესი დადასტურებულია', '✓ GI-HUB VERIFIED': '✓ GI-Hub-ის მიერ დადასტურებული', 'VERIFICATION SUMMARY': 'ვერიფიკაციის შეჯამება', 'Company Registration': 'კომპანიის რეგისტრაცია', 'Business Activity': 'ბიზნესის საქმიანობა', 'Product Evidence': 'პროდუქტის მტკიცებულება', 'Export Capability': 'საექსპორტო შესაძლებლობა', 'Last Reviewed': 'ბოლოს განხილული', Reviewed: 'განხილულია',
      'REQUEST FOR QUOTATION': 'კომერციული შეთავაზების მოთხოვნა', 'Tell us what your business needs.': 'გვითხარით, რა სჭირდება თქვენს ბიზნესს.', 'Start your request': 'დაიწყეთ მოთხოვნა', 'Select a role': 'აირჩიეთ როლი', Buyer: 'მყიდველი', Supplier: 'მომწოდებელი', Distributor: 'დისტრიბუტორი', Investor: 'ინვესტორი', 'Company name *': 'კომპანიის სახელი *', 'Business email *': 'ბიზნეს ელფოსტა *', 'Target market *': 'სამიზნე ბაზარი *', 'Product or requirement *': 'პროდუქტი ან მოთხოვნა *', 'Prepare secure inquiry →': 'მოამზადეთ უსაფრთხო მოთხოვნა →', 'RFQ WORKFLOW': 'RFQ-ის პროცესი', 'GI-Hub Review': 'GI-Hub-ის განხილვა', 'Supplier Introduction': 'მომწოდებლის გაცნობა',
      'INVEST IN THE REGION': 'ინვესტირება რეგიონში', 'Opportunity at the crossroads': 'შესაძლებლობა გზაჯვარედინზე', 'INVESTMENT THEMES': 'საინვესტიციო თემები', 'OUR APPROACH': 'ჩვენი მიდგომა', 'Local context.': 'ადგილობრივი კონტექსტი.', 'INTERESTED IN A CONVERSATION?': 'გსურთ საუბარი?', 'Discuss an opportunity →': 'განიხილეთ შესაძლებლობა →', 'View project details →': 'პროექტის დეტალები →',
      'ABOUT GI-HUB': 'GI-HUB-ის შესახებ', 'Local intelligence.': 'ადგილობრივი ცოდნა.', 'WHAT WE DO': 'რას ვაკეთებთ', 'OUR PRINCIPLES': 'ჩვენი პრინციპები', 'THE NETWORK': 'ქსელი', 'Browse the marketplace →': 'მარკეტპლეისის ნახვა →', 'Explore investments →': 'ინვესტიციების ნახვა →',
      'CONTACT GI-HUB': 'დაუკავშირდით GI-Hub-ს', 'Start a focused': 'დაიწყეთ მიზნობრივი', 'conversation.': 'საუბარი.', 'HOW WE CAN HELP': 'როგორ დაგეხმარებით', 'DIRECT CONTACT': 'პირდაპირი კონტაქტი', 'PRODUCT CONNECTION': 'პროდუქტთან კავშირი', 'SUPPLIER PROFILE': 'მომწოდებლის პროფილი', 'Move from': 'გადადით', 'profile to RFQ.': 'პროფილიდან RFQ-მდე.'
    },
    ru: {
      'Skip to content': 'Перейти к содержимому',
      'GLOBAL TRADE & INVESTMENT MARKETPLACE': 'ГЛОБАЛЬНЫЙ ТОРГОВО-ИНВЕСТИЦИОННЫЙ МАРКЕТПЛЕЙС', Marketplace: 'Маркетплейс', Categories: 'Категории', Suppliers: 'Поставщики', Investments: 'Инвестиции', About: 'О нас', Contact: 'Контакты', 'Post an RFQ': 'Разместить RFQ', Menu: 'Меню',
      'Source Products': 'Найти продукты', 'Browse export-ready offers': 'Экспортные предложения', 'Find Suppliers': 'Найти поставщиков', 'Meet qualified partners': 'Квалифицированные партнёры', 'Receive tailored matches': 'Подходящие предложения', 'Explore Investments': 'Инвестиции', 'Access regional growth': 'Доступ к региональному росту',
      'THE GATEWAY TO EURASIAN COMMERCE': 'ВОРОТА В ЕВРАЗИЙСКУЮ ТОРГОВЛЮ', 'Trade beyond borders.': 'Торгуйте без границ.', 'Invest with confidence.': 'Инвестируйте уверенно.', 'Search products or suppliers': 'Поиск продуктов или поставщиков', Category: 'Категория', 'All product categories': 'Все категории продуктов', 'Search marketplace': 'Искать на маркетплейсе', 'POPULAR:': 'ПОПУЛЯРНО:', 'Human-reviewed introductions': 'Знакомства, проверенные командой',
      'ONE NETWORK, FOUR WAYS IN': 'ОДНА СЕТЬ, ЧЕТЫРЕ ПУТИ', 'Move from interest': 'От интереса к действию', 'EXPLORE THE PLATFORM': 'ИЗУЧИТЕ ПЛАТФОРМУ', 'Choose your next': 'Выберите следующий шаг', 'Browse by sector': 'Поиск по секторам', 'Meet a supplier': 'Найти поставщика', 'Explore an opportunity': 'Изучить возможность', 'FEATURED INVESTMENT · REAL ESTATE': 'ИЗБРАННАЯ ИНВЕСТИЦИЯ · НЕДВИЖИМОСТЬ', 'Explore project': 'Изучить проект',
      'B2B LEAD MARKETPLACE': 'B2B МАРКЕТПЛЕЙС ЛИДОВ', 'Products ready for': 'Продукты для', 'PRODUCTS': 'ПРОДУКТЫ', 'Browse products by category.': 'Ищите продукты по категории.', 'Product category': 'Категория продукта', 'Search products': 'Поиск продуктов', 'Clear filters': 'Сбросить фильтры', 'Request a quote': 'Запросить предложение', 'Request a Quote': 'Запросить предложение', 'Request an introduction': 'Запросить знакомство', 'View product details': 'Подробнее о продукте', 'FEATURED SOURCE PRODUCT': 'ИЗБРАННЫЙ ПРОДУКТ', 'SERVICES · SEPARATE FROM PRODUCTS': 'УСЛУГИ · ОТДЕЛЬНО ОТ ПРОДУКТОВ', 'CAN’T FIND THE RIGHT LISTING?': 'Не нашли подходящее предложение?', 'Make the request': 'Оставьте запрос',
      'EXPLORE THE MARKETPLACE': 'ИЗУЧИТЕ МАРКЕТПЛЕЙС', 'Trade opportunities,': 'Торговые возможности,', 'PRODUCTS · MARKETPLACE': 'ПРОДУКТЫ · МАРКЕТПЛЕЙС', 'SERVICES · SEPARATE DIRECTORY': 'УСЛУГИ · ОТДЕЛЬНЫЙ СПРАВОЧНИК', 'HOW TO USE CATEGORIES': 'КАК ИСПОЛЬЗОВАТЬ КАТЕГОРИИ', 'READY TO SOURCE?': 'ГОТОВЫ ИСКАТЬ?',
      'TRUSTED BUSINESS NETWORK': 'СЕТЬ ДОВЕРЕННЫХ КОМПАНИЙ', 'Meet suppliers built': 'Поставщики для', 'Search directory': 'Поиск в справочнике', Sector: 'Сектор', 'All sectors': 'Все секторы', Reset: 'Сбросить', 'Profiles reviewed by the GI-Hub team': 'Профили, проверенные командой GI-Hub', 'Request an introduction →': 'Запросить знакомство →', 'Request a quote →': 'Запросить предложение →', 'VERIFICATION FRAMEWORK': 'СИСТЕМА ПРОВЕРКИ', 'Trust made': 'Доверие прозрачно', Registered: 'Зарегистрирован', 'Business Verified': 'Бизнес проверен', 'GI-Hub Verified': 'Проверено GI-Hub', 'REGISTERED': 'ЗАРЕГИСТРИРОВАН', '✓ BUSINESS VERIFIED': '✓ БИЗНЕС ПРОВЕРЕН', '✓ GI-HUB VERIFIED': '✓ ПРОВЕРЕНО GI-HUB', 'VERIFICATION SUMMARY': 'СВОДКА ПРОВЕРКИ', 'Company Registration': 'Регистрация компании', 'Business Activity': 'Деятельность компании', 'Product Evidence': 'Подтверждение продукта', 'Export Capability': 'Экспортные возможности', 'Last Reviewed': 'Последняя проверка', Reviewed: 'Проверено',
      'REQUEST FOR QUOTATION': 'ЗАПРОС КОТИРОВКИ', 'Tell us what your business needs.': 'Расскажите, что нужно вашему бизнесу.', 'Start your request': 'Начать запрос', 'Select a role': 'Выберите роль', Buyer: 'Покупатель', Supplier: 'Поставщик', Distributor: 'Дистрибьютор', Investor: 'Инвестор', 'Company name *': 'Название компании *', 'Business email *': 'Рабочая почта *', 'Target market *': 'Целевой рынок *', 'Product or requirement *': 'Продукт или требование *', 'Prepare secure inquiry →': 'Подготовить защищённый запрос →', 'RFQ WORKFLOW': 'ПРОЦЕСС RFQ', 'GI-Hub Review': 'Проверка GI-Hub', 'Supplier Introduction': 'Знакомство с поставщиком',
      'INVEST IN THE REGION': 'ИНВЕСТИРУЙТЕ В РЕГИОН', 'Opportunity at the crossroads': 'Возможность на перекрёстке', 'INVESTMENT THEMES': 'ИНВЕСТИЦИОННЫЕ ТЕМЫ', 'OUR APPROACH': 'НАШ ПОДХОД', 'Local context.': 'Местный контекст.', 'INTERESTED IN A CONVERSATION?': 'ГОТОВЫ ОБСУДИТЬ?', 'Discuss an opportunity →': 'Обсудить возможность →', 'View project details →': 'Подробнее о проекте →',
      'ABOUT GI-HUB': 'О GI-HUB', 'Local intelligence.': 'Местная экспертиза.', 'WHAT WE DO': 'ЧТО МЫ ДЕЛАЕМ', 'OUR PRINCIPLES': 'НАШИ ПРИНЦИПЫ', 'THE NETWORK': 'СЕТЬ', 'Browse the marketplace →': 'Открыть маркетплейс →', 'Explore investments →': 'Изучить инвестиции →',
      'CONTACT GI-HUB': 'СВЯЗАТЬСЯ С GI-HUB', 'Start a focused': 'Начните предметный', 'conversation.': 'разговор.', 'HOW WE CAN HELP': 'КАК МЫ ПОМОГАЕМ', 'DIRECT CONTACT': 'ПРЯМОЙ КОНТАКТ', 'PRODUCT CONNECTION': 'СВЯЗЬ С ПРОДУКТОМ', 'SUPPLIER PROFILE': 'ПРОФИЛЬ ПОСТАВЩИКА', 'Move from': 'От', 'profile to RFQ.': 'профиля к RFQ.'
    },
    zh: {
      'Skip to content': '跳转到内容',
      'GLOBAL TRADE & INVESTMENT MARKETPLACE': '全球贸易与投资市场', Marketplace: '市场', Categories: '分类', Suppliers: '供应商', Investments: '投资', About: '关于', Contact: '联系我们', 'Post an RFQ': '提交 RFQ', Menu: '菜单',
      'Source Products': '寻找产品', 'Browse export-ready offers': '浏览出口产品', 'Find Suppliers': '寻找供应商', 'Meet qualified partners': '联系合格伙伴', 'Receive tailored matches': '获取匹配推荐', 'Explore Investments': '探索投资', 'Access regional growth': '连接区域增长',
      'THE GATEWAY TO EURASIAN COMMERCE': '欧亚商业门户', 'Trade beyond borders.': '跨越边界开展贸易。', 'Invest with confidence.': '自信投资。', 'Search products or suppliers': '搜索产品或供应商', Category: '类别', 'All product categories': '所有产品类别', 'Search marketplace': '搜索市场', 'POPULAR:': '热门：', 'Human-reviewed introductions': '人工审核的商务对接',
      'ONE NETWORK, FOUR WAYS IN': '一个网络，四种入口', 'Move from interest': '从兴趣走向行动', 'EXPLORE THE PLATFORM': '探索平台', 'Choose your next': '选择下一步', 'Browse by sector': '按行业浏览', 'Meet a supplier': '联系供应商', 'Explore an opportunity': '探索机会', 'FEATURED INVESTMENT · REAL ESTATE': '精选投资 · 房地产', 'Explore project': '查看项目',
      'B2B LEAD MARKETPLACE': 'B2B 商机市场', 'Products ready for': '面向国际业务的产品', 'PRODUCTS': '产品', 'Browse products by category.': '按类别浏览产品。', 'Product category': '产品类别', 'Search products': '搜索产品', 'Clear filters': '清除筛选', 'Request a quote': '请求报价', 'Request a Quote': '请求报价', 'Request an introduction': '请求对接', 'View product details': '查看产品详情', 'FEATURED SOURCE PRODUCT': '精选产品', 'SERVICES · SEPARATE FROM PRODUCTS': '服务 · 与产品分开', 'CAN’T FIND THE RIGHT LISTING?': '没有找到合适的产品？', 'Make the request': '提交需求',
      'EXPLORE THE MARKETPLACE': '探索市场', 'Trade opportunities,': '贸易机会，', 'PRODUCTS · MARKETPLACE': '产品 · 市场', 'SERVICES · SEPARATE DIRECTORY': '服务 · 独立目录', 'HOW TO USE CATEGORIES': '如何使用分类', 'READY TO SOURCE?': '准备好采购了吗？',
      'TRUSTED BUSINESS NETWORK': '可信商业网络', 'Meet suppliers built': '认识供应商', 'Search directory': '搜索目录', Sector: '行业', 'All sectors': '所有行业', Reset: '重置', 'Profiles reviewed by the GI-Hub team': 'GI-Hub 团队审核的档案', 'Request an introduction →': '请求对接 →', 'Request a quote →': '请求报价 →', 'VERIFICATION FRAMEWORK': '审核体系', 'Trust made': '让信任清晰可见', Registered: '已注册', 'Business Verified': '企业已验证', 'GI-Hub Verified': 'GI-Hub 已验证', 'REGISTERED': '已注册', '✓ BUSINESS VERIFIED': '✓ 企业已验证', '✓ GI-HUB VERIFIED': '✓ GI-Hub 已验证', 'VERIFICATION SUMMARY': '审核摘要', 'Company Registration': '公司注册', 'Business Activity': '业务活动', 'Product Evidence': '产品证据', 'Export Capability': '出口能力', 'Last Reviewed': '最近审核', Reviewed: '已审核',
      'REQUEST FOR QUOTATION': '报价请求', 'Tell us what your business needs.': '告诉我们您的业务需求。', 'Start your request': '开始提交需求', 'Select a role': '选择角色', Buyer: '买方', Supplier: '供应商', Distributor: '分销商', Investor: '投资者', 'Company name *': '公司名称 *', 'Business email *': '商务邮箱 *', 'Target market *': '目标市场 *', 'Product or requirement *': '产品或需求 *', 'Prepare secure inquiry →': '准备安全询盘 →', 'RFQ WORKFLOW': 'RFQ 流程', 'GI-Hub Review': 'GI-Hub 审核', 'Supplier Introduction': '供应商对接',
      'INVEST IN THE REGION': '投资区域市场', 'Opportunity at the crossroads': '连接多地的机会', 'INVESTMENT THEMES': '投资主题', 'OUR APPROACH': '我们的方式', 'Local context.': '本地洞察。', 'INTERESTED IN A CONVERSATION?': '想进一步交流吗？', 'Discuss an opportunity →': '讨论投资机会 →', 'View project details →': '查看项目详情 →',
      'ABOUT GI-HUB': '关于 GI-Hub', 'Local intelligence.': '本地洞察', 'WHAT WE DO': '我们的工作', 'OUR PRINCIPLES': '我们的原则', 'THE NETWORK': '网络', 'Browse the marketplace →': '浏览市场 →', 'Explore investments →': '探索投资 →',
      'CONTACT GI-HUB': '联系 GI-Hub', 'Start a focused': '开始一次有针对性的', 'conversation.': '交流。', 'HOW WE CAN HELP': '我们如何帮助您', 'DIRECT CONTACT': '直接联系', 'PRODUCT CONNECTION': '产品对接', 'SUPPLIER PROFILE': '供应商档案', 'Move from': '从', 'profile to RFQ.': '档案走向 RFQ。'
    },
    ar: {
      'Skip to content': 'انتقل إلى المحتوى',
      'GLOBAL TRADE & INVESTMENT MARKETPLACE': 'سوق التجارة والاستثمار العالمي', Marketplace: 'السوق', Categories: 'الفئات', Suppliers: 'الموردون', Investments: 'الاستثمارات', About: 'عنّا', Contact: 'اتصل بنا', 'Post an RFQ': 'إرسال طلب عرض سعر', Menu: 'القائمة',
      'Source Products': 'تصفح المنتجات', 'Browse export-ready offers': 'تصفح عروض التصدير', 'Find Suppliers': 'ابحث عن الموردين', 'Meet qualified partners': 'تواصل مع شركاء مؤهلين', 'Receive tailored matches': 'احصل على مطابقة مخصصة', 'Explore Investments': 'استكشف الاستثمارات', 'Access regional growth': 'الوصول إلى النمو الإقليمي',
      'THE GATEWAY TO EURASIAN COMMERCE': 'بوابة التجارة الأوراسية', 'Trade beyond borders.': 'تجارة تتجاوز الحدود.', 'Invest with confidence.': 'استثمر بثقة.', 'Search products or suppliers': 'ابحث عن منتجات أو موردين', Category: 'الفئة', 'All product categories': 'كل فئات المنتجات', 'Search marketplace': 'ابحث في السوق', 'POPULAR:': 'الأكثر شيوعاً:', 'Human-reviewed introductions': 'تعارف تمت مراجعته بشرياً',
      'ONE NETWORK, FOUR WAYS IN': 'شبكة واحدة، أربع طرق', 'Move from interest': 'من الاهتمام إلى العمل', 'EXPLORE THE PLATFORM': 'استكشف المنصة', 'Choose your next': 'اختر خطوتك التالية', 'Browse by sector': 'تصفح حسب القطاع', 'Meet a supplier': 'تعرّف على مورد', 'Explore an opportunity': 'استكشف فرصة', 'FEATURED INVESTMENT · REAL ESTATE': 'استثمار مميز · عقارات', 'Explore project': 'استكشف المشروع',
      'B2B LEAD MARKETPLACE': 'سوق فرص B2B', 'Products ready for': 'منتجات جاهزة لـ', 'PRODUCTS': 'المنتجات', 'Browse products by category.': 'تصفح المنتجات حسب الفئة.', 'Product category': 'فئة المنتج', 'Search products': 'ابحث عن المنتجات', 'Clear filters': 'مسح الفلاتر', 'Request a quote': 'اطلب عرض سعر', 'Request a Quote': 'اطلب عرض سعر', 'Request an introduction': 'اطلب تعارفاً', 'View product details': 'عرض تفاصيل المنتج', 'FEATURED SOURCE PRODUCT': 'منتج مميز', 'SERVICES · SEPARATE FROM PRODUCTS': 'الخدمات · منفصلة عن المنتجات', 'CAN’T FIND THE RIGHT LISTING?': 'لم تجد العرض المناسب؟', 'Make the request': 'أرسل الطلب',
      'EXPLORE THE MARKETPLACE': 'استكشف السوق', 'Trade opportunities,': 'فرص تجارية،', 'PRODUCTS · MARKETPLACE': 'المنتجات · السوق', 'SERVICES · SEPARATE DIRECTORY': 'الخدمات · دليل مستقل', 'HOW TO USE CATEGORIES': 'كيفية استخدام الفئات', 'READY TO SOURCE?': 'هل أنت مستعد للمصدر؟',
      'TRUSTED BUSINESS NETWORK': 'شبكة أعمال موثوقة', 'Meet suppliers built': 'تعرّف على موردين', 'Search directory': 'البحث في الدليل', Sector: 'القطاع', 'All sectors': 'كل القطاعات', Reset: 'إعادة ضبط', 'Profiles reviewed by the GI-Hub team': 'ملفات راجعها فريق GI-Hub', 'Request an introduction →': 'اطلب تعارفاً →', 'Request a quote →': 'اطلب عرض سعر →', 'VERIFICATION FRAMEWORK': 'إطار التحقق', 'Trust made': 'ثقة واضحة', Registered: 'مسجل', 'Business Verified': 'نشاط تجاري موثق', 'GI-Hub Verified': 'موثق من GI-Hub', 'REGISTERED': 'مسجل', '✓ BUSINESS VERIFIED': '✓ نشاط تجاري موثق', '✓ GI-HUB VERIFIED': '✓ موثق من GI-Hub', 'VERIFICATION SUMMARY': 'ملخص التحقق', 'Company Registration': 'تسجيل الشركة', 'Business Activity': 'نشاط الشركة', 'Product Evidence': 'أدلة المنتج', 'Export Capability': 'القدرة على التصدير', 'Last Reviewed': 'آخر مراجعة', Reviewed: 'تمت المراجعة',
      'REQUEST FOR QUOTATION': 'طلب عرض سعر', 'Tell us what your business needs.': 'أخبرنا باحتياجات عملك.', 'Start your request': 'ابدأ طلبك', 'Select a role': 'اختر الدور', Buyer: 'مشتري', Supplier: 'مورد', Distributor: 'موزع', Investor: 'مستثمر', 'Company name *': 'اسم الشركة *', 'Business email *': 'البريد الإلكتروني للعمل *', 'Target market *': 'السوق المستهدف *', 'Product or requirement *': 'المنتج أو المتطلب *', 'Prepare secure inquiry →': 'جهّز استفساراً آمناً →', 'RFQ WORKFLOW': 'مسار طلب العرض', 'GI-Hub Review': 'مراجعة GI-Hub', 'Supplier Introduction': 'التعريف بالمورد',
      'INVEST IN THE REGION': 'استثمر في المنطقة', 'Opportunity at the crossroads': 'فرصة عند ملتقى الأسواق', 'INVESTMENT THEMES': 'محاور الاستثمار', 'OUR APPROACH': 'نهجنا', 'Local context.': 'السياق المحلي.', 'INTERESTED IN A CONVERSATION?': 'هل ترغب في التحدث؟', 'Discuss an opportunity →': 'ناقش فرصة →', 'View project details →': 'عرض تفاصيل المشروع →',
      'ABOUT GI-HUB': 'عن GI-Hub', 'Local intelligence.': 'خبرة محلية.', 'WHAT WE DO': 'ماذا نفعل', 'OUR PRINCIPLES': 'مبادئنا', 'THE NETWORK': 'الشبكة', 'Browse the marketplace →': 'تصفح السوق →', 'Explore investments →': 'استكشف الاستثمارات →',
      'CONTACT GI-HUB': 'تواصل مع GI-Hub', 'Start a focused': 'ابدأ', 'conversation.': 'محادثة هادفة.', 'HOW WE CAN HELP': 'كيف نساعدك', 'DIRECT CONTACT': 'اتصال مباشر', 'PRODUCT CONNECTION': 'ربط المنتج', 'SUPPLIER PROFILE': 'ملف المورد', 'Move from': 'انتقل من', 'profile to RFQ.': 'الملف إلى طلب العرض.'
    },
    tr: {
      'Skip to content': 'İçeriğe geç',
      'GLOBAL TRADE & INVESTMENT MARKETPLACE': 'KÜRESEL TİCARET VE YATIRIM PAZARYERİ', Marketplace: 'Pazaryeri', Categories: 'Kategoriler', Suppliers: 'Tedarikçiler', Investments: 'Yatırımlar', About: 'Hakkımızda', Contact: 'İletişim', 'Post an RFQ': 'Teklif Talebi Gönder', Menu: 'Menü',
      'Source Products': 'Ürün Bul', 'Browse export-ready offers': 'İhracata hazır teklifleri incele', 'Find Suppliers': 'Tedarikçi Bul', 'Meet qualified partners': 'Nitelikli ortaklarla tanışın', 'Receive tailored matches': 'Size uygun eşleşmeler alın', 'Explore Investments': 'Yatırımları Keşfet', 'Access regional growth': 'Bölgesel büyümeye erişin',
      'THE GATEWAY TO EURASIAN COMMERCE': 'AVRASYA TİCARETİNE AÇILAN KAPI', 'Trade beyond borders.': 'Sınırların ötesinde ticaret.', 'Invest with confidence.': 'Güvenle yatırım yapın.', 'Search products or suppliers': 'Ürün veya tedarikçi arayın', Category: 'Kategori', 'All product categories': 'Tüm ürün kategorileri', 'Search marketplace': 'Pazaryerinde ara', 'POPULAR:': 'POPÜLER:', 'Human-reviewed introductions': 'İnsan tarafından incelenmiş tanışmalar',
      'ONE NETWORK, FOUR WAYS IN': 'TEK AĞ, DÖRT GİRİŞ', 'Move from interest': 'İlgiden aksiyona', 'EXPLORE THE PLATFORM': 'PLATFORMU KEŞFEDİN', 'Choose your next': 'Sonraki adımınızı seçin', 'Browse by sector': 'Sektöre göre incele', 'Meet a supplier': 'Tedarikçiyle tanış', 'Explore an opportunity': 'Bir fırsatı keşfet', 'FEATURED INVESTMENT · REAL ESTATE': 'ÖNE ÇIKAN YATIRIM · GAYRİMENKUL', 'Explore project': 'Projeyi incele',
      'B2B LEAD MARKETPLACE': 'B2B FIRSAT PAZARYERİ', 'Products ready for': 'Uluslararası iş için ürünler', 'PRODUCTS': 'ÜRÜNLER', 'Browse products by category.': 'Ürünleri kategoriye göre inceleyin.', 'Product category': 'Ürün kategorisi', 'Search products': 'Ürün ara', 'Clear filters': 'Filtreleri temizle', 'Request a quote': 'Teklif iste', 'Request a Quote': 'Teklif İste', 'Request an introduction': 'Tanışma talep et', 'View product details': 'Ürün detaylarını görüntüle', 'FEATURED SOURCE PRODUCT': 'ÖNE ÇIKAN ÜRÜN', 'SERVICES · SEPARATE FROM PRODUCTS': 'HİZMETLER · ÜRÜNLERDEN AYRI', 'CAN’T FIND THE RIGHT LISTING?': 'Aradığınız ilanı bulamadınız mı?', 'Make the request': 'Talep oluştur',
      'EXPLORE THE MARKETPLACE': 'PAZARYERİNİ KEŞFEDİN', 'Trade opportunities,': 'Ticaret fırsatları,', 'PRODUCTS · MARKETPLACE': 'ÜRÜNLER · PAZARYERİ', 'SERVICES · SEPARATE DIRECTORY': 'HİZMETLER · AYRI DİZİN', 'HOW TO USE CATEGORIES': 'KATEGORİLER NASIL KULLANILIR', 'READY TO SOURCE?': 'Tedarik için hazır mısınız?',
      'TRUSTED BUSINESS NETWORK': 'GÜVENİLİR İŞ AĞI', 'Meet suppliers built': 'Tedarikçilerle tanışın', 'Search directory': 'Dizinde ara', Sector: 'Sektör', 'All sectors': 'Tüm sektörler', Reset: 'Sıfırla', 'Profiles reviewed by the GI-Hub team': 'GI-Hub ekibi tarafından incelenen profiller', 'Request an introduction →': 'Tanışma talep et →', 'Request a quote →': 'Teklif iste →', 'VERIFICATION FRAMEWORK': 'DOĞRULAMA ÇERÇEVESİ', 'Trust made': 'Güven net olsun', Registered: 'Kayıtlı', 'Business Verified': 'İşletme doğrulandı', 'GI-Hub Verified': 'GI-Hub doğrulandı', 'REGISTERED': 'KAYITLI', '✓ BUSINESS VERIFIED': '✓ İŞLETME DOĞRULANDI', '✓ GI-HUB VERIFIED': '✓ GI-HUB DOĞRULANDI', 'VERIFICATION SUMMARY': 'DOĞRULAMA ÖZETİ', 'Company Registration': 'Şirket kaydı', 'Business Activity': 'İş faaliyeti', 'Product Evidence': 'Ürün kanıtı', 'Export Capability': 'İhracat kapasitesi', 'Last Reviewed': 'Son inceleme', Reviewed: 'İncelendi',
      'REQUEST FOR QUOTATION': 'TEKLİF TALEBİ', 'Tell us what your business needs.': 'İşletmenizin neye ihtiyacı olduğunu anlatın.', 'Start your request': 'Talebinizi başlatın', 'Select a role': 'Rol seçin', Buyer: 'Alıcı', Supplier: 'Tedarikçi', Distributor: 'Distribütör', Investor: 'Yatırımcı', 'Company name *': 'Şirket adı *', 'Business email *': 'İş e-postası *', 'Target market *': 'Hedef pazar *', 'Product or requirement *': 'Ürün veya gereksinim *', 'Prepare secure inquiry →': 'Güvenli talep hazırla →', 'RFQ WORKFLOW': 'RFQ SÜRECİ', 'GI-Hub Review': 'GI-Hub incelemesi', 'Supplier Introduction': 'Tedarikçi tanıştırması',
      'INVEST IN THE REGION': 'BÖLGEYE YATIRIM YAPIN', 'Opportunity at the crossroads': 'Kesişim noktasında fırsat', 'INVESTMENT THEMES': 'YATIRIM TEMALARI', 'OUR APPROACH': 'YAKLAŞIMIMIZ', 'Local context.': 'Yerel bağlam.', 'INTERESTED IN A CONVERSATION?': 'Görüşmek ister misiniz?', 'Discuss an opportunity →': 'Bir fırsatı görüşün →', 'View project details →': 'Proje detaylarını görüntüle →',
      'ABOUT GI-HUB': 'GI-HUB HAKKINDA', 'Local intelligence.': 'Yerel bilgi.', 'WHAT WE DO': 'NE YAPIYORUZ', 'OUR PRINCIPLES': 'İLKELERİMİZ', 'THE NETWORK': 'AĞ', 'Browse the marketplace →': 'Pazaryerini görüntüle →', 'Explore investments →': 'Yatırımları keşfet →',
      'CONTACT GI-HUB': 'GI-HUB İLE İLETİŞİM', 'Start a focused': 'Odaklı bir', 'conversation.': 'görüşme başlatın.', 'HOW WE CAN HELP': 'NASIL YARDIMCI OLABİLİRİZ', 'DIRECT CONTACT': 'DOĞRUDAN İLETİŞİM', 'PRODUCT CONNECTION': 'ÜRÜN BAĞLANTISI', 'SUPPLIER PROFILE': 'TEDARİKÇİ PROFİLİ', 'Move from': 'Profilden', 'profile to RFQ.': 'RFQ talebine.'
    }
  };

  const getCurrentLocale = function () {
    const documentLocale = document.documentElement.dataset.locale;
    if (localeOptions.some(function (locale) { return locale.code === documentLocale; })) return documentLocale;
    const pathLocale = window.location.pathname.match(/\/(en|ka|ru|zh|ar|tr)(?:\/|$)/);
    return pathLocale ? pathLocale[1] : 'en';
  };

  const getCurrentPageName = function () {
    const path = window.location.pathname.replace(/\\/g, '/');
    const localePath = path.match(/\/(en|ka|ru|zh|ar|tr)(?:\/(.*))?$/);
    if (localePath) return localePath[2] || 'index.html';
    const file = path.split('/').filter(Boolean).pop();
    return file && file.endsWith('.html') ? file : 'index.html';
  };

  const localizedPageHref = function (locale, pageName) {
    return '/' + locale + '/' + (pageName === 'index.html' ? '' : pageName);
  };

  const assetHref = function (path) {
    const prefix = document.documentElement.dataset.locale ? '../' : '';
    return new URL(prefix + path, document.baseURI).href;
  };

  const applyLocaleTranslations = function () {
    const messages = localeMessages[getCurrentLocale()];
    if (!messages) return;
    document.querySelectorAll('select option').forEach(function (option) {
      if (!option.hasAttribute('value')) option.setAttribute('value', option.textContent.trim());
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode.parentElement && !currentNode.parentElement.closest('script, style, template')) textNodes.push(currentNode);
    }
    textNodes.forEach(function (textNode) {
      const source = textNode.nodeValue;
      const key = source.trim();
      if (!key || !Object.prototype.hasOwnProperty.call(messages, key)) return;
      const start = source.indexOf(key);
      textNode.nodeValue = source.slice(0, start) + messages[key] + source.slice(start + key.length);
    });
  };

  const addContactNavigation = function () {
    const pageName = getCurrentPageName();
    document.querySelectorAll('header nav:not([data-mobile-nav])').forEach(function (nav) {
      if (nav.querySelector('[data-nav="contact"]')) return;
      const contact = document.createElement('a');
      contact.className = 'hover:text-[#547000]';
      contact.href = localizedPageHref(getCurrentLocale(), 'contact.html');
      contact.dataset.nav = 'contact';
      contact.textContent = 'Contact';
      nav.appendChild(contact);
    });
    document.querySelectorAll('header [data-mobile-nav]').forEach(function (nav) {
      if (nav.querySelector('[data-nav="contact"]')) return;
      const contact = document.createElement('a');
      contact.className = 'hover:text-[#547000]';
      contact.href = localizedPageHref(getCurrentLocale(), 'contact.html');
      contact.dataset.nav = 'contact';
      contact.textContent = 'Contact';
      nav.appendChild(contact);
    });
    if (pageName === 'contact.html') document.body.dataset.page = 'contact';
  };

  const createLanguageSwitcher = function (mobile) {
    const wrapper = document.createElement('div');
    wrapper.className = 'site-language-switcher' + (mobile ? ' site-language-switcher--mobile' : '');
    const trigger = document.createElement('button');
    const menuId = 'language-menu-' + (mobile ? 'mobile' : 'desktop');
    trigger.className = 'site-language-switcher__trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Choose language');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menuId);
    trigger.dataset.languageSwitcher = 'true';

    const icon = document.createElement('span');
    icon.className = 'site-language-switcher__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-6.5-3.5-9S9.7 5.5 12 3Z"></path></svg>';
    const code = document.createElement('span');
    code.textContent = 'EN';
    const chevron = document.createElement('span');
    chevron.className = 'site-language-switcher__chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '▾';
    trigger.appendChild(icon);
    trigger.appendChild(code);
    trigger.appendChild(chevron);

    const menu = document.createElement('div');
    menu.className = 'site-language-switcher__menu';
    menu.id = menuId;
    menu.hidden = true;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Languages');
    const currentLocale = getCurrentLocale();
    localeOptions.forEach(function (locale) {
      const option = document.createElement('button');
      option.className = 'site-language-switcher__option';
      option.type = 'button';
      option.textContent = locale.label;
      option.dataset.locale = locale.code;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', String(locale.code === currentLocale));
      option.addEventListener('click', function () {
        window.location.href = localizedPageHref(locale.code, getCurrentPageName());
      });
      menu.appendChild(option);
    });

    const closeMenu = function (restoreFocus) {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus) trigger.focus();
    };

    trigger.addEventListener('click', function () {
      const isOpen = !menu.hidden;
      menu.hidden = isOpen;
      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) trigger.focus();
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (menu.hidden) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
        const selected = menu.querySelector('[aria-selected="true"]');
        (selected || menu.querySelector('[role="option"]')).focus();
      }
    });

    menu.addEventListener('keydown', function (event) {
      const options = Array.from(menu.querySelectorAll('[role="option"]'));
      const currentIndex = options.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        options[(currentIndex + 1) % options.length].focus();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        options[(currentIndex - 1 + options.length) % options.length].focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!wrapper.contains(event.target)) closeMenu(false);
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    return wrapper;
  };

  const addLanguageSwitchers = function () {
    document.querySelectorAll('header nav:not([data-mobile-nav])').forEach(function (nav) {
      if (!nav.querySelector('[data-language-switcher]')) nav.appendChild(createLanguageSwitcher(false));
    });
    document.querySelectorAll('header [data-mobile-nav]').forEach(function (nav) {
      if (!nav.querySelector('[data-language-switcher]')) nav.appendChild(createLanguageSwitcher(true));
    });
  };

  const enhanceTextSymbols = function (symbol, className, iconId) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      if (currentNode.nodeValue && currentNode.nodeValue.includes(symbol)) textNodes.push(currentNode);
    }

    textNodes.forEach(function (textNode) {
      const parts = textNode.nodeValue.split(symbol);
      const fragment = document.createDocumentFragment();
      parts.forEach(function (part, index) {
        if (part) fragment.appendChild(document.createTextNode(part));
        if (index < parts.length - 1) {
          const icon = document.createElement('span');
          icon.className = className;
          icon.setAttribute('aria-hidden', 'true');
          icon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><use href="' + assetHref('assets/images/icons.svg#' + iconId) + '"></use></svg>';
          fragment.appendChild(icon);
        }
      });
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  };

  const standardizeVerificationBadges = function () {
    const labels = {
      registered: 'Registered',
      'business-verified': 'Business Verified',
      'gi-hub-verified': 'GI-Hub Verified'
    };
    document.querySelectorAll('[data-supplier-verification], [data-marketplace-verification]').forEach(function (badge) {
      const card = badge.closest('[data-supplier-card], [data-product-card]');
      const explicitLevel = (card && card.dataset.verificationLevel) || badge.dataset.verificationLevel;
      const level = Object.prototype.hasOwnProperty.call(labels, explicitLevel) ? explicitLevel : (card && card.dataset.verified === 'true' ? 'gi-hub-verified' : 'business-verified');
      if (card) card.dataset.verificationLevel = level;
      badge.dataset.verificationLevel = level;
      badge.setAttribute('aria-label', 'Verification level: ' + labels[level]);
      badge.textContent = level === 'registered' ? 'REGISTERED' : '✓ ' + labels[level].toUpperCase();
    });
  };

  const supplierVerificationDetails = {
    'Caucasus Mineral Co.': { reviewed: '19 Sep 2026' },
    'Kartli Harvest': { reviewed: '19 Sep 2026' },
    'Tbilisi Fabrication Works': { reviewed: '19 Sep 2026' },
    'Health Line Georgia': { reviewed: '19 Sep 2026' },
    Valinezhad: { reviewed: '19 Sep 2026' }
  };

  const renderSupplierVerificationDetails = function () {
    document.querySelectorAll('[data-supplier-card]').forEach(function (card) {
      if (card.dataset.verificationLevel !== 'gi-hub-verified') return;

      const name = card.querySelector('h3, h2');
      const badge = card.querySelector('[data-supplier-verification]');
      const companyInfo = card.querySelector('[data-supplier-company-info]');
      const details = name && supplierVerificationDetails[name.textContent.trim()];
      if (!details || !badge || !companyInfo) return;

      const verificationMeta = document.createElement('div');
      verificationMeta.className = 'supplier-verification-meta';

      const review = document.createElement('span');
      review.className = 'supplier-last-reviewed';
      review.setAttribute('data-last-reviewed', 'true');
      const reviewLabel = document.createElement('span');
      reviewLabel.textContent = 'Last Reviewed';
      const reviewDate = document.createElement('b');
      reviewDate.textContent = details.reviewed;
      review.appendChild(reviewLabel);
      review.appendChild(reviewDate);

      badge.parentNode.insertBefore(verificationMeta, badge);
      verificationMeta.appendChild(badge);
      verificationMeta.appendChild(review);

      const summary = document.createElement('div');
      summary.className = 'supplier-verification-summary';
      summary.setAttribute('data-verification-summary', 'gi-hub-verified');
      const summaryTitle = document.createElement('p');
      summaryTitle.textContent = 'VERIFICATION SUMMARY';
      summary.appendChild(summaryTitle);

      const summaryList = document.createElement('dl');
      ['Company Registration', 'Business Activity', 'Product Evidence', 'Export Capability'].forEach(function (item) {
        const summaryItem = document.createElement('div');
        const label = document.createElement('dt');
        const status = document.createElement('dd');
        label.textContent = item;
        status.textContent = 'Reviewed';
        summaryItem.appendChild(label);
        summaryItem.appendChild(status);
        summaryList.appendChild(summaryItem);
      });
      summary.appendChild(summaryList);
      companyInfo.insertAdjacentElement('afterend', summary);
    });
  };

  standardizeVerificationBadges();
  renderSupplierVerificationDetails();
  addContactNavigation();
  addLanguageSwitchers();
  applyLocaleTranslations();
  enhanceTextSymbols('→', 'icon-arrow', 'arrow');
  enhanceTextSymbols('✓', 'icon-check', 'check');

  document.querySelectorAll('[data-nav]').forEach(function (link) {
    if (link.dataset.nav === page) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('text-[#547000]');
    }
  });

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  document.querySelectorAll('[data-quick-search]').forEach(function (button) {
    button.addEventListener('click', function () {
      const form = document.querySelector('[data-product-search-form]');
      const input = form && form.querySelector('input[name="q"]');
      if (!form || !input) return;
      input.value = button.dataset.quickSearch || '';
      form.requestSubmit();
    });
  });

  const params = new URLSearchParams(window.location.search);
  const rfqProduct = params.get('product');
  const rfqSupplier = params.get('supplier') || params.get('company');
  const storedRfqId = params.get('rfq');
  const rfqForm = document.querySelector('[data-marketplace-form]');
  if (rfqForm && (rfqProduct || rfqSupplier)) {
    const requirementField = rfqForm.querySelector('textarea[name="requirement"]');
    const requestContext = [];
    if (rfqProduct) requestContext.push('Product: ' + rfqProduct);
    if (rfqSupplier) requestContext.push('Preferred supplier: ' + rfqSupplier);
    if (requirementField) requirementField.value = requestContext.join('\n') + '\n\n';
  }
  if (rfqForm && (rfqProduct || rfqSupplier)) {
    const roleField = rfqForm.querySelector('select[name="role"]');
    if (roleField && !roleField.value) roleField.value = 'Buyer';
  }

  const rfqStorageKey = 'gi-hub-rfq-records';
  const getStoredRfq = function (id) {
    if (!id) return null;
    try {
      const records = JSON.parse(window.localStorage.getItem(rfqStorageKey) || '{}');
      return records[id] || null;
    } catch (error) {
      return null;
    }
  };
  const saveRfq = function (record) {
    try {
      const records = JSON.parse(window.localStorage.getItem(rfqStorageKey) || '{}');
      records[record.id] = record;
      window.localStorage.setItem(rfqStorageKey, JSON.stringify(records));
    } catch (error) {
      // The confirmation still renders when browser storage is unavailable.
    }
  };
  const createRfqId = function () {
    const now = new Date();
    const suffix = String(now.getTime()).slice(-6) + Math.random().toString(36).slice(2, 5).toUpperCase();
    return 'GI-RFQ-' + now.getFullYear() + '-' + suffix;
  };
  const renderRfqConfirmation = function (record) {
    const confirmation = document.querySelector('[data-rfq-confirmation]');
    if (!confirmation || !record) return;
    const id = confirmation.querySelector('[data-rfq-id]');
    const summary = confirmation.querySelector('[data-rfq-summary]');
    const nextStep = confirmation.querySelector('[data-rfq-next-step]');
    const supplierLink = confirmation.querySelector('[data-rfq-supplier-link]');
    const reviewStatus = confirmation.querySelector('[data-rfq-step="review"] [data-rfq-step-status]');
    const introductionStatus = confirmation.querySelector('[data-rfq-step="introduction"] [data-rfq-step-status]');
    if (id) id.textContent = record.id;
    if (summary) {
      const productSummary = record.product ? record.product : 'your business requirement';
      const supplierSummary = record.supplier ? ' for ' + record.supplier : '';
      summary.textContent = 'We have captured ' + productSummary + supplierSummary + '. The next step is a GI-Hub review before a supplier introduction.';
    }
    if (nextStep) nextStep.textContent = record.supplier ? 'GI-Hub will review the request and follow up using the business email provided before coordinating an introduction to ' + record.supplier + '.' : 'GI-Hub will review the request and follow up using the business email provided with relevant supplier options.';
    if (reviewStatus) reviewStatus.textContent = '02 · IN REVIEW';
    if (introductionStatus) introductionStatus.textContent = '03 · AFTER REVIEW';
    if (supplierLink) {
      if (record.supplier) {
        const supplierUrl = new URL('suppliers.html', window.location.href);
        supplierUrl.searchParams.set('company', record.supplier);
        if (record.product) supplierUrl.searchParams.set('product', record.product);
        supplierLink.href = 'suppliers.html?' + supplierUrl.searchParams.toString();
        supplierLink.textContent = 'View ' + record.supplier + ' profile →';
      } else {
        supplierLink.href = 'suppliers.html';
        supplierLink.textContent = 'Browse suppliers →';
      }
    }
    confirmation.hidden = false;
  };
  if (rfqForm && storedRfqId) {
    const storedRfq = getStoredRfq(storedRfqId);
    if (storedRfq) {
      rfqForm.hidden = true;
      renderRfqConfirmation(storedRfq);
    }
  }

  const marketQuery = document.querySelector('[data-market-query]');
  const marketCategory = document.querySelector('[data-market-category]');
  const marketVerified = document.querySelector('[data-market-verified]');
  const productCards = Array.from(document.querySelectorAll('[data-product-card]'));
  const sourceProductShowcase = document.querySelector('[data-source-product-showcase]');
  const sourceProductSearchTerms = sourceProductShowcase && sourceProductShowcase.id === 'natural-stone'
    ? ' iranian natural stone stone type origin size thickness finish moq capacity packaging incoterm marble travertine onyx limestone iran large slabs custom slab tile sizes 1 cm 1.5 cm 2 cm 3 cm polished honed tumbled brushed chiseled leathered 1 x 20 ft container project-specific export supply seaworthy wooden crates fumigation to be agreed per rfq'
    : '';
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');

  if (marketQuery && marketCategory && (productCards.length || sourceProductShowcase)) {
    marketQuery.value = params.get('q') || '';
    marketCategory.value = params.get('category') || '';

    const applyMarketFilters = function () {
      const query = marketQuery.value.trim().toLowerCase();
      const category = marketCategory.value.toLowerCase();
      const verifiedOnly = Boolean(marketVerified && marketVerified.checked);
      let visible = 0;

      productCards.forEach(function (card) {
        const matchesQuery = !query || (card.dataset.search || '').toLowerCase().includes(query);
        const matchesCategory = !category || (card.dataset.category || '').toLowerCase() === category;
        const verificationLevel = card.dataset.verificationLevel || (card.dataset.verified === 'true' ? 'gi-hub-verified' : 'registered');
        const matchesVerified = !verifiedOnly || verificationLevel !== 'registered';
        const matches = matchesQuery && matchesCategory && matchesVerified;
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      if (sourceProductShowcase) {
        const sourceSearchIndex = ((sourceProductShowcase.dataset.marketSearch || '') + sourceProductSearchTerms).toLowerCase();
        const sourceMatchesQuery = !query || sourceSearchIndex.includes(query);
        const sourceMatchesCategory = !category || (sourceProductShowcase.dataset.marketCategory || '').toLowerCase() === category;
        const sourceMatchesVerified = !verifiedOnly || sourceProductShowcase.dataset.marketVerified !== 'false';
        const sourceMatches = sourceMatchesQuery && sourceMatchesCategory && sourceMatchesVerified;
        sourceProductShowcase.hidden = !sourceMatches;
        if (sourceMatches) visible += 1;
      }

      if (resultCount) {
        resultCount.textContent = visible + ' ' + (visible === 1 ? 'listing' : 'listings') + ' available';
        resultCount.hidden = visible === 0;
      }
      if (emptyState) emptyState.hidden = visible !== 0;
    };

    [marketQuery, marketCategory, marketVerified].filter(Boolean).forEach(function (control) {
      control.addEventListener('input', applyMarketFilters);
      control.addEventListener('change', applyMarketFilters);
    });

    const clearButton = document.querySelector('[data-clear-filters]');
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        marketQuery.value = '';
        marketCategory.value = '';
        if (marketVerified) marketVerified.checked = false;
        history.replaceState({}, '', window.location.pathname);
        applyMarketFilters();
      });
    }
    applyMarketFilters();
  }

  const supplierQuery = document.querySelector('[data-supplier-query]');
  const supplierSector = document.querySelector('[data-supplier-sector]');
  const supplierCountry = document.querySelector('[data-supplier-country]');
  const supplierCards = Array.from(document.querySelectorAll('[data-supplier-card]'));
  if (supplierQuery && supplierSector && supplierCards.length) {
    supplierSector.value = params.get('sector') || '';
    if (!supplierQuery.value && (params.get('company') || params.get('supplier'))) supplierQuery.value = params.get('company') || params.get('supplier');

    const applySupplierFilters = function () {
      const query = supplierQuery.value.trim().toLowerCase();
      const sector = supplierSector.value.toLowerCase();
      const country = supplierCountry ? supplierCountry.value.toLowerCase() : '';
      const verified = document.querySelector('[data-supplier-verified]');
      const verifiedOnly = Boolean(verified && verified.checked);
      let visible = 0;

      supplierCards.forEach(function (card) {
        const haystack = (card.dataset.search || '').toLowerCase();
        const verificationLevel = card.dataset.verificationLevel || (card.dataset.verified === 'true' ? 'gi-hub-verified' : 'registered');
        const matches = (!query || haystack.includes(query)) &&
          (!sector || (card.dataset.sector || '').toLowerCase() === sector) &&
          (!country || (card.dataset.country || '').toLowerCase() === country) &&
          (!verifiedOnly || verificationLevel !== 'registered');
        card.hidden = !matches;
        if (matches) visible += 1;
        const requestLink = card.querySelector('a[href^="rfq.html?"]');
        if (requestLink) {
          const linkUrl = new URL(requestLink.getAttribute('href'), window.location.href);
          const supplier = linkUrl.searchParams.get('supplier') || linkUrl.searchParams.get('company');
          if (supplier) {
            linkUrl.searchParams.set('supplier', supplier);
            linkUrl.searchParams.delete('company');
          }
          if (rfqProduct) linkUrl.searchParams.set('product', rfqProduct);
          requestLink.href = 'rfq.html?' + linkUrl.searchParams.toString();
        }
      });
      const count = document.querySelector('[data-supplier-count]');
      const empty = document.querySelector('[data-supplier-empty]');
      if (count) {
        count.textContent = visible + ' ' + (visible === 1 ? 'supplier' : 'suppliers') + ' match your filters';
        count.hidden = visible === 0;
      }
      if (empty) empty.hidden = visible !== 0;
    };

    [supplierQuery, supplierSector, supplierCountry, document.querySelector('[data-supplier-verified]')].filter(Boolean).forEach(function (control) {
      control.addEventListener('input', applySupplierFilters);
      control.addEventListener('change', applySupplierFilters);
    });
    const clearSuppliers = document.querySelector('[data-clear-suppliers]');
    if (clearSuppliers) clearSuppliers.addEventListener('click', function () {
      supplierQuery.value = '';
      supplierSector.value = '';
      if (supplierCountry) supplierCountry.value = '';
      const verified = document.querySelector('[data-supplier-verified]');
      if (verified) verified.checked = false;
      applySupplierFilters();
    });
    applySupplierFilters();
  }

  document.querySelectorAll('[data-marketplace-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const status = form.querySelector('[data-marketplace-form-status]');
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Please complete the required fields.';
        return;
      }
      const formData = new FormData(form);
      const record = {
        id: createRfqId(),
        createdAt: new Date().toISOString(),
        product: rfqProduct || '',
        supplier: rfqSupplier || '',
        role: formData.get('role') || '',
        company: formData.get('company') || '',
        email: formData.get('email') || '',
        market: formData.get('market') || '',
        requirement: formData.get('requirement') || ''
      };
      saveRfq(record);
      if (status) status.textContent = 'RFQ ' + record.id + ' submitted.';
      form.hidden = true;
      const confirmationUrl = new URL(window.location.href);
      confirmationUrl.search = '?rfq=' + encodeURIComponent(record.id);
      window.history.replaceState({}, '', confirmationUrl.pathname + confirmationUrl.search);
      renderRfqConfirmation(record);
      const confirmation = document.querySelector('[data-rfq-confirmation]');
      if (confirmation) confirmation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
  if (lightbox && lightboxTriggers.length) {
    const lightboxImage = lightbox.querySelector('[data-lightbox-image]');
    const lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    const lightboxCloseButtons = lightbox.querySelectorAll('[data-lightbox-close]');
    let previousFocus = null;

    const closeLightbox = function () {
      lightbox.hidden = true;
      document.body.classList.remove('source-product-lightbox-open');
      if (lightboxImage) lightboxImage.removeAttribute('src');
      if (previousFocus) previousFocus.focus();
      previousFocus = null;
    };

    const openLightbox = function (trigger) {
      if (!lightboxImage) return;
      previousFocus = trigger;
      lightboxImage.src = trigger.dataset.lightboxSrc || '';
      lightboxImage.alt = trigger.dataset.lightboxAlt || '';
      if (lightboxCaption) lightboxCaption.textContent = trigger.dataset.lightboxCaption || '';
      lightbox.hidden = false;
      document.body.classList.add('source-product-lightbox-open');
      const closeButton = lightbox.querySelector('[data-lightbox-close]');
      if (closeButton) closeButton.focus();
    };

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openLightbox(trigger);
      });
    });

    lightboxCloseButtons.forEach(function (button) {
      button.addEventListener('click', closeLightbox);
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
    });
  }
})();
