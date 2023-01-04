export default function setCommonInfoDefault() {
	let defaultObj = {
		uid: "",
		region: "USA",
		country: "US",
		countryArr: [],
		currencySymbol: {},
		seq: 1,
		appPlatform: "yihome",
	};
	defaultObj.countryArr = [
		{ code: "AL", english: "Albania", chinese: "阿尔巴尼亚", server: "EU" },
		{ code: "DZ", english: "Algeria", chinese: "阿尔及利亚", server: "EU" },
		{ code: "AF", english: "Afghanistan", chinese: "阿富汗", server: "SEA" },
		{ code: "AR", english: "Argentina", chinese: "阿根廷", server: "USA" },
		{
			code: "AE",
			english: "United Arab Emirates",
			chinese: "阿联酋",
			server: "SEA",
		},
		{ code: "AW", english: "Aruba", chinese: "阿鲁巴", server: "USA" },
		{ code: "OM", english: "Oman", chinese: "阿曼", server: "SEA" },
		{ code: "AZ", english: "Azerbaijan", chinese: "阿塞拜疆", server: "SEA" },
		{ code: "EG", english: "Egypt", chinese: "埃及", server: "EU" },
		{ code: "ET", english: "Ethiopia", chinese: "埃塞俄比亚", server: "EU" },
		{ code: "IE", english: "Ireland", chinese: "爱尔兰", server: "EU" },
		{ code: "EE", english: "Estonia", chinese: "爱沙尼亚", server: "EU" },
		{ code: "AD", english: "Andorra", chinese: "安道尔", server: "EU" },
		{ code: "AO", english: "Angola", chinese: "安哥拉", server: "EU" },
		{ code: "AI", english: "Anguilla", chinese: "安圭拉", server: "USA" },
		{
			code: "AG",
			english: "Antigua & Barbuda",
			chinese: "安提瓜和巴布达",
			server: "USA",
		},
		{ code: "AT", english: "Austria", chinese: "奥地利", server: "EU" },
		{ code: "AX", english: "Aland Island", chinese: "奥兰群岛", server: "EU" },
		{ code: "AU", english: "Australia", chinese: "澳大利亚", server: "SEA" },
		{
			code: "MO",
			english: "Macao(China)",
			chinese: "澳门（中国）",
			server: "SEA",
		},
		{ code: "BB", english: "Barbados", chinese: "巴巴多斯", server: "USA" },
		{
			code: "PG",
			english: "Papua New Guinea",
			chinese: "巴布亚新几内亚",
			server: "SEA",
		},
		{ code: "BS", english: "The Bahamas", chinese: "巴哈马", server: "USA" },
		{ code: "PK", english: "Pakistan", chinese: "巴基斯坦", server: "SEA" },
		{ code: "PY", english: "Paraguay", chinese: "巴拉圭", server: "USA" },
		{
			code: "PS",
			english: "Palestinian territories",
			chinese: "巴勒斯坦",
			server: "SEA",
		},
		{ code: "BH", english: "Bahrain", chinese: "巴林", server: "SEA" },
		{ code: "PA", english: "Panama", chinese: "巴拿马", server: "USA" },
		{ code: "BR", english: "Brazil", chinese: "巴西", server: "USA" },
		{ code: "BY", english: "Belarus", chinese: "白俄罗斯", server: "EU" },
		{ code: "BM", english: "Bermuda", chinese: "百慕大", server: "USA" },
		{ code: "BG", english: "Bulgaria", chinese: "保加利亚", server: "EU" },
		{
			code: "MP",
			english: "Northern Mariana Islands",
			chinese: "北马里亚纳群岛",
			server: "SEA",
		},
		{ code: "BJ", english: "Benin", chinese: "贝宁", server: "EU" },
		{ code: "BE", english: "Belgium", chinese: "比利时", server: "EU" },
		{ code: "IS", english: "Iceland", chinese: "冰岛", server: "EU" },
		{ code: "PR", english: "Puerto Rico", chinese: "波多黎各", server: "USA" },
		{
			code: "BA",
			english: "Bosnia & Herzegovina",
			chinese: "波黑",
			server: "EU",
		},
		{ code: "PL", english: "Poland", chinese: "波兰", server: "EU" },
		{ code: "BO", english: "Bolivia", chinese: "玻利维亚", server: "USA" },
		{ code: "BZ", english: "Belize", chinese: "伯利兹", server: "USA" },
		{ code: "BW", english: "Botswana", chinese: "博茨瓦纳", server: "EU" },
		{ code: "BT", english: "Bhutan", chinese: "不丹", server: "SEA" },
		{ code: "BF", english: "Burkina", chinese: "布基纳法索", server: "EU" },
		{ code: "BI", english: "Burundi", chinese: "布隆迪", server: "EU" },
		{ code: "BV", english: "Bouvet Island", chinese: "布韦岛", server: "SEA" },
		{ code: "KP", english: "North Korea", chinese: "朝鲜", server: "SEA" },
		{
			code: "GQ",
			english: "Equatorial Guinea",
			chinese: "赤道几内亚",
			server: "EU",
		},
		{ code: "DK", english: "Denmark", chinese: "丹麦", server: "EU" },
		{ code: "DE", english: "Germany", chinese: "德国", server: "EU" },
		{
			code: "TL",
			english: "Timor-Leste (East Timor)",
			chinese: "东帝汶",
			server: "SEA",
		},
		{ code: "TG", english: "Togo", chinese: "多哥", server: "EU" },
		{
			code: "DO",
			english: "Dominican Republic",
			chinese: "多米尼加",
			server: "USA",
		},
		{ code: "DM", english: "Dominica", chinese: "多米尼克", server: "USA" },
		{
			code: "RU",
			english: "Russian Federation",
			chinese: "俄罗斯",
			server: "EU",
		},
		{ code: "EC", english: "Ecuado", chinese: "厄瓜多尔", server: "USA" },
		{ code: "ER", english: "Eritrea", chinese: "厄立特里亚", server: "EU" },
		{ code: "FR", english: "France", chinese: "法国", server: "EU" },
		{ code: "FO", english: "Faroe Islands", chinese: "法罗群岛", server: "EU" },
		{
			code: "PF",
			english: "French polynesia",
			chinese: "法属波利尼西亚",
			server: "SEA",
		},
		{
			code: "GF",
			english: "French Guiana",
			chinese: "法属圭亚那",
			server: "USA",
		},
		{
			code: "TF",
			english: "French Southern Territories",
			chinese: "法属南部领地",
			server: "EU",
		},
		{
			code: "MF",
			english: "Saint Martin (France)",
			chinese: "法属圣马丁",
			server: "USA",
		},
		{
			code: "VA",
			english: "Vatican City (The Holy See)",
			chinese: "梵蒂冈",
			server: "EU",
		},
		{
			code: "PH",
			english: "The Philippines",
			chinese: "菲律宾",
			server: "SEA",
		},
		{ code: "FJ", english: "Fiji", chinese: "斐济群岛", server: "SEA" },
		{ code: "FI", english: "Finland", chinese: "芬兰", server: "EU" },
		{ code: "CV", english: "Cape Verde", chinese: "佛得角", server: "EU" },
		{ code: "GM", english: "Gambia", chinese: "冈比亚", server: "EU" },
		{
			code: "CG",
			english: "Republic of the Congo",
			chinese: "刚果（布）",
			server: "EU",
		},
		{
			code: "CD",
			english: "Democratic Republic of the Congo",
			chinese: "刚果（金）",
			server: "EU",
		},
		{ code: "CO", english: "Colombia", chinese: "哥伦比亚", server: "USA" },
		{ code: "CR", english: "Costa Rica", chinese: "哥斯达黎加", server: "USA" },
		{ code: "GD", english: "Grenada", chinese: "格林纳达", server: "USA" },
		{ code: "GL", english: "Greenland", chinese: "格陵兰", server: "USA" },
		{ code: "GE", english: "Georgia", chinese: "格鲁吉亚", server: "SEA" },
		{ code: "GG", english: "Guernsey", chinese: "根西岛", server: "EU" },
		{ code: "CU", english: "Cuba", chinese: "古巴", server: "USA" },
		{ code: "GP", english: "Guadeloupe", chinese: "瓜德罗普", server: "USA" },
		{ code: "GU", english: "Guam", chinese: "关岛", server: "SEA" },
		{ code: "GY", english: "Guyana", chinese: "圭亚那", server: "USA" },
		{ code: "KZ", english: "Kazakhstan", chinese: "哈萨克斯坦", server: "SEA" },
		{ code: "HT", english: "Haiti", chinese: "海地", server: "USA" },
		{ code: "KR", english: "South Korea", chinese: "韩国", server: "SEA" },
		{ code: "NL", english: "Netherlands", chinese: "荷兰", server: "EU" },
		{
			code: "BQ",
			english: "Caribbean Netherlands",
			chinese: "荷兰加勒比区",
			server: "USA",
		},
		{
			code: "HM",
			english: "Heard Island and McDonald Islands",
			chinese: "赫德岛和麦克唐纳群岛",
			server: "SEA",
		},
		{ code: "ME", english: "Montenegro", chinese: "黑山", server: "EU" },
		{ code: "HN", english: "Honduras", chinese: "洪都拉斯", server: "USA" },
		{ code: "KI", english: "Kiribati", chinese: "基里巴斯", server: "SEA" },
		{ code: "DJ", english: "Djibouti", chinese: "吉布提", server: "EU" },
		{
			code: "KG",
			english: "Kyrgyzstan",
			chinese: "吉尔吉斯斯坦",
			server: "SEA",
		},
		{ code: "GN", english: "Guinea", chinese: "几内亚", server: "EU" },
		{
			code: "GW",
			english: "Guinea-Bissau",
			chinese: "几内亚比绍",
			server: "EU",
		},
		{ code: "CA", english: "Canada", chinese: "加拿大", server: "USA" },
		{ code: "GH", english: "Ghana", chinese: "加纳", server: "EU" },
		{ code: "GA", english: "Gabon", chinese: "加蓬", server: "EU" },
		{ code: "KH", english: "Cambodia", chinese: "柬埔寨", server: "SEA" },
		{ code: "CZ", english: "Czech Republic", chinese: "捷克", server: "EU" },
		{ code: "ZW", english: "Zimbabwe", chinese: "津巴布韦", server: "EU" },
		{ code: "CM", english: "Cameroon", chinese: "喀麦隆", server: "EU" },
		{ code: "QA", english: "Qatar", chinese: "卡塔尔", server: "SEA" },
		{
			code: "KY",
			english: "Cayman Islands",
			chinese: "开曼群岛",
			server: "USA",
		},
		{
			code: "CC",
			english: "Cocos (Keeling) Islands",
			chinese: "科科斯群岛",
			server: "SEA",
		},
		{ code: "KM", english: "The Comoros", chinese: "科摩罗", server: "EU" },
		{ code: "CI", english: "C_te d'ivoire", chinese: "科特迪瓦", server: "EU" },
		{ code: "KW", english: "Kuwait", chinese: "科威特", server: "SEA" },
		{ code: "HR", english: "Croatia", chinese: "克罗地亚", server: "EU" },
		{ code: "KE", english: "Kenya", chinese: "肯尼亚", server: "EU" },
		{ code: "CK", english: "Cook Islands", chinese: "库克群岛", server: "SEA" },
		{ code: "LV", english: "Latvia", chinese: "拉脱维亚", server: "EU" },
		{ code: "LS", english: "Lesotho", chinese: "莱索托", server: "EU" },
		{ code: "LA", english: "Laos", chinese: "老挝", server: "SEA" },
		{ code: "LB", english: "Lebanon", chinese: "黎巴嫩", server: "SEA" },
		{ code: "LT", english: "Lithuania", chinese: "立陶宛", server: "EU" },
		{ code: "LR", english: "Liberia", chinese: "利比里亚", server: "EU" },
		{ code: "LY", english: "Libya", chinese: "利比亚", server: "EU" },
		{
			code: "LI",
			english: "Liechtenstein",
			chinese: "列支敦士登",
			server: "EU",
		},
		{ code: "RE", english: "Réunion", chinese: "留尼汪", server: "EU" },
		{ code: "LU", english: "Luxembourg", chinese: "卢森堡", server: "EU" },
		{ code: "RW", english: "Rwanda", chinese: "卢旺达", server: "EU" },
		{ code: "RO", english: "Romania", chinese: "罗马尼亚", server: "EU" },
		{ code: "MG", english: "Madagascar", chinese: "马达加斯加", server: "EU" },
		{ code: "IM", english: "Isle of Man", chinese: "马恩岛", server: "EU" },
		{ code: "MV", english: "Maldives", chinese: "马尔代夫", server: "SEA" },
		{
			code: "FK",
			english: "Falkland Islands",
			chinese: "马尔维纳斯群岛（福克兰）",
			server: "USA",
		},
		{ code: "MT", english: "Malta", chinese: "马耳他", server: "EU" },
		{ code: "MW", english: "Malawi", chinese: "马拉维", server: "EU" },
		{ code: "MY", english: "Malaysia", chinese: "马来西亚", server: "SEA" },
		{ code: "ML", english: "Mali", chinese: "马里", server: "EU" },
		{
			code: "MK",
			english: "Republic of Macedonia (FYROM)",
			chinese: "马其顿",
			server: "EU",
		},
		{
			code: "MH",
			english: "Marshall islands",
			chinese: "马绍尔群岛",
			server: "SEA",
		},
		{ code: "MQ", english: "Martinique", chinese: "马提尼克", server: "USA" },
		{ code: "YT", english: "Mayotte", chinese: "马约特", server: "EU" },
		{ code: "MU", english: "Mauritius", chinese: "毛里求斯", server: "EU" },
		{ code: "MR", english: "Mauritania", chinese: "毛里塔尼亚", server: "EU" },
		{
			code: "US",
			english: "United States of America (USA)",
			chinese: "美国",
			server: "USA",
		},
		{
			code: "AS",
			english: "American Samoa",
			chinese: "美属萨摩亚",
			server: "SEA",
		},
		{
			code: "VI",
			english: "United States Virgin Islands",
			chinese: "美属维尔京群岛",
			server: "USA",
		},
		{ code: "MN", english: "Mongolia", chinese: "蒙古", server: "SEA" },
		{ code: "MS", english: "Montserrat", chinese: "蒙塞拉特岛", server: "USA" },
		{ code: "BD", english: "Bangladesh", chinese: "孟加拉", server: "SEA" },
		{ code: "PE", english: "Peru", chinese: "秘鲁", server: "USA" },
		{
			code: "FM",
			english: "Federated States of Micronesia",
			chinese: "密克罗尼西亚联邦",
			server: "SEA",
		},
		{ code: "MM", english: "Myanmar (Burma)", chinese: "缅甸", server: "SEA" },
		{ code: "MD", english: "Moldova", chinese: "摩尔多瓦", server: "EU" },
		{ code: "MA", english: "Morocco", chinese: "摩洛哥", server: "EU" },
		{ code: "MC", english: "Monaco", chinese: "摩纳哥", server: "EU" },
		{ code: "MZ", english: "Mozambique", chinese: "莫桑比克", server: "EU" },
		{ code: "MX", english: "Mexico", chinese: "墨西哥", server: "USA" },
		{ code: "NA", english: "Namibia", chinese: "纳米比亚", server: "EU" },
		{ code: "ZA", english: "South Africa", chinese: "南非", server: "EU" },
		{ code: "AQ", english: "Antarctica", chinese: "南极洲", server: "SEA" },
		{
			code: "GS",
			english: "South Georgia and the South Sandwich Islands",
			chinese: "南乔治亚岛和南桑威奇群岛",
			server: "SEA",
		},
		{ code: "SS", english: "South Sudan", chinese: "南苏丹", server: "EU" },
		{ code: "NR", english: "Nauru", chinese: "瑙鲁", server: "SEA" },
		{ code: "NP", english: "Nepal", chinese: "尼泊尔", server: "SEA" },
		{ code: "NI", english: "Nicaragua", chinese: "尼加拉瓜", server: "USA" },
		{ code: "NE", english: "Niger", chinese: "尼日尔", server: "EU" },
		{ code: "NG", english: "Nigeria", chinese: "尼日利亚", server: "EU" },
		{ code: "NU", english: "Niue", chinese: "纽埃", server: "SEA" },
		{ code: "NO", english: "Norway", chinese: "挪威", server: "EU" },
		{
			code: "NF",
			english: "Norfolk Island",
			chinese: "诺福克岛",
			server: "SEA",
		},
		{ code: "PW", english: "Palau", chinese: "帕劳", server: "SEA" },
		{
			code: "PN",
			english: "Pitcairn Islands",
			chinese: "皮特凯恩群岛",
			server: "SEA",
		},
		{ code: "PT", english: "Portugal", chinese: "葡萄牙", server: "EU" },
		{ code: "JP", english: "Japan", chinese: "日本", server: "SEA" },
		{ code: "SE", english: "Sweden", chinese: "瑞典", server: "EU" },
		{ code: "CH", english: "Switzerland", chinese: "瑞士", server: "EU" },
		{ code: "SV", english: "El Salvador", chinese: "萨尔瓦多", server: "USA" },
		{ code: "WS", english: "Samoa", chinese: "萨摩亚", server: "SEA" },
		{ code: "RS", english: "Serbia", chinese: "塞尔维亚", server: "EU" },
		{ code: "SL", english: "Sierra Leone", chinese: "塞拉利昂", server: "EU" },
		{ code: "SN", english: "Senegal", chinese: "塞内加尔", server: "EU" },
		{ code: "CY", english: "Cyprus", chinese: "塞浦路斯", server: "SEA" },
		{ code: "SC", english: "Seychelles", chinese: "塞舌尔", server: "EU" },
		{
			code: "SA",
			english: "Saudi Arabia",
			chinese: "沙特阿拉伯",
			server: "SEA",
		},
		{
			code: "BL",
			english: "Saint Barthélemy",
			chinese: "圣巴泰勒米岛",
			server: "USA",
		},
		{
			code: "CX",
			english: "Christmas Island",
			chinese: "圣诞岛",
			server: "SEA",
		},
		{
			code: "ST",
			english: "Sao Tome & Principe",
			chinese: "圣多美和普林西比",
			server: "EU",
		},
		{
			code: "SH",
			english: "St. Helena & Dependencies",
			chinese: "圣赫勒拿",
			server: "EU",
		},
		{
			code: "KN",
			english: "St. Kitts & Nevis",
			chinese: "圣基茨和尼维斯",
			server: "USA",
		},
		{ code: "LC", english: "St. Lucia", chinese: "圣卢西亚", server: "USA" },
		{ code: "SM", english: "San Marino", chinese: "圣马力诺", server: "EU" },
		{
			code: "PM",
			english: "Saint-Pierre and Miquelon",
			chinese: "圣皮埃尔和密克隆",
			server: "USA",
		},
		{
			code: "VC",
			english: "St. Vincent & the Grenadines",
			chinese: "圣文森特和格林纳丁斯",
			server: "USA",
		},
		{ code: "LK", english: "Sri Lanka", chinese: "斯里兰卡", server: "SEA" },
		{ code: "SK", english: "Slovakia", chinese: "斯洛伐克", server: "EU" },
		{ code: "SI", english: "Slovenia", chinese: "斯洛文尼亚", server: "EU" },
		{
			code: "SJ",
			english: "Template:Country data SJMSvalbard",
			chinese: "斯瓦尔巴群岛和扬马延岛",
			server: "EU",
		},
		{ code: "SZ", english: "Swaziland", chinese: "斯威士兰", server: "EU" },
		{ code: "SD", english: "Sudan", chinese: "苏丹", server: "EU" },
		{ code: "SR", english: "Suriname", chinese: "苏里南", server: "USA" },
		{
			code: "SB",
			english: "Solomon Islands",
			chinese: "所罗门群岛",
			server: "SEA",
		},
		{ code: "SO", english: "Somalia", chinese: "索马里", server: "EU" },
		{ code: "TJ", english: "Tajikistan", chinese: "塔吉克斯坦", server: "SEA" },
		{
			code: "TW",
			english: "Taiwan(China)",
			chinese: "台湾（中国）",
			server: "SEA",
		},
		{ code: "TH", english: "Thailand", chinese: "泰国", server: "SEA" },
		{ code: "TZ", english: "Tanzania", chinese: "坦桑尼亚", server: "EU" },
		{ code: "TO", english: "Tonga", chinese: "汤加", server: "SEA" },
		{
			code: "TC",
			english: "Turks & Caicos Islands",
			chinese: "特克斯和凯科斯群岛",
			server: "USA",
		},
		{
			code: "TT",
			english: "Trinidad & Tobago",
			chinese: "特立尼达和多巴哥",
			server: "USA",
		},
		{ code: "TN", english: "Tunisia", chinese: "突尼斯", server: "EU" },
		{ code: "TV", english: "Tuvalu", chinese: "图瓦卢", server: "SEA" },
		{ code: "TR", english: "Turkey", chinese: "土耳其", server: "SEA" },
		{
			code: "TM",
			english: "Turkmenistan",
			chinese: "土库曼斯坦",
			server: "SEA",
		},
		{ code: "TK", english: "Tokelau", chinese: "托克劳", server: "SEA" },
		{
			code: "WF",
			english: "Wallis and Futuna",
			chinese: "瓦利斯和富图纳",
			server: "SEA",
		},
		{ code: "VU", english: "Vanuatu", chinese: "瓦努阿图", server: "SEA" },
		{ code: "GT", english: "Guatemala", chinese: "危地马拉", server: "USA" },
		{ code: "VE", english: "Venezuela", chinese: "委内瑞拉", server: "USA" },
		{ code: "BN", english: "Brunei", chinese: "文莱", server: "SEA" },
		{ code: "UG", english: "Uganda", chinese: "乌干达", server: "EU" },
		{ code: "UA", english: "Ukraine", chinese: "乌克兰", server: "EU" },
		{ code: "UY", english: "Uruguay", chinese: "乌拉圭", server: "USA" },
		{
			code: "UZ",
			english: "Uzbekistan",
			chinese: "乌兹别克斯坦",
			server: "SEA",
		},
		{ code: "ES", english: "Spain", chinese: "西班牙", server: "EU" },
		{
			code: "EH",
			english: "Western Sahara",
			chinese: "西撒哈拉",
			server: "EU",
		},
		{ code: "GR", english: "Greece", chinese: "希腊", server: "EU" },
		{
			code: "HK",
			english: "Hong Kong(China)",
			chinese: "香港（中国）",
			server: "SEA",
		},
		{ code: "SG", english: "Singapore", chinese: "新加坡", server: "SEA" },
		{
			code: "NC",
			english: "New Caledonia",
			chinese: "新喀里多尼亚",
			server: "SEA",
		},
		{ code: "NZ", english: "New Zealand", chinese: "新西兰", server: "SEA" },
		{ code: "HU", english: "Hungary", chinese: "匈牙利", server: "EU" },
		{ code: "SY", english: "Syria", chinese: "叙利亚", server: "SEA" },
		{ code: "JM", english: "Jamaica", chinese: "牙买加", server: "USA" },
		{ code: "AM", english: "Armenia", chinese: "亚美尼亚", server: "SEA" },
		{ code: "YE", english: "Yemen", chinese: "也门", server: "SEA" },
		{ code: "IQ", english: "Iraq", chinese: "伊拉克", server: "SEA" },
		{ code: "IR", english: "Iran", chinese: "伊朗", server: "SEA" },
		{ code: "IL", english: "Israel", chinese: "以色列", server: "EU" },
		{ code: "IT", english: "Italy", chinese: "意大利", server: "EU" },
		{ code: "IN", english: "India", chinese: "印度", server: "SEA" },
		{ code: "ID", english: "Indonesia", chinese: "印度尼西亚", server: "SEA" },
		{ code: "GB", english: "United Kingdom", chinese: "英国", server: "EU" },
		{
			code: "VG",
			english: "British Virgin Islands",
			chinese: "英属维尔京群岛",
			server: "USA",
		},
		{
			code: "IO",
			english: "British Indian Ocean Territory",
			chinese: "英属印度洋领地",
			server: "SEA",
		},
		{ code: "JO", english: "Jordan", chinese: "约旦", server: "SEA" },
		{ code: "VN", english: "Vietnam", chinese: "越南", server: "SEA" },
		{ code: "ZM", english: "Zambia", chinese: "赞比亚", server: "EU" },
		{ code: "JE", english: "Jersey", chinese: "泽西岛", server: "EU" },
		{ code: "TD", english: "Chad", chinese: "乍得", server: "EU" },
		{ code: "GI", english: "Gibraltar", chinese: "直布罗陀", server: "EU" },
		{ code: "CL", english: "Chile", chinese: "智利", server: "USA" },
		{
			code: "CF",
			english: "Central African Republic",
			chinese: "中非",
			server: "EU",
		},
	];
	defaultObj.currencySymbol = {
		AED: "د.إ",
		AFN: "Af",
		ALL: "L",
		AMD: "Դ",
		AOA: "Kz",
		ARS: "$",
		AUD: "$",
		AWG: "ƒ",
		AZN: "ман",
		BAM: "КМ",
		BBD: "$",
		BDT: "৳",
		BGN: "лв",
		BHD: "ب.د",
		BIF: "₣",
		BMD: "$",
		BND: "$",
		BOB: "Bs.",
		BRL: "R$",
		BSD: "$",
		BTN: "BTN",
		BWP: "P",
		BYN: "Br",
		BZD: "$",
		CAD: "$",
		CDF: "₣",
		CHF: "₣",
		CLP: "$",
		CNY: "¥",
		COP: "$",
		CRC: "₡",
		CUP: "$",
		CVE: "$",
		CZK: "Kč",
		DJF: "₣",
		DKK: "kr",
		DOP: "$",
		DZD: "د.ج",
		EGP: "£",
		ERN: "Nfk",
		ETB: "ETB",
		EUR: "€",
		FJD: "$",
		FKP: "£",
		GBP: "£",
		GEL: "ლ",
		GHS: "₵",
		GIP: "£",
		GMD: "D",
		GNF: "₣",
		GTQ: "Q",
		GYD: "$",
		HKD: "HK$",
		HNL: "L",
		HRK: "Kn",
		HTG: "G",
		HUF: "Ft",
		IDR: "Rp",
		ILS: "₪",
		INR: "₹",
		IQD: "ع.د",
		IRR: "﷼",
		ISK: "Kr",
		JMD: "$",
		JOD: "د.ا",
		JPY: "¥",
		KES: "Sh",
		KGS: "KGS",
		KHR: "៛",
		KPW: "₩",
		KRW: "₩",
		KWD: "د.ك",
		KYD: "$",
		KZT: "〒",
		LAK: "₭",
		LBP: "ل.ل",
		LKR: "Rs",
		LRD: "$",
		LSL: "L",
		LYD: "ل.د",
		MAD: "د.م.",
		MDL: "L",
		MGA: "MGA",
		MKD: "ден",
		MMK: "K",
		MNT: "₮",
		MOP: "P",
		MRU: "UM",
		MUR: "₨",
		MVR: "ރ.",
		MWK: "MK",
		MXN: "$",
		MYR: "RM",
		MZN: "MTn",
		NAD: "$",
		NGN: "₦",
		NIO: "C$",
		NOK: "kr",
		NPR: "₨",
		NZD: "$",
		OMR: "ر.ع.",
		PAB: "B/.",
		PEN: "S/.",
		PGK: "K",
		PHP: "₱",
		PKR: "₨",
		PLN: "zł",
		PYG: "₲",
		QAR: "ر.ق",
		RON: "L",
		RSD: "din",
		RUB: "р.",
		RWF: "₣",
		SAR: "ر.س",
		SBD: "$",
		SCR: "₨",
		SDG: "£",
		SEK: "kr",
		SGD: "S$",
		SHP: "£",
		SLL: "Le",
		SOS: "Sh",
		SRD: "$",
		STN: "Db",
		SYP: "ل.س",
		SZL: "L",
		THB: "฿",
		TJS: "ЅМ",
		TMT: "m",
		TND: "د.ت",
		TOP: "T$",
		TRY: "₤",
		TTD: "$",
		TWD: "$",
		TZS: "Sh",
		UAH: "₴",
		UGX: "Sh",
		USD: "$",
		UYU: "$",
		UZS: "UZS",
		VEF: "Bs F",
		VND: "₫",
		VUV: "Vt",
		WST: "T",
		XAF: "₣",
		XCD: "$",
		XPF: "₣",
		YER: "﷼",
		ZAR: "R",
		ZMW: "ZK",
		ZWL: "$",
	};
	defaultObj.host = "http://test-api.us.xiaoyi.com"; //  'https://gw-us-kamihome.dev.kamicloud.net'

	const U3675165 = createUserInfo(
		"3675165",
		"889931e18c5dd897ce230fae068cbbb9",
		"cff29237f7b218382a92a5ab95f8a1ce"
	);
	const U1449476 = createUserInfo(
		"1449476",
		"2c62c234cdebc1fc8604b576ad7ee12e",
		"e021b05c2257d25920e87353327f24ec"
	);

	const U3529382 = createUserInfo(
		"3529382",
		"44cdbb75e37beb3f9613194ff0e24dfb",
		"57ad781552aacebe2eab52174636639c"
	);

	const U3380510 = createUserInfo(
		"3380510",
		"37599bd5ca0ae18c38a74973959363ff",
		"1501a77aae508d749e6e8792c271604e"
	);

	const U4092534 = createUserInfo(
		"4092534",
		"bf1938ca947bbc6d91c63115c11311c9",
		"60c4b96ccb999ac368adfc230fa9febf"
	);

	const U4333090 = createUserInfo(
		"4333090",
		"17416e19cb12999552baa7c2d721c431",
		"049c82905c8f8cc4a26fd2a945e625c7"
	)

	defaultObj = Object.assign(defaultObj, U3529382);

	return defaultObj;
}

function createUserInfo(uid, token, secretToken) {
	return {
		userId: uid,
		userid: uid,
		token: token,
		tokenSecret: secretToken,
		tokensecret: secretToken,
	};
}