// Original FINRA SIE exam-style practice bank based on public outline topics.
// Not copied from secure or copyrighted live FINRA examination items.

export const SECTIONS = {
  1: {
    id: 1,
    name: "Knowledge of Capital Markets",
    nameTr: "Sermaye Piyasaları Bilgisi",
    weight: "16%",
    targetQuestions: 12,
    description: "Structure of financial markets, regulatory bodies, monetary and fiscal policy, market participants, and primary vs. secondary offerings."
  },
  2: {
    id: 2,
    name: "Understanding Products and Their Risks",
    nameTr: "Ürünler ve Risklerinin Anlaşılması",
    weight: "44%",
    targetQuestions: 33,
    description: "Equities, debt instruments, municipal bonds, packaged products (mutual funds, ETFs, REITs, DPPs), options, and investment risks."
  },
  3: {
    id: 3,
    name: "Understanding Trading, Customer Accounts and Prohibited Activities",
    nameTr: "İşlemler, Müşteri Hesapları ve Yasaklı Faaliyetler",
    weight: "31%",
    targetQuestions: 23,
    description: "Settlement, order types, margin accounts, account registrations, anti-money laundering (AML), and prohibited activities."
  },
  4: {
    id: 4,
    name: "Overview of Regulatory Framework",
    nameTr: "Düzenleyici Çerçeveye Genel Bakış",
    weight: "9%",
    targetQuestions: 7,
    description: "SROs, registration requirements (Form U4/U5), statutory disqualification, continuing education, and conduct rules."
  }
};

export const QUESTIONS = [
  // ==========================================
  // SECTION 1: KNOWLEDGE OF CAPITAL MARKETS (16%)
  // ==========================================
  {
    id: "q-1-01",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Primary vs Secondary Markets",
    difficulty: "Easy",
    question: "Which of the following describes the primary market for securities?",
    questionTr: "Menkul kıymetler için birincil piyasayı (primary market) aşağıdakilerden hangisi tanımlar?",
    options: [
      "Where securities are traded between investors on an exchange",
      "Where existing shares are bought and sold through broker-dealers",
      "Where new securities are first issued and sold to the public, with proceeds going to the issuer",
      "Where institutional investors trade large blocks of stock directly without an intermediary"
    ],
    optionsTr: [
      "Menkul kıymetlerin bir borsada yatırımcılar arasında alınıp satıldığı yer",
      "Mevcut hisselerin aracı kurumlar üzerinden alınıp satıldığı yer",
      "Yeni menkul kıymetlerin ilk kez ihraç edilip halka satıldığı ve gelirin ihraççıya gittiği yer",
      "Kurumsal yatırımcıların aracı olmadan doğrudan büyük hisse blokları alıp sattığı yer"
    ],
    correctAnswer: 2,
    explanation: "In the primary market, new securities are created and sold directly to the public for the first time (such as in an IPO). The issuer receives the proceeds from the sale. In contrast, the secondary market is where investors trade existing securities among themselves.",
    explanationTr: "Birincil piyasada (primary market), yeni menkul kıymetler ilk defa oluşturulup halka arz edilir (IPO gibi) ve satıştan elde edilen gelir doğrudan ihraççı şirkete aktarılır. İkincil piyasada ise yatırımcılar ellerindeki mevcut hisseleri birbirleri arasında alıp satarlar.",
    ruleReference: "Securities Act of 1933 / FINRA SIE Topic 1.2",
    keyTakeaway: "Primary Market = Proceeds go to the Issuer. Secondary Market = Trades between investors."
  },
  {
    id: "q-1-02",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Monetary vs Fiscal Policy",
    difficulty: "Medium",
    question: "Which of the following actions is considered a tool of fiscal policy rather than monetary policy?",
    questionTr: "Aşağıdakilerden hangisi para politikası yerine maliye politikasının (fiscal policy) bir aracı olarak kabul edilir?",
    options: [
      "Buying and selling U.S. Treasury securities in the open market",
      "Changing the discount rate charged to commercial banks",
      "Adjusting marginal income and corporate tax rates",
      "Altering the reserve requirement for depository institutions"
    ],
    optionsTr: [
      "Açık piyasada ABD Hazine tahvillerinin alınıp satılması",
      "Ticari bankalara uygulanan iskonto oranının (discount rate) değiştirilmesi",
      "Bireysel gelir ve kurumlar vergisi oranlarının ayarlanması",
      "Mevduat kabul eden kurumlar için zorunlu karşılık oranlarının değiştirilmesi"
    ],
    correctAnswer: 2,
    explanation: "Fiscal policy is enacted by the President and Congress through government spending and taxation. Monetary policy is controlled by the Federal Reserve Board (FRB) through open market operations (buying/selling government debt), the discount rate, and reserve requirements.",
    explanationTr: "Maliye politikası (fiscal policy), Kongre ve Başkan tarafından hükümet harcamaları ve vergi oranları aracılığıyla yürütülür. Para politikası (monetary policy) ise Federal Rezerv (Fed) tarafından açık piyasa işlemleri, iskonto oranı ve zorunlu karşılıklar ile idare edilir.",
    ruleReference: "Federal Reserve Act / Keynesian vs Monetarist Economic Theory",
    keyTakeaway: "Fiscal Policy = Taxes & Spending (Congress/President). Monetary Policy = Money Supply & Interest Rates (Federal Reserve)."
  },
  {
    id: "q-1-03",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Broker vs Dealer Capacity",
    difficulty: "Easy",
    question: "When a firm acts as a 'broker' in a securities transaction, it is acting in which capacity and earns which type of compensation?",
    questionTr: "Bir aracı kurum menkul kıymet işleminde 'broker' (vekil) olarak hareket ettiğinde hangi sıfatla işlem yapar ve ne tür bir kazanç elde eder?",
    options: [
      "Principal capacity and earns a markup or markdown",
      "Agent capacity and earns a commission",
      "Dealer capacity and takes inventory risk for a spread",
      "Underwriter capacity and earns a management concession"
    ],
    optionsTr: [
      "Asil (principal) sıfatıyla ve marj / indirim (markup/markdown) kazanır",
      "Vekil (agent) sıfatıyla ve komisyon (commission) kazanır",
      "Bayi (dealer) sıfatıyla ve spread karşılığında envanter riski üstlenir",
      "Yüklenici (underwriter) sıfatıyla ve yönetim payı kazanır"
    ],
    correctAnswer: 1,
    explanation: "Remember the acronym 'BAC/DPMM': Broker acts as Agent and charges a Commission; Dealer acts as Principal, trades from its own inventory, and charges a Markup or Markdown.",
    explanationTr: "'BAC/DPMM' kuralı: Broker, Ajan (Agent) olarak hareket eder ve Komisyon alır. Dealer ise Asil (Principal) olarak kendi portföyünden alıp satar ve Fiyat Marjı (Markup/Markdown) uygular.",
    ruleReference: "Exchange Act Rule 10b-10 / Broker-Dealer Capacities",
    keyTakeaway: "Broker = Agent = Commission. Dealer = Principal = Markup/Markdown."
  },
  {
    id: "q-1-04",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "SIPC vs FDIC Protection",
    difficulty: "Medium",
    question: "Under the Securities Investor Protection Act of 1970, SIPC provides coverage for customer accounts up to what maximum amount in the event of a broker-dealer's bankruptcy?",
    questionTr: "1970 tarihli Menkul Kıymetler Yatırımcısı Koruma Yasası uyarınca SIPC, bir aracı kurumun iflası durumunda müşteri hesaplarını en fazla ne kadara kadar güvence altına alır?",
    options: [
      "$250,000 per customer, all of which may be cash",
      "$500,000 per separate customer, of which no more than $250,000 may be for cash claims",
      "$1,000,000 per account including up to $500,000 in cash",
      "$500,000 per account with no limit on the cash portion"
    ],
    optionsTr: [
      "Müşteri başına tamamı nakit olabilecek 250.000 dolar",
      "Ayrı müşteri başına 500.000 dolar, bunun en fazla 250.000 doları nakit talepleri için olabilir",
      "500.000 dolara kadar nakit dahil olmak üzere hesap başına 1.000.000 dolar",
      "Nakit kısmı için herhangi bir sınır olmaksızın hesap başına 500.000 dolar"
    ],
    correctAnswer: 1,
    explanation: "SIPC protects customer accounts against broker-dealer insolvency up to $500,000 per separate customer, with a maximum of $250,000 for cash claims. Note that SIPC does not protect against market losses or fraud from non-member firms, and FDIC covers commercial bank deposits up to $250,000.",
    explanationTr: "SIPC (Securities Investor Protection Corporation), aracı kurumun iflası halinde ayrı müşteri başına 500.000 dolara kadar koruma sağlar; bunun en fazla 250.000 doları nakit olabilir. SIPC piyasadaki fiyat düşüşlerini (piyasa zararını) karşılamaz.",
    ruleReference: "Securities Investor Protection Act (SIPA) / SIPC Limits",
    keyTakeaway: "SIPC limit = $500,000 total per separate customer, max $250,000 cash. FDIC = $250,000 per depositor per bank."
  },
  {
    id: "q-1-05",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Underwriting Commitments",
    difficulty: "Medium",
    question: "In which type of underwriting agreement does the underwriting syndicate agree to purchase all unsold shares from an issuer's rights offering?",
    questionTr: "Hangi tür halka arz aracılık anlaşmasında konsorsiyum, ihraççının rüçhan hakkı ihracında satılmayan tüm hisseleri satın almayı taahhüt eder?",
    options: [
      "Best efforts underwriting",
      "All-or-none underwriting",
      "Standby underwriting",
      "Mini-max underwriting"
    ],
    optionsTr: [
      "En iyi gayret (best efforts) aracılığı",
      "Ya hepsi ya hiç (all-or-none) aracılığı",
      "Yedek / Bekleme (standby) aracılığı",
      "Mini-max aracılığı"
    ],
    correctAnswer: 2,
    explanation: "In a standby underwriting, an underwriter agrees to stand by and purchase any unexercised rights or unsold shares from an existing shareholder rights offering, thereby guaranteeing that the issuer raises the full amount of desired capital.",
    explanationTr: "Standby (yedek yüklenim) anlaşmasında, aracı konsorsiyum rüçhan hakkı kullanımından sonra kalan tüm satılmamış hisseleri satın almayı taahhüt eder ve böylece ihraççının hedeflediği tüm sermayeyi toplamasını garanti eder.",
    ruleReference: "Securities Act of 1933 / Underwriting Commitments",
    keyTakeaway: "Standby Underwriting = Used exclusively with rights offerings where underwriters buy any unsubscribed shares."
  },
  {
    id: "q-1-06",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Federal Reserve Interest Rates",
    difficulty: "Medium",
    question: "Which of the following benchmark interest rates is set directly by the Federal Reserve Board?",
    questionTr: "Aşağıdaki gösterge faiz oranlarından hangisi doğrudan Federal Rezerv Kurulu (Fed) tarafından belirlenir?",
    options: [
      "Federal funds rate",
      "Discount rate",
      "Prime rate",
      "Broker call loan rate"
    ],
    optionsTr: [
      "Federal fonlama oranı (federal funds rate)",
      "İskonto oranı (discount rate)",
      "Asal faiz oranı (prime rate)",
      "Broker çağrı kredisi oranı (broker call loan rate)"
    ],
    correctAnswer: 1,
    explanation: "The Discount Rate is the interest rate charged by the Federal Reserve Banks to depository institutions for short-term loans, and it is the ONLY interest rate directly set by the Fed. The Federal funds rate is negotiated between commercial banks (though targeted by the Fed), while the Prime rate is set by individual commercial banks.",
    explanationTr: "İskonto Oranı (Discount Rate), Fed'in doğrudan belirlediği TEK faiz oranıdır. Federal Fonlama Oranı (Fed Funds Rate) ise bankaların birbirlerine gecelik borç verirken uyguladığı piyasa oranıdır (Fed bunu bir hedef aralık ile yönlendirir). Prime rate ise ticari bankalarca belirlenir.",
    ruleReference: "Federal Reserve Act / Monetary Policy Tools",
    keyTakeaway: "Discount Rate = Directly set by the Fed. Federal Funds Rate = Market-driven rate between banks, targeted by FOMC."
  },
  {
    id: "q-1-07",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Economic Indicators",
    difficulty: "Hard",
    question: "Which of the following is classified as a coincident economic indicator?",
    questionTr: "Aşağıdakilerden hangisi eşzamanlı (coincident) bir ekonomik gösterge olarak sınıflandırılır?",
    options: [
      "Average duration of unemployment",
      "S&P 500 stock index",
      "Industrial production index",
      "Building permits for private housing"
    ],
    optionsTr: [
      "Ortalama işsizlik süresi",
      "S&P 500 borsa endeksi",
      "Sanayi üretim endeksi (industrial production)",
      "Özel konut inşaat izinleri"
    ],
    correctAnswer: 2,
    explanation: "Industrial production, nonfarm payrolls, manufacturing and trade sales, and personal income less transfer payments are coincident indicators (they reflect current economic conditions). S&P 500 and building permits are leading indicators. Duration of unemployment is a lagging indicator.",
    explanationTr: "Sanayi üretimi (industrial production), tarım dışı istihdam ve kişisel gelir eşzamanlı (coincident) göstergelerdir. Borsa endeksleri ve inşaat ruhsatları öncü (leading); ortalama işsizlik süresi ise gecikmeli (lagging) göstergedir.",
    ruleReference: "Conference Board Economic Indicators",
    keyTakeaway: "Leading = S&P 500, Building Permits, Initial Jobless Claims. Coincident = Industrial Production, Nonfarm Payrolls. Lagging = Duration of Unemployment, Prime Rate."
  },
  {
    id: "q-1-08",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Cooling-Off Period & Red Herring",
    difficulty: "Medium",
    question: "During the 20-day cooling-off period following the filing of a registration statement with the SEC, which of the following activities is permitted?",
    questionTr: "SEC'e tescil beyanı sunulduktan sonraki 20 günlük soğuma döneminde (cooling-off period) aşağıdakilerden hangisinin yapılmasına izin verilir?",
    options: [
      "Accepting binding buy orders from retail clients",
      "Distributing a preliminary prospectus (red herring) to collect indications of interest",
      "Publishing research recommendations on the upcoming stock",
      "Distributing final prospectuses and sales literature"
    ],
    optionsTr: [
      "Bireysel müşterilerden bağlayıcı alım emirleri kabul etmek",
      "Talep ve ilgi düzeyini (indications of interest) toplamak için ön izahname (red herring) dağıtmak",
      "Gelecek hisse hakkında araştırma tavsiyeleri yayımlamak",
      "Nihai izahname ve satış materyallerini dağıtmak"
    ],
    correctAnswer: 1,
    explanation: "During the cooling-off period, underwriters and issuers may distribute a preliminary prospectus (red herring), publish tombstone ads, and collect non-binding indications of interest. They are strictly prohibited from taking binding orders, accepting money, or distributing research reports.",
    explanationTr: "Soğuma döneminde (cooling-off period) sadece ön izahname (red herring) dağıtılabilir ve bağlayıcı olmayan talep göstergeleri (indications of interest) toplanabilir. Kesin satış yapılamaz, para kabul edilemez ve tavsiye raporu dağıtılamaz.",
    ruleReference: "Securities Act of 1933 Section 5 / Prospectus Delivery",
    keyTakeaway: "Cooling-off: OK = Red Herring, Tombstone Ad, Indications of Interest. NOT OK = Final sales, accepting funds, advertising."
  },
  {
    id: "q-1-09",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Market Classifications",
    difficulty: "Medium",
    question: "Trading of exchange-listed securities between institutional investors over electronic communications networks (ECNs) without broker-dealer intervention takes place in the:",
    questionTr: "Borsada işlem gören hisselerin, aracı kurum müdahalesi olmaksızın elektronik iletişim ağları (ECN) üzerinden kurumsal yatırımcılar arasında alınıp satılması hangi piyasada gerçekleşir?",
    options: [
      "First market",
      "Second market",
      "Third market",
      "Fourth market"
    ],
    optionsTr: [
      "Birinci piyasa (first market)",
      "İkinci piyasa (second market)",
      "Üçüncü piyasa (third market)",
      "Dördüncü piyasa (fourth market)"
    ],
    correctAnswer: 3,
    explanation: "The Fourth Market consists of direct institutional-to-institutional trading of securities without the assistance of a broker-dealer, predominantly conducted through ECNs (Electronic Communication Networks) like Instinet.",
    explanationTr: "Dördüncü Piyasa (Fourth Market), aracı kurum araya girmeden kurumsal yatırımcıların ECN ağları üzerinden doğrudan birbirleriyle menkul kıymet takası yaptığı piyasadır. (Üçüncü piyasa ise borsaya kote hisselerin tezgah üstü piyasada işlem görmesidir).",
    ruleReference: "FINRA Market Structure Classifications",
    keyTakeaway: "1st = Exchanges. 2nd = OTC unlisted. 3rd = Listed stocks traded OTC. 4th = Institutions direct via ECNs."
  },
  {
    id: "q-1-10",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "MSRB Authority",
    difficulty: "Easy",
    question: "Which of the following is TRUE regarding the Municipal Securities Rulemaking Board (MSRB)?",
    questionTr: "Belediye Menkul Kıymetleri Kural Koyma Kurulu (MSRB) hakkında aşağıdakilerden hangisi DOĞRUDUR?",
    options: [
      "It enforces its own rules through municipal police powers",
      "It creates rules for municipal securities dealers but lacks authority to enforce them",
      "It regulates municipal bond issuers and sets their maximum borrowing caps",
      "It guarantees the principal and interest of general obligation bonds"
    ],
    optionsTr: [
      "Kendi kurallarını polis yetkileriyle kendisi uygular",
      "Belediye menkul kıymet bayileri için kurallar koyar ancak bu kuralları uygulama/yürütme yetkisi yoktur",
      "Belediye tahvili ihraççısı belediyeleri düzenler ve borçlanma tavanlarını belirler",
      "Genel yükümlülük tahvillerinin anapara ve faizini garanti eder"
    ],
    correctAnswer: 1,
    explanation: "The MSRB creates rules for municipal securities dealers and municipal advisors, but it has NO enforcement authority. Its rules are enforced by FINRA for broker-dealers, and by the SEC and bank regulatory agencies (such as the OCC, Fed, and FDIC) for banks.",
    explanationTr: "MSRB, belediye tahvili bayileri ve danışmanları için kurallar yazar ancak bu kuralları uygulama/cezalandırma yetkisi YOKTUR. MSRB kurallarını aracı kurumlar için FINRA, bankalar için ise SEC ve banka denetleme kurumları uygular.",
    ruleReference: "Securities Exchange Act of 1934 Section 15B / MSRB Jurisdiction",
    keyTakeaway: "MSRB writes rules for BDs and municipal advisors, NOT municipal issuers. FINRA and SEC enforce them."
  },
  {
    id: "q-1-11",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Market Participants & Clearing",
    difficulty: "Easy",
    question: "Which entity serves as the central clearinghouse and depository for almost all corporate equity and debt transactions in the United States?",
    questionTr: "Amerika Birleşik Devletleri'nde hemen hemen tüm kurumsal hisse senedi ve borçlanma araçları işlemleri için merkezi takas ve saklama kuruluşu olarak hangi kurum hizmet verir?",
    options: [
      "Options Clearing Corporation (OCC)",
      "Depository Trust & Clearing Corporation (DTCC)",
      "Federal Reserve Bank of New York",
      "Securities and Exchange Commission (SEC)"
    ],
    optionsTr: [
      "Options Clearing Corporation (OCC)",
      "Depository Trust & Clearing Corporation (DTCC)",
      "New York Federal Rezerv Bankası",
      "Securities and Exchange Commission (SEC)"
    ],
    correctAnswer: 1,
    explanation: "The DTCC (Depository Trust & Clearing Corporation), through its subsidiaries like DTC and NSCC, provides automated clearing, settlement, custody, and information services for equities, corporate and municipal bonds, and money market instruments.",
    explanationTr: "DTCC (Depository Trust & Clearing Corporation), ABD'deki hisse senetleri, kurumsal ve belediye tahvilleri ile para piyasası araçlarının merkezi takas, takas netleştirmesi ve saklama işlemlerini yürüten ana kuruluştur. (OCC ise sadece opsiyonlar içindir).",
    ruleReference: "Exchange Act Section 17A / Clearing Agencies",
    keyTakeaway: "DTCC = Central clearing & custody for equities and bonds. OCC = Clearing for listed options."
  },
  {
    id: "q-1-12",
    section: 1,
    sectionName: "Knowledge of Capital Markets",
    topic: "Secondary Market Liquidity",
    difficulty: "Easy",
    question: "Liquidity of an asset is best defined as the degree of ease with which it can be:",
    questionTr: "Bir varlığın likiditesi en doğru şekilde neyin kolaylık derecesi olarak tanımlanır?",
    options: [
      "Purchased on margin from a broker-dealer",
      "Quickly converted into cash with little price concession",
      "Transferred to a foreign bank account tax-free",
      "Pledged as collateral for a bank loan"
    ],
    optionsTr: [
      "Bir aracı kurumdan kredili (margin) olarak satın alınabilmesi",
      "Önemli bir fiyat kaybı olmadan hızla nakde dönüştürülebilmesi",
      "Vergisiz olarak yabancı bir banka hesabına transfer edilebilmesi",
      "Banka kredisi için teminat olarak gösterilebilmesi"
    ],
    correctAnswer: 1,
    explanation: "Liquidity is the ability to buy or sell an asset quickly in the open market at or near its current market value with minimal transaction costs or price slippage.",
    explanationTr: "Likidite, bir menkul kıymetin veya varlığın piyasada belirgin bir değer kaybına uğramadan hızlıca nakde dönüştürülebilme yeteneğidir. Hazine bonoları ve büyük borsa hisseleri yüksek likiditeye sahiptir.",
    ruleReference: "FINRA General Market Principles",
    keyTakeaway: "Liquidity = Speed of turning into cash without major price discount."
  },

  // ==========================================
  // SECTION 2: PRODUCTS AND THEIR RISKS (44%)
  // ==========================================
  {
    id: "q-2-01",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Common Stock & Dividends",
    difficulty: "Medium",
    question: "Company ABC announces a 20% stock dividend for its common shareholders. If a customer holds 1,000 shares originally purchased at $50.00 per share, what is the customer's new number of shares and adjusted cost basis per share?",
    questionTr: "ABC Şirketi adi hisse senedi sahipleri için %20 bedelsiz hisse temettüsü (stock dividend) açıkladı. Bir müşteri hisse başına 50 dolardan alınmış 1.000 hisseye sahipse, işlem sonrası yeni hisse adedi ve hisse başına maliyet tabanı ne olur?",
    options: [
      "1,000 shares at $41.67 per share",
      "1,200 shares at $41.67 per share",
      "1,200 shares at $50.00 per share",
      "800 shares at $62.50 per share"
    ],
    optionsTr: [
      "Hisse başına 41,67 dolardan 1.000 hisse",
      "Hisse başına 41,67 dolardan 1.200 hisse",
      "Hisse başına 50,00 dolardan 1.200 hisse",
      "Hisse başına 62,50 dolardan 800 hisse"
    ],
    correctAnswer: 1,
    explanation: "With a 20% stock dividend, the customer receives 20% more shares: 1,000 * 1.20 = 1,200 shares. Total investment value remains unchanged ($50,000). The new cost basis per share = $50,000 / 1,200 shares = $41.67 per share.",
    explanationTr: "%20 hisse temettüsü ile hisse adedi %20 artar: 1.000 * 1,20 = 1.200 hisse. Toplam yatırım tutarı değişmez (50.000$). Yeni hisse başı maliyet = 50.000$ / 1.200 = 41,67$ olur.",
    ruleReference: "IRS Cost Basis / Stock Dividend Adjustments",
    keyTakeaway: "Stock dividends increase share count and proportionately reduce cost basis per share; total position value remains identical."
  },
  {
    id: "q-2-02",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Preferred Stock Features",
    difficulty: "Easy",
    question: "Which type of preferred stock gives the investor the right to receive any past missed or omitted dividends before any dividends can be paid to common shareholders?",
    questionTr: "Adi hisse sahiplerine herhangi bir temettü ödenmeden önce, geçmişte ödenmemiş tüm temettülerin ödenmesini talep hakkı veren imtiyazlı hisse türü hangisidir?",
    options: [
      "Callable preferred stock",
      "Cumulative preferred stock",
      "Participating preferred stock",
      "Adjustable-rate preferred stock"
    ],
    optionsTr: [
      "Geri çağrılabilir (callable) imtiyazlı hisse",
      "Birikimli (cumulative) imtiyazlı hisse",
      "Kâra katılan (participating) imtiyazlı hisse",
      "Değişken faizli (adjustable-rate) imtiyazlı hisse"
    ],
    correctAnswer: 1,
    explanation: "Cumulative preferred stock guarantees that any dividends in arrears (missed past dividend payments) must be paid in full to cumulative preferred holders before common stockholders can receive a penny in dividends.",
    explanationTr: "Birikimli (cumulative) imtiyazlı hisse senetlerinde, şirketin geçmiş dönemlerde ödeyemediği birikmiş temettüler (dividends in arrears), adi hisse senedi sahiplerine herhangi bir dağıtım yapılmadan önce tam olarak ödenmek zorundadır.",
    ruleReference: "Corporate Equity Structures / Preferred Stock Classes",
    keyTakeaway: "Cumulative Preferred = Dividends in arrears MUST be paid before any common dividends."
  },
  {
    id: "q-2-03",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Treasury Securities",
    difficulty: "Medium",
    question: "Which of the following U.S. government debt obligations is issued at an original issue discount without a stated coupon rate and matures in one year or less?",
    questionTr: "Aşağıdaki ABD hükümet borçlanma araçlarından hangisi kupon faizi olmaksızın ıskontolu olarak ihraç edilir ve vadesi bir yıl veya daha azdır?",
    options: [
      "Treasury Notes",
      "Treasury Bonds",
      "Treasury Bills",
      "TIPS (Treasury Inflation-Protected Securities)"
    ],
    optionsTr: [
      "Hazine Bonoları (T-Notes, 2-10 yıl)",
      "Hazine Tahvilleri (T-Bonds, 10-30 yıl)",
      "Hazine Bonoları (T-Bills, 1 ay - 1 yıl)",
      "TIPS (Enflasyona Endeksli Hazine Kağıtları)"
    ],
    correctAnswer: 2,
    explanation: "Treasury Bills (T-Bills) are short-term government debt obligations maturing in 4, 8, 13, 17, 26, or 52 weeks (up to 1 year). They do not pay semiannual coupons; instead, they are issued at a discount to par and mature at face value ($1,000 par).",
    explanationTr: "T-Bills (Hazine bonoları), vadesi en fazla 1 yıl (4, 8, 13, 26, 52 hafta) olan ve kupon ödemesi yapmayan, nominal değerinin altında ıskontolu satılıp vadede nominal değerini (par) ödeyen en likit devlet kağıtlarıdır.",
    ruleReference: "Treasury Direct / Debt Maturity Classifications",
    keyTakeaway: "T-Bills = Issued at discount, no coupon, mature <= 1 year. T-Notes = 2-10 yrs, semiannual coupon. T-Bonds = 10-30 yrs, semiannual coupon."
  },
  {
    id: "q-2-04",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Bond Yield Relationships",
    difficulty: "Hard",
    question: "When a corporate bond trades at a DISCOUNT to its face value, which of the following represents the correct order of its yields from LOWEST to HIGHEST?",
    questionTr: "Bir şirket tahvili nominal değerinin altında ISKONTOLU (discount) işlem gördüğünde, getirilerinin EN DÜŞÜKTEN EN YÜKSEĞE doğru sıralaması hangisidir?",
    options: [
      "Yield to Call (YTC) < Yield to Maturity (YTM) < Current Yield < Nominal Yield",
      "Nominal Yield < Current Yield < Yield to Maturity (YTM) < Yield to Call (YTC)",
      "Current Yield < Nominal Yield < Yield to Call (YTC) < Yield to Maturity (YTM)",
      "Yield to Maturity (YTM) < Nominal Yield < Current Yield < Yield to Call (YTC)"
    ],
    optionsTr: [
      "Geri Çağırma Getirisi (YTC) < Vadeye Kadar Getiri (YTM) < Cari Getiri < Nominal Getiri",
      "Nominal Getiri (Kupon) < Cari Getiri < Vadeye Kadar Getiri (YTM) < Geri Çağırma Getirisi (YTC)",
      "Cari Getiri < Nominal Getiri < Geri Çağırma Getirisi (YTC) < Vadeye Kadar Getiri (YTM)",
      "Vadeye Kadar Getiri (YTM) < Nominal Getiri < Cari Getiri < Geri Çağırma Getirisi (YTC)"
    ],
    correctAnswer: 1,
    explanation: "When a bond is traded at a discount, the investor receives both interest payments and the capital discount at maturity. Therefore, the yields rank from lowest to highest: Nominal Yield (Coupon) < Current Yield < YTM < YTC. (Think of the bond see-saw teeter-totter diagram!).",
    explanationTr: "Tahvil ıskontolu satılırken (fiyat düştüğünde getiriler yükselir), en düşükten en yükseğe getiri sıralaması: Nominal Getiri (Kupon) < Cari Getiri (Current Yield) < Vadeye Kadar Getiri (YTM) < Geri Çağırma Getirisi (YTC) şeklindedir. Primli tahvilde ise bu sıra tam tersinedir.",
    ruleReference: "FINRA Bond Yield Teeter-Totter Principle",
    keyTakeaway: "Discount Bond: Nominal < Current < YTM < YTC. Premium Bond: YTC < YTM < Current < Nominal."
  },
  {
    id: "q-2-05",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Municipal Bonds & Taxation",
    difficulty: "Medium",
    question: "Interest income earned on municipal bonds is generally:",
    questionTr: "Belediye tahvillerinden (municipal bonds) elde edilen faiz geliri genel olarak:",
    options: [
      "Exempt from federal income taxation, but subject to federal capital gains tax upon sale",
      "Subject to federal income tax, but exempt from state income tax",
      "Completely exempt from all federal, state, and local taxes regardless of investor residency",
      "Taxed at preferential long-term capital gain rates"
    ],
    optionsTr: [
      "Federal gelir vergisinden muaftır, ancak satış sırasında federal sermaye kazancı vergisine tabidir",
      "Federal gelir vergisine tabidir, ancak eyalet gelir vergisinden muaftır",
      "Yatırımcının ikametgahına bakılmaksızın tüm federal, eyalet ve yerel vergilerden tamamen muaftır",
      "Tercihli uzun vadeli sermaye kazancı oranlarında vergilendirilir"
    ],
    correctAnswer: 0,
    explanation: "Interest received on municipal bonds is exempt from federal income tax. However, if an investor sells the bond for more than its cost basis, the resulting capital gain is fully taxable at the federal level. Also, state tax exemption generally applies only if the investor resides in the issuing state.",
    explanationTr: "Belediye tahvili faizi federal gelir vergisinden muaftır. Ancak tahvil alış fiyatından daha yüksek fiyata satıldığında ortaya çıkan sermaye kazancı (capital gain) federal düzeyde tam olarak vergilendirilir.",
    ruleReference: "Internal Revenue Code Section 103 / Municipal Bond Taxation",
    keyTakeaway: "Muni Bond Interest = Exempt from Federal Income Tax. Capital gains upon sale = Taxable."
  },
  {
    id: "q-2-06",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Options - Covered Call Breakeven",
    difficulty: "Hard",
    question: "A customer buys 100 shares of XYZ stock at $50 per share and simultaneously sells 1 XYZ July 55 Call at a premium of $4. What is the customer's breakeven stock price at expiration?",
    questionTr: "Bir müşteri hisse başına 50 dolardan 100 adet XYZ hissesi satın alır ve aynı anda 4 dolar primle 1 adet Temmuz 55 XYZ Call opsiyonu satar (covered call). Vade bitiminde müşterinin başabaş (breakeven) hisse fiyatı nedir?",
    options: [
      "$46",
      "$51",
      "$54",
      "$59"
    ],
    optionsTr: [
      "46 dolar",
      "51 dolar",
      "54 dolar",
      "59 dolar"
    ],
    correctAnswer: 0,
    explanation: "For a covered call (Long Stock + Short Call), the formula for Breakeven is: Stock Purchase Price - Premium Received = $50 - $4 = $46. If the stock falls to $46, the $4 premium received exactly offsets the $4 drop in stock value.",
    explanationTr: "Covered Call (Hisse Alımı + Call Satışı) stratejisinde başabaş noktası (breakeven): Hisse Alış Fiyatı - Alınan Prim = 50$ - 4$ = 46$ olur. Hisse 46$'a düşerse cebe giren 4$ prim hissedeki zararı tam karşılar.",
    ruleReference: "CBOE Options Basics / Covered Call Strategy",
    keyTakeaway: "Covered Call Breakeven = Stock Purchase Price - Call Premium Received."
  },
  {
    id: "q-2-07",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Options - Long Put Strategy",
    difficulty: "Medium",
    question: "An investor who owns 500 shares of stock and wants to protect the position against a sharp downward decline in market price should:",
    questionTr: "Elinde 500 adet hisse senedi bulunan ve pozisyonunu piyasadaki sert bir düşüşe karşı korumak (hedging) isteyen bir yatırımcı ne yapmalıdır?",
    options: [
      "Sell 5 uncovered call options",
      "Buy 5 put options (Protective Put)",
      "Sell 5 put options",
      "Buy 5 call options"
    ],
    optionsTr: [
      "5 adet teminatsız (uncovered) call opsiyonu satmalı",
      "5 adet put opsiyonu satın almalı (Protective Put)",
      "5 adet put opsiyonu satmalı",
      "5 adet call opsiyonu satın almalı"
    ],
    correctAnswer: 1,
    explanation: "A protective put strategy involves buying a put option on a stock already owned. The put gives the owner the right to sell the shares at the strike price, establishing a guaranteed price floor regardless of how far the stock drops.",
    explanationTr: "Protective Put (Koruyucu Put) stratejisinde yatırımcı elindeki hisseyi korumak için satım opsiyonu (put) alır. Hisse ne kadar düşerse düşsün, yatırımcı hissesini belirlenen kullanım fiyatından (strike price) satma hakkına sahip olur.",
    ruleReference: "Options Hedging Principles / Protective Put",
    keyTakeaway: "Protecting a Long Stock Position = Buy a Put (Protective Put)."
  },
  {
    id: "q-2-08",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Mutual Funds vs Closed-End Funds",
    difficulty: "Medium",
    question: "Which of the following is a key distinguishing feature of an open-end management investment company (mutual fund)?",
    questionTr: "Aşağıdakilerden hangisi açık uçlu fonların (mutual fund) en önemli ayırt edici özelliğidir?",
    options: [
      "Shares trade continuously throughout the trading day on secondary stock exchanges",
      "It has a fixed capitalization with a static number of outstanding shares",
      "Shares are continuously offered and redeemed by the fund at Net Asset Value (NAV)",
      "Shares can trade at a significant premium or discount to their net asset value"
    ],
    optionsTr: [
      "Payları gün boyunca ikincil hisse senedi borsalarında sürekli işlem görür",
      "Sabit bir sermayeye ve değişmeyen sayıda dolaşımdaki paya sahiptir",
      "Paylar fon tarafından Net Aktif Değeri (NAV) üzerinden sürekli ihraç edilir ve geri itfa edilir",
      "Paylar net aktif değerinin üzerinde primli ya da altında ıskontolu işlem görebilir"
    ],
    correctAnswer: 2,
    explanation: "Open-end mutual funds continuously issue new shares and redeem existing shares directly with investors at the next calculated Net Asset Value (NAV) per share (forward pricing). Closed-end funds, conversely, issue a fixed number of shares that trade on an exchange at prices determined by supply and demand.",
    explanationTr: "Açık uçlu yatırım fonları (mutual funds), paylarını gün sonunda hesaplanan Net Aktif Değeri (NAV) üzerinden sürekli ihraç ve itfa ederler; borsada işlem görmezler. Kapalı uçlu fonlar (closed-end funds) ise borsada alınıp satılır ve NAV'a göre primli/iskontolu fiyatlanabilir.",
    ruleReference: "Investment Company Act of 1940 Section 5",
    keyTakeaway: "Open-End (Mutual Fund) = Continuous offering & redemption at NAV; no secondary trading. Closed-End = Fixed shares, trades on exchange."
  },
  {
    id: "q-2-09",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Mutual Fund Breakpoints & LOI",
    difficulty: "Medium",
    question: "A mutual fund Letter of Intent (LOI) allows an investor to qualify for sales charge breakpoints by agreeing to invest a specified dollar amount over what maximum time period?",
    questionTr: "Yatırım fonu Niyet Mektubu (Letter of Intent - LOI), yatırımcının belirlenen tutarı en fazla hangi süre zarfında yatırmayı taahhüt etmesiyle indirimli satış komisyonundan (breakpoint) yararlanmasını sağlar?",
    options: [
      "6 months, backdated up to 30 days",
      "13 months, backdated up to 90 days",
      "24 months, with no backdating permitted",
      "36 months, backdated up to 6 months"
    ],
    optionsTr: [
      "30 güne kadar geriye dönük işletilebilen 6 ay",
      "90 güne kadar geriye dönük işletilebilen 13 ay",
      "Geriye dönük işletmeye izin verilmeyen 24 ay",
      "6 aya kadar geriye dönük işletilebilen 36 ay"
    ],
    correctAnswer: 1,
    explanation: "A Letter of Intent (LOI) gives the investor up to 13 months to reach the stated breakpoint dollar amount to receive a reduced sales load. Additionally, an LOI can be backdated up to 90 calendar days to include prior purchases.",
    explanationTr: "Niyet Mektubu (LOI), yatırımcıya taahhüt ettiği tutara ulaşması için 13 ay süre tanır. Ayrıca, son 90 gün içinde yapılmış önceki fon alımlarını da kapsayacak şekilde geriye dönük işletilebilir.",
    ruleReference: "FINRA Rule 2341 / Investment Company Breakpoints",
    keyTakeaway: "Mutual Fund LOI = 13 months duration, can be backdated up to 90 calendar days."
  },
  {
    id: "q-2-10",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Exchange-Traded Notes (ETNs)",
    difficulty: "Hard",
    question: "Exchange-Traded Notes (ETNs) are exposed to which primary risk that Exchange-Traded Funds (ETFs) do not share?",
    questionTr: "Borsa Yatırım Senetleri (ETN), Borsa Yatırım Fonlarının (ETF) taşımadığı hangi temel riske maruzdur?",
    options: [
      "Interest rate risk",
      "Market risk",
      "Issuer credit risk",
      "Currency exchange risk"
    ],
    optionsTr: [
      "Faiz oranı riski",
      "Piyasa dalgalanma riski",
      "İhraççı kredi (temerrüt) riski",
      "Döviz kuru riski"
    ],
    correctAnswer: 2,
    explanation: "ETNs are unsecured senior debt obligations issued by financial institutions (like banks). Unlike ETFs, which hold an actual underlying basket of assets, an ETN's value depends on the creditworthiness and solvency of the issuing bank.",
    explanationTr: "ETN'ler (Exchange-Traded Notes), bankalar tarafından ihraç edilen teminatsız borç senetleridir. Bir sepet varlığa sahip olan ETF'lerin aksine ETN'ler, ihraççı bankanın iflas etmesi veya kredi notunun düşmesi durumunda doğrudan kredi riskine (credit risk) maruz kalır.",
    ruleReference: "FINRA Regulatory Notice 12-03 / Complex Products",
    keyTakeaway: "ETN = Unsecured debt instrument subject to issuer credit/default risk. ETF = Pooled investment holding actual assets."
  },
  {
    id: "q-2-11",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "REITs Distribution Requirements",
    difficulty: "Medium",
    question: "To avoid corporate income taxation on distributed earnings, a Real Estate Investment Trust (REIT) must distribute at least what percentage of its taxable income to shareholders annually?",
    questionTr: "Dağıtılan kazançlar üzerinden kurumlar vergisinden muaf olabilmek için bir Gayrimenkul Yatırım Ortaklığı (REIT) yıllık vergiye tabi gelirinin en az yüzde kaçını hissedarlarına dağıtmak zorundadır?",
    options: [
      "50%",
      "75%",
      "90%",
      "100%"
    ],
    optionsTr: [
      "%50",
      "%75",
      "%90",
      "%100"
    ],
    correctAnswer: 2,
    explanation: "Under the Internal Revenue Code, a REIT must distribute at least 90% of its taxable income to shareholders each year. Furthermore, at least 75% of its total assets must be invested in real estate, cash, or U.S. government securities.",
    explanationTr: "ABD vergi yasalarına göre REIT'ler (GYO), kurumlar vergisinden kaçınmak için yıllık vergilendirilebilir kârlarının en az %90'ını temettü olarak dağıtmalıdır. Ayrıca varlıklarının en az %75'i gayrimenkul veya nakitte olmalıdır.",
    ruleReference: "IRC Subchapter M / REIT Qualification Requirements",
    keyTakeaway: "REIT = Distribute >= 90% taxable income, hold >= 75% assets in real estate."
  },
  {
    id: "q-2-12",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Direct Participation Programs (DPPs)",
    difficulty: "Medium",
    question: "Which of the following is a characteristic of a Direct Participation Program (DPP) organized as a limited partnership?",
    questionTr: "Sınırlı ortaklık (limited partnership) şeklinde kurulan Doğrudan Katılım Programlarının (DPP) bir özelliği aşağıdakilerden hangisidir?",
    options: [
      "Limited partners have personal liability for all debts of the partnership",
      "Income, gains, and losses flow directly through to investors without entity-level taxation",
      "Shares are traded daily with high liquidity on major national exchanges",
      "Limited partners make day-to-day managerial decisions of the business"
    ],
    optionsTr: [
      "Sınırlı ortaklar ortaklığın tüm borçlarından kişisel olarak sınırsız sorumludur",
      "Gelirler, kazançlar ve zararlar kurum düzeyinde vergilendirilmeden doğrudan yatırımcılara aktarılır (pass-through)",
      "Paylar ulusal büyük borsalarda yüksek likidite ile günlük olarak işlem görür",
      "Sınırlı ortaklar şirketin günlük operasyonel yönetim kararlarını alırlar"
    ],
    correctAnswer: 1,
    explanation: "DPPs (like real estate and oil/gas limited partnerships) provide pass-through tax treatment: income, gains, losses, and deductions flow through directly to the partners' tax returns, avoiding double taxation. They are generally unlisted and illiquid.",
    explanationTr: "DPP'ler (Direct Participation Programs) çift vergilendirmeyi önler; tüm gelir, kazanç ve zararlar ortaklık seviyesinde vergilendirilmeksizin doğrudan ortakların şahsi vergi beyannamelerine yansıtılır (pass-through tax treatment). Likiditeleri düşüktür.",
    ruleReference: "FINRA Rule 2310 / DPP Guidelines",
    keyTakeaway: "DPPs / Limited Partnerships = Pass-through tax treatment, illiquid, managed by General Partner."
  },
  {
    id: "q-2-13",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Inflation Risk / Purchasing Power Risk",
    difficulty: "Easy",
    question: "An investor holding long-term, fixed-coupon 30-year Treasury bonds is MOST vulnerable to which of the following risks?",
    questionTr: "30 yıllık sabit kuponlu Hazine tahvili tutan bir yatırımcı EN ÇOK hangi riske karşı savunmasızdır?",
    options: [
      "Credit risk",
      "Purchasing power (inflation) risk",
      "Liquidity risk",
      "Currency risk"
    ],
    optionsTr: [
      "Kredi (temerrüt) riski",
      "Satın alma gücü (enflasyon) riski",
      "Likidite riski",
      "Para birimi (kur) riski"
    ],
    correctAnswer: 1,
    explanation: "Because U.S. Treasury bonds have virtually zero credit risk, their fixed semiannual interest payment loses purchasing power over long periods when inflation rises. Hence, long-term fixed-income investments face extreme purchasing power (inflation) and interest rate risk.",
    explanationTr: "ABD Hazine tahvillerinde temerrüt (kredi) riski pratik olarak sıfırdır. Ancak 30 yıl boyunca sabit bir kupon ödendiği için enflasyon arttığında paranın satın alma gücü erir. Bu nedenle en büyük tehdit satın alma gücü (enflasyon) riskidir.",
    ruleReference: "FINRA Risk Disclosure Guidelines",
    keyTakeaway: "Long-term fixed-coupon bonds have lowest credit risk but HIGHEST purchasing power and interest rate risk."
  },
  {
    id: "q-2-14",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Variable Rate Demand Notes (VRDNs)",
    difficulty: "Hard",
    question: "A municipal debt instrument that features a stated maturity date, a floating or adjustable interest rate, and a put feature allowing the holder to tender the security back at par on a daily or weekly basis is called a:",
    questionTr: "Belirli bir vade tarihine, değişken faiz oranına ve sahibine senedi günlük veya haftalık olarak nominal değerinden geri satma (put) hakkı tanıyan belediye borçlanma aracı nedir?",
    options: [
      "Variable Rate Demand Note (VRDN)",
      "Tax Anticipation Note (TAN)",
      "Special Assessment Bond",
      "Auction Rate Security (ARS)"
    ],
    optionsTr: [
      "Variable Rate Demand Note (VRDN - Değişken Faizli Talep Senedi)",
      "Tax Anticipation Note (TAN - Vergi Beklenti Bonosu)",
      "Özel Değerleme Tahvili (Special Assessment Bond)",
      "Açık Artırma Oranlı Menkul Kıymet (ARS)"
    ],
    correctAnswer: 0,
    explanation: "A Variable Rate Demand Note (VRDN) is a long-term municipal security with an interest rate that is reset periodically (daily, weekly, or monthly) and includes a put feature that lets the investor demand return of principal at par plus accrued interest.",
    explanationTr: "VRDN (Variable Rate Demand Note), faiz oranı periyodik olarak (günlük veya haftalık) güncellenen ve yatırımcısına istediğinde senedi nominal değerinden geri verme (put) hakkı tanıyan likit bir belediye enstrümanıdır.",
    ruleReference: "MSRB Rule G-34 / Municipal Short-Term Debt",
    keyTakeaway: "VRDN = Floating rate + stated maturity + periodic put option back to intermediary at par."
  },
  {
    id: "q-2-15",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "ADRs (American Depositary Receipts)",
    difficulty: "Medium",
    question: "American Depositary Receipts (ADRs) are used primarily to facilitate which of the following activities?",
    questionTr: "Amerikan Depo Sertifikaları (ADR) öncelikle aşağıdaki faaliyetlerden hangisini kolaylaştırmak için kullanılır?",
    options: [
      "U.S. investors trading municipal revenue bonds across state borders",
      "U.S. investors trading shares of foreign corporations in domestic U.S. markets",
      "Foreign companies avoiding all SEC reporting requirements indefinitely",
      "Corporations issuing tax-sheltered zero-coupon convertible debt"
    ],
    optionsTr: [
      "ABD'li yatırımcıların eyaletler arası belediye tahvilleri alıp satması",
      "ABD'li yatırımcıların yabancı şirket hisselerini ABD iç piyasalarında alıp satması",
      "Yabancı şirketlerin tüm SEC raporlama gereksinimlerinden süresiz olarak kaçınması",
      "Şirketlerin vergiden muaf sıfır kuponlu dönüştürülebilir borç ihraç etmesi"
    ],
    correctAnswer: 1,
    explanation: "ADRs are negotiable securities issued by a U.S. commercial bank representing shares of a foreign company held in trust abroad. They trade on U.S. exchanges and OTC in U.S. dollars, allowing American investors to invest in foreign companies without dealing with foreign currencies or foreign exchanges.",
    explanationTr: "ADR'ler (American Depositary Receipts), yabancı şirketlerin hisselerini temsil eden ve ABD bankaları tarafından ihraç edilip ABD borsalarında dolar cinsinden işlem gören sertifikalardır. ABD'li yatırımcılara yabancı şirketlere kolay erişim sağlar.",
    ruleReference: "Exchange Act Rule 12g3-2(b) / Foreign Securities Trading",
    keyTakeaway: "ADR = Foreign shares traded on U.S. exchanges in U.S. Dollars; dividends paid in USD but subject to currency risk."
  },
  {
    id: "q-2-16",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Preemptive Rights vs Warrants",
    difficulty: "Medium",
    question: "At the time of issuance, which of the following securities typically has an exercise price ABOVE the current market price and has an expiration of several years or longer?",
    questionTr: "İhraç edildiği anda genellikle kullanım fiyatı (exercise price) mevcut piyasa fiyatının ÜZERİNDE olan ve birkaç yıl veya daha uzun bir vadeye sahip olan menkul kıymet hangisidir?",
    options: [
      "Preemptive rights",
      "Stock warrants",
      "Call options",
      "Repurchase agreements"
    ],
    optionsTr: [
      "Rüçhan hakları (preemptive rights)",
      "Hisse senedi varantları (warrants)",
      "Standart hisse alım opsiyonları (call options)",
      "Repo anlaşmaları (repurchase agreements)"
    ],
    correctAnswer: 1,
    explanation: "Warrants are long-term instruments (often 2 to 10 years or perpetual) issued with an exercise price ABOVE current market price ('out-of-the-money'), frequently attached to bonds as 'sweeteners'. Preemptive rights, by contrast, are short-term (30-60 days) with an exercise price BELOW current market price.",
    explanationTr: "Varantlar (warrants), ihraç anında piyasa fiyatının üzerinde kullanım fiyatına sahip olan ve vadeleri birkaç yıl (2-10 yıl) süren uzun vadeli enstrümanlardır. Rüçhan hakları (rights) ise kısa vadeli (30-45 gün) ve indirimli fiyattan ihraç edilir.",
    ruleReference: "Securities Act of 1933 / Corporate Securities",
    keyTakeaway: "Warrants = Long-term, exercise price ABOVE market (sweeteners). Rights = Short-term (30-45 days), exercise price BELOW market."
  },
  {
    id: "q-2-17",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Variable Annuities",
    difficulty: "Medium",
    question: "During the accumulation phase of a non-qualified variable annuity, how are investment gains and dividends taxed?",
    questionTr: "Nitelikli olmayan (non-qualified) bir değişken anüitenin birikim evresinde (accumulation phase), yatırım kazançları ve temettüler nasıl vergilendirilir?",
    options: [
      "Taxed annually as ordinary income",
      "Taxed annually at preferential capital gains rates",
      "Tax-deferred until distributions or withdrawals begin",
      "Completely exempt from all federal income taxes"
    ],
    optionsTr: [
      "Yıllık olarak normal gelir (ordinary income) şeklinde vergilendirilir",
      "Yıllık olarak indirimli sermaye kazancı oranlarında vergilendirilir",
      "Dağıtım veya çekimler başlayana kadar vergiden ertelenir (tax-deferred)",
      "Tüm federal gelir vergilerinden tamamen muaftır"
    ],
    correctAnswer: 2,
    explanation: "During the accumulation phase of a variable annuity, all interest, dividends, and capital gains compound on a tax-deferred basis. Taxes are not paid until money is withdrawn, at which point earnings are taxed as ordinary income on a LIFO (last-in, first-out) basis.",
    explanationTr: "Değişken anüitelerde (variable annuity) birikim döneminde elde edilen tüm kazançlar vergi ertelemelidir (tax-deferred). Para çekilmeye başlandığında ise kâr kısmı normal gelir (ordinary income) olarak vergilendirilir.",
    ruleReference: "FINRA Rule 2330 / Deferred Variable Annuities",
    keyTakeaway: "Variable Annuity Accumulation = Tax-deferred growth. Withdrawals = LIFO, earnings taxed as ordinary income."
  },
  {
    id: "q-2-18",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Prepayment and Extension Risk",
    difficulty: "Medium",
    question: "An investor holding mortgage-backed securities (like Ginnie Mae pass-through certificates) faces PREPAYMENT risk primarily when:",
    questionTr: "İpoteğe dayalı menkul kıymet (GNMA/Ginnie Mae gibi) tutan bir yatırımcı ERKEN ÖDEME (prepayment) riskiyle öncelikle ne zaman karşılaşır?",
    options: [
      "Interest rates rise sharply and homeowners default on their loans",
      "Interest rates fall and homeowners refinance their mortgages at lower rates",
      "Real estate property values decline across the nation",
      "The Federal Reserve tightens monetary policy"
    ],
    optionsTr: [
      "Faiz oranları keskin şekilde yükseldiğinde ve ev sahipleri borçlarını ödeyemediğinde",
      "Faiz oranları düştüğünde ve ev sahipleri ipoteklerini daha düşük faizle yeniden finanse (refinance) ettiğinde",
      "Ülke genelinde gayrimenkul değerleri düştüğünde",
      "Federal Rezerv para politikasını sıkılaştırdığında"
    ],
    correctAnswer: 1,
    explanation: "When prevailing interest rates drop, homeowners refinance their existing higher-interest mortgages. This causes mortgage loans to be paid off early, forcing MBS investors to receive their principal back sooner and reinvest at lower prevailing rates (prepayment / reinvestment risk).",
    explanationTr: "Piyasa faiz oranları düştüğünde ev sahipleri borçlarını kapatıp daha düşük faizli yeni kredi çekerler (refinance). Bu durum tahvil sahiplerine anaparalarının erkenden dönmesine ve daha düşük faizden yeniden yatırıma zorlanmalarına neden olur (erken ödeme riski).",
    ruleReference: "FINRA Mortgage-Backed Securities Risk Disclosures",
    keyTakeaway: "Rates Fall -> Mortgages Refinance -> Prepayment Risk. Rates Rise -> Homeowners hold loans longer -> Extension Risk."
  },
  {
    id: "q-2-19",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "Options In-the-Money vs Out-of-the-Money",
    difficulty: "Easy",
    question: "An ABC July 60 Put option is considered 'in-the-money' when the market price of ABC stock is:",
    questionTr: "Bir ABC Temmuz 60 Put (satım) opsiyonu, ABC hisse senedinin piyasa fiyatı hangi seviyedeyken 'kârda' (in-the-money) kabul edilir?",
    options: [
      "Exactly equal to $60 per share",
      "Greater than $60 per share",
      "Less than $60 per share",
      "Greater than $64 per share"
    ],
    optionsTr: [
      "Hisse başına tam olarak 60 dolara eşit olduğunda",
      "Hisse başına 60 dolardan büyük olduğunda",
      "Hisse başına 60 dolardan düşük olduğunda",
      "Hisse başına 64 dolardan büyük olduğunda"
    ],
    correctAnswer: 2,
    explanation: "A PUT option gives the holder the right to SELL stock at the strike price. Therefore, a put is in-the-money when the market price is BELOW the strike price (Market < Strike). For calls, it is in-the-money when Market > Strike.",
    explanationTr: "Put opsiyonu sahibine kullanım fiyatından (strike) SATMA hakkı verir. Bu nedenle hisse fiyatı kullanım fiyatının ALTINA indiğinde put opsiyonu kârdadır (in-the-money).",
    ruleReference: "CBOE Option Intrinsic Value Calculations",
    keyTakeaway: "Call In-the-Money = Market > Strike. Put In-the-Money = Market < Strike."
  },
  {
    id: "q-2-20",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "529 Education Savings Plans",
    difficulty: "Medium",
    question: "Which of the following is an accurate feature of a state-sponsored 529 College Savings Plan?",
    questionTr: "Eyalet destekli bir 529 Üniversite Tasarruf Planının doğru bir özelliği aşağıdakilerden hangisidir?",
    options: [
      "Contributions are federally tax-deductible up to $10,000 per year",
      "Withdrawals used for qualified education expenses are completely exempt from federal income tax",
      "Funds must be fully exhausted before the beneficiary reaches the age of 30",
      "The beneficiary retains legal control of the account assets at age 18"
    ],
    optionsTr: [
      "Katkılar yıllık 10.000 dolara kadar federal vergiden düşülebilir",
      "Nitelikli eğitim harcamaları için kullanılan çekimler federal gelir vergisinden tamamen muaftır",
      "Fonlar lehtar 30 yaşına gelmeden önce tamamen tüketilmek zorundadır",
      "Lehtar 18 yaşına geldiğinde hesap varlıklarının yasal kontrolünü devralır"
    ],
    correctAnswer: 1,
    explanation: "529 Plans are municipal fund securities. Contributions are made with after-tax dollars (not federally deductible), but earnings grow tax-free and withdrawals used for qualified education expenses are free from federal income tax. The account donor (owner), not the beneficiary, maintains control of the account.",
    explanationTr: "529 Planları belediye fon menkul kıymetidir. Katkılar vergi sonrası parayla yapılır, ancak kazançlar vergiden muaf büyür ve nitelikli eğitim harcamaları için yapılan çekimler federal gelir vergisinden muaftır.",
    ruleReference: "MSRB Rule G-45 / Municipal Fund Securities (529 Plans)",
    keyTakeaway: "529 Plans = Municipal fund securities, donor retains control, qualified withdrawals are federally tax-free."
  },
  {
    id: "q-2-21",
    section: 2,
    sectionName: "Understanding Products and Their Risks",
    topic: "General Obligation vs Revenue Bonds",
    difficulty: "Medium",
    question: "A municipal General Obligation (GO) bond issued by a state or city is primarily backed by which of the following?",
    questionTr: "Bir eyalet veya şehir tarafından ihraç edilen belediye Genel Yükümlülük (GO) tahvili öncelikle aşağıdakilerden hangisiyle teminatlandırılmıştır?",
    options: [
      "User fees generated from toll bridges and airports",
      "The full faith, credit, and taxing power of the municipality",
      "Real estate mortgages held in a blind pool",
      "Equipment trust certificates issued by local transit authorities"
    ],
    optionsTr: [
      "Ücretli köprüler ve havalimanlarından elde edilen kullanıcı harçları",
      "Belediyenin tam güveni, kredibilitesi ve vergilendirme gücü (full faith and credit)",
      "Kör bir havuzda tutulan gayrimenkul ipotekleri",
      "Yerel toplu taşıma idareleri tarafından ihraç edilen ekipman güven sertifikaları"
    ],
    correctAnswer: 1,
    explanation: "General Obligation (GO) bonds are backed by the full faith, credit, and taxing authority of the issuing municipality (ad valorem property taxes for local governments; income/sales taxes for states). Revenue bonds, in contrast, are backed solely by specific revenue-generating projects (tolls, water, sewer).",
    explanationTr: "Genel Yükümlülük (GO) tahvilleri, ihraççı yönetimin tam güveni ve vergi toplama gücüyle (emlak vergisi, gelir vergisi vb.) desteklenir. Gelir tahvilleri (Revenue bonds) ise sadece belirli bir projenin (köprü, otoyol gişesi) gelirleriyle ödenir.",
    ruleReference: "MSRB Municipal Debt Classifications",
    keyTakeaway: "GO Bonds = Full faith & credit / Taxes (require voter approval). Revenue Bonds = Facility revenues/user fees (feasibility study)."
  },

  // ==========================================
  // SECTION 3: TRADING, CUSTOMER ACCOUNTS & PROHIBITED ACTIVITIES (31%)
  // ==========================================
  {
    id: "q-3-01",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Settlement Cycles (SEC T+1 Rule)",
    difficulty: "Easy",
    question: "Under standard industry rules (SEC Rule 15c6-1), regular-way settlement for corporate stock and bond transactions occurs on:",
    questionTr: "Standart sektör kuralları (SEC Kuralı 15c6-1) uyarınca, kurumsal hisse senedi ve tahvil işlemlerinde olağan takas (regular-way settlement) ne zaman gerçekleşir?",
    options: [
      "The trade date (T)",
      "The first business day after the trade date (T+1)",
      "The second business day after the trade date (T+2)",
      "Three business days after the trade date (T+3)"
    ],
    optionsTr: [
      "İşlem gününde (T)",
      "İşlem gününden sonraki ilk iş gününde (T+1)",
      "İşlem gününden sonraki ikinci iş gününde (T+2)",
      "İşlem gününden sonraki üçüncü iş gününde (T+3)"
    ],
    correctAnswer: 1,
    explanation: "Effective May 2024, the SEC standard settlement cycle for corporate stocks, bonds, municipal securities, and options was officially shortened to T+1 (one business day after the trade date). Cash settlement occurs on the same day as trade (T).",
    explanationTr: "SEC kuralı gereğince (Mayıs 2024'ten itibaren yürürlükte), hisse senetleri, şirket tahvilleri, belediye tahvilleri ve opsiyonlar için standart takas süresi T+1'dir (işlem tarihinden sonraki 1 iş günü). Nakit takas (cash settlement) ise aynı gün (T) gerçekleşir.",
    ruleReference: "SEC Rule 15c6-1 / T+1 Settlement Standard",
    keyTakeaway: "Regular-Way Settlement = T+1 (one business day after trade). Cash settlement = Same day (T)."
  },
  {
    id: "q-3-02",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Market Order Types",
    difficulty: "Medium",
    question: "An investor who wants to limit potential downside losses on an existing long stock position should place which type of order?",
    questionTr: "Mevcut uzun (long) hisse pozisyonundaki olası aşağı yönlü zararları sınırlandırmak isteyen bir yatırımcı ne tür bir emir vermelidir?",
    options: [
      "Sell limit order above the current market price",
      "Sell stop order below the current market price",
      "Buy stop order above the current market price",
      "Market order at the open"
    ],
    optionsTr: [
      "Mevcut piyasa fiyatının üzerinde satış limit emri (sell limit)",
      "Mevcut piyasa fiyatının altında satış durdurma emri (sell stop)",
      "Mevcut piyasa fiyatının üzerinde alış durdurma emri (buy stop)",
      "Açılışta piyasa emri (market order)"
    ],
    correctAnswer: 1,
    explanation: "A sell stop order is placed below the current market price to protect a long stock position. Once the stock drops to or through the stop price, the order becomes a live market order and is immediately executed to prevent deeper losses.",
    explanationTr: "Uzun (long) pozisyonda olan bir yatırımcı zararı kesmek (stop-loss) için mevcut fiyatın altına 'Sell Stop' emri koyar. Fiyat o seviyeye düştüğünde emir piyasa emrine dönüşür ve hisseler hemen satılarak daha büyük kayıplar önlenir.",
    ruleReference: "FINRA Order Types and Trading Rules",
    keyTakeaway: "Protect Long Stock = Sell Stop (placed below market). Protect Short Stock = Buy Stop (placed above market)."
  },
  {
    id: "q-3-03",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Regulation T & Margin Accounts",
    difficulty: "Medium",
    question: "Under Federal Reserve Regulation T, what is the initial margin requirement for purchasing marginable equities in a margin account?",
    questionTr: "Federal Rezerv Regulation T uyarınca, bir kredili (margin) hesapta kredilendirilebilir hisse senetleri satın almak için ilk teminat oranı (initial margin) yüzde kaçtır?",
    options: [
      "25%",
      "30%",
      "50%",
      "100%"
    ],
    optionsTr: [
      "%25",
      "%30",
      "%50",
      "%100"
    ],
    correctAnswer: 2,
    explanation: "Federal Reserve Regulation T sets the initial margin requirement at 50%. This means the customer must deposit at least 50% of the total purchase price, while the broker-dealer lends the remaining 50%. (FINRA maintenance margin is 25% for long positions).",
    explanationTr: "Federal Rezerv'in Regulation T düzenlemesine göre ilk marjin (initial margin) gereksinimi %50'dir. Müşteri alım tutarının en az %50'sini nakit veya uygun teminat olarak koymak zorundadır, kalan %50'yi aracı kurum borç verir.",
    ruleReference: "Federal Reserve Regulation T / FINRA Rule 4210",
    keyTakeaway: "Reg T Initial Margin = 50%. FINRA Minimum Maintenance = 25% long / 30% short."
  },
  {
    id: "q-3-04",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Pattern Day Trader Rule",
    difficulty: "Easy",
    question: "A client is designated as a 'pattern day trader' if they execute four or more day trades within how many business days in a margin account?",
    questionTr: "Bir müşteri marjin hesabında kaç iş günü içinde dört veya daha fazla gün içi işlem (day trade) yaparsa 'kalıplaşmış gün içi işlemci' (pattern day trader) olarak tanımlanır?",
    options: [
      "3 business days",
      "5 business days",
      "10 business days",
      "30 business days"
    ],
    optionsTr: [
      "3 iş günü",
      "5 iş günü",
      "10 iş günü",
      "30 iş günü"
    ],
    correctAnswer: 1,
    explanation: "Under FINRA Rule 4210, a pattern day trader is any customer who executes 4 or more day trades within 5 rolling business days in a margin account. Pattern day traders must maintain minimum equity of $25,000.",
    explanationTr: "FINRA Kuralı 4210'a göre, bir marjin hesabında 5 iş günü içerisinde 4 veya daha fazla gün içi işlem (day trade) gerçekleştiren kişi 'pattern day trader' sayılır ve hesabında en az 25.000 dolar özkaynak bulundurması zorunludur.",
    ruleReference: "FINRA Rule 4210(f)(8)(B) / Day Trading Margin",
    keyTakeaway: "Pattern Day Trader = 4 or more day trades in 5 business days; requires $25,000 minimum equity."
  },
  {
    id: "q-3-05",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Account Ownership - JTWROS vs TIC",
    difficulty: "Medium",
    question: "Two business partners open a joint brokerage account where Partner A contributes 70% and Partner B contributes 30%. Upon the death of Partner A, they want A's 70% share to pass directly to A's heirs rather than to Partner B. Which account type must they select?",
    questionTr: "İki iş ortağı, Ortak A'nın %70 ve Ortak B'nin %30 pay koyduğu ortak bir yatırım hesabı açar. Ortak A vefat ettiğinde, %70'lik payın Ortak B'ye geçmek yerine A'nın mirasçılarına kalması istenmektedir. Hangi hesap türünü seçmelidirler?",
    options: [
      "Joint Tenants with Right of Survivorship (JTWROS)",
      "Tenants in Common (TIC)",
      "Tenants by the Entirety",
      "Partnership Discretionary Account"
    ],
    optionsTr: [
      "Sağ Kalan Ortak Haklı Ortak Hesap (JTWROS)",
      "Paylı Mülkiyetli Ortak Hesap (Tenants in Common - TIC)",
      "Eşler Arası Ortak Mülkiyet (Tenants by the Entirety)",
      "Ortaklık Yetkili Hesabı"
    ],
    correctAnswer: 1,
    explanation: "In a Tenants in Common (TIC) account, deceased tenant's fractional interest is transferred to their estate/heirs, not to the surviving tenant. In JTWROS, the deceased person's share automatically passes to the surviving account holder(s).",
    explanationTr: "Tenants in Common (TIC) hesabında, vefat eden ortağın payı hayatta kalan ortağa geçmez; vefat edenin terekesine/mirasçılarına geçer. JTWROS hesabında ise vefat edenin hakkı otomatikman sağ kalan diğer hesap sahibine kalır.",
    ruleReference: "FINRA Rule 4512 / Customer Account Ownership Types",
    keyTakeaway: "TIC = Deceased tenant's assets pass to their estate/heirs. JTWROS = Assets pass to surviving joint owner(s)."
  },
  {
    id: "q-3-06",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Anti-Money Laundering (AML) - SAR vs CTR",
    difficulty: "Medium",
    question: "Under the Bank Secrecy Act and FinCEN regulations, a broker-dealer must file a Suspicious Activity Report (SAR) for any transaction involving at least what threshold amount that appears questionable?",
    questionTr: "Banka Gizlilik Yasası ve FinCEN düzenlemeleri uyarınca, bir aracı kurum şüpheli görünen en az ne kadarlık bir işlem için Şüpheli Faaliyet Raporu (SAR) doldurmak zorundadır?",
    options: [
      "$3,000 filed within 15 calendar days",
      "$5,000 filed within 30 calendar days",
      "$10,000 filed within 15 calendar days",
      "$25,000 filed within 60 calendar days"
    ],
    optionsTr: [
      "15 takvim günü içinde dosyalanan 3.000 dolar",
      "30 takvim günü içinde dosyalanan 5.000 dolar",
      "15 takvim günü içinde dosyalanan 10.000 dolar",
      "60 takvim günü içinde dosyalanan 25.000 dolar"
    ],
    correctAnswer: 1,
    explanation: "A Suspicious Activity Report (SAR) must be filed with FinCEN within 30 calendar days for any suspicious transaction that involves at least $5,000 in funds. In contrast, a Currency Transaction Report (CTR) must be filed for any cash currency transaction exceeding $10,000 within 15 calendar days.",
    explanationTr: "Şüpheli Faaliyet Raporu (SAR), en az 5.000 dolarlık şüpheli işlemlerde 30 gün içinde FinCEN'e sunulmalıdır. Nakit İşlem Raporu (CTR) ise 10.000 doları aşan fiziksel nakit işlemlerinde 15 gün içinde doldurulur.",
    ruleReference: "Bank Secrecy Act (BSA) / FinCEN SAR Filing Requirements",
    keyTakeaway: "SAR = $5,000+ suspicious, file within 30 days (keep secret from client!). CTR = Cash > $10,000, file within 15 days."
  },
  {
    id: "q-3-07",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Front-Running Prohibited Activity",
    difficulty: "Easy",
    question: "A registered representative learns that their firm is about to execute a massive institutional buy order of 500,000 shares of XYZ stock. The representative immediately buys 1,000 shares of XYZ for their personal account before the institutional order is executed. This prohibited practice is known as:",
    questionTr: "Tescilli bir temsilci, firmasının XYZ hissesinden 500.000 adetlik devasa bir kurumsal alış emri girmek üzere olduğunu öğrenir. Temsilci kurumsal emir girilmeden hemen önce kendi şahsi hesabına 1.000 adet XYZ hissesi alır. Bu yasaklı eylem ne olarak adlandırılır?",
    options: [
      "Churning",
      "Front-running",
      "Painting the tape",
      "Backing away"
    ],
    optionsTr: [
      "Aşırı işlem yaptırma (churning)",
      "Önden koşma / Öncelikli işlem yapma (front-running)",
      "Bandı boyama / Yapay hacim (painting the tape)",
      "Kotasyondan kaçınma (backing away)"
    ],
    correctAnswer: 1,
    explanation: "Front-running (FINRA Rule 5270) is the illegal practice of placing a personal order ahead of a pending large customer block order to benefit from the price movement the block trade is expected to cause.",
    explanationTr: "Front-running (önden koşma), bekleyen büyük bir müşteri bloğu emrinden önce kendi şahsi hesabına emir girerek, müşteri emrinin piyasada yaratacağı fiyat artışından haksız kazanç sağlama eylemidir ve kesinlikle yasaktır.",
    ruleReference: "FINRA Rule 5270 / Prohibition on Front Running of Block Transactions",
    keyTakeaway: "Front-running = Trading for personal/firm account ahead of pending customer block orders."
  },
  {
    id: "q-3-08",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Selling Away / Private Securities Transactions",
    difficulty: "Hard",
    question: "Under FINRA Rule 3280, a registered representative who participates in a private securities transaction for compensation outside the scope of their employment with their member firm must:",
    questionTr: "FINRA Kuralı 3280 uyarınca, üye firmasındaki işinin kapsamı dışında komisyon/ücret karşılığında özel bir menkul kıymet işlemine (private securities transaction) katılan tescilli bir temsilci ne yapmak zorundadır?",
    options: [
      "Only inform FINRA directly on Form U4 within 30 days",
      "Provide prior written notice to their firm and receive prior written approval from the firm before participating",
      "Donate at least 10% of the proceeds to an approved charity",
      "Obtain approval only if the investment exceeds $100,000"
    ],
    optionsTr: [
      "30 gün içinde yalnızca Form U4 ile doğrudan FINRA'yı bilgilendirmek",
      "Katılmadan önce firmasına önceden yazılı bildirimde bulunmak ve firmasından önceden yazılı onay almak",
      "Elde edilen gelirin en az %10'unu onaylanmış bir hayır kurumuna bağışlamak",
      "Yalnızca yatırım 100.000 doları aşarsa onay almak"
    ],
    correctAnswer: 1,
    explanation: "Under FINRA Rule 3280, engaging in private securities transactions ('selling away') for compensation requires prior detailed written notice to the member firm AND prior written permission. The firm must also record the transactions on its own books and records. If without compensation, only written notice is required.",
    explanationTr: "Tescilli temsilcinin firması dışındaki özel menkul kıymet işlemlerine komisyon karşılığı katılması (selling away) için, işlem gerçekleşmeden önce firmasına yazılı bildirim yapması VE firmasından yazılı onay alması zorunludur.",
    ruleReference: "FINRA Rule 3280 / Private Securities Transactions",
    keyTakeaway: "Selling Away with compensation = Prior written notice AND prior written approval required. Firm books the trade."
  },
  {
    id: "q-3-09",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Borrowing and Lending with Customers",
    difficulty: "Medium",
    question: "Under FINRA rules, a registered representative is permitted to borrow money from or lend money to a customer WITHOUT prior firm approval under which of the following circumstances?",
    questionTr: "FINRA kuralları uyarınca, tescilli bir temsilcinin firmasından önceden onay ALMAKSIZIN bir müşteriden borç almasına veya müşteriye borç vermesine aşağıdaki durumlardan hangisinde izin verilir?",
    options: [
      "The customer is a close personal friend of 10 years",
      "The customer is an immediate family member of the representative",
      "The representative has maintained an account with the customer for over 5 years",
      "The loan is documented with an official promissory note at market interest rates"
    ],
    optionsTr: [
      "Müşterinin 10 yıllık yakın bir kişisel arkadaş olması",
      "Müşterinin temsilcinin birinci derece aile üyesi (immediate family member) olması",
      "Temsilcinin müşteriyle 5 yıldan uzun süredir bir hesap ilişkisi sürdürmüş olması",
      "Kredinin piyasa faiz oranında resmi bir senetle belgelenmiş olması"
    ],
    correctAnswer: 1,
    explanation: "Under FINRA Rule 3240, loans between a registered rep and a customer who is an immediate family member (or customer is a financial institution in the business of lending) do NOT require prior firm approval (provided the firm's written supervisory procedures allow it). Loans based on personal or business relationships outside the firm DO require prior firm approval.",
    explanationTr: "FINRA Kuralı 3240 uyarınca, müşteri temsilcinin birinci derece aile üyesi (anne, baba, eş, çocuk, kardeş vb.) ise veya müşteri borç veren bir finans kuruluşu (banka) ise firmanın önceden yazılı onayı gerekmez. Arkadaşlık veya iş ilişkisine dayalı kredilerde ise firmanın önceden yazılı onayı şarttır.",
    ruleReference: "FINRA Rule 3240 / Borrowing From or Lending to Customers",
    keyTakeaway: "Borrowing/Lending: Immediate Family & Financial Institutions = No firm approval needed. Personal friends & outside business = Firm approval required."
  },
  {
    id: "q-3-10",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Gifts and Gratuities Limit",
    difficulty: "Easy",
    question: "Under FINRA Rule 3220, what is the maximum annual gift limit that a member firm or registered person may give to an employee of another firm?",
    questionTr: "FINRA Kuralı 3220 uyarınca, bir üye firmanın veya tescilli kişinin başka bir firmanın çalışanına verebileceği yıllık azami hediye limiti nedir?",
    options: [
      "$50 per individual per year",
      "$100 per individual per year",
      "$250 per individual per year",
      "$500 per individual per year"
    ],
    optionsTr: [
      "Kişi başına yıllık 50 dolar",
      "Kişi başına yıllık 100 dolar",
      "Kişi başına yıllık 250 dolar",
      "Kişi başına yıllık 500 dolar"
    ],
    correctAnswer: 1,
    explanation: "FINRA Rule 3220 limits gifts and gratuities given to employees of another firm to $100 per individual per year where the gift is related to the business of the employer. Ordinary business entertainment (meals, sporting events where the rep accompanies the guest) is excluded from this limit.",
    explanationTr: "FINRA Kuralı 3220'ye göre, başka bir firmanın çalışanına iş ilişkisi sebebiyle verilebilecek hediyelerin toplam değeri kişi başına yıllık 100 doları geçemez. Temsilcinin bizzat eşlik ettiği makul iş yemekleri bu sınıra dahil değildir.",
    ruleReference: "FINRA Rule 3220 / Influencing or Rewarding Employees of Others",
    keyTakeaway: "Gift limit = $100 per recipient per year. Normal business entertainment where rep hosts is exempt."
  },
  {
    id: "q-3-11",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Churning",
    difficulty: "Easy",
    question: "Excessive trading in a customer's account primarily intended to generate commissions for the registered representative, regardless of the customer's investment objectives, is known as:",
    questionTr: "Müşterinin yatırım hedefleri göz ardı edilerek, öncelikle temsilciye komisyon kazandırmak amacıyla müşterinin hesabında aşırı alım-satım işlemi yapılmasına ne ad verilir?",
    options: [
      "Freeriding",
      "Churning",
      "Interpositioning",
      "Pegging"
    ],
    optionsTr: [
      "Karşılıksız alım (freeriding)",
      "Aşırı işlem yaptırma (churning)",
      "Araya aracı sokma (interpositioning)",
      "Fiyat sabitleme (pegging)"
    ],
    correctAnswer: 1,
    explanation: "Churning is the unethical practice of executing excessive trading in a customer's discretionary account to generate commissions for the broker rather than serving the client's financial interests.",
    explanationTr: "Churning (aşırı işlem yaptırma), müşterinin çıkarlarından ziyade aracı temsilcinin komisyon gelirini şişirmek için hesapta gereksiz ve aşırı sıklıkta işlem yapılmasıdır ve ağır bir ihlaldir.",
    ruleReference: "FINRA Rule 2111 / Prohibited Trading Practices",
    keyTakeaway: "Churning = Excessive trading in customer account to generate broker commissions."
  },
  {
    id: "q-3-12",
    section: 3,
    sectionName: "Understanding Trading, Customer Accounts and Prohibited Activities",
    topic: "Options Account Opening Steps",
    difficulty: "Medium",
    question: "In which sequence must the steps for opening a customer options account occur?",
    questionTr: "Bir müşteri opsiyon hesabı açılış adımları hangi sırada gerçekleşmelidir?",
    options: [
      "Customer signs options agreement -> Account approved by ROP -> First trade executed -> ODD delivered",
      "ODD delivered at or prior to approval -> Account approved by ROP -> Trade executed -> Customer returns signed agreement within 15 days",
      "Trade executed -> ODD delivered -> ROP approves account -> Agreement signed within 30 days",
      "Account approved -> Trade executed -> ODD delivered within 5 business days"
    ],
    optionsTr: [
      "Müşteri sözleşmeyi imzalar -> ROP onaylar -> İlk işlem yapılır -> ODD teslim edilir",
      "Onay anında veya öncesinde ODD teslim edilir -> ROP hesabı onaylar -> İşlem yapılabilir -> Müşteri 15 gün içinde imzalı sözleşmeyi iade eder",
      "İşlem yapılır -> ODD teslim edilir -> ROP onaylar -> 30 gün içinde sözleşme imzalanır",
      "Hesap onaylanır -> İşlem yapılır -> 5 iş günü içinde ODD teslim edilir"
    ],
    correctAnswer: 1,
    explanation: "1) Deliver the Options Disclosure Document (ODD) at or prior to account approval; 2) Registered Options Principal (ROP) approves the account; 3) Trades may occur; 4) Customer must sign and return the options agreement within 15 calendar days of account approval.",
    explanationTr: "Doğru sıra: 1) Hesap onaylanmadan önce veya sırasında ODD (Options Disclosure Document) teslim edilir; 2) Yetkili ROP hesabı onaylar; 3) İşlem gerçekleştirilebilir; 4) Müşteri 15 gün içinde imzalı opsiyon sözleşmesini geri göndermelidir.",
    ruleReference: "FINRA Rule 2360 / Options Account Approval Procedures",
    keyTakeaway: "Options: ODD delivered -> ROP approves -> Trades allowed -> Signed agreement returned within 15 days."
  },

  // ==========================================
  // SECTION 4: REGULATORY FRAMEWORK (9%)
  // ==========================================
  {
    id: "q-4-01",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Statutory Disqualification",
    difficulty: "Medium",
    question: "Under the Securities Exchange Act of 1934 and FINRA rules, which of the following events would result in an automatic statutory disqualification from associating with a member firm?",
    questionTr: "1934 tarihli Menkul Kıymetler Borsası Yasası ve FINRA kuralları uyarınca, aşağıdaki olaylardan hangisi bir üye firmada çalışmaktan otomatik yasal diskalifiye (statutory disqualification) sonucunu doğurur?",
    options: [
      "Filing for personal Chapter 7 bankruptcy 2 years ago",
      "A felony conviction for any crime within the past 10 years",
      "A misdemeanor speeding conviction 5 years ago",
      "Receiving a customer complaint alleging a $15,000 investment loss"
    ],
    optionsTr: [
      "2 yıl önce şahsi Bölüm 7 iflas başvurusunda bulunmuş olmak",
      "Son 10 yıl içinde herhangi bir suçtan dolayı ağır suç (felony) mahkumiyeti almış olmak",
      "5 yıl önce hız sınırını aşmaktan kabahat (misdemeanor) cezası almış olmak",
      "15.000 dolarlık yatırım kaybı iddia eden bir müşteri şikayeti almış olmak"
    ],
    correctAnswer: 1,
    explanation: "A person is subject to Statutory Disqualification (SD) if they have been convicted within the past 10 years of ANY felony, or any securities/money-related misdemeanor. Personal bankruptcy must be disclosed on Form U4 but is not an automatic statutory disqualifier.",
    explanationTr: "Son 10 yıl içinde işlenmiş HERHANGİ bir ağır suç (felony) mahkumiyeti veya menkul kıymetler/finans ile ilgili kabahat (misdemeanor) mahkumiyeti otomatik olarak yasal diskalifiye (statutory disqualification) sebebidir.",
    ruleReference: "Securities Exchange Act of 1934 Section 3(a)(39) / Statutory Disqualification",
    keyTakeaway: "Statutory Disqualification = Any felony conviction within 10 years or securities/fraud misdemeanor."
  },
  {
    id: "q-4-02",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Form U4 and U5 Requirements",
    difficulty: "Easy",
    question: "When a registered representative's association with a member firm is terminated, the firm must file Form U5 with FINRA within how many calendar days?",
    questionTr: "Tescilli bir temsilcinin üye firmayla olan ilişkisi sona erdiğinde (istifa veya fesih), firma Form U5'i kaç takvim günü içinde FINRA'ya sunmak zorundadır?",
    options: [
      "10 calendar days",
      "30 calendar days",
      "60 calendar days",
      "90 calendar days"
    ],
    optionsTr: [
      "10 takvim günü",
      "30 takvim günü",
      "60 takvim günü",
      "90 takvim günü"
    ],
    correctAnswer: 1,
    explanation: "When an associated person leaves a member firm, the firm must file Form U5 (Uniform Termination Notice for Securities Industry Registration) with FINRA and provide a copy to the representative within 30 calendar days.",
    explanationTr: "Bir çalışan işten ayrıldığında, aracı kurum Form U5'i (Ayrılma Bildirimi) 30 takvim günü içinde FINRA'ya iletmek ve bir nüshasını da eski çalışana vermekle yükümlüdür.",
    ruleReference: "FINRA By-Laws Article V, Section 3 / Form U5 Filing",
    keyTakeaway: "Form U5 = Filed within 30 days of termination. FINRA retains regulatory jurisdiction for 2 years."
  },
  {
    id: "q-4-03",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Continuing Education (CE) Requirements",
    difficulty: "Medium",
    question: "Under FINRA's modernized Continuing Education rules, registered representatives must complete the Regulatory Element of CE:",
    questionTr: "FINRA'nın güncel Sürekli Eğitim (CE) kuralları uyarınca, tescilli temsilciler Eğitimin Düzenleyici Unsurunu (Regulatory Element) ne sıklıkla tamamlamak zorundadır?",
    options: [
      "Every 3 years on the anniversary of their registration",
      "Annually by December 31 for each registration held",
      "Once every 5 years",
      "Only after a disciplinary sanction or written customer complaint"
    ],
    optionsTr: [
      "Tescil yıldönümlerinde her 3 yılda bir",
      "Sahip olunan her lisans için yıllık olarak 31 Aralık tarihine kadar",
      "5 yılda bir",
      "Yalnızca disiplin cezası veya yazılı müşteri şikayetinden sonra"
    ],
    correctAnswer: 1,
    explanation: "Under the CE rules effective since 2023, registered representatives must complete the Regulatory Element annually by December 31 for each registration category they hold. If a rep fails to complete it on time, their registration becomes CE Inactive.",
    explanationTr: "Güncel FINRA kurallarına göre, tüm tescilli kişiler Düzenleyici Unsur (Regulatory Element) sürekli eğitimini her yıl 31 Aralık'a kadar tamamlamak zorundadır. Zamanında tamamlamayanların lisansı askıya alınır (CE Inactive).",
    ruleReference: "FINRA Rule 1240 / Continuing Education Requirements",
    keyTakeaway: "Regulatory Element CE = Must be completed ANNUALLY by December 31."
  },
  {
    id: "q-4-04",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Outside Business Activities (OBA)",
    difficulty: "Medium",
    question: "A registered representative plans to drive part-time for a rideshare company on weekends for extra compensation. Under FINRA Rule 3270, what action is required?",
    questionTr: "Tescilli bir temsilci hafta sonları ek gelir elde etmek için bir araç paylaşım şirketinde yarı zamanlı şoförlük yapmayı planlamaktadır. FINRA Kuralı 3270 uyarınca hangi işlem zorunludur?",
    options: [
      "No notification is needed because the activity does not involve financial services",
      "Prior written notice must be provided to the representative's member firm",
      "Prior written permission must be approved by FINRA",
      "The representative must surrender their SIE qualification"
    ],
    optionsTr: [
      "Faaliyet finansal hizmetleri içermediği için bildirime gerek yoktur",
      "Temsilcinin üye firmasına önceden YAZILI BİLDİRİMDE bulunması gerekir",
      "Önceden FINRA tarafından yazılı izin onaylanmalıdır",
      "Temsilci SIE lisansını iade etmek zorundadır"
    ],
    correctAnswer: 1,
    explanation: "FINRA Rule 3270 requires registered persons to provide prior written notice to their employing member firm before engaging in ANY outside business activity (OBA) for which they receive compensation, even if non-securities related.",
    explanationTr: "FINRA Kuralı 3270'e göre, tescilli bir kişi para veya herhangi bir menfaat karşılığı yapacağı HERHANGİ bir dış iş faaliyeti (OBA) için (finansla ilgili olmasa bile) çalıştığı firmaya önceden yazılı bildirimde bulunmak zorundadır.",
    ruleReference: "FINRA Rule 3270 / Outside Business Activities",
    keyTakeaway: "Outside Business Activity (OBA) = Prior written notice to firm required for ANY compensated work."
  },
  {
    id: "q-4-05",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Customer Complaints Recordkeeping",
    difficulty: "Medium",
    question: "Under FINRA rules, customer complaints that must be recorded and retained by a broker-dealer are defined as:",
    questionTr: "FINRA kuralları uyarınca, bir aracı kurum tarafından kaydedilmesi ve saklanması gereken müşteri şikayetleri nasıl tanımlanır?",
    options: [
      "Any spoken objection communicated over the phone or in person",
      "Any written statement of a customer alleging a grievance involving activities of the firm or an associated person",
      "Only claims that involve disputed amounts in excess of $50,000",
      "Formal lawsuits filed in federal or state courts"
    ],
    optionsTr: [
      "Telefonda veya yüz yüze iletilen herhangi bir sözlü itiraz",
      "Müşterinin firmanın veya çalışanının faaliyetleriyle ilgili bir mağduriyet iddia ettiği her türlü YAZILI beyan",
      "Yalnızca 50.000 doları aşan uyuşmazlık içeren talepler",
      "Federal veya eyalet mahkemelerinde açılan resmi davalar"
    ],
    correctAnswer: 1,
    explanation: "FINRA defines a complaint as ANY WRITTEN statement (including letters, emails, and faxes) alleging a grievance involving the activities of the member or its associated persons. Oral complaints do not trigger mandatory complaint file retention. Customer complaint records must be retained for 4 years.",
    explanationTr: "FINRA'ya göre şikayet, firmanın veya çalışanlarının faaliyetlerine yönelik mağduriyet belirten her türlü YAZILI beyandır (e-posta, mektup). Sözlü şikayetler resmi şikayet dosyası kapsamına girmez. Şikayet kayıtları 4 yıl boyunca saklanmalıdır.",
    ruleReference: "FINRA Rule 4513 / Customer Complaints Recordkeeping",
    keyTakeaway: "Complaint = Must be in WRITING. Retained for 4 years."
  },
  {
    id: "q-4-06",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Telemarketing Rules",
    difficulty: "Easy",
    question: "Under the Telephone Consumer Protection Act and FINRA telemarketing rules, outbound cold calls to prospective clients may only be placed during which hours (local time of the person being called)?",
    questionTr: "Telefon Tüketici Koruma Yasası ve FINRA pazarlama kuralları uyarınca, potansiyel müşterilere yönelik soğuk aramalar aranan kişinin yerel saatine göre hangi saatler arasında yapılabilir?",
    options: [
      "7:00 a.m. to 7:00 p.m.",
      "8:00 a.m. to 9:00 p.m.",
      "9:00 a.m. to 5:00 p.m.",
      "Any time between 6:00 a.m. and midnight"
    ],
    optionsTr: [
      "Sabah 07:00 - Akşam 19:00 arası",
      "Sabah 08:00 - Akşam 21:00 arası",
      "Sabah 09:00 - Akşam 17:00 arası",
      "Sabah 06:00 - Gece 24:00 arası herhangi bir saatte"
    ],
    correctAnswer: 1,
    explanation: "Unsolicited cold calls to prospective retail customers may only take place between 8:00 a.m. and 9:00 p.m. in the prospect's local time zone. Callers must immediately state their identity, firm name, and telephone number.",
    explanationTr: "Müşterilere yönelik telefonla satış aramaları aranan kişinin yerel saatine göre yalnızca sabah 08:00 ile akşam 21:00 saatleri arasında yapılabilir. Arayan kişi hemen adını, firmasını ve arama amacını belirtmelidir.",
    ruleReference: "FINRA Rule 3230 / Telemarketing Rules",
    keyTakeaway: "Cold Calling hours = 8:00 a.m. to 9:00 p.m. customer's local time."
  },
  {
    id: "q-4-07",
    section: 4,
    sectionName: "Overview of Regulatory Framework",
    topic: "Lifetime Recordkeeping Requirements",
    difficulty: "Hard",
    question: "Under SEC Rule 17a-4, which of the following broker-dealer records must be maintained for the LIFETIME of the firm?",
    questionTr: "SEC Kuralı 17a-4 uyarınca, aşağıdaki aracı kurum kayıtlarından hangisi firmanın YAŞAMI BOYUNCA (lifetime) saklanmalıdır?",
    options: [
      "Customer trade confirmations",
      "Articles of incorporation, partnership agreements, and minute books",
      "Customer account statements and blotters",
      "Employee Form U4 applications"
    ],
    optionsTr: [
      "Müşteri işlem teyitleri (trade confirmations)",
      "Şirket ana sözleşmesi, ortaklık anlaşmaları ve yönetim kurulu karar defterleri",
      "Müşteri hesap ekstreleri ve yevmiye defterleri",
      "Çalışan Form U4 başvuruları"
    ],
    correctAnswer: 1,
    explanation: "Organizational records—including Articles of Incorporation, partnership agreements, corporate minute books, and stock certificates—must be retained for the lifetime of the enterprise. Blotters and general ledgers are kept for 6 years; customer confirmations and correspondence for 3 years.",
    explanationTr: "Şirketin kuruluş belgeleri (Articles of Incorporation, ortaklık sözleşmeleri, yönetim kurulu karar defterleri) firmanın varlığı boyunca (ömür boyu / lifetime) saklanmak zorundadır. Yevmiye defterleri 6 yıl, teyitler ve yazışmalar 3 yıl saklanır.",
    ruleReference: "SEC Rule 17a-4 / Retention of Records",
    keyTakeaway: "Lifetime Records = SPAM: Stock certificates, Partnership articles, Articles of incorporation, Minute books."
  }
];
