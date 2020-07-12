(function(){
'use strict';
//= wrapped

//= require_self
//= require_tree translations

angular.module('streama.translations', ['pascalprecht.translate'])
	.config(["$translateProvider", function ($translateProvider) {
		$translateProvider.determinePreferredLanguage();
		$translateProvider.fallbackLanguage('en');
	}])

	.run(["$rootScope", function ($rootScope) {
		$rootScope.availableLanguages = ['en', 'fr', 'es', 'de', 'kr', 'nl', 'pt', 'da', 'ja', 'it', 'ar', 'ru', 'cn', 'hu'];
	}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('cn', {
    LOGIN: {
      TITLE: '请登录',
      USERNAME: '用户名',
      PASSWORD: '密码',
      FIRST_TIME_HINT: '第一次使用？ 试试用 \'admin\' 作为用户名和密码登录。',
      SUBMIT: '登录',
      SESSION_EXPIRED: '你的会话已过期，请重新登录'
    },
    DASHBOARD: {
      HOME: '主页',
      TV_SHOWS: '节目',
      MOVIES: '电影',
      MY_LIST:'我的片单',
      TITLE: '回到主页',
      RECOMMENDATIONS: '为你推荐',
      NEW_RELEASES: '最新发售',
      CONTINUE_WATCHING: '继续观看',
      DISCOVER_SHOWS: '探索更多节目',
      DISCOVER_MOVIES: '探索更多电影',
      DISCOVER_OTHER_VIDEOS: '探索更多内容',
      SORT: '排序：',
      SEARCH_BY_NAME: '输入一个名字...',
      FILTER_BY_TAG: '根据标签过滤...',
      FILTER_BY_GENRE: '根据类型过滤...',
      BROWSE_GENRES: '查看所有类型',
      LOOKING_AT_GENRE: '你正在查看：',
      MARK_COMPLETED: '标记为看过',
      NO_TVSHOWS_FOUND: '没有任何节目可用',
      NO_WATCHLIST_FOUND: '這裡什麼都沒有',
      NO_MOVIES_FOUND: '没有任何电影可用',
      WATCHLIST: '我的片单'
    },
    VIDEO: {
      RELEASED: '发布于',
      IMDB: 'IMDB',
      RATING: '评分',
      VOTES: '投票',
      OVERVIEW: '简介',
      GENRE: '类型',
      TRAILER: '预告',
      SEASON: '季度',
      SUBTITLES: '字幕',
      NO_SUBTITLE: '没有字幕',
      SUBTITLE_SIZE: '字幕尺寸',
      VIDEO_FILES: '视频源',
      UPNEXT: '即将播放...'
    },

    MESSAGES: {
      SHARE_SOCKET: '通过这个按钮你将会看到地址栏有一个唯一id值，请复制这个完整地址发送给您的好友，这样您的好友就会知道您的观看进度了',
      FILE_MISSING: '这个内容出现了一些问题，看起来你已经删除了相关的视频文件。',
      CODEC_PROBLEM: '向播放器中添加视频文件似乎有问题。这很可能是由于一个编解码器问题。尝试将其转换为兼容的HTML5编解码器，删除当前附加的文件并重新添加。如果编解码器没有问题，请检查服务器的错误日志和设置中的基本URL。',
      WRONG_BASEPATH: '您的视频使用了错误的基本路径，但是您正在通过“{{basePath}}”浏览页面。请确保在设置中设置了正确的基本路径，并使用它来浏览应用程序。',
      FILE_IN_FS_NOT_FOUND: '您的视频无法在任何位置可用的应用程序。请检查设置和文件系统，以确保应用程序可以访问这些文件'
    },
    MANAGE_CONTENT: '管理内容',
    MANAGE_SUB_PROFILES: '编辑个人资料',
    WHOS_WATCHING: '现在是谁在观看？',
    ADD_SUB_PROFILE: '添加个人资料',
    EDIT_BTN: '编辑',
    DONE_BTN: '好',
    SAVE_BTN: '保存',
    CREATE_BTN: '创建',
    CANCEL_BTN: '取消',
    DELETE_BTN: '抹掉',
    ENTER_NAME: '输入名字',
    EDIT_PROFILE: '编辑个人资料',
    CREATE_PROFILE: '创建个人资料',
    ADMIN: 'Admin',
    HELP: '帮助',
    HELP_FAQ: '帮助 / 常见问题',
    PROFILE_SETTINGS: '用户设置',
    LOGOUT: '登出',
    CHANGE_PASSWORD: '更改密码',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_en: 'English',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    PROFIlE: {
      USERNAME: '用户名',
      FULL_NAME: '完整名字',
      LANGUAGE: '语言',
      PAUSE_ON_CLICK: '点击画面时暂停播放',
      FAVORITE_GENRES: '收藏的类型',
      AMOUNT_OF_MEDIA_ENTRIES: '主页显示的视频数量',
      SAVE: '保存',
      PASS: '密码',
      OLD_PASS: '旧密码',
      NEW_PASS: '新密码',
      NEW_PASS_PLACEHOLDER: '新密码  (最少6位数)',
      REPEAT_PASS: '重复密码',
      PASS_ERROR_EMPTY: '密码不能为空！',
      PASS_ERROR_LENGTH: '密码最少为6位数！',
      PASS_ERROR_REPEAT: '两次密码不匹配！',
      SAVE_PASS: '保存更改'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: '最近上架',
      OLDEST_ADDED: '最初上架',
      NEWEST_RELEASED: '最新发布',
      OLDEST_RELEASED: '最初发布',
      NEWEST_AIRED: '热门选择',
      OLDEST_AIRED: '重温老片',
      NEWEST_REPORTED: '最新报道',
      OLDEST_REPORTED: '最初报道',
      NEWEST_UPDATED: '最近更新',
      OLDEST_UPDATED: '最初更新'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: '我怎样才能上传视频？',
        TEXT: "你可以通过管理内容菜单来上传视频。选择是否上传电影、电视节目或其他视频。单击相关的子菜单选项" +
          " 在屏幕左侧的垂直导航栏上。你可以通过点击“新建电影/电视节目/其他视频”按钮或输入来上传视频" +
          " 要上载到搜索栏的视频的名称，并从搜索结果中选择相关的电影。之后，你可以选择填写视频" +
          " 的信息手动或从TheMovieDB加载其信息。之后，您可以通过单击“管理文件”按钮上传视频和字幕文件。"
      },
      DELETE_VIDEO: {
        TITLE: '我怎样才能删除一个视频？',
        TEXT: "您可以通过进入视频的信息页面，点击管理文件并选择红色垃圾桶图标来删除视频。点击编辑电影和选择" +
          " 删除影片是另一种方法。您还可以使用“管理内容”菜单中的“文件管理器”。你可以看到你上传的所有文件。点击" +
          " 删除文件的红色垃圾桶图标。"
      },
      VIDEO_FORMATS: {
        TITLE: '什么样的视频格式受支持？',
        TEXT: "MoviePlace目前只支持HTML5 player支持的视频文件格式。你可以通过拖放一个视频到浏览器来测试你的视频文件是否兼容HTML5 player"
      },
      SUBTITLES: {
        TITLE: '如何为视频添加字幕?',
        TEXT: "你可以通过点击视频信息页面上的“管理文件”按钮为视频添加字幕。你可以拖放字幕文件。" +
          " 以前您必须手动将它们转换为兼容的文件格式，但现在不需要了！现在MoviePlace将为您处理这个问题。"
      },
      INVITE_USERS: {
        TITLE: '如何邀请朋友观看我的视频?',
        TEXT:"你可以邀请你的朋友使用你的MoviePlace来分享你的视频。转到用户菜单并单击邀请用户按钮。填写邀请表格" +
          " 选择受邀者的角色。具有Admin角色的用户可以编辑用户和设置。具有角色内容管理器的用户可以编辑内容。你的朋友会" +
          " 接收到我们通过电子邮件发出的邀请。您还可以通过单击视频播放器的共享按钮并将会话URL链接到您的朋友来共享视频会话。"
      },
      BASE_URL: {
        TITLE: "什么是基本URL，我应该如何配置它?",
        TEXT: "Base-URL用于邀请邮件中的视频和链接。"
      },
      NOTIFICATIONS: {
        TITLE: "通知是什么?",
        TEXT: "你可以通过发送通知消息通知你的朋友上传的视频。您可以通过单击将它们添加到通知队列来发送它们" +
          " 添加通知按钮，这是在您的视频的信息页面，并前往通知菜单和点击发送队列按钮。"
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "视频播放器有快捷键吗?",
        TEXT: "是的。暂停/继续请按空格。音量:向上或向下的箭头键。跳过视频向前/向后:箭头键左或右。长跳过:" +
          " control + 方向键. 全屏开/关:alt + 回车。字幕开/关:S，静音:M，回到上一页" +
          " screen: delete 或者退格."
      },
      FAVORITE_GENRES: {
        TITLE: "用户喜欢的类型如何影响Streama?",
        TEXT: "暂无"
      },
      USEFUL_LINKS: {
        TITLE: "有用的链接",
        TEXT: "暂无"
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translation by @ManuGithubSteam and @bastilimbach on 14/01/17
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('de', {
		LOGIN: {
			TITLE: 'Bitte einloggen',
			USERNAME: 'Benutzername',
			PASSWORD: 'Passwort',
			FIRST_TIME_HINT: 'Erstes mal hier? Versuche \'admin\' als Benutzername und Passwort.',
			SUBMIT: 'Login',
      SESSION_EXPIRED: 'Deine Sitzung ist abgelaufen. Bitte logge dich erneut ein.'
		},
		DASHBOARD: {
      HOME: 'Startseite',
      TV_SHOWS: 'Fernsehshows',
      MOVIES: 'Filme',
      MY_LIST:'Meine Liste',
			TITLE: 'Dashboard',
			NEW_RELEASES: 'Neuerscheinungen',
			CONTINUE_WATCHING: 'Weiterschauen',
			DISCOVER_SHOWS: 'Entdecke Serien',
			DISCOVER_MOVIES: 'Entdecke Filme',
			DISCOVER_OTHER_VIDEOS: 'Entdecke Videos',
			SORT: 'Sortierung:',
			SEARCH_BY_NAME: 'Nach Namen suchen...',
			FILTER_BY_TAG: 'Nach Tag filtern...',
      FILTER_BY_GENRE: 'Nach Genre filtern...',
			BROWSE_GENRES: 'Genres',
			LOOKING_AT_GENRE: 'Ausgewähltes Genre:',
			MARK_COMPLETED: 'Als gesehen Markieren',
			NO_TVSHOWS_FOUND: 'Keine Serien verfügbar',
      NO_WATCHLIST_FOUND: 'Noch keine Einträge',
			NO_MOVIES_FOUND: 'Keine Filme verfügbar',
      WATCHLIST: 'Beobachtungsliste'
    },
		VIDEO: {
			RELEASED: 'Veröffentlichung',
			IMDB: 'IMDB',
			RATING: 'Bewertungen',
			VOTES: 'Stimmen',
			OVERVIEW: 'Zusammenfassung',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Staffel',
      NO_SUBTITLE: 'Keine Untertitel'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Mit dem erstellen einer neuen Sitzung bekommst du eine eindeutige ID, welche du dann an deine Freunde weiterleiten kannst um den Film mit ihnen synchron zu genießen!',
			FILE_MISSING: 'Es gibt ein Problem mit dem Video. Es scheint als sei die dazugehörig Videodatei entfernt worden.',
			CODEC_PROBLEM: 'Es gibt ein Problem beim hinzufügen des Videos zum Player. Dies ist meist ein Kodierungsproblem. Versuche deine Videos in einen HTML5 fähigen Codec zu konvertieren. Lösche die aktuelle Datei und füge die recodierte hinzu. Wenn der Codec korrekt ist, überprüfe die Error-Logs und die Servereinstellungen.',
			WRONG_BASEPATH: 'Dein Video wird mit einem falschen Basispfad eingefügt. Du besuchst diese Seite über "{{basePath}}". Vergewissere dich, ob der korrekte Basispfad in den Einstellungen hinterlegt ist, und du diesen beim nächsten mal besuchst.'
		},
		MANAGE_CONTENT: 'Inhalte verwalten',
    MANAGE_SUB_PROFILES: 'Profile verwalten',
    WHOS_WATCHING: 'Wer ist gerade aktiv?',
    ADD_SUB_PROFILE: 'Profil hinzufügen',
    EDIT_BTN: 'Bearbeiten',
    DONE_BTN: 'Fertig',
    SAVE_BTN: 'Speichern',
    CREATE_BTN: 'Erstellen',
    CANCEL_BTN: 'Abbrechen',
    DELETE_BTN: 'Löschen',
    ENTER_NAME: 'Namen eingeben',
    EDIT_PROFILE: 'Profil bearbeiten',
    CREATE_PROFILE: 'Profil erstellen',
		ADMIN: 'Administratorenbereich',
		HELP: 'Hilfe',
		HELP_FAQ: 'Hilfe / FAQ',
		PROFILE_SETTINGS: 'Profileinstellungen',
		LOGOUT: 'Ausloggen',
		CHANGE_PASSWORD: 'Passwort ändern',
	LANGUAGE_cn: 'Chinese/中文',
	LANGUAGE_en: 'English/Englisch',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch',
    LANGUAGE_fr: 'Français/Französisch',
    LANGUAGE_es: 'Español/Spanisch',
    LANGUAGE_kr: '한국어/Koreanisch',
    LANGUAGE_nl: 'Nederlands/Niederländisch',
    LANGUAGE_pt: 'Português/Portugiesisch',
    LANGUAGE_ja: '日本語/Japanisch',
    LANGUAGE_it: 'Italiano/Italienisch',
    LANGUAGE_da: 'Dansk/Dänisch',
    LANGUAGE_ar: 'عربى/Arabisch',
    LANGUAGE_hu: 'Magyar/Ungarisch',
		PROFIlE: {
			USERNAME: 'Benutzername',
			FULL_NAME: 'Echter Name',
			LANGUAGE: 'Sprache',
			PAUSE_ON_CLICK: 'Videos durch klicken pausieren',
			FAVORITE_GENRES: 'Lieblingsgenres',
			SAVE: 'Profil speichern',
			OLD_PASS: 'Altes Passwort',
			NEW_PASS: 'Neues Passwort',
			NEW_PASS_PLACEHOLDER: 'Neues Passwort  (mindestens 6 Zeichen)',
			REPEAT_PASS: 'Passwort wiederholen',
			SAVE_PASS: 'Passwort speichern',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aktivitäten auf dem Dashboard (Bevor per Button mehr geladen werden können)'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Zuletzt hinzugefügt',
			OLDEST_ADDED: 'Zuerst hinzugefügt',
			NEWEST_RELEASED: 'Neuste Veröffentlichung',
			OLDEST_RELEASED: 'Älteste Veröffentlichung',
			NEWEST_AIRED: 'Zuletzt ausgestrahlt',
			OLDEST_AIRED: 'Zuerst ausgestrahlt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Wie kann ich ein Video hochladen?',
				TEXT: "Du kannst Videos hochladen indem du auf Inhalte verwalten klickst. Wähle aus, ob du eine Serie, einen Film oder ein Video hochladen möchtest. Klicke auf die relevante Option " +
				"auf der linken Seite. Dann klicke auf den Button rechts. Danach öffent sich die Suchleiste, in den du den Titel des Film eingibst. Dies kannst du auch manuell machen, falls keine Vorschläge geladen werden. " +
				"Im Anschluss kannst du das Video mit einer Datei verknüpfen oder eine Datei hochladen."

			},
			DELETE_VIDEO: {
				TITLE: 'Wie kann ich ein Video löschen?',
				TEXT: "Du kannst Videos in der Videoinformationsseite löschen, wenn du Inhalte verwalten anklickst und dann auf den roten Mülleimer. Video editieren anklicken und dann Video löschen" +
				" an zu klicken ist ein anderer Weg ein Video zu löschen. Du kannst auch den Filemanager benutzen, der sich im Inhalte Verwalten Menü befindet." +
				" Auch hier den roten Mülleimer verwenden."
			},
			VIDEO_FORMATS: {
				TITLE: 'Welche Video Formate werden unterstützt?',
				TEXT: "Streama unterstützt im Moment nur Formate für den HTML5 player. Du kannst testen ob deine Videodatei HTML5 kompatiebel ist, indem du diese in einem Browsertab/Browserfenster öffnest."
			},
			SUBTITLES: {
				TITLE: 'Wie kann ich Untertitel zu Videos hinzufügen?',
				TEXT: "Du kannst Untertitel in der Videosinformationsseite unter Inhalte verwalten. Du kannst dort Untertitel durch Drag and Drop hinzufügen. " +
				"Die Untertitel müssen nicht mehr konvertiert werden."
			},
			INVITE_USERS: {
				TITLE: 'Wie kann ich gehostete Videos mit Freunden teilen?',
				TEXT:"Du kannst deine Videos auf Streama teilen, indem du deine Freunde einlädst. Gehe zum Benutzermenü und klicke auf den Einladen-Button. Fülle das Formular aus" +
				" und wähle die Rollen. Benutzer mit der Rolle \"Admin\" können Benutzer und Einstellungen ändern. Benutzer mit der Rolle \"Content Manager\" können Inhalte verwalten." +
				" Deine Freunde werden durch eine E-Mail benachrichtigt, dass du sie eingeladen hast. Du kannst auch Videositzungen teilen (also Synchron gucken) indem du auf den Teilen Button des Videoplayers drückst und die Sitzungs-URL teilst."
			},
			BASE_URL: {
				TITLE: "Was ist die base URL und wie sollte sie konfiguriert werden?",
				TEXT: "Die base URL wird für Email Einladungen benutzt."
			},
			NOTIFICATIONS: {
				TITLE: "Was sind Benachrichtigungen?",
				TEXT: "Du kannst deine eingeladenen Freunde über hochgeladene Videos mit Benachrichtigungen informieren. Du kannst diese zur Benachrichtigungswarteschlange hinzufügen, indem du den Benachrichtigungsknopf in der Informationsseite drückst und im Benachrichtungsmenu auf Senden klickst."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Unterstützt der Player Tastaturkurzbefehle?",
				TEXT: "Ja. Pause/Weiter: Leertaste. Lautstärke: Pfeiltasten hoch oder runter. Videosprünge vor/zurück: Pfeiltasten rechts oder links. Langer Sprung:" +
				" Steuerung + Pfeiltasten links oder rechts. Vollbildschirm an/aus: Alt + Enter. Untertitel an/aus: S, Mute: M, Zurück zum vorherigen Bildschirm" +
				" : Enf oder Rücktaste."
			},
			FAVORITE_GENRES: {
				TITLE: "Wie beeinflussen die Lieblings-Genres des Nutzers Streama?",
				TEXT: "Noch gar nicht, es wird daran gearbeitet."
			},
			USEFUL_LINKS: {
				TITLE: "Nützliche links",
				TEXT: "Auch hieran wird gearbeitet."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by Anderzzenn on 05/03/17.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('da', {
		LOGIN: {
			TITLE: 'Log Ind',
			USERNAME: 'Brugernavn',
			PASSWORD: 'Kodeord',
			FIRST_TIME_HINT: 'Første gang du logger ind? Prøv \'admin\' i begge felter.',
			SUBMIT: 'Log Ind',
      SESSION_EXPIRED: 'Din session er udløbet siden din sidste aktivitet. Venligst log ind igen.'
		},
		DASHBOARD: {
      HOME: 'Hjemmeside',
      TV_SHOWS: 'TV-shows',
      MOVIES: 'Films',
      MY_LIST:'Min liste',
			TITLE: 'Betjeningspanel',
			RECOMMENDATIONS: 'Foreslået til dig',
			NEW_RELEASES: 'Nye Udgivelser',
			CONTINUE_WATCHING: 'Se videre',
			DISCOVER_SHOWS: 'Opdag Serier',
			DISCOVER_MOVIES: 'Opdag Film',
			DISCOVER_OTHER_VIDEOS: 'Opdag Andre Videoer',
			SORT: 'Sorter:',
			SEARCH_BY_NAME: 'Søg via Navn...',
			FILTER_BY_TAG: 'Filtrer via Tag...',
			BROWSE_GENRES: 'Gennemse',
			LOOKING_AT_GENRE: 'Du ser på genren:',
			MARK_COMPLETED: 'Marker færdigt',
			NO_TVSHOWS_FOUND: 'Ingen TV-Serier tilgængelig',
      NO_WATCHLIST_FOUND: 'Intet her endnu',
			NO_MOVIES_FOUND: 'Ingen Film tilgængelig',
      WATCHLIST: 'se senere'
		},
		VIDEO: {
			RELEASED: 'Udgivet',
			IMDB: 'IMDB',
			RATING: 'Bedømmelse',
			VOTES: 'Stemmer',
			OVERVIEW: 'Oversigt',
			GENRE: 'Genre',
			TRAILER: 'Trailer',
			SEASON: 'Sæson',
      NO_SUBTITLE: 'Ingen undertekst'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ved at lave en ny session vil du blive sendt tilbage til denne afspiller, men denne gang vil du have et unikt session ID i linket. Del dette med dine venner for at have en synkroniseret film oplevelse med dem!',
			FILE_MISSING: 'Der er et problem med dette indhold. Det virker til du har slettet video filen associeret med indholdet.',
			CODEC_PROBLEM: 'Der virker til at være et problem med at tilføje video filen til afspilleren. Det er mest sandsynligt pågrund af et kodeks problem. Prøv at konvertere til et HTML5 kompitabelt kodeks, fjern den nuværende fil og tilføj den igen. Hvis kodekset er korrekt, tjek serverns fejl log og Base URL i indstillingerne.',
			WRONG_BASEPATH: 'Din video bliver inkluderet med det forkerte base path, men du browser siden via "{{basePath}}. Vær sikker på du har sat den korrekte Base Path i indstillinger og at to bruger det til at browse applikationen.',
			FILE_IN_FS_NOT_FOUND: 'Din video kan ikke blive fundet i nogle af applikationens tilgænlige lokationer. Venligst tjek dine indstillger og dit fil system for at være sikker på at applikationen kan få adgang til filerne.'
		},
		MANAGE_CONTENT: 'Administrer Indhold',
    MANAGE_SUB_PROFILES: 'Administrere profiler',
    WHOS_WATCHING: 'Hvem ser det?',
    ADD_SUB_PROFILE: 'Tilføj profil',
    EDIT_BTN: 'Redigere',
    DONE_BTN: 'Færdig',
    SAVE_BTN: 'Gemme',
    CREATE_BTN: 'skab',
    CANCEL_BTN: 'Afbestille',
    DELETE_BTN: 'Slet',
    ENTER_NAME: 'Indtast navn',
    EDIT_PROFILE: 'Rediger profil',
    CREATE_PROFILE: 'Opret profil',
		ADMIN: 'Admin',
		HELP: 'Hjælp',
		HELP_FAQ: 'Hjælp / FAQ',
		PROFILE_SETTINGS: 'Profil Indstillinger',
		LOGOUT: 'Log Ud',
		CHANGE_PASSWORD: 'Skift Kodeord',
	LANGUAGE_en: 'English/Engelsk',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russisk',
    LANGUAGE_de: 'Deutsch/Tysk',
    LANGUAGE_fr: 'Français/Fransk',
    LANGUAGE_es: 'Español/Spansk',
    LANGUAGE_kr: '한국어/Koreansk',
    LANGUAGE_nl: 'Nederlands/Hollandsk',
    LANGUAGE_pt: 'Português/Portugisisk',
    LANGUAGE_ja: '日本語/Japansk',
    LANGUAGE_it: 'Italiano/Italiensk',
    LANGUAGE_da: 'Dansk',
    LANGUAGE_ar: 'عربى/Arabisk',
    LANGUAGE_hu: 'Magyar/Ungarsk',
		PROFIlE: {
			USERNAME: 'Brugernavn',
			FULL_NAME: 'Fulde Navn',
			LANGUAGE: 'Sprog',
			PAUSE_ON_CLICK: 'Pause videon når der klikkes',
			FAVORITE_GENRES: 'Favorit Genrer',
			SAVE: 'Gem Profil',
			PASS: 'Kodeord',
			OLD_PASS: 'Gammelt Kodeord',
			NEW_PASS: 'Nye Kodeord',
			NEW_PASS_PLACEHOLDER: 'Nye Kodeord  (min. 6 Tegn)',
			REPEAT_PASS: 'Gentag Kodeord',
			PASS_ERROR_EMPTY: 'Kodeordet kan ikke være tomt',
			PASS_ERROR_LENGTH: 'Kodeordet skal være mindst 6 tegn langt',
			PASS_ERROR_REPEAT: 'Kodeordene skal være ens.',
      AMOUNT_OF_MEDIA_ENTRIES: 'Antal videoer på Dashboard (Før "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Senest Tilføjet',
			OLDEST_ADDED: 'Tilføjet Først',
			NEWEST_RELEASED: 'Nyeste Udgivelse',
			OLDEST_RELEASED: 'Ældste Udgivelse',
			NEWEST_AIRED: 'Senest Udsendt',
			OLDEST_AIRED: 'Ældste Udsendt'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Hvordan uploader jeg en video?',
				TEXT: "Du kan uploade videoer ved at gå til Administrer Indhold menuen. Vælg om du vil uploade en Film, TV Serie eller en Anden video. Klik på den relevante undermenu mulighed" +
				"på den lodrette navigations bar på venstre side af skærmen. Du kan uploade en video ved at trykke på Opret Ny Film/TV Serie/Andre Film knappen eller ved at skrive" +
				" navnet på videoen du vil uploade til søge feltet og vælg the relevante film fra søge resultaterne. Efter det, kan du vælge at udfylde videons information" +
        " manuelt eller ved at indlæse dens information fra TheMovieDB. Efter det, kan du uploade video og undertekst filerne ved at trykke Administrer Filer knappen."
			},
			DELETE_VIDEO: {
				TITLE: 'Hvordan sletter jeg en video?',
				TEXT: "Du kan slette en video ved at gå til videoens informations side og trykke på Administrer Filer og så trykke på det røde skraldespands ikon. Du kan også trykke på" +
        " Rediger Film og så trykke på Slet Film. Du kan også bruge Filhåndtering som ligger i Administrer Indhold menuen. Du kan se alle filerne der er blevet upload der. Tryk" +
        " på det røde skraldespands ikon for at slette en fil."
			},
			VIDEO_FORMATS: {
				TITLE: 'Hvilke video typer er understøttet?',
				TEXT: "Lige nu understøtter Steama kun video typer som er understøttet af HTML5 spilleren. Du kan teste om din video fil er HTML5 kompitabel ved at trække og slippe" +
        " din fil på en tom fane i din browser."
			},
			SUBTITLES: {
				TITLE: 'Hvordan tilføjer jeg undertekster til videoer?',
				TEXT: "Du kan tilføje undertekster til videoer ved at trykke på Administrer Filer knappen som er under videoens informations side. Du kan trække og slippe" +
        " undertekst filer der. " +
        "Tidligere skulle du manuelt konvertere dem til en kompitabel fil format. Men det skal du ikke længere! Nu gør applikationen det for dig."
			},
			INVITE_USERS: {
				TITLE: 'Hvordan kan jeg invitere venner til at se mine hostede videoer?',
				TEXT:"Du kan dele dine videoer med dine venner ved at invitere dem til dit hostede Streama. Gå til Bruger menuen og klik på Inviter Bruger knappen. Udfyld invitations formen" +
        " og vælg den inviteredes rolle(r). Brugere med Admin rollen kan redigere Brugere & Indstillinger. Brugere med rollen Indholds Manager kan redigere indhold. Dine venner vil" +
        " få invitationen via email. Du kan også dele video sessioner med dine venner ved at trykke på video afspilerens Del knap og så sende dem session linket til dem."
			},
			BASE_URL: {
				TITLE: "Hvad er base URL og hvordan konfigurer jeg det?" +
        "What's the base URL and how should I configure it?",
				TEXT: "Base-URL bliver brugt til videoerne og linket i invitation-emails."
			},
			NOTIFICATIONS: {
				TITLE: "Hvad er notifikationer?",
				TEXT: "Du kan notificere dine inviterede venner omkring uploadede videoer ved at sende dem en notifikations meddelelse. Du kan sende dem ved at tilføje dem til din notifikations" +
        "kø ved at trykke på Tilføj Notifikation knappen hvilket er under din videos informations side og gå til Notifikations menuen og trykke på Send Queue knappen."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Har video afspilleren nogle genvejs taster?",
				TEXT: "Ja. Pause/Unpause: Mellemrum. Juster lyd: piletasterne op eller ned. Spol frem og tilbage i videoen: piletasterne venstre eller højere." +
        " Langt spring: kontrol + piletasterne venstre eller højere. Fuldskærm fra/til: Alt + Enter. Undertekster til/fra: S, Slå lyd fra: M," +
        " Gå tilbage til den tidligere skærm: Delete eller tilbagetasten"
			},
			FAVORITE_GENRES: {
				TITLE: "Hvordan påvirker en brugers favorit genrer Streama?",
				TEXT: "Kommer snart..."
			},
			USEFUL_LINKS: {
				TITLE: "Brugfulde links",
				TEXT: "Kommer snart..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('en', {
    LOGIN: {
      TITLE: 'Please Login',
      USERNAME: 'Username',
      PASSWORD: 'Password',
      FIRST_TIME_HINT: 'First time logging in? Try \'admin\' for both fields.',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Your session expired since your last activity. Please login again.'
    },
    DASHBOARD: {
      HOME: 'Home',
      TV_SHOWS: 'TV Shows',
      MOVIES: 'Movies',
      MY_LIST:'My list',
      TITLE: 'Dashboard',
      RECOMMENDATIONS: 'Recommendations for you',
      NEW_RELEASES: 'New Releases',
      CONTINUE_WATCHING: 'Continue Watching',
      DISCOVER_SHOWS: 'Discover Shows',
      DISCOVER_MOVIES: 'Discover Movies',
      DISCOVER_OTHER_VIDEOS: 'Discover other videos',
      SORT: 'Sort:',
      SEARCH_BY_NAME: 'Search by Name...',
      FILTER_BY_TAG: 'Filter by Tag...',
      FILTER_BY_GENRE: 'Filter by Genre...',
      BROWSE_GENRES: 'Browse Genre',
      LOOKING_AT_GENRE: 'You\'re looking at the genre:',
      MARK_COMPLETED: 'Mark completed',
      NO_TVSHOWS_FOUND: 'No Tv-Shows Available',
      NO_WATCHLIST_FOUND: 'Nothing here yet',
      NO_MOVIES_FOUND: 'No Movies Available',
      WATCHLIST: 'Watchlist'
    },
    VIDEO: {
      RELEASED: 'Released',
      IMDB: 'IMDB',
      RATING: 'Rating',
      VOTES: 'Votes',
      OVERVIEW: 'Overview',
      GENRE: 'Genre',
      TRAILER: 'Trailer',
      SEASON: 'Season',
      SUBTITLES: 'Subtitles',
      NO_SUBTITLE: 'No Subtitle',
      SUBTITLE_SIZE: 'Subtitle Sizes',
      VIDEO_FILES: 'Video Sources',
      UPNEXT: 'Up Next...'
    },

    MESSAGES: {
      SHARE_SOCKET: 'By creating a new session you will be redirected back to this player, but this time you will have a unique session ID in the url. Share this with your friends to have a synchronized watching experience with them!',
      FILE_MISSING: 'There is a problem with this content. It seems you removed the associated video file from it.',
      CODEC_PROBLEM: 'There seems to be a problem adding the video-file to the player. This is most likely due to a codec-problem. Try converting it to a compatible HTML5 codec, remove the currently attached file and re-add it. If the codecs are fine, check the error log of the server and the base URL in the settings.',
      WRONG_BASEPATH: 'Your video get\'s included using the wrong Base Path, but you are browsing the page via "{{basePath}}". Make sure you set the correct Base Path in the settings and that you are using it to browse the application.',
      FILE_IN_FS_NOT_FOUND: 'Your video cannot be found in any of the locations available to the application. Please check your settings and your file system to make sure that the files are accessible by the application.'
    },
    MANAGE_CONTENT: 'Manage Content',
    MANAGE_SUB_PROFILES: 'Manage profiles',
    WHOS_WATCHING: 'Who\'s watching?',
    ADD_SUB_PROFILE: 'Add Profile',
    EDIT_BTN: 'Edit',
    DONE_BTN: 'Done',
    SAVE_BTN: 'Save',
    CREATE_BTN: 'Create',
    CANCEL_BTN: 'Cancel',
    DELETE_BTN: 'Delete',
    ENTER_NAME: 'Enter name',
    EDIT_PROFILE: 'Edit profile',
    CREATE_PROFILE: 'Create profile',
    ADMIN: 'Admin',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'User Settings',
    LOGOUT: 'Logout',
    CHANGE_PASSWORD: 'Change Password',
    LANGUAGE_en: 'English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russian',
    LANGUAGE_de: 'Deutsch/German',
    LANGUAGE_fr: 'Français/French',
    LANGUAGE_es: 'Español/Spanish',
    LANGUAGE_kr: '한국어/Korean',
    LANGUAGE_nl: 'Nederlands/Dutch',
    LANGUAGE_pt: 'Português/Portuguese',
    LANGUAGE_ja: '日本語/Japanese',
    LANGUAGE_it: 'Italiano/Italian',
    LANGUAGE_da: 'Dansk/Danish',
    LANGUAGE_ar: 'عربى/Arabic',
    LANGUAGE_hu: 'Magyar/Hungarian',
    PROFIlE: {
      USERNAME: 'Username',
      FULL_NAME: 'Full Name',
      LANGUAGE: 'Language',
      PAUSE_ON_CLICK: 'Pause Video on Click',
      FAVORITE_GENRES: 'Favorite Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Amount of Videos on Dashboard (Before "Load More")',
      SAVE: 'Save Profile',
      PASS: 'Password',
      OLD_PASS: 'Old Password',
      NEW_PASS: 'New Password',
      NEW_PASS_PLACEHOLDER: 'New Password  (min. 6 Characters)',
      REPEAT_PASS: 'Repeat Password',
      PASS_ERROR_EMPTY: 'The password can not be empty',
      PASS_ERROR_LENGTH: 'The password must be at least 6 characters long',
      PASS_ERROR_REPEAT: 'The passwords need to match',
      SAVE_PASS: 'Set new password'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Most Recently Added',
      OLDEST_ADDED: 'First Added',
      NEWEST_RELEASED: 'Latest Release',
      OLDEST_RELEASED: 'Oldest Release',
      NEWEST_AIRED: 'Most Recently Aired',
      OLDEST_AIRED: 'Oldest Air-Date',
      NEWEST_REPORTED: 'Most Recently Reported',
      OLDEST_REPORTED: 'Oldest Report',
      NEWEST_UPDATED: 'Most Recently Updated',
      OLDEST_UPDATED: 'Oldest Update'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'How can I upload a video?',
        TEXT: "You can upload videos by going to Manage Content menu. Choose if you want to upload a Movie, TV show or Other video. Click the relevant sub-menu option" +
          " on the vertical navigation bar on the left side of the screen. You can upload a video by clicking the Create New Movie/TV Show/Other Video button or by typing" +
          " the name of the video you want to upload to the search bar and selecting the relevant movie from search results. After that, you can choose to fill in the video's" +
          " information either manually or loading its information from TheMovieDB. After that, you can upload the video and subtitle files by clicking Manage Files button."
      },
      DELETE_VIDEO: {
        TITLE: 'How can I delete a video?',
        TEXT: "You can delete a video by going to the video's information page and clicking Manage Files and selecting the red trash can icon. Clicking Edit Movie and selecting" +
          " Delete Movie is another way to do it. You can also use the File Manager which is in the Manage Content menu. You can see all the files you have uploaded there. Click" +
          " the red trash can icon to delete a file."
      },
      VIDEO_FORMATS: {
        TITLE: 'Which video formats are supported?',
        TEXT: "Streama supports currently only the video file formats supported by HTML5 player. You can test if your video file is HTML5 player compatible by dragging and dropping" +
          " your file to an empty tab on your browser."
      },
      SUBTITLES: {
        TITLE: 'How can I add subtitles to videos?',
        TEXT: "You can add subtitles to videos by clicking Manage Files button which is in the video's information page. You can drag and drop subtitle files there." +
          " Previously you had to manually convert them into a compatible file format, but not anymore! Now the application handles that for you."
      },
      INVITE_USERS: {
        TITLE: 'How can I invite friends to watch my hosted videos?',
        TEXT:"You can share your videos with your friends by inviting them to use your hosted Streama. Go to the Users menu and click Invite User button. Fill in the invite form and" +
          " select the invitee's role(s). Users with the role Admin can edit Users & Settings. Users with the role Content Manager can edit content. Your friend will be notified about" +
          " the invitation via email. You can also share video sessions with your friends by clicking the video player's Share button and linking the session URL to them."
      },
      BASE_URL: {
        TITLE: "What's the base URL and how should I configure it?",
        TEXT: "The Base-URL is used for the videos and the link in the invitation-email."
      },
      NOTIFICATIONS: {
        TITLE: "What are notifications?",
        TEXT: "You can notify your invited friends about uploaded videos by sending them notification messages. You can send them by adding them your notification queue by clicking" +
          " Add Notification button which is in your video's information page and going to the Notifications menu and clicking Send Queue button."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Does the video player have shortcut keys?",
        TEXT: "Yes. Pause/unpause: space. Manage volume: arrow keys up or down. Skip video forward/backward: arrow keys left or right. Long skip:" +
          " control + arrow keys left or right. Fullscreen on/off: alt + enter. Subtitles on/off: S, Mute: M, Return to previous" +
          " screen: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "How do user's favorite genres affect Streama?",
        TEXT: "Coming soon..."
      },
      USEFUL_LINKS: {
        TITLE: "Useful links",
        TEXT: "Coming soon..."
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Improved translation by @Norwelian on 23/05/19
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('es', {
		LOGIN: {
			TITLE: 'Introduzca su usuario',
			USERNAME: 'Usuario',
			PASSWORD: 'Contraseña',
			FIRST_TIME_HINT: '¿Es tu primera vez? Prueba \'admin\' en ambos campos.',
			SUBMIT: 'Entrar',
      SESSION_EXPIRED: 'Su sesión expiró desde su última actividad. Por favor inicie sesión de nuevo.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Programas de televisión',
      MOVIES: 'Películas',
      MY_LIST:'Mi lista',
			TITLE: 'Panel de control',
			NEW_RELEASES: 'Nuevas Publicaciones',
			CONTINUE_WATCHING: 'Continuar Viendo',
			DISCOVER_SHOWS: 'Descubre Series',
			DISCOVER_MOVIES: 'Descubre Películas',
			DISCOVER_OTHER_VIDEOS: 'Descubre otros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Buscar por Nombre...',
			FILTER_BY_TAG: 'Filtrar por Etiqueta...',
			BROWSE_GENRES: 'Buscar',
			LOOKING_AT_GENRE: 'Estás explorando el género:',
			MARK_COMPLETED: 'Marcar como Completado',
			NO_TVSHOWS_FOUND: 'No se han encontrado Series',
      NO_WATCHLIST_FOUND: 'Nada aquí todavía',
			NO_MOVIES_FOUND: 'No se han encontrado Películas',
      WATCHLIST: 'ver más tarde'
		},
		VIDEO: {
			RELEASED: 'Publicado',
			IMDB: 'IMDB',
			RATING: 'Puntuación',
			VOTES: 'Votos',
			OVERVIEW: 'Sinopsis',
			GENRE: 'Género',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
      NO_SUBTITLE: 'Sin subtítulos'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Creando una sesión nueva, seras redirigido de vuelta a este reproductor, pero esta vez tendrás un código de sesión único en la URL. ¡Comparte éste enlace con tus amigos para tener una experiencia de visión sincronizada con ellos!',
			FILE_MISSING: 'Hay un problema con este contenido. Parece el archivo asociado al mismo ha sido eliminado.',
			CODEC_PROBLEM: 'Parece que hay un problema añadiendo el archivo de vídeo al reproductor. Ésto suele deberse a un problema con los códecs. Prueba convirtiéndolo a un códec compatible con HTML5, elimina el fichero asociado, y añádelo de nuevo. Si los códecs son los correctos, comprueba el log del servidor y la URL base en las opciones.',
			WRONG_BASEPATH: 'Tu vídeo ha sido incluido usando una ruta incorrecta, pero estás accediendo a la página a traves de la ruta "{{basePath}}". Asegúrate de escribir la ruta correcta en las propiedades y de que estás usándola para acceder a la aplicación.'
		},
		MANAGE_CONTENT: 'Gestionar Contenido',
    MANAGE_SUB_PROFILES: 'Gestionar Perfiles',
    WHOS_WATCHING: '¿Quién está viendo?',
    ADD_SUB_PROFILE: 'Añadir perfil',
    EDIT_BTN: 'Editar',
    DONE_BTN: 'Hecho',
    SAVE_BTN: 'Guardar',
    CREATE_BTN: 'Crear',
    CANCEL_BTN: 'Cancelar',
    DELETE_BTN: 'Borrar',
    ENTER_NAME: 'Ingrese su nombre',
    EDIT_PROFILE: 'Editar perfil',
    CREATE_PROFILE: 'Crear perfil',
		ADMIN: 'Admin',
		HELP: 'Ayuda',
		HELP_FAQ: 'Ayuda / Preguntas Frecuentes',
		PROFILE_SETTINGS: 'Opciones de Perfil',
		LOGOUT: 'Salir',
		CHANGE_PASSWORD: 'Cambiar Contraseña',
	LANGUAGE_en: 'English/Inglés',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Ruso',
    LANGUAGE_de: 'Deutsch/Alemán',
    LANGUAGE_fr: 'Français/Francés',
    LANGUAGE_es: 'Español',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Holandés',
    LANGUAGE_pt: 'Português/Portugués',
    LANGUAGE_ja: '日本語/Japonés',
    LANGUAGE_it: 'Italiano/Italiano',
    LANGUAGE_da: 'Dansk/Danés',
    LANGUAGE_ar: 'عربى/Árabe',
    LANGUAGE_hu: 'Magyar/Húngaro',
		PROFIlE: {
			USERNAME: 'Nombre de usuario',
			FULL_NAME: 'Nombre completo',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Click en video para pausar',
			FAVORITE_GENRES: 'Géneros Favoritos',
			SAVE: 'Guardar Perfil',
			OLD_PASS: 'Antigua Contraseña',
			NEW_PASS: 'Nueva Contraseña',
			NEW_PASS_PLACEHOLDER: 'Nueva Contraseña  (min. 6 Caracteres)',
			REPEAT_PASS: 'Repite tu Contraseña',
			SAVE_PASS: 'Guardar Nueva Contraseña',
      AMOUNT_OF_MEDIA_ENTRIES: 'Cantidad de videos en la página principal (antes de que aparezca el botón "Cargar Más")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Añadidos Recientemente',
			OLDEST_ADDED: 'Añadidos Primero',
			NEWEST_RELEASED: 'Últimos Publicados',
			OLDEST_RELEASED: 'Primeros Publicados',
			NEWEST_AIRED: 'Transmitidos Recientemente',
			OLDEST_AIRED: 'Transmitidos Primero'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '¿Cómo puedo subir un vídeo?',
				TEXT: "Puedes subir un vídeo accediendo al menú Gestionar Contenido. Elige si quieres subir una Película, una Serie o cualquier otro vídeo. Haz click en la opción correspondiente del menú" +
				" vertical en el lateral izquierdo de la aplicación. Puedes subir un vídeo haciendo click en el botón de Crear Nueva Película/Serie/Otro o escribiendo" +
				" el nombre del vídeo que quieres subir en la barra de búsqueda y seleccionando la entrada deseada de entre los resultados. Después de eso, puedes elegir rellenar la información del vídeo" +
				" manualmente o cargar la información desde TheMovieDB automáticamente. Posteriormente, puedes subir el vídeo y los archivos de subtítulos pulsando sobre el botón Gestionar Archivos."
			},
			DELETE_VIDEO: {
				TITLE: '¿Cómo puedo borrar un vídeo?',
				TEXT: "Puedes borrar un vídeo yendo a la página de información de dicho video, haciendo click en Gestionar Archivos y seleccionando el icono de una papelera roja. Otra manera es haciendo click en Editar Película" +
				" y seleccionando Borrar película. También puedes usar el Gestor de Archivos que se encuentra en el menú de Gestionar Contenido. De ésta manera puedes ver todos los archivos subidos. Haz click en Click" +
				" en el icono de la papelera roja para eliminar un fichero."
			},
			VIDEO_FORMATS: {
				TITLE: '¿Qué formatos de vídeo están soportados?',
				TEXT: "Streama soporta actualmente solo aquellos formatos de vídeo soportados por el reproductor HTML5. Puedes comprobar si un archivo de vídeo es compatible con HTML5 arrastrándolo" +
				" a una pestaña vacía de tu navegador."
			},
			SUBTITLES: {
				TITLE: '¿Cómo puedo añadir subtítulos a un vídeo?',
				TEXT: "Puedes añadir subtítulos a los vídeos haciendo click en el botón Gestionar Archivos que se encuentra en la página de información del vídeo. Arrastra los archivos ahí." +
				" Antiguamente teníamos que convertirlos manualmente a un formato de archivo compatible, ¡pero ya no! Ahora la aplicación se encarga de ello por ti."
			},
			INVITE_USERS: {
				TITLE: '¿Cómo puedo invitar a mis amigos a ver mis vídeos?',
				TEXT:"Puedes compartir tus vídeos con tus amigos invitándoles a usar tu Streama. Ve al menú de Usuarios y haz click en el botón de Invitar Usuario. Rellena el formulario de invitación y" +
				" selecciona el rol del invitado. Los usuarios con el rol de Administradores pueden editar Usuarios y Configuraciones. Los usuarios con el rol de Gestor de Contenido pueden editar el contenido. Tu amigo será notificado" +
				" a través de su correo electrónico. También puedes compartir una sesión de vídeo con tus amigos haciendo click sobre el botón Compartir del reproductor y enviándoles el enlace correspondiente."
			},
			BASE_URL: {
				TITLE: "¿Qué es la URL base y cómo debería configurarla?",
				TEXT: "LA URL base se utiliza en los vídeos y en los enlaces que se envían en las invitaciones por correo."
			},
			NOTIFICATIONS: {
				TITLE: "¿Qué son las notificaciones?",
				TEXT: "Puedes notificar a los amigos que invites mandándoles mensajes de notificación. Puedes enviarlas añadiéndolas a la cola de notificaciones haciendo click en" +
				" el botón de Añadir Notificación que se encuentra en la página de información del vídeo y accediendo al menú de Notificaciones y clickando en el botón de Enviar Cola."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "¿El reproductor tiene teclas de acceso rápido?",
				TEXT: "Si. Pausar/Continuar: espacio. Controlar el volúmen: flechas de arriba y abajo. Avanzar el vídeo adelante/atrás: flechas de derecha e izquierda. Salto grande:" +
				" control + flechas de derecha e izquierda. Pantalla completa on/off: alt + enter. Subtítulos on/off: S, Silenciar: M, Volver a la anterior" +
				" pantalla: delete o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "¿Cómo afectan a Streama los géneros favoritos del usuario?",
				TEXT: "Próximamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Enlaces útiles",
				TEXT: "Próximamente..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('fr', {
		LOGIN: {
			TITLE: 'Veuillez vous connecter',
			USERNAME: 'Nom d\'utilisateur',
			PASSWORD: 'Mot de passe',
			FIRST_TIME_HINT: 'Première connexion ? Connectez-vous avec \'admin\'/\'admin\'.',
			SUBMIT: 'Connexion',
      SESSION_EXPIRED: 'Votre session a expiré depuis votre dernière activité. Veuillez vous reconnecter.'
		},
		DASHBOARD: {
      HOME: 'Accueil',
      TV_SHOWS: 'Séries',
      MOVIES: 'Films',
      MY_LIST:'Ma liste',
			TITLE: 'Tableau de bord',
			NEW_RELEASES: 'Nouvelles sorties',
			CONTINUE_WATCHING: 'Continuer le visionnage',
			DISCOVER_SHOWS: 'Découvrez des séries',
			DISCOVER_MOVIES: 'Découvrez des films',
			DISCOVER_OTHER_VIDEOS: 'Découvrez d\'autres vidéos',
			SORT: 'Tri :',
			SEARCH_BY_NAME: 'Chercher par nom...',
			FILTER_BY_TAG: 'Chercher par tag...',
			BROWSE_GENRES: 'Parcourir',
			LOOKING_AT_GENRE: 'Vous regardez le genre :',
			MARK_COMPLETED: 'Marquer comme fini',
			NO_TVSHOWS_FOUND: 'Aucune série disponible',
			NO_MOVIES_FOUND: 'Aucun film disponible',
      NO_WATCHLIST_FOUND: 'Votre liste est vide',
      WATCHLIST: 'Ma liste'
		},
		VIDEO: {
			RELEASED: 'Sorti',
			IMDB: 'IMDB',
			RATING: 'Note',
			VOTES: 'Votes',
			OVERVIEW: 'Résumé',
			GENRE: 'Genre',
			TRAILER: 'Bande annonce',
			SEASON: 'Saison',
      NO_SUBTITLE: 'Aucun sous-titre'
		},

		MESSAGES: {
			SHARE_SOCKET: 'En créant une nouvelle session, vous serez redirigé vers ce lecteur vidéo avec un identifiant de session unique dans l\'adresse. Partagez cette adresse avec vos amis pour regarder une vidéo de façon synchronisée !',
			FILE_MISSING: 'Il y\'a un problème avec ce contenu. Il semblerait que vous ayez supprimé le fichier vidéo associé.',
			CODEC_PROBLEM: 'Il semblerait qu\'il y ai un problème pour lire ce fichier. Cela est probablement dû à un problème de codec. Essayez de convertir votre vidéo en un format compatible HTML5, supprimez le fichier actuellement attaché et réajoutez le. Si le codec est bon, vérifier les logs d\'erreur sur le serveur et l\'URL racine dans les paramètres.',
			WRONG_BASEPATH: 'Votre vidéo a été ajouté avec un mauvais chemin racine, mais vous naviguez en utilisant "{{basePath}}". Vérifiez que le chemin racine est correct dans les paramètres et qu\'il correspond bien à l\'URL que vous utilisez pour naviguer cette application.'
		},
		MANAGE_CONTENT: 'Gérer le contenu',
    MANAGE_SUB_PROFILES: 'gérer les profils',
    WHOS_WATCHING: 'Qui regarde?',
    ADD_SUB_PROFILE: 'Ajouter un profil',
    EDIT_BTN: 'modifier',
    DONE_BTN: 'Terminé',
    SAVE_BTN: 'sauvegarder',
    CREATE_BTN: 'Créer',
    CANCEL_BTN: 'Annuler',
    DELETE_BTN: 'Effacer',
    ENTER_NAME: 'Entrez le nom',
    EDIT_PROFILE: 'Editer le profil',
    CREATE_PROFILE: 'Créer un profil',
		ADMIN: 'Paramètres',
		HELP: 'Aide',
		HELP_FAQ: 'Aide / FAQ',
		PROFILE_SETTINGS: 'Paramètres du profil',
		LOGOUT: 'Déconnexion',
		CHANGE_PASSWORD: 'Modifier le mot de passe',
	LANGUAGE_en: 'English/Anglais',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russe',
    LANGUAGE_de: 'Deutsch/Allemand',
    LANGUAGE_fr: 'Français',
    LANGUAGE_es: 'Español/Español',
    LANGUAGE_kr: '한국어/Coréen',
    LANGUAGE_nl: 'Nederlands/Néerlandais',
    LANGUAGE_pt: 'Português/Portugais',
    LANGUAGE_ja: '日本語/Japonais',
    LANGUAGE_it: 'Italiano/Italien',
    LANGUAGE_da: 'Dansk/Danois',
    LANGUAGE_ar: 'عربى/Arabe',
		LANGUAGE_hu: 'Magyar/Hongrois',
		PROFIlE: {
			USERNAME: 'Nom d\'utilisateur',
			FULL_NAME: 'Nom complet',
			LANGUAGE: 'Langue',
			PAUSE_ON_CLICK: 'Mettre la vidéo en pause au clic',
			FAVORITE_GENRES: 'Genres favoris',
			SAVE: 'Enregistrer le profil',
			OLD_PASS: 'Ancien mot de passe',
			NEW_PASS: 'Nouveau mot de passe',
			NEW_PASS_PLACEHOLDER: 'Nouveau mot de pass (min. 6 caractères)',
			REPEAT_PASS: 'Répétez le mot de passe',
			SAVE_PASS: 'Enregistrer le nouveau mot de passe',
      AMOUNT_OF_MEDIA_ENTRIES: 'Nombre de vidéos sur le tableau de bord (avant "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Ajoutés récemment',
			OLDEST_ADDED: 'Premiers ajoutés',
			NEWEST_RELEASED: 'Dernières sorties',
			OLDEST_RELEASED: 'Premières sorties',
			NEWEST_AIRED: 'Dernières sorties',
			OLDEST_AIRED: 'Premières sorties'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Comment ajouter une vidéo ?',
				TEXT: "Vous pouvez ajouter une vidéo en allant dans le menu Gérer le contenu. Choisissez si vous voulez ajouter un film, une série ou une autre vidéo. Cliquez sur le sous-menu correspondant" +
				" dans la barre de navigation verticale sur le coté gauche de l'écran. Vous pouvez ajouter une vidéo en cliquant sur le bouton Créer un film/série/autre vidéo ou en tapant" +
				" le nom de la vidéo que vous voulez ajouter dans la barre de recherche et en sélectionnant le film correspondant dans les résultats de recherche. Ensuite, vous pouvez choisir de renseigner les informations" +
				" sur la vidéo soit manuellement soit en chargeant les informations de TheMovieDB. Finalement, vous pouvez ajouter la vidéo et les sous-titres en cliquant sur le bouton Gérer les fichiers."
			},
			DELETE_VIDEO: {
				TITLE: 'Comment supprimer une vidéo ?',
				TEXT: "Vous pouvez supprimer une vidéo en allant sur la page des les informations d'une vidéo et en cliquant sur Gérer les fichiers puis en sélectionnant l'icône de corbeille rouge. Cliquer sur Modifier un film et sélectionner Supprimer le film" +
				" est un autre moyen. Vous pouvez également utiliser le Gestionnaire de fichiers dans le menu Gérer le contenu. Vous pouvez voir tous les fichiers ajoutés ici. Cliquez" +
				" sur l'icône de corbeille rouge pour supprimer un fichier."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quels formats vidéos sont supportés ?',
				TEXT: "Streama supporte actuellement seulement les formats vidéos supportés par le lecteur HTML5. Vous pouvez tester si votre fichier vidéo est compatible HTML5 en le glissant déplaçant dans un onglet vide" +
				" de votre navigateur."
			},
			SUBTITLES: {
				TITLE: 'Comment ajouter des sous-titres à une vidéo ?',
				TEXT: "Vous pouvez ajouter des sous-titres aux vidéos en cliquant sur le bouton Gérer les fichiers situé dans la page d'information de la vidéo. Vous pouvez glisser déplacer les fichiers de sous-titres ici." +
				" Précedemment, vous deviez les convertir dans un format compatible, mais ce n'est plus nécessaire ! L'application s'en charge pour vous."
			},
			INVITE_USERS: {
				TITLE: 'Comment inviter un ami à voir mes vidéos ?',
				TEXT:"Vous pouvez partager vos vidéos avec vos amis en les invitant sur votre Streama. Allez dans le menus Utilisateurs et cliquer sur le bouton Inviter un utilisateur. Remplissez le formulaire d'invitation et" +
				" sélectionner le/les rôle(s) de l'invité. Les utilisateurs avec le rôle Administateur peuvent modifier les utilisateurs et les paramètres. Les utilisateurs avec le rôle Gestionnaire de contenu peuvent modifier le contenu. Votre ami sera notifié de l'invitation" +
				" par email. Vous pouvez également partager une session vidéo avec vos amis en cliquant sur le bouton Partager sur le lecteur vidéo et en leur envoyant le lien vers la session."
			},
			BASE_URL: {
				TITLE: "Quelle est l\'URL racine et comment doit-je la configurer ?",
				TEXT: "L\'URL racine est utilisée pour les vidéos et les liens dans les e-mails d'invitation."
			},
			NOTIFICATIONS: {
				TITLE: "Que sont les notifications ?",
				TEXT: "Vous pouvez notifier vos amis à propos de vidéos ajoutées en leur envoyant un message de notification. Vous pouvez les envoyer en les ajoutant dans votre liste de notification en cliquant" +
				" sur le bouton Ajouter une notification sur la page d'information de la vidéo puis en allant dans le menu des notifications et en cliquant sur le bouton Envoyer la liste."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Est-ce que le lecteur vidéo a des raccourcis clavier ?",
				TEXT: "Oui. Pause/reprendre : espace. Modifier le volume : Flèche haut/bas. Vidéo suivante/précédente : Flèche gauche/droite. Avance rapide :" +
				" Ctrl + flèche gauche/droite. Plein écran oui/non : Alt + Entrée. Sous-titres oui/non : S, Muet : M, Retour à l'écran précédent" +
				" : Suppr ou Retour."
			},
			FAVORITE_GENRES: {
				TITLE: "En quoi les genres favoris d'un utilisateur affectent Streama ?",
				TEXT: "A venir..."
			},
			USEFUL_LINKS: {
				TITLE: "Liens utiles",
				TEXT: "A venir..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 * Translated by Nargren 09/12/19.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('hu', {
    LOGIN: {
      TITLE: 'Jelentkezzen be',
      USERNAME: 'Felhasználónév',
      PASSWORD: 'Jelszó',
      FIRST_TIME_HINT: 'Első bejelentkezés? Próbálja meg az \'admin\'-t mindkét mezőbe.',
      SUBMIT: 'Bejelentkezés',
      SESSION_EXPIRED: 'Az ülése lejárt a legutóbbi aktivitás óta. Jelentkezzen be újra.'
    },
    DASHBOARD: {
      TITLE: 'Főoldal',
      RECOMMENDATIONS: 'Ajánlatok',
      NEW_RELEASES: 'Nemrég megjelent',
      CONTINUE_WATCHING: 'Megtekintés folytatása',
      DISCOVER_SHOWS: 'TV sorozatok felfedezése',
      DISCOVER_MOVIES: 'Filmek felfedezése',
      DISCOVER_OTHER_VIDEOS: 'Egyéb videók felfedezése',
      SORT: 'Szűrés:',
      SEARCH_BY_NAME: 'Név szerinti szűrés...',
      FILTER_BY_TAG: 'Címke szerinti szűrés...',
      FILTER_BY_GENRE: 'Műfaj szerinti szűrés...',
      BROWSE_GENRES: 'Böngészés',
      LOOKING_AT_GENRE: 'Ezt a műfajt nézi jelenleg:',
      MARK_COMPLETED: 'Megjelölés megnézettként',
      NO_TVSHOWS_FOUND: 'Nincsenek elérhető TV sorozatok ',
      NO_WATCHLIST_FOUND: 'Még nincs itt',
      NO_MOVIES_FOUND: 'Nincsenek elérhető filmek'
    },
    VIDEO: {
      RELEASED: 'Megjelent',
      IMDB: 'IMDB',
      RATING: 'Értékelés',
      VOTES: 'Szavazatok',
      OVERVIEW: 'Összefoglalás',
      GENRE: 'Műfaj',
      TRAILER: 'Előzetes',
      SEASON: 'Évad',
      SUBTITLES: 'Feliratok',
      NO_SUBTITLE: 'Nincs felirat',
      SUBTITLE_SIZE: 'Felirat méret',
      VIDEO_FILES: 'Videó források',
      UPNEXT: 'Most következik...'
    },

    MESSAGES: {
      SHARE_SOCKET: ' Ha egy új ülést nyit, vissza lesz irányítva ehhez a videólejátszóhoz, de egy egyedi ülés-azonosítót fog kapni. Ossza meg ezt az azonosítót (URL-t) ismerőseivel, hogy egyidőben élvezhessék a filmet!',
      FILE_MISSING: 'Probléma merült fel ezzel a tartalommal. Úgy tűnik, eltávolította a kapcsolódó videófájlt.',
      CODEC_PROBLEM: 'Probléma van a videó hozzáadásával a lejátszóhoz. Ez valószínüleg egy kódek probléma. Próbálja meg átkonvertálni a videót egy HTML5-kompatibilitis kódekformátumba, majd pedig távolítsa el a videót és adja hozzá újra. Ha a kódekkel nincsen probléma, ellenőrizze a szerver hibaüzeneteit és az alap URL-t a beállításoknál.',
      WRONG_BASEPATH: 'A videó rossz alap útvonallal jelenik meg, viszont ön ezt az oldalt nézi "{{basePath}}". Bizonyosodjon meg róla, hogy az alapértelmezett útvonal helyes és hogy ezt használja az alkalmazáshoz.',
      FILE_IN_FS_NOT_FOUND: 'A videó nem található egyik elérhető útvonalon sem. Ellenőrizze a beállításokban és a fájlrendszerben, hogy a fájlok elérhetőek legyenek az alkalmazás számára.'
    },
    MANAGE_CONTENT: 'Tartalom kezelése',
    MANAGE_SUB_PROFILES: 'Profilok kezelése',
    WHOS_WATCHING: 'Ki van itt?',
    ADD_SUB_PROFILE: 'Profil létrehozása',
    EDIT_BTN: 'Szerkesztés',
    DONE_BTN: 'Kész',
    SAVE_BTN: 'Mentés',
    CREATE_BTN: 'Létrehozás',
    CANCEL_BTN: 'Mégse',
    DELETE_BTN: 'Törlés',
    ENTER_NAME: 'Név megadása',
    EDIT_PROFILE: 'Profil szerkesztése',
    CREATE_PROFILE: 'Profil létrehozása',
    ADMIN: 'Adminisztrátor',
    HELP: 'Súgó',
    HELP_FAQ: 'Súgó / GYIK',
    PROFILE_SETTINGS: 'Felhasználói beállítások',
    LOGOUT: 'Kijelentkezés',
    CHANGE_PASSWORD: 'Jelszó megváltoztatása',
    LANGUAGE_en: 'Angol/English',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Orosz/Russian',
    LANGUAGE_de: 'Német/German',
    LANGUAGE_fr: 'Francia/French',
    LANGUAGE_es: 'Spanyol/Spanish',
    LANGUAGE_kr: 'Koreai/Korean',
    LANGUAGE_nl: 'Holland/Dutch',
    LANGUAGE_pt: 'Portugál/Portuguese',
    LANGUAGE_ja: 'Japán/Japanese',
    LANGUAGE_it: 'Olasz/Italian',
    LANGUAGE_da: 'Dán/Danish',
    LANGUAGE_ar: 'Arab/Arabic',
    LANGUAGE_hu: 'Magyar',
    PROFIlE: {
      USERNAME: 'Felhasználónév',
      FULL_NAME: 'Teljes név',
      LANGUAGE: 'Nyelv',
      PAUSE_ON_CLICK: 'Videó szüneteltetése katintásra',
      FAVORITE_GENRES: 'Kedvenc műfajok',
      AMOUNT_OF_MEDIA_ENTRIES: 'Főoldalon lévő vidók száma (a \"Több betöltése\" előtt)',
      SAVE: 'Profil mentése',
      PASS: 'Jelszó',
      OLD_PASS: 'Régi jelszó',
      NEW_PASS: 'Új jelszó',
      NEW_PASS_PLACEHOLDER: 'Új jelszó  (min. 6 karakter)',
      REPEAT_PASS: 'Jelszó ismétlése',
      PASS_ERROR_EMPTY: 'A jelszó nem lehet üres',
      PASS_ERROR_LENGTH: 'A jelszó legalább 6 karakter kell legyen',
      PASS_ERROR_REPEAT: 'A jelszavaknak egyezniük kell',
      SAVE_PASS: 'Új jeszó beállítása'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Legújabban hozzáadott',
      OLDEST_ADDED: 'Legrégebben hozzáadott',
      NEWEST_RELEASED: 'Legújabban megjelent',
      OLDEST_RELEASED: 'Legrégebben megjelent',
      NEWEST_AIRED: 'Legújabban vetített',
      OLDEST_AIRED: 'Legrégebben vetített',
      NEWEST_REPORTED: 'Legújabban bejelentett',
      OLDEST_REPORTED: 'Legrégebben bejelentett',
      NEWEST_UPDATED: 'Legújabban frissített',
      OLDEST_UPDATED: 'Legrégebben frissített'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hogyan tölthetek fel egy vidót?',
        TEXT: "Videók a Tartalom kezelése menüből tölthetőek fel, ahol kiválaszthatja, hogy Filmet, TV sorozatot vagy Egyéb videót szeretne hozzáadni. Kattintson a megfelelő" +
          " menüpontra a függőleges navigációs sávon a képernyő bal oldalán. Itt hozzáadhat egy filmet ha az Új Film / TV sorozat / Egyéb videó gombra kattint vagy amennyiben beírja" +
          " a videó címét a keresőmezőbe majd pedig kiválasztja a kívánt találatot. Ezután kitöltheti a videó adatait kézzel vagy pedig letöltheti ezt autómatikusan a TheMovieDB" +
          " oldalról. Végül pedig feltöltheti a videófájlt és a feliratokat a Fájlok kezelése gombra kattintva."
      },
      DELETE_VIDEO: {
        TITLE: 'Hogyan törölhetek le egy videót?',
        TEXT: "Egy videó a saját információs oldalán keresztül törölhető le. Itt válassza ki a Fájlok kezelése opciót majd pedig kattintson a piros szemeteskosár ikonra. Egy másik" +
          " lehetőség a Film szerkesztése menüponton belül a Film törlése opció. A Fájlok kezelése menüpont is használató, ami a Tartalom kezelése menün belül található. Itt látható" +
          " az összes feltöltött tartalom, ahol ismét a piros szemeteskosárra kattintva törölhető egy kiválasztott fájl."
      },
      VIDEO_FORMATS: {
        TITLE: 'Melyek a támogatott videóformátumok?',
        TEXT: "A Streama jelenleg csak a HTML5 által is támogatott videóformátumokat támogatja. Egy videófájl kompatibilitása tesztelhető amennyiben a kiválasztott fájlt egy" +
        " kattintással belehúzza egy üres böngészőablakba (drag and drop)."
      },
      SUBTITLES: {
        TITLE: 'Hogyan adhatok feliratot egy videóhoz?',
        TEXT: "Feliratok a Fájlok kezelése gombra kattintás után, a videó információs oldalán adhatók hozzá. Ide egy kattintással behúzhatóak a feliratfájlok (drag and drop)." +
          " Mindeddig a megfelelő formátumba kellett konvertálni a fájlokat, de ez többé már nem szükséges. Az alkalmazás ezt mostantól megteszi ön helyett."
      },
      INVITE_USERS: {
        TITLE: 'Hogyan hívhatom meg ismerőseimet, hogy megnézhessék a megoszott videóimat?',
        TEXT:"A filmek megosztásához meg kell hogy hívja ismerőseit az ön által futtatott Streama-ra. Menjen a Felhasználók menübe majd pedig kattintson a Felhasználó meghívása gombra." +
          " Töltse ki a megfelelő mezőket és adja meg a meghívott személy beosztását. Adminisztrátor szintű felhasználók szerkeszthetik más felhasználók beállításait illetve új" +
          " felhasználókat is beállíthatnak. Felhasználók a Tartalomkezelő beosztásban pedig szerkeszthetik a feltöltött tartalmakat. Az ismerősei emailben kapják meg a meghívást. Ezen " +
          " felül, kiválasztott (egyedi) videó üléseket is megoszthat ismerőseivel amennyiben a videólejátszó Megosztás gombjára kattint majd továbbítja a kapot URL-t nekik."
      },
      BASE_URL: {
        TITLE: "Mi az alapértelmezett URL és hogyan állítsam be?",
        TEXT: "Az alapértelmezett URL a meghívó emaileknél játszik szerepet ahol a Streama szerver címét mutatja."
      },
      NOTIFICATIONS: {
        TITLE: "Mik azok az üzenetek?",
        TEXT: "A feltöltött vidókról értesitő üzenetet küldhet ismerőseinek. Ehhez adjon hozzá egy új kimenő üzenetet az Ùj üzenet gombra kattinva, amely a videó információs oldalán" +
          " található. Az üzenet elküldéséhez nyissa meg az Üzenetek menüpontot majd pedig kattintson az Üzenetek elküldése gombra."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Vannak a videólejátszónak elérhető gyorsbillentyű kombinációi?",
        TEXT: "Igen, ezek a következők. Szünet/folytatás: szövegköz. Hangerő szabályozása: felfelés és lefelé nyilak. Rövid ugrás előre/vissza: balra és jobbra nyilak." +
          " Hosszabb ugrás előre/vissza: Ctrl + balra és jobbra nyilak. Teljes képernyő be/ki: Alt + Enter. Feliratok ki/be: S. Némítás: M. Visszatérés az előző" +
          " képernyőhöz: Delete vagy Backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Hogyan befolyásolják a felhasználók kedvenc műfajai a Streama-t?",
        TEXT: "Hamarosan..."
      },
      USEFUL_LINKS: {
        TITLE: "Hasznos linkek",
        TEXT: "Hamarosan..."
      }
    }
  });
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ar', {
		LOGIN: {
			TITLE: 'يرجى تسجيل الدخول',
			USERNAME: 'الاسم',
			PASSWORD: 'الرمز',
			FIRST_TIME_HINT: 'اول مرة تقوم بتسجيل الدخول؟ حاول ادخال \'admin\' بالفراغيين.',
			SUBMIT: 'تسجيل الدخول',
      SESSION_EXPIRED: 'انتهت صلاحية الدخول منذ اخر نشاط. الرجاء تسجيل الدخول مرة اخرى.'
		},
		DASHBOARD: {
      HOME: 'الصفحة الرئيسية',
      TV_SHOWS: 'عرض تلفزيوني',
      MOVIES: 'أفلام',
      MY_LIST:'قائمتي',
			TITLE: 'الواجهة الرئيسية',
			RECOMMENDATIONS: 'افضل الافلام',
			NEW_RELEASES: 'المصدرة حديثا',
			CONTINUE_WATCHING: 'الاستمرار في المشاهدة',
			DISCOVER_SHOWS: 'جميع العروض التلفزيونية',
			DISCOVER_MOVIES: 'جميع الافلام',
			DISCOVER_OTHER_VIDEOS: 'جميع مقاطع الفديو',
			SORT: 'فرز:',
			SEARCH_BY_NAME: 'البحث حول الاسم...',
			FILTER_BY_TAG: 'البحث بحسب...',
			BROWSE_GENRES: 'تصفح',
			LOOKING_AT_GENRE: 'كنت تبحث في هذا النوع:',
			MARK_COMPLETED: 'اكملت المشاهدة',
			NO_TVSHOWS_FOUND: 'لايوجد عروض تلفزيونية',
			NO_MOVIES_FOUND: 'لا يوجد افلام',
      NO_WATCHLIST_FOUND: 'لا يوجد شيء هنا حتى الآن',
      WATCHLIST: 'عرض لاحقا'
		},
		VIDEO: {
			RELEASED: 'الاصدار',
			IMDB: 'IMDB',
			RATING: 'التقييم',
			VOTES: 'التصويت',
			OVERVIEW: 'نظرة عامة',
			GENRE: 'الصنف',
			TRAILER: 'العرض الدعائي',
			SEASON: 'الموسم',
      NO_SUBTITLE: 'لا يوجد ترجمة'
		},

		MESSAGES: {
			SHARE_SOCKET: 'من خلال إنشاء تسجيل دخول جديد سيتم إعادة توجيهك إلى هذا الفديو، ولكن هذه المرة سيكون لديك معرف جلسة فريدة من نوعها في هذا الرابط. مشاركة هذا مع أصدقائك ليكون لديك تجربة مشاهدة متزامنة معهم!',
			FILE_MISSING: 'هناك مشكلة في هذا المحتوى. يبدو أنك أزلت ملف الفيديو المقترن منه.',
			CODEC_PROBLEM: 'يبدو أن هناك مشكلة في إضافة ملف الفيديو إلى المشغل. هذا هو الأرجح بسبب مشكلة الترميز. حاول تحويلها إلى برنامج ترميز متوافق وإزالة الملف المرفق حاليا وإعادة إضافته. إذا كانت برامج الترميز على ما يرام، تحقق من سجل خطأ الملقم وعنوان الرابط الأساسي في الإعدادات',
			WRONG_BASEPATH: 'لقد تم تضمين الفيديو باستخدام مسار أساسي خاطئ، ولكنك تتصفح الصفحة عبر "{{المسارات}}". تأكد من تعيين المسار الأساسي الصحيح في الإعدادات وأنك تستخدمه لتصفح التطبيق.',
			FILE_IN_FS_NOT_FOUND: 'لا يمكن العثور على الفيديو في أي من المواقع المتاحة للتطبيق. يرجى التحقق من الإعدادات الخاصة بك ونظام الملفات للتأكد من أن الملفات يمكن الوصول إليها من قبل التطبيق.'
		},
		MANAGE_CONTENT: 'تعديل المحتويات',
    MANAGE_SUB_PROFILES: 'إدارة ملفات التعريف',
    WHOS_WATCHING: 'من يشاهد؟',
    ADD_SUB_PROFILE: 'إضافة الملف الشخصي',
    EDIT_BTN: 'تصحيح',
    DONE_BTN: 'فعله',
    SAVE_BTN: 'حفظ',
    CREATE_BTN: 'خلق',
    CANCEL_BTN: 'إلغاء',
    DELETE_BTN: 'حذف',
    ENTER_NAME: 'أدخل الاسم',
    EDIT_PROFILE: 'تعديل الملف الشخصي',
    CREATE_PROFILE: 'إنشاء ملف تعريف',
		ADMIN: 'Admin',
		HELP: 'المساعدة',
		HELP_FAQ: 'المساعدة / الاراء المقدمة',
		PROFILE_SETTINGS: 'اعدادات الحساب',
		LOGOUT: 'تسجيل الخروج',
		CHANGE_PASSWORD: 'تعديل الرمز',
	LANGUAGE_en: 'English/الإنجليزية',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/الروسية',
    LANGUAGE_de: 'Deutsch/ألمانية',
    LANGUAGE_fr: 'Français/الفرنسية',
    LANGUAGE_es: 'Español/الأسبانية',
    LANGUAGE_kr: '한국어/الكورية',
    LANGUAGE_nl: 'Nederlands/هولندي',
    LANGUAGE_pt: 'Português/البرتغالية',
    LANGUAGE_ja: '日本語/اليابانية',
    LANGUAGE_it: 'Italiano/الإيطالي',
    LANGUAGE_da: 'Dansk/دانماركي',
    LANGUAGE_ar: 'عربى',
		LANGUAGE_hu: 'Magyar/الهنغارية',
		PROFIlE: {
			USERNAME: 'الاسم',
			FULL_NAME: 'الاسم الكامل',
			LANGUAGE: 'اللغة',
			PAUSE_ON_CLICK: 'توقف الفديو عند الظفط',
			FAVORITE_GENRES: 'الانواع المفضلة',
      AMOUNT_OF_MEDIA_ENTRIES: 'عدد الفديوات التي تظهر في الواجهة الرئيسية (قبل الظفط على "المزيد")',
			SAVE: 'حفظ الاعدادات',
			PASS: 'الرمز',
			OLD_PASS: 'الرمز القديم',
			NEW_PASS: 'الرمز الجديد',
			NEW_PASS_PLACEHOLDER: 'الرمز الجديد  (اقل شي. 6 حروف)',
			REPEAT_PASS: 'اعد ادخال الرمز',
			PASS_ERROR_EMPTY: 'الرمز لا يمكن ان يكون فارغ',
			PASS_ERROR_LENGTH: 'الرمز يجب ان يكول على الاقل 6 حروف',
			PASS_ERROR_REPEAT: 'الرمز يحتاج مطابقة',
			SAVE_PASS: 'حفظ الرمز الجديد'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'الافلام المضافة حديثا',
			OLDEST_ADDED: 'اول الافلام المظافة',
			NEWEST_RELEASED: 'الافلام المصدرة حديثا',
			OLDEST_RELEASED: 'الافلام المصدرة قديما',
			NEWEST_AIRED: 'الافلام المبثه حديثا',
			OLDEST_AIRED: 'الافلام المبثة قديما',
      NEWEST_REPORTED: 'احدث التقارير',
      OLDEST_REPORTED: 'اقدم التقارير',
      NEWEST_UPDATED: 'الافلام المحدثة حديثا',
      OLDEST_UPDATED: 'الافلام المحدثة قديما'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'كيف يمككني رفع فديو ؟',
				TEXT: "يمكنك تحميل مقاطع الفيديو من خلال الانتقال إلى قائمة إدارة المحتوى. اختر ما إذا كنت تريد تحميل فيلم أو برنامج تلفزيوني أو فيديو آخر. انقر على خيار القائمة الفرعية ذات الصلة" +
				" على شريط التنقل العمودي على الجانب الأيسر من الشاشة. يمكنك تحميل فيديو بالنقر على الزر إنشاء فيلم جديد / عرض تلفزيوني / فيديو آخر أو عن طريق الكتابة" +
				" واسم الفيديو الذي تريد تحميله إلى شريط البحث وتحديد الفيلم ذي الصلة من نتائج البحث. بعد ذلك، يمكنك اختيار لملء الفيديو " +
				" المعلومات إما يدويا أو تحميل معلوماتها من ثيموفيدب. بعد ذلك، يمكنك تحميل ملفات الفيديو والترجمة الفرعية عن طريق النقر على زر إدارة الملفات."
			},
			DELETE_VIDEO: {
				TITLE: 'كيف يمككني حذف فديو ؟',
				TEXT: "يمكنك حذف مقطع فيديو بالانتقال إلى صفحة معلومات الفيديو والنقر على إدارة الملفات وتحديد رمز سلة المهملات الحمراء. النقر على تعديل الفيلم وتحديده" +
				" حذف الفيلم هو طريقة أخرى للقيام بذلك. يمكنك أيضا استخدام إدارة الملفات الموجودة في قائمة إدارة المحتوى. يمكنك مشاهدة جميع الملفات التي قمت بتحميلها هناك. انقر" +
				" يمكن رمز سلة المهملات الحمراء لحذف ملف."
			},
			VIDEO_FORMATS: {
				TITLE: 'ما هيه صيغ الفديو القابلة للرفع ؟',
				TEXT: "ستريما يدعم حاليا فقط صيغ ملفات الفيديو التي يدعمها مشغل HTML5. يمكنك اختبار ما إذا كان ملف الفيديو الخاص بك هو مشغل HTML5 متوافق عن طريق سحب وإسقاط" +
				" الملف إلى علامة تبويب فارغة على المتصفح الخاص بك."
			},
			SUBTITLES: {
				TITLE: 'كيف يمككني اضافة الترجمة ؟',
				TEXT: "يمكنك إضافة ترجمات مصاحبة إلى مقاطع الفيديو بالنقر على زر إدارة الملفات الموجود في صفحة معلومات الفيديو. يمكنك سحب وإسقاط ملفات الترجمة هناك." +
				" سابقا كان لديك لتحويلها يدويا إلى تنسيق ملف متوافق، ولكن ليس بعد الآن! الآن تطبيق يعالج ذلك بالنسبة لك."
			},
			INVITE_USERS: {
				TITLE: 'كيف يمككني دعوة اصدقائي ؟',
				TEXT:"يمكنك مشاركة مقاطع الفيديو الخاصة بك مع أصدقائك من خلال دعوتهم لاستخدام ستريما استضافتها. انتقل إلى قائمة المستخدمون وانقر على زر دعوة المستخدم. املأ نموذج الدعوة و" +
				" حدد دور المدعو (الضيف). المستخدمون الذين لديهم الدور يمكن للمشرف تعديل المستخدمين والإعدادات. يمكن للمستخدمين الذين لديهم دور مدير المحتوى تعديل المحتوى. سيتم إبلاغ صديقك بالدعوة" +
				" الدعوة عبر البريد الإلكتروني. يمكنك أيضا مشاركة جلسات الفيديو مع أصدقائك من خلال النقر على زر مشاركة مشغل الفيديو وربط عنوان ورل للجلسة لهم."
			},
			BASE_URL: {
				TITLE: "ما عنوان الرابط الأساسي وكيف يجب أن أهيئه؟",
				TEXT: "يتم استخدام عنوان الرابط الأساسي لمقاطع الفيديو والرابط في رسالة الدعوة الإلكترونية."
			},
			NOTIFICATIONS: {
				TITLE: "ماهي الاشعارات ؟",
				TEXT: "أو يمكن أن يبلغ أصدقائك المدعوين حول أشرطة الفيديو التي تم تحميلها عن طريق إرسال رسائل لاعلامهم. يمكنك إرسالها عن طريق إضافتها إلى قائمة انتظار الإشعار بالنقر" +
				" يمكنك إضافة زر إشعارات في صفحة معلومات الفيديو والذهاب إلى قائمة الإشعارات والنقر على زر إرسال قائمة انتظار."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "هل لمشغل الفديو مفاتيح مختصرة ؟",
				TEXT: "نعم فعلا. إيقاف مؤقت / إلغاء الإيقاف المؤقت: مساحة. إدارة وحدة التخزين: مفاتيح الأسهم لأعلى أو لأسفل. تخطي الفيديو إلى الأمام / الخلف: مفاتيح الأسهم إلى اليسار أو اليمين. تخطي طويل" +
				" التحكم + مفاتيح الأسهم اليسار أو اليمين. ملء الشاشة تشغيل / إيقاف: ألت + إنتر. ترجمات / إيقاف: S، كتم الصوت: M، العودة إلى السابق" +
				" الشاشة: حذف أو مسافة للخلف."
			},
			FAVORITE_GENRES: {
				TITLE: "كيف تؤثر الأنواع المفضلة للمستخدم على مجموعات البث؟",
				TEXT: "قريبا..."
			},
			USEFUL_LINKS: {
				TITLE: "روابط مفيدة",
				TEXT: "قريبا..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 *Translated by @DragonShura 23/01/17.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('it', {
		LOGIN: {
			TITLE: 'Effettua il login',
			USERNAME: 'Nome utente',
			PASSWORD: 'Password',
			FIRST_TIME_HINT: 'Prima volta log-in? Provare \'admin\' per entrambi i campi.',
			SUBMIT: 'Account di accesso',
      SESSION_EXPIRED: 'La sessione è scaduta dall\'ultima attività. Per favore esegui l\'accesso di nuovo.'
		},
		DASHBOARD: {
      HOME: 'Casa',
      TV_SHOWS: 'Spettacoli televisivi',
      MOVIES: 'Films',
      MY_LIST:'La mia lista',
			TITLE: 'Cruscotto',
			NEW_RELEASES: 'Nuove uscite',
			CONTINUE_WATCHING: 'Continuare a guardare',
			DISCOVER_SHOWS: 'Scopri spettacoli',
			DISCOVER_MOVIES: 'Scopri i film',
			DISCOVER_OTHER_VIDEOS: 'Scopri altri video',
			SORT: 'Ordinamento:',
			SEARCH_BY_NAME: 'Ricerca per nome...',
			FILTER_BY_TAG: 'Filtra per Tag...',
			BROWSE_GENRES: 'Sfoglia',
			LOOKING_AT_GENRE: 'si sta guardando il genere:',
			MARK_COMPLETED: 'Mark completato',
			NO_TVSHOWS_FOUND: 'No Tv-Show disponibili',
			NO_MOVIES_FOUND: 'Nessun film disponibile',
      NO_WATCHLIST_FOUND: 'Ancora niente qui',
      WATCHLIST: 'visualizza più tardi'
		},
		VIDEO: {
			RELEASED: 'Rilasciato',
			IMDB: 'IMDB',
			RATING: 'Voto',
			VOTES: 'Voti',
			OVERVIEW: 'Panoramica',
			GENRE: 'Genere',
			TRAILER: 'Rimorchio',
			SEASON: 'Stagione',
      NO_SUBTITLE: 'Nessun sottotitolo'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Con la creazione di una nuova sessione Verrai reindirizzato torna a questo giocatore, ma questa volta avrete un ID di sessione univoco nell url. Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			FILE_MISSING: 'Cè un problema con questo contenuto. Sembra che è stato rimosso il file video associato da esso... Condividi con i tuoi amici di avere una visione sincronizzata esperienza con loro!',
			CODEC_PROBLEM: 'Sembra esserci un problema aggiungendo il file video sul lettore. Questo è probabilmente a causa di un problema di codec. Prova a convertirlo a un codec compatibile HTML5, rimuovere il file attualmente allegato e aggiungerlo nuovamente. Se i codec sono belle, controllare il log degli errori del server e URL di base nelle impostazioni.',
			WRONG_BASEPATH: 'Hai dei video get incluso utilizzando il percorso di Base sbagliato, ma si sta visualizzando la pagina via "{{basePath}}". Assicurarsi che si imposta il percorso di Base corretto nelle impostazioni e che si sta utilizzando per esplorare applicazione.'
		},
		MANAGE_CONTENT: 'Gestire i contenuti',
    MANAGE_SUB_PROFILES: 'Gestire i profili',
    WHOS_WATCHING: 'Chi sta guardando',
    ADD_SUB_PROFILE: 'Aggiungi profilo',
    EDIT_BTN: 'Modificare',
    DONE_BTN: 'Fatto',
    SAVE_BTN: 'Salvare',
    CREATE_BTN: 'Creare',
    CANCEL_BTN: 'Annulla',
    DELETE_BTN: 'Elimina',
    ENTER_NAME: 'Inserisci il nome',
    EDIT_PROFILE: 'Modifica Profilo',
    CREATE_PROFILE: 'Crea un profilo',
		ADMIN: 'Admin',
		HELP: 'Guida',
		HELP_FAQ: 'Guida / FAQ',
		PROFILE_SETTINGS: 'Impostazioni del profilo',
		LOGOUT: 'Logout',
		CHANGE_PASSWORD: 'Cambia Password',
	LANGUAGE_en: 'English/Inglese',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russo',
    LANGUAGE_de: 'Deutsch/Tedesco',
    LANGUAGE_fr: 'Français/Francese',
    LANGUAGE_es: 'Español/Spagnolo',
    LANGUAGE_kr: '한국어/Coreano',
    LANGUAGE_nl: 'Nederlands/Olandese',
    LANGUAGE_pt: 'Português/Portoghese',
    LANGUAGE_ja: '日本語/Giapponese',
    LANGUAGE_it: 'Italiano',
    LANGUAGE_da: 'Dansk/danese',
    LANGUAGE_ar: 'عربى/Arabo',
    LANGUAGE_hu: 'Magyar/Ungherese',
		PROFIlE: {
			USERNAME: 'Nome Utente',
			FULL_NAME: 'Nome e cognome',
			LANGUAGE: 'Lingua',
			PAUSE_ON_CLICK: 'Pausa Video su Click',
			FAVORITE_GENRES: 'Generi preferiti',
			SAVE: 'Salva il profilo',
			PASS: 'Parola d ordine',
			OLD_PASS: 'Vecchia password',
			NEW_PASS: 'Nuova password',
			NEW_PASS_PLACEHOLDER: 'Nuova password (min. 6 caratteri)',
			REPEAT_PASS: 'Ripeti la password',
			PASS_ERROR_EMPTY: 'La password non può essere vuoto',
			PASS_ERROR_LENGTH: 'La password deve essere lunga almeno 6 caratteri',
			PASS_ERROR_REPEAT: 'Le password devono corrispondere',
      AMOUNT_OF_MEDIA_ENTRIES: 'Quantità di video su Dashboard (prima di "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Aggiunto di recente',
			OLDEST_ADDED: 'Prima Aggiunto',
			NEWEST_RELEASED: 'Ultima uscita',
			OLDEST_RELEASED: 'I più vecchi di uscita',
			NEWEST_AIRED: 'In onda di recente',
			OLDEST_AIRED: 'I più vecchi Air-Date'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Come faccio a caricare un video?',
				TEXT: "È possibile caricare i video andando al menu Gestisci contenuti. Scegliere se si desidera caricare un film, show televisivo o altri video. Fare clic sull'opzione relativo sottomenu" +
					  "Sulla barra di navigazione verticale sul lato sinistro dello schermo. È possibile caricare un video cliccando sul TV Show Altro pulsante Nuovo Film / / Video Creare o digitando" +
					  "Il nome del video che si desidera caricare la barra di ricerca e selezionare il filmato in questione dai risultati di ricerca. Dopo di che, si può scegliere di compilare il del video" +
					  "Le informazioni manualmente o caricando le sue informazioni dal TheMovieDB. Dopo di che, è possibile caricare il file di sottotitoli video e facendo clic sul pulsante File di Gestione."
			},
			DELETE_VIDEO: {
				TITLE: 'Come posso eliminare un video?',
				TEXT: "È possibile eliminare un video andando alla pagina di informazioni del video e facendo clic su Gestione di file e selezionando l'icona del cestino rosso. Facendo clic su Modifica filmato e selezionando" +
					  "Elimina film è un altro modo per farlo. È anche possibile utilizzare il File Manager, che si trova nel menu Gestione contenuto. È possibile visualizzare tutti i file che hai caricato lì. Fai clic su" +
					  "Cestino rosso può icona per eliminare un file."
			},
			VIDEO_FORMATS: {
				TITLE: 'Quali formati video sono supportati?',
				TEXT: "Streama supporta attualmente solo i formati di file video supportati da player HTML5. È possibile verificare se il file video è compatibile con player HTML5 trascinando" +
					  "Il file a una scheda vuota sul tuo browser."
			},
			SUBTITLES: {
				TITLE: 'Come posso aggiungere sottotitoli ai video?',
				TEXT: "È possibile aggiungere i sottotitoli ai video facendo clic sul pulsante file che si trova nella pagina di informazioni del video Gestisci. È possibile trascinare e rilasciare i file di sottotitoli là " +
					  "in precedenza era necessario convertirli manualmente in un formato file compatibile, ma ora non più! Ora l'applicazione gestisce che per voi."
			},
			INVITE_USERS: {
				TITLE: 'Come posso invitare gli amici a guardare i miei video ospitati?',
				TEXT:"È possibile condividere i video con i tuoi amici, invitandoli a utilizzare il ospitato Streama. Vai al menu utenti e fare clic sul pulsante User Invita. Compila il modulo invitare e" +
					 "Selezionare il ruolo (s) del invitato. Gli utenti con il ruolo di amministratore possono modificare Utenti e Impostazioni. Gli utenti con il ruolo Content Manager possono modificare il contenuto. Il tuo amico verrà notificato di" +
					 "L'invito via e-mail. È inoltre possibile condividere le sessioni video con i tuoi amici cliccando del lettore video pulsante Condividi e che collega l'URL della sessione a loro."
			},
			BASE_URL: {
				TITLE: "Qual è l'URL di base e come devo configurarlo?",
				TEXT: "La Base-URL viene utilizzato per i video e il collegamento nell'invito-mail."
			},
			NOTIFICATIONS: {
				TITLE: "Quali sono le notifiche?",
				TEXT: "È possibile avvisare i tuoi amici invitati circa i video caricati inviando loro messaggi di notifica. È possibile inviare con l'aggiunta di loro la vostra coda di notifica facendo clic su" +
					  "Pulsante di notifica che si trova nella pagina di informazioni del tuo video e andando al menu Notifiche e cliccando il pulsante Invia Queue Aggiungi."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Ha il lettore video sono tasti di scelta rapida?",
				TEXT: "Sì. Pausa / Riattiva: lo spazio. Gestire il volume: i tasti freccia su o giù. Skip video in avanti / indietro: i tasti freccia a destra oa sinistra. Skip Long:" +
					  "Controllo + tasti freccia a sinistra oa destra a tutto schermo on / off:. Alt + Invio sottotitoli ON / OFF:. S, Mute: M, tornare alla precedente" +
					  "Schermo: eliminare o backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Come generi preferiti dell'utente influenzano Streama?",
				TEXT: "Prossimamente..."
			},
			USEFUL_LINKS: {
				TITLE: "Link utili",
				TEXT: "Prossimamente..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
* Translated by @DragonShura on 22/01/17.
*/
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ja', {
		LOGIN: {
			TITLE: 'ログインしてください',
			USERNAME: 'ユーザー名',
			PASSWORD: 'パスワード',
			FIRST_TIME_HINT: '最初のログイン ? ログイン \'admin\' ユーザー名とパスワード。',
			SUBMIT: 'ログイン',
      SESSION_EXPIRED: 'あなたの最後の活動以来あなたのセッションは期限切れです。もう一度ログインしてください。'
		},
		DASHBOARD: {
      HOME: 'ホーム',
      TV_SHOWS: 'テレビ番組',
      MOVIES: '映画',
      MY_LIST:'私のリスト',
			TITLE: 'ダッシュ ボード',
			NEW_RELEASES: '新しいリリース',
			CONTINUE_WATCHING: '続きを見る',
			DISCOVER_SHOWS: 'ショーを発見します',
			DISCOVER_MOVIES: '映画を発見します',
			DISCOVER_OTHER_VIDEOS: '他の動画を発見します',
			SORT: '並べ替え :',
			SEARCH_BY_NAME: '名前で検索します...',
			FILTER_BY_TAG: 'タグで検索します...',
			BROWSE_GENRES: 'ジャンルを参照します',
			LOOKING_AT_GENRE: 'ジャンルを見てください :',
			MARK_COMPLETED: '完成品マーク',
			NO_TVSHOWS_FOUND: 'テレビ番組発見なし',
			NO_MOVIES_FOUND: 'ない映画',
      NO_WATCHLIST_FOUND: 'ここにはまだ何もありません',
      WATCHLIST: '後で見る'
		},
		VIDEO: {
			RELEASED: 'リリース',
			IMDB: 'IMDB',
			RATING: '評価',
			VOTES: '投票',
			OVERVIEW: '概要',
			GENRE: 'ジャンル',
			TRAILER: 'トレーラー',
			SEASON: 'シーズン',
      NO_SUBTITLE: '字幕なし'
		},

		MESSAGES: {
			SHARE_SOCKET: '新しいセッションを作成することによってこのプレーヤーにリダイレクトされますが、今回は url に一意のセッション ID があります。同期見て彼らと経験を持ってお友達とこれを共有!',
			FILE_MISSING: 'このコンテンツに問題があります。それから関連するビデオ ファイルを削除したようだ.同期見て彼らと経験を持ってお友達とこれを共有!',
			CODEC_PROBLEM: 'プレーヤーにビデオ ファイルを追加する問題があるようです。これはコーデックの問題が原因らしいです。互換性のある HTML5 コーデックに変換してみてください、現在添付されているファイルを削除し、再度追加。コーデックは、罰金は場合、は、サーバーとの設定でベース URL のエラー ログを確認します。',
			WRONG_BASEPATH: 'あなたビデオ取得の間違った基本パスを使用してが \'{{ベースパス}}\' を介してページを拾い読みしています。設定で基本の正しいパスを設定して、あなたがアプリケーションの閲覧に使用していることを確認します。'
		},
		MANAGE_CONTENT: 'コンテンツを管理します',
    MANAGE_SUB_PROFILES: 'プロファイルを管理する',
    WHOS_WATCHING: '誰が見ている？',
    ADD_SUB_PROFILE: 'プロフィールを追加',
    EDIT_BTN: '編集',
    DONE_BTN: '完了',
    SAVE_BTN: '保存する',
    CREATE_BTN: '作成する',
    CANCEL_BTN: 'キャンセル',
    DELETE_BTN: '削除',
    ENTER_NAME: '名前を入力',
    EDIT_PROFILE: 'プロファイル編集',
    CREATE_PROFILE: 'プロフィール作成',
		ADMIN: '管理者',
		HELP: 'ヘルプ',
		HELP_FAQ: 'ヘルプ / FAQ',
		PROFILE_SETTINGS: 'プロファイルの設定',
		LOGOUT: 'ログアウト',
		CHANGE_PASSWORD: 'パスワードを変更します',
	LANGUAGE_en: 'English/英語',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/ロシア',
    LANGUAGE_de: 'Deutsch/ドイツ語',
    LANGUAGE_fr: 'Français/フランス語',
    LANGUAGE_es: 'Español/スペイン語',
    LANGUAGE_kr: '한국어/韓国語',
    LANGUAGE_nl: 'Nederlands/オランダ語',
    LANGUAGE_pt: 'Português/ポルトガル語',
    LANGUAGE_ja: '日本語',
    LANGUAGE_it: 'Italiano/イタリアの',
    LANGUAGE_da: 'Dansk/デンマーク語',
    LANGUAGE_ar: 'عربى/アラビア語',
		LANGUAGE_hu: 'Magyar/ハンガリー人',
		PROFIlE: {
			USERNAME: 'ユーザー名',
			FULL_NAME: '完全な名前',
			LANGUAGE: '言語',
			PAUSE_ON_CLICK: 'クリックでビデオを一時停止します',
			FAVORITE_GENRES: '好きなジャンル',
			SAVE: '保存',
			OLD_PASS: '古いパスワード',
			NEW_PASS: '新しいパスワード',
			NEW_PASS_PLACEHOLDER: '新しいパスワード (最低 6 文字)',
			REPEAT_PASS: 'パスワードを再入力します',
			PASS_ERROR_EMPTY: 'パスワードは空にできません',
			PASS_ERROR_LENGTH: 'パスワードは少なくとも 6 文字の長さにする必要があります',
			PASS_ERROR_REPEAT: 'パスワードは一致する必要があります',
			SAVE_PASS: 'パスワードを保存します',
      AMOUNT_OF_MEDIA_ENTRIES: 'ダッシュボード上のビデオの量（前 "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '最新の追加',
			OLDEST_ADDED: '最古の付加',
			NEWEST_RELEASED: '最新のリリース',
			OLDEST_RELEASED: '最も古いリリース',
			NEWEST_AIRED: '最新放映',
			OLDEST_AIRED: '最も古い放映'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'どのようにビデオをアップロードできますか ?',
				TEXT: "動画をアップロードするにはコンテンツの管理メニューに行くことによって。映画、テレビ番組または他のビデオをアップロードしたいかどうかに選択します。関連するサブメニューのオプションをクリックして" +
				" 画面の左側の垂直ナビゲーション バー。作成新しい映画/テレビ番組をクリックしてビデオをアップロードすることができます/その他ビデオ ボタンまたは入力して" +
				"検索バーと検索結果から関連する動画を選択してアップロードするビデオの名前。その後、ビデオの入力することができます" +
				" 情報どちらか手動で TheMovieDB からの情報を読み込んだりします。その後、ファイルの管理] をクリックして、動画と字幕ファイルをアップロードできます"
			},
			DELETE_VIDEO: {
				TITLE: 'どのようにビデオを削除できますか。',
				TEXT: "動画の情報ページに行くことによってビデオを削除することができ、ファイルの管理をクリックし、赤いゴミ箱を選択することができますアイコン。ムービーの編集をクリックし、選択" +
				" 削除映画は、それを行う別の方法です。また、コンテンツの管理メニューでファイル マネージャーを使用できます。アップロードしたすべてのファイルを見ることができます。クリックします。" +
				" 赤のゴミ箱では、アイコン ファイルを削除することができます。"
			},
			VIDEO_FORMATS: {
				TITLE: 'どのビデオ フォーマットをサポートしていますか ?',
				TEXT: "Streama は、現在、HTML5 プレーヤーでサポートされているビデオ ファイル形式のみをサポートしています。ビデオ ファイルのドラッグ アンド ドロップによって HTML5 プレーヤーの互換性のある場合をテストすることができます" +
				" お使いのブラウザーに空のタブにファイル。"
			},
			SUBTITLES: {
				TITLE: '動画に字幕を追加する方法 ?',
				TEXT: "動画の情報ページにあるファイルの管理] をクリックして、動画に字幕を追加できます。ドラッグ アンド ドロップで字幕ファイルができます。" +
				" 互換性のあるファイル形式に手動で変換するにいたが今はもうない!今アプリケーションを処理します。"
			},
			INVITE_USERS: {
				TITLE: '私のホストのビデオを視聴するお友達を招待する方法はできますか ?',
				TEXT:"お友達とあなたのビデオを共有するにはホストの Streama を使用してもらう。[ユーザー] メニューの [ユーザの招待] ボタンをクリックします。招待フォームに記入し、" +
				"出席者の役割を選択します。管理者の役割を持つユーザーは、ユーザーの設定を編集できます。コンテンツ マネージャーの役割を持つユーザーは、コンテンツを編集できます。あなたの友人が通知されます。" +
				" メールで招待状。お友達とビデオ プレーヤーの [共有] ボタンをクリックし、セッション URL をリンク ・ ビデオ ・ セッションを共有することも。"
			},
			BASE_URL: {
				TITLE: "ベース URL とどのようにそれを構成する必要がありますか ?",
				TEXT: "ベース URL は、ビデオと招待メール内のリンクに使用されます。"
			},
			NOTIFICATIONS: {
				TITLE: "通知とは何ですか ?",
				TEXT: "アップロードした動画について、招待された友人は、通知メッセージを送信して通知できます。クリックして、通知キューを追加することによってそれらを送信できます" +
				" 動画の情報ページと通知メニューに行くことおよびキューの送信ボタンをクリックすると、通知ボタンを追加します。"
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "ビデオ プレーヤーのショートカットキーですか ?",
				TEXT: "うん。一時停止/再開: スペース。ボリュームの管理: 矢印キーを上下に移動します。ビデオ前方/後方スキップ: 左または右矢印キー。長いスキップ :" +
				" 左または右の矢印キーを制御します。全画面表示オン/オフ: alt キーを入力してください。字幕オン/オフ: S、ミュート: M、前に戻る '' 画面: 削除またはバック スペースします。"
			},
			FAVORITE_GENRES: {
				TITLE: "ユーザーの好きなジャンルは Streama をどのように影響するのか ?",
				TEXT: "近日公開..."
			},
			USEFUL_LINKS: {
				TITLE: "役に立つリンク",
				TEXT: "近日公開..."
			}
		}
	});
}]);
})();
/**
 * Created by antonia on 14/05/16.
 * Translation by @imkimchi on 16/05/16
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('kr', {
		LOGIN: {
			TITLE: '로그인이 필요합니다.',
			USERNAME: '아이디',
			PASSWORD: '비밀번호',
			FIRST_TIME_HINT: '처음 로그인 하시나요? \'admin\'를 입력해보세요!',
			SUBMIT: '로그인',
      SESSION_EXPIRED: '마지막 활동 이후 세션이 만료되었습니다. 다시 로그인하십시오.'
		},
		DASHBOARD: {
      HOME: '집',
      TV_SHOWS: 'TV 프로그램',
      MOVIES: '영화 산업',
      MY_LIST:'나의 목록',
			TITLE: '대시보드',
			NEW_RELEASES: '신작',
			CONTINUE_WATCHING: '계속해서 보기',
			DISCOVER_SHOWS: '드라마 찾기',
			DISCOVER_MOVIES: '영화 찾기',
			DISCOVER_OTHER_VIDEOS: '다른 영상들을 찾아보기',
			SORT: '정렬:',
			SEARCH_BY_NAME: '제목으로 찾아보기...',
			FILTER_BY_TAG: '태그로 찾아보기...',
			BROWSE_GENRES: '장르 탐색',
			LOOKING_AT_GENRE: '장르를 보고있습니다.',
			MARK_COMPLETED: '선택 완료',
			NO_TVSHOWS_FOUND: '해당 드라마를 찾지 못했습니다.',
			NO_MOVIES_FOUND: '해당 영화를 찾지 못했습니다.',
      NO_WATCHLIST_FOUND: '아직 아무것도 없습니다',
      WATCHLIST: '나중에 볼'
		},
		VIDEO: {
			RELEASED: '출시',
			IMDB: 'IMDB',
			RATING: '평점',
			VOTES: '투표',
			OVERVIEW: '줄거리',
			GENRE: '장르',
			TRAILER: '트레일러',
			SEASON: '시즌',
      NO_SUBTITLE: '부제 없음'
		},

		MESSAGES: {
			SHARE_SOCKET: '새로운 세션을 만들면 이 플레이어로 다시 돌아오지만, 지금은 URL에 유니크 세션 ID가 있습니다. 세션 ID를 친구들과 공유해서 동시에 시청해보세요!',
			FILE_MISSING: '비디오 파일이 찾을 수 없습니다. 친구들과 공유해서 동시에 시청해보세요!',
			CODEC_PROBLEM: '비디오 파일을 플레이어에 추가하는데 문제가 발생했습니다. 코덱의 문제일 가능성이 높습니다. 호환 가능한 HTML5 코덱으로 변경하고, 현재 파일을 삭제하고 다시 추가해보세요. 만약 코덱에 문제가 없다면 환경설정에서 에러 로그와 base URL를 확인해보세요.',
			WRONG_BASEPATH: '잘못된 경로입니다, 현재 페이지는 "{{basePath}}" 입니다. 올바른 경로로 설정해주세요.'
		},
		MANAGE_CONTENT: '컨텐츠 관리',
    MANAGE_SUB_PROFILES: '프로필 관리',
    WHOS_WATCHING: '누가보고있어?',
    ADD_SUB_PROFILE: '프로필 추가',
    EDIT_BTN: '편집하다',
    DONE_BTN: '끝난',
    SAVE_BTN: '구하다',
    CREATE_BTN: '몹시 떠들어 대다',
    CANCEL_BTN: '취소',
    DELETE_BTN: '지우다',
    ENTER_NAME: '이름을 입력하시오',
    EDIT_PROFILE: '프로필 편집',
    CREATE_PROFILE: '프로필 만들기',
		ADMIN: '관리자',
		HELP: '도움',
		HELP_FAQ: '도움 / 질문',
		PROFILE_SETTINGS: '프로필 설정',
		LOGOUT: '로그아웃',
		CHANGE_PASSWORD: '비밀번호 변경',
	LANGUAGE_en: 'English/영어',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/러시아인',
    LANGUAGE_de: 'Deutsch/독일어',
    LANGUAGE_fr: 'Français/프랑스의',
    LANGUAGE_es: 'Español/스페인어',
    LANGUAGE_kr: '한국어',
    LANGUAGE_nl: 'Nederlands/네덜란드',
    LANGUAGE_pt: 'Português/포르투갈어',
    LANGUAGE_ja: '日本語/일본어',
    LANGUAGE_it: 'Italiano/이탈리아 사람',
    LANGUAGE_da: 'Dansk/덴마크 말',
    LANGUAGE_ar: 'عربى/아라비아 말',
    LANGUAGE_hu: 'Magyar/헝가리 인',
		PROFIlE: {
			USERNAME: '아이디',
			FULL_NAME: '이름',
			LANGUAGE: '언어',
			PAUSE_ON_CLICK: '클릭해서 재생을 멈춥니다.',
			FAVORITE_GENRES: '좋아하는 장르',
			SAVE: '저장',
			OLD_PASS: '기존 비밀번호',
			NEW_PASS: '새 비밀번호',
			NEW_PASS_PLACEHOLDER: '새 비밀번호 (최소 6글자)',
			REPEAT_PASS: '비밀번호 재입력',
			SAVE_PASS: '새 비밀번호 설정',
      AMOUNT_OF_MEDIA_ENTRIES: '대시 보드의 비디오 양 (이전 "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: '최근 추가된 순',
			OLDEST_ADDED: '늦게 추가된 순',
			NEWEST_RELEASED: '최근 출시된 순 ',
			OLDEST_RELEASED: '늦게 출시된 순',
			NEWEST_AIRED: '최근에 방영된 순',
			OLDEST_AIRED: '늦게 방영된 순 '
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: '비디오를 어떻게 업로드 하나요?',
				TEXT: "컨텐츠 관리 메뉴에서 비디오를 업로드 할 수 있습니다. 영화, 드라마, 영상를 업로드할건지 선택해주세요. 하위 메뉴를 클릭하세요." +
				" 화면 좌측에 있는 네비게이션 바. 새로운 영화/드라마/영상 버튼을 클릭하거나 입력해서 동영상을 업로드 할 수 있습니다" +
				" 검색 창에서 업로드 하고 싶은 동영상을 검색하세요. 검색 결과중에 원하는 영화를 클릭하면 동영상 리스트에 추가할 수 있습니다." +
				" TheMovieDB 또는 로컬 파일을 파일 관리 버튼을 클릭해서 동영상과 자막 파일을 추가할 수 있습니다."
			},
			DELETE_VIDEO: {
				TITLE: '비디오를 어떻게 삭제 하나요?',
				TEXT: "비디오 정보 페이지 -> 파일 관리 -> 빨간색 휴지통 아이콘 -> 영화 수정 -> 선택" +
				" 영화 삭제 를 통해 삭제 할 수 있습니다. 컨텐츠 관리 메뉴에 있는 파일 관리자를 사용해서 삭제할 수도 있습니다. 파일 관리자로 업로드한 영상들을 모두 확인할 수 있습니다." +
				" 빨간 휴지통 아이콘을 클릭해서 삭제하세요."
			},
			VIDEO_FORMATS: {
				TITLE: '어떤 동영상 포맷을 지원하나요?',
				TEXT: "Streama는 HTML5 플레이어가 지원하는 형식의 동영상 포맷만 지원합니다. 빈 창에 동영상을 드래그 앤 드랍을 통해 HTML5 플레이어와 호환이 되는지 확인할 수 있습니다."
			},
			SUBTITLES: {
				TITLE: '자막을 어떻게 추가 할 수 있나요?',
				TEXT: "비디오 정보 페이지에 있는 파일 관리자를 클릭해서 동영상에 자막을 추가할 수 있습니다. 드래그 앤 드랍을 통해서 추가할 수 도 있습니다." +
				" 이전에는 수동으로 파일 형식을 호환 가능한 파일 형식으로 변환해야했지만 Streama가 대신 해드립니다!"
			},
			INVITE_USERS: {
				TITLE: '내가 추가한 동영상을 친구들이 볼 수있도록 할 수있나요?',
				TEXT:" Streama를 통해 친구들을 초대하여 친구들에게 동영상을 공유할 수있습니다. 유저 메뉴에서 유저 초대 버튼을 클릭하세요. 초대 리스트를 작성하고" +
				" 초대하려는 친구의 권한을 설정하세요. 관리자 권한을 가진 유저는 유저 & 설정을 변경할 수 있습니다. 파일 관리자 권한을 가진 유저는 파일을 변경할 수 있습니다. 초대가 된 이후에, 당신의 친구들에게 이메일로 알람이 갑니다." +
				" 비디오 플레이어의 공유 버튼을 클릭한 후, 링크를 공유해서 친구들에게 동영상을 공유할 수도 있습니다."
			},
			BASE_URL: {
				TITLE: "Base URL이 어떤 것이고 어떻게 설정할 수 있나요?",
				TEXT: "Base-URL 은 동영상과 초대 이메일의 링크로 쓰입니다."
			},
			NOTIFICATIONS: {
				TITLE: "알람들이 뭔가요?",
				TEXT: "초대된 친구들한테 업로드 된 영상을 알릴 수 있습니다. 비디오 정보 페이지 -> 알람 -> 대기열 전송을 클릭 해서 알람 대기열에 추가 시킬 수 있습니다."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "단축키가 있나요?",
				TEXT: "정지: space. 볼륨 조절: 방향키 위/아래. 동영상 건너뛰기: 단축키 우측/좌측. 길게 건너뛰기:" +
				" control + 방향키 좌측/우측. 전체화면 on/off: alt + enter. 자막 on/off: S, 음소거: M, 뒤로가기" +
				" screen: delete키 혹은 backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "유저의 장르 취향이 Stream에 어떤 영향을 주나요?",
				TEXT: "Coming soon..."
			},
			USEFUL_LINKS: {
				TITLE: "유용한 링크",
				TEXT: "Coming soon..."
			}
		}
	});
}]);

/**
 * Created by antonia on 14/05/16.
 * Translated by Steyn Guelen on 15/05/16.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
  $translateProvider.translations('nl', {
    LOGIN: {
      TITLE: 'Graag inloggen',
      USERNAME: 'Gebruikersnaam',
      PASSWORD: 'Wachtwoord',
      FIRST_TIME_HINT: 'Eerste keer dat u inlogt? Probeer \'admin\' voor gebruikersnaam en wachtwoord.',
      SUBMIT: 'Login',
      SESSION_EXPIRED: 'Je sessie is verlopen sinds je laatste activiteit. Log alsjeblieft nogmaals in.'
    },
    DASHBOARD: {
      HOME: 'Huis',
      TV_SHOWS: 'Tv shows',
      MOVIES: 'Films',
      MY_LIST:'Mijn lijst',
      TITLE: 'Dashboard',
      RECOMMENDATIONS: 'Aanbevelingen voor u',
      NEW_RELEASES: 'Nieuw uitgebracht',
      CONTINUE_WATCHING: 'Verder kijken',
      DISCOVER_SHOWS: 'Ontdek series',
      DISCOVER_MOVIES: 'Ontdek films',
      DISCOVER_OTHER_VIDEOS: 'Ontdek andere videos.',
      SORT: 'Sorteer op',
      SEARCH_BY_NAME: 'Zoek met naam...',
      FILTER_BY_TAG: 'Filter op tag...',
      BROWSE_GENRES: 'Verken',
      LOOKING_AT_GENRE: 'Je kijkt naar het genre',
      MARK_COMPLETED: 'Markeer als bekeken',
      NO_TVSHOWS_FOUND: 'Geen series beschikbaar',
      NO_MOVIES_FOUND: 'Geen films beschikbaar',
      NO_WATCHLIST_FOUND: 'Hier nog niets',
      WATCHLIST:'later bekijken'
    },
    VIDEO: {
      RELEASED: 'Uitgebracht op',
      IMDB: 'IMDB',
      RATING: 'Waardering',
      VOTES: 'Aantal stemmen',
      OVERVIEW: 'Overzicht',
      GENRE: 'Genre',
      TRAILER: 'Trailer',
      SEASON: 'Seizoen',
      NO_SUBTITLE: 'Geen ondertiteling'
    },

    MESSAGES: {
      SHARE_SOCKET: 'Door een nieuwe sessie te starten zal je teruggestuurd worden naar dit venster, maar deze keer zal de url een unieke sessie id bevatten. Deel deze met je vrienden om een gesynchroniseerde kijkervaring te beleven!',
      FILE_MISSING: 'Er is een probleem met deze video. Het lijkt erop dat het bestand verwijderd is.',
      CODEC_PROBLEM: 'Het lijkt er op dat er een probleem is met het toevoegen van het bestand. Dit komt waarschijnlijk door een verkeerde codec. Converteer het bestand naar een HTML5-codec, verwijder het huidige bestand en probeer het nieuwe bestand opnieuw toe te voegen. Is de codec wel geschikt? Check de server log en Base URL.',
      WRONG_BASEPATH: 'Uw video wordt toegevoegd met het verkeerde basispad, u bekijkt de pagina via "{{basePath}}". Wees er weker van dat u het juiste basispad instelt en dat je dit gebruikt om de applicatie te bereiken.',
      FILE_IN_FS_NOT_FOUND: 'Uw video kan niet gevonden worden op een van de locaties die beschikbaar zijn voor de toepassing. Herzie uw instellingen en uw bestandssyteem om er zeker van te zijn dat alle bestanden bereikbaar zijn voor de applicatie.'
    },
    MANAGE_CONTENT: 'Beheer content',
    MANAGE_SUB_PROFILES: 'Profielen beheren',
    WHOS_WATCHING: 'Wie kijkt?',
    ADD_SUB_PROFILE: 'Profiel toevoegen',
    EDIT_BTN: 'Bewerk',
    DONE_BTN: 'Gedaan',
    SAVE_BTN: 'Opslaan',
    CREATE_BTN: 'creëren',
    CANCEL_BTN: 'annuleren',
    DELETE_BTN: 'Verwijder',
    ENTER_NAME: 'Voer naam in',
    EDIT_PROFILE: 'Bewerk profiel',
    CREATE_PROFILE: 'Maak een profiel aan',
    ADMIN: 'Administrator',
    HELP: 'Help',
    HELP_FAQ: 'HELP / FAQ',
    PROFILE_SETTINGS: 'Profielinstellingen',
    LOGOUT: 'Uitloggen',
    CHANGE_PASSWORD: 'Wachtwoord wijzigen',
    LANGUAGE_en: 'English/Engels',
    LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский/Russisch',
    LANGUAGE_de: 'Deutsch/Duits',
    LANGUAGE_fr: 'Français/Frans',
    LANGUAGE_es: 'Español/Spaans',
    LANGUAGE_kr: '한국어/Koreaans',
    LANGUAGE_nl: 'Nederlands',
    LANGUAGE_pt: 'Português/Portugees',
    LANGUAGE_ja: '日本語/Japans',
    LANGUAGE_it: 'Italiano/Italiaans',
    LANGUAGE_da: 'Dansk/Deens',
    LANGUAGE_ar: 'عربى/Arabisch',
    LANGUAGE_hu: 'Magyar/Hongaars',
    PROFIlE: {
      USERNAME: 'Gebruikersnaam',
      FULL_NAME: 'Volledige naam',
      LANGUAGE: 'Taal',
      PAUSE_ON_CLICK: 'Pauzeer video met klik',
      FAVORITE_GENRES: 'Favoriete Genres',
      AMOUNT_OF_MEDIA_ENTRIES: 'Aantal video\'s op dashboard (voorheen "Meer laden")',
      SAVE: 'Opslaan',
      PASS: 'Wachtwoord',
      OLD_PASS: 'Oud wachtwoord',
      NEW_PASS: 'Nieuw wachtwoord',
      NEW_PASS_PLACEHOLDER: 'Nieuw wachtwoord (minimaal 6 karakters',
      REPEAT_PASS: 'Herhaal wachtwoord',
      PASS_ERROR_EMPTY: 'Het wachtwoord mag niet leeg zijn',
      PASS_ERROR_LENGTH: 'Het wachtwoord moet minstens 6 karakters lang zijn',
      PASS_ERROR_REPEAT: 'De wachtwoorden moeten overeenstemmen',
      SAVE_PASS: 'Opslaan'
    },

    SORT_OPTIONS: {
      AZ: 'A-Z',
      ZA: 'Z-A',
      NEWEST_ADDED: 'Meest recent toegevoegd',
      OLDEST_ADDED: 'Als eerste toegevoegd',
      NEWEST_RELEASED: 'Laatst uitgebracht',
      OLDEST_RELEASED: 'Als eerste uitgebracht',
      NEWEST_AIRED: 'Meest recent uitgezonden',
      OLDEST_AIRED: 'Als eerste uitgezonden',
      NEWEST_REPORTED: 'Laatst Gerapporteerd',
      OLDEST_REPORTED: 'Als eerste gerapporteerd',
      NEWEST_UPDATED: 'Laatst Bijgewerkt',
      OLDEST_UPDATED: 'Als eerste bijgewerkt'
    },

    FAQ: {
      UPLOAD_VIDEO: {
        TITLE: 'Hoe kan ik een video uploaden?',
        TEXT: "U kan een video oploaden door naar het Beheer Content menu te gaan. Kies tussen het uploaden van een Film, Serie of andere soort video. Klik op de relevante sub-menu optie" +
          " te vinden op de verticale navigatiebar op de linkerkant van het scherm. Je kan een nieuwe video toevoegen door te klikken op Create New Movie/TV Show/Other Video knop" +
          " of door de film te zoeken via de zoekbalk en het relevante resultaat te kiezen. Nadien kan je de informatie van de video manueel invullen of de informatie laden vanuit TheMovieDB." +
          " Als laatste voegt u de video en mogelijke ondertitels toe via de Mqnqge Files knop."
      },
      DELETE_VIDEO: {
        TITLE: 'Hoe kan ik een video verwijderen?',
        TEXT: "U kan een video verwijderen door naar de infromatie pagina van de videos te gaan en op Manage Files te klikken. Daar klikt op het icoon van de rode vuilbak." +
          " Klikken op Edit Movie en Delete Movie selecteren is een tweede manier. Een derde manier is naar het Manage Content Menu te gaan en te klikken op het rode vuilbak icoon van" +
          " het te verwijderen bestand."
      },
      VIDEO_FORMATS: {
        TITLE: 'Welke video indelingen worden ondersteund?',
        TEXT: "Streama ondersteund momenteel enkel de video indelingen die ondersteund zijn door de HTML5 Player. U kan testen of uw video HTML5 compatibel is door uw bestand" +
          " naar een leeg browsertablad te slepen."
      },
      SUBTITLES: {
        TITLE: 'Hoe kan ik ondertitels toevoegen aan videos?',
        TEXT: "U kan ondertitels toevoegen voor een bepaalde video door naar de informatiepagina van de video te gaan en de knop Manage Files in te drukken." +
          " U kan hier simpelweg ondertitel bestanden naartoe slepen. Voordien moest u de bestanden converteren naar een gekende bestandsindeling, maar niet langer!" +
          " De applicatie zorgt hier nu volledig zelf voor."
      },
      INVITE_USERS: {
        TITLE: 'Hoe kan ik vrienden uitnodigen om mijn gehoste video te bekijken?',
        TEXT: "U kan uw videos delen met uw vrienden door ze uit te nodigen om uw Streama te gebruiken. Ga naar het Users Menu en klik op Invite User. Vul het uitnodigingsformulier" +
          " in en selecteer de rol(len) van de genodigde. Gebuikers met de rol Admin kunnen gebruikers en instellen aanpassen. Gebruikers met de rol Content Manager kunnen materiaal" +
          " beheren. Uw vriend zal op de hoogte gebracht worden van de uitnodiging via mail. U kan ook video sessies delen met vrienden door de Share-knop in te drukken tijdens het" +
          " spelen van de video. De getoonde link kan u delen met hen."
      },
      BASE_URL: {
        TITLE: "Wat is de basis URL en hoe moet ik deze configureren?",
        TEXT: "De basis URL wordt gebruikt voor de videos en de link in de invitatie email."
      },
      NOTIFICATIONS: {
        TITLE: "Wat zijn notificaties?",
        TEXT: "U kan uw uitgenodigde vrienden op de hoogte brengen van nieuw materiaal door hen notificaties te sturen. U kan deze sturen door ze toe te voegen aan de notificatierij." +
          " Dit door te klikken op Add Notification in de video\'s informatiepagina en naar het notificatiemenu te gaan en te klikken op Send Queue."
      },
      VIDEO_PLAYER_SHORTCUTS: {
        TITLE: "Heeft de videospeler shortcut knoppen?",
        TEXT: "Ja. Pauze/hervatten: spatiebalk. Volume regelen: Pijltjestoetsen op en neer. Videos overslaan vooruit/achteruit: Pijltjestoetsen links en rechts. Lang overslaan:" +
          " control + Pijltjestoetsen links en rechts. Volledig scherm aan/uit: alt + enter. Ondertitels aan/uit: S, Mute: M, Naar het vorige scherm: delete or backspace."
      },
      FAVORITE_GENRES: {
        TITLE: "Welk effect heeft uw favoriete genre op Streama?",
        TEXT: "Komt Binnenkort..."
      },
      USEFUL_LINKS: {
        TITLE: "Handige links",
        TEXT: "Komt Binnenkort..."
      }
    }
  });
}]);

(function(){
'use strict';
//= wrapped
/**
 * Created by antonia on 14/05/16.
 *
 * Last update: 10/02/2020
 *
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('pt', {
		LOGIN: {
			TITLE: 'Fazer Login',
			USERNAME: 'Usuário',
			PASSWORD: 'Senha',
			FIRST_TIME_HINT: 'Primeira vez fazendo login? Tente \'admin\' nos dois campos.',
			SUBMIT: 'Entrar',
			SESSION_EXPIRED: 'Sua sessão expirou desde sua última atividade. Por favor faça login novamente.'
		},
		DASHBOARD: {
			HOME: 'Início',
			TV_SHOWS: 'Programas de televisão',
			MOVIES: 'Filmes',
			MY_LIST:'Minha lista',
			TITLE: 'Painel',
			RECOMMENDATIONS: 'Sugestões para você',
			NEW_RELEASES: 'Novos lançamentos',
			CONTINUE_WATCHING: 'Continue assistindo',
			DISCOVER_SHOWS: 'Descubra séries',
			DISCOVER_MOVIES: 'Descubra filmes',
			DISCOVER_OTHER_VIDEOS: 'Descubra outros vídeos',
			SORT: 'Ordenar:',
			SEARCH_BY_NAME: 'Pesquisar por Nome...',
			FILTER_BY_TAG: 'Filtrar por Tag...',
			BROWSE_GENRES: 'Navegar',
			LOOKING_AT_GENRE: 'Você está vendo o gênero:',
			MARK_COMPLETED: 'Concluído',
			NO_TVSHOWS_FOUND: 'Nenhuma Série Disponível',
			NO_MOVIES_FOUND: 'Nenhum Filme Disponível',
      NO_WATCHLIST_FOUND: 'Nada aqui ainda',
			WATCHLIST: 'ver mais tarde'
		},
		VIDEO: {
			RELEASED: 'Lançamento',
			IMDB: 'IMDB',
			RATING: 'Classificação',
			VOTES: 'Votos',
			OVERVIEW: 'Sinopse',
			GENRE: 'Gênero',
			TRAILER: 'Trailer',
			SEASON: 'Temporada',
			NO_SUBTITLE: 'Sem legenda',
			UPNEXT: 'A seguir...'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Ao criar uma nova sessão você será redirecionado de volta para esse player, mas dessa vez você terá um ID de sessão único na url. Compartilhe isso com seus amigos e tenha uma experiência sincronizada com eles!',
			FILE_MISSING: 'Houve um problema com esse conteúdo. Parece que você removeu o arquivo de vídeo associado a ele.',
			CODEC_PROBLEM: 'Parece que houve um problema ao adicionar o arquivo de vídeo ao player. Isso aconteceu provavelmente por causa de um problema de codec. Tente converter o vídeo para um codec compatível com HTML5, remova o arquivo de vídeo atual e re-adicione ele. Se os codecs estão ok, cheque o log de erros do servidor e a URL base nas configurações.',
			WRONG_BASEPATH: 'Seu vídeo foi incluído usando o caminho base errado, mas você está navegando na página via "{{basePath}}". Verifique se você usou o caminho base correto nas configurações e que você está usando ele para navegar na aplicação.',
			FILE_IN_FS_NOT_FOUND: 'Seu vídeo não pode ser encontrado em nenhum dos locais disponíveis para o aplicativo. Por favor, verifique suas configurações e seus arquivos de sistema para ter certeza de que os arquivos estão acessíveis para o programa.'
		},
		MANAGE_CONTENT: 'Gerenciar Conteúdo',
		MANAGE_SUB_PROFILES: 'Gerenciar perfis',
		WHOS_WATCHING: 'Quem está assistindo?',
		ADD_SUB_PROFILE: 'Adicionar perfil',
		EDIT_BTN: 'Editar',
		DONE_BTN: 'Concluir',
		SAVE_BTN: 'Salvar',
		CREATE_BTN: 'Criar',
		CANCEL_BTN: 'Cancelar',
		DELETE_BTN: 'Excluir',
		ENTER_NAME: 'Digite o nome',
		EDIT_PROFILE: 'Editar Perfil',
		CREATE_PROFILE: 'Criar perfil',
		ADMIN: 'Admin',
		HELP: 'Ajuda',
		HELP_FAQ: 'AJUDA / FAQ',
		PROFILE_SETTINGS: 'Configurações do Perfil',
		LOGOUT: 'Sair',
		CHANGE_PASSWORD: 'Alterar Senha',
		LANGUAGE_en: 'English/Inglês',
		LANGUAGE_cn: '中文/Chinês',
		LANGUAGE_ru: 'Русский/Russo',
		LANGUAGE_de: 'Deutsch/Alemão',
		LANGUAGE_fr: 'Français/Francês',
		LANGUAGE_es: 'Español/Espanhol',
		LANGUAGE_kr: '한국어/Coreano',
		LANGUAGE_nl: 'Nederlands/Holandês',
		LANGUAGE_pt: 'Português',
		LANGUAGE_ja: '日本語/Japonês',
		LANGUAGE_it: 'Italiano/Italiano',
		LANGUAGE_da: 'Dansk/Dinamarquês',
		LANGUAGE_ar: 'عربى/Árabe',
		LANGUAGE_hu: 'Magyar/Húngaro',
		PROFIlE: {
			USERNAME: 'Usuário',
			FULL_NAME: 'Nome completo',
			LANGUAGE: 'Idioma',
			PAUSE_ON_CLICK: 'Pausar vídeo ao Clicar',
			FAVORITE_GENRES: 'Gêneros favoritos',
			SAVE: 'Salvar Perfil',
			PASS: 'Senha',
			OLD_PASS: 'Senha Atual',
			NEW_PASS: 'Nova Senha',
			NEW_PASS_PLACEHOLDER: 'Nova Senha (min. 6 caracteres)',
			REPEAT_PASS: 'Repita a Senha',
			PASS_ERROR_EMPTY: 'A senha não pode estar vazia',
			PASS_ERROR_LENGTH: 'A senha tem que ter pelo menos 6 caracteres',
			PASS_ERROR_REPEAT: 'As senhas têm que coincidir',
			AMOUNT_OF_MEDIA_ENTRIES: 'Quantidade de Vídeos no Painel de Controle (Antes de "Load More")'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Adicionado por Último',
			OLDEST_ADDED: 'Adicionado Primeiro',
			NEWEST_RELEASED: 'Lançado por Último',
			OLDEST_RELEASED: 'Lançado Primeiro',
			NEWEST_AIRED: 'Transmitido por Último',
			OLDEST_AIRED: 'Transmitido Primeiro'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Como eu envio um vídeo?',
				TEXT: "Você pode enviar conteúdo no menu Gerenciar Conteúdo. Escolha se você quer Enviar um Filme, uma Série ou outro tipo de conteúdo. Clique na opção relevante no sub-menu" +
				" na barra vertical de navegação do lado esquerdo da tela. Você pode enviar um vídeo clicando no botão \"Create New Movie/TV Show/Other Video\" ou digitando" +
				" o nome do vídeo que você quer enviar na barra de pesquisa e selecionando o vídeo relevante nos resultados da busca. Depois disso, você pode escolher preencher as informações" +
				" do vídeo ou manualmente ou carregando as informações do TheMovieDB. Depois disso, você pode enviar o vídeo e os arquivos de legenda clicando no botão Gerenciar Conteúdo."
			},
			DELETE_VIDEO: {
				TITLE: 'Como eu deleto um vídeo?',
				TEXT: "Você pode deletar um vídeo indo para a página de informação do vídeo e clicando em Gerenciar Conteúdo e clicando no botão vermelho de lixeira. Clicar em Edit Movie" +
				" e então em Delete Movie é outro jeito de fazer isso. Você também pode usar o Gerenciador de Arquivos que fica no Gerenciador de Conteúdo. Você pode ver todos os arquivos que" +
				" você enviou lá. Clique no botão da lixeira vermelha para deletar um arquivo."
			},
			VIDEO_FORMATS: {
				TITLE: 'Que formatos de vídeo são suportados?',
				TEXT: "O Streama atualmente suporta apenas formatos de vídeo suportados pelo player HTML5. Você pode testar se o seu arquivo de vídeo é compatível com o player HTML5 simplesmente" +
				" arrastando e soltando seu arquivo numa nova aba do seu navegador."
			},
			SUBTITLES: {
				TITLE: 'Como eu adiciono legendas para os vídeos?',
				TEXT: "Você pode adicionar legendas para os vídeos clicando no botão Gerenciar Arquivos, que fica na página de informações do vídeo. Você pode arrastar e soltar" +
				" o arquivo das legendas lá. Antigamente você tinha que manualmente converter a legenda para um formato compatível, mas não mais! Agora a aplicação converte para você."
			},
			INVITE_USERS: {
				TITLE: 'Como eu convido meus amigos para assistir meus vídeos hosteados?',
				TEXT:"Você pode compartilhar seus vídeos com seus amigos convidando eles para usar o seu Streama hosteado. Vá para o menu de Usuários e clique o botão Invite User. Preencha o formulário e" +
				" selecione os cargos do convidado. Usuários com o cargo Admin podem editar Usuários & Configurações. Usuários com o cargo Content Manager podem editar conteúdo. Seu amigo será notificado sobre" +
				" o convite via email. Você também pode compartilhar sessões de vídeo com seus amigos clicando no botão de Compartilhar dentro do player e mandando o link da sessão para eles."
			},
			BASE_URL: {
				TITLE: "O que é a URL base e como eu devo configurá-la?",
				TEXT: "A URL base é usada para vídeos e para o link no email de convite."
			},
			NOTIFICATIONS: {
				TITLE: "O que são notificações?",
				TEXT: "Você pode notificar seus amigos que foram convidados sobre vídeos enviados mandando notificações para eles. Você pode enviar notificações adicionando eles a fila de notificações ao clicar" +
				" Adicione o botão Notificação, que está na página de informações do seu vídeo, indo até o menu Notificações e clicando no botão Enviar Fila."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "O player tem botões de atalho?",
				TEXT: "Sim. Pausar/resumir: espaço. Volume: setas para cima e para baixo. Pular vídeo para frente ou para trás: setas para esquerda e para direita. Pulo longo:" +
				" control + setas para esquerda e para direita. Ligar ou desligar a tela cheia: alt + enter. Ligar ou desligar legendas: S, Mutar: M, Voltar para e tela anterior:" +
				" delete ou backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Como os gêneros favoritos do usuário afetam o Streama?",
				TEXT: "Em breve..."
			},
			USEFUL_LINKS: {
				TITLE: "Links úteis",
				TEXT: "Em breve..."
			}
		}
	});
}]);
})();
(function(){
'use strict';
//= wrapped
/**
 * Created by shardik on 21/01/18.
 */
angular.module('streama.translations').config(["$translateProvider", function ($translateProvider) {
	$translateProvider.translations('ru', {
		LOGIN: {
			TITLE: 'Пожалуйста, авторизуйтесь',
			USERNAME: 'Логин',
			PASSWORD: 'Пароль',
			FIRST_TIME_HINT: 'Впервые? Используйте \'admin\' в качестве логина и пароля для входа.',
			SUBMIT: 'Войти',
      SESSION_EXPIRED: 'Ваша сессия истекла. Пожалуйста, войдите снова.'
		},
		DASHBOARD: {
      HOME: 'Домашняя страница',
      TV_SHOWS: 'ТВ шоу',
      MOVIES: 'Фильмы',
      MY_LIST:'Мой список',
			TITLE: 'Главная',
			RECOMMENDATIONS: 'Рекомендовано для вас',
			NEW_RELEASES: 'Новое на сайте',
			CONTINUE_WATCHING: 'Продолжить просмотр',
			DISCOVER_SHOWS: 'Обзор тв-шоу',
			DISCOVER_MOVIES: 'Обзор кино',
			DISCOVER_OTHER_VIDEOS: 'Обзор остального видео',
			SORT: 'Сортировать по:',
			SEARCH_BY_NAME: 'имени...',
			FILTER_BY_TAG: 'тегу...',
			BROWSE_GENRES: 'Обзор',
			LOOKING_AT_GENRE: 'Вы смотрите по жанру:',
			MARK_COMPLETED: 'Уже просмотрено!',
			NO_TVSHOWS_FOUND: 'ТВ-шоу пока недоступно',
			NO_MOVIES_FOUND: 'Кино пока недоступно',
      NO_WATCHLIST_FOUND: 'Здесь пока ничего',
      WATCHLIST: 'Посмотреть позже'
		},
		VIDEO: {
			RELEASED: 'Дата выхода',
			IMDB: 'IMDB',
			RATING: 'Рейтинг',
			VOTES: 'Голосов',
			OVERVIEW: 'Описание',
			GENRE: 'Жанр',
			TRAILER: 'Трейлер',
			SEASON: 'Сезон',
      NO_SUBTITLE: 'без субтитров'
		},

		MESSAGES: {
			SHARE_SOCKET: 'Создавая новую сессию, вы будете перенаправлены обратно на этот плеер, но на этот раз у вас будет уникальный идентификатор сессии в URL-адресе. Поделитесь этим видео с друзьями, чтобы синхронизировать их с ними!',
			FILE_MISSING: 'Существует проблема с этим контентом. Кажется, вы удалили из него связанный видеофайл.',
			CODEC_PROBLEM: 'Кажется, что проблема связана с добавлением видеофайла в плеер. Это, скорее всего, связано с проблемой кодека. Попробуйте преобразовать его в совместимый кодек HTML5, удалите прикрепленный файл и снова добавьте его. Если кодеки в порядке, проверьте данные об ошибках сервера и базового URL в настройках.',
			WRONG_BASEPATH: 'Вы пытаетесь просмотреть видео с использованием неправильного базового пути, но просматриваете страницу через переменную «{{basePath}}». Убедитесь, что вы установили правильный базовый путь в настройках и используете его для просмотра приложения.',
			FILE_IN_FS_NOT_FOUND: 'Ваше видео не может быть найдено ни в одном из мест, доступных для приложения. Проверьте свои настройки и файловую систему, чтобы убедиться, что файлы доступны для приложения.'
		},
		MANAGE_CONTENT: 'Управление',
    MANAGE_SUB_PROFILES: 'Управление профилями',
    WHOS_WATCHING: 'Кто будет смотреть?',
    ADD_SUB_PROFILE: 'Добавить профайл',
    EDIT_BTN: 'Изменить',
    DONE_BTN: 'Сделано',
    SAVE_BTN: 'Сохранить',
    CREATE_BTN: 'Создать',
    CANCEL_BTN: 'Отменить',
    DELETE_BTN: 'Удалить',
    ENTER_NAME: 'Введите имя',
    EDIT_PROFILE: 'Редактировать профиль',
    CREATE_PROFILE: 'Создать профиль',
		ADMIN: 'Админка',
		HELP: 'Помощь',
		HELP_FAQ: 'ПОМОЩЬ / ЧаВО',
		PROFILE_SETTINGS: 'Настройки',
		LOGOUT: 'Выйти',
		CHANGE_PASSWORD: 'Изменить пароль',
	LANGUAGE_en: 'English/английский',
	LANGUAGE_cn: 'Chinese/中文',
    LANGUAGE_ru: 'Русский',
    LANGUAGE_de: 'Deutsch/Немецкий',
    LANGUAGE_fr: 'Français/Французский',
    LANGUAGE_es: 'Español/испанский',
    LANGUAGE_kr: '한국어/корейский язык',
    LANGUAGE_nl: 'Nederlands/Голландский',
    LANGUAGE_pt: 'Português/португальский',
    LANGUAGE_ja: '日本語/японский язык',
    LANGUAGE_it: 'Italiano/итальянский',
    LANGUAGE_da: 'Dansk/датский',
    LANGUAGE_ar: 'عربى/арабский',
		LANGUAGE_hu: 'Magyar/венгерский',
		PROFIlE: {
			USERNAME: 'Логин',
			FULL_NAME: 'Имя',
			LANGUAGE: 'Язык',
			PAUSE_ON_CLICK: 'Поставить на паузу при клике',
			FAVORITE_GENRES: 'Любимые жанры',
      AMOUNT_OF_MEDIA_ENTRIES: 'Количество видео на главной странице (до ссылки «Загрузить больше»)',
			SAVE: 'Сохранить профиль',
			PASS: 'Пароль',
			OLD_PASS: 'Старый пароль',
			NEW_PASS: 'Новый пароль',
			NEW_PASS_PLACEHOLDER: 'Новый пароль (минимум 6 символов)',
			REPEAT_PASS: 'Повоторите пароль',
			PASS_ERROR_EMPTY: 'Пароль не должен быть пустым',
			PASS_ERROR_LENGTH: 'Пароль должен быть не менее 6 символов',
			PASS_ERROR_REPEAT: 'Пароли не совпадают',
			SAVE_PASS: 'Установить новый пароль'
		},

		SORT_OPTIONS: {
			AZ: 'A-Z',
			ZA: 'Z-A',
			NEWEST_ADDED: 'Самые последние',
			OLDEST_ADDED: 'Самые новые',
			NEWEST_RELEASED: 'Последние поступления',
			OLDEST_RELEASED: 'Старые поступления',
			NEWEST_AIRED: 'Самые новые',
			OLDEST_AIRED: 'Самые старые',
      NEWEST_REPORTED: 'Самые последние сообщения',
      OLDEST_REPORTED: 'Старое сообщение',
      NEWEST_UPDATED: 'Самые последние обновления',
      OLDEST_UPDATED: 'Последнее обновление'
		},

		FAQ: {
			UPLOAD_VIDEO: {
				TITLE: 'Как я могу загрузить видео?',
				TEXT: "Вы можете загружать видео, перейдя в меню «Управление». Выберите, что вы хотите загрузить: фильм, телешоу или другое видео. Выберите соответствующее подменю "+
               "в левой части экрана. Вы можете загрузить видео, нажав кнопку «Создать новый фильм / ТВ-шоу / другое видео или набрав" +
               "название видео, которое вы хотите загрузить в панель поиска, и выбрать соответствующий фильм из результатов поиска. После этого вы можете выбрать, как удобно добавить видео:" +
               "вводя всю информацию вручную, либо загружая свою информацию из базы TheMovieDB (автоматически), после чего вы можете загрузить видео и файлы субтитров, нажав кнопку «Управление»."
			},
			DELETE_VIDEO: {
				TITLE: 'Как мне удалить видео?',
				TEXT: "Вы можете удалить видео, перейдя на страницу информации о видео и нажав «Управление файлами» и выбрав красную иконку со значком мусорной корзины. Нажав «Изменить фильм» и выбрав "+
"Удалить фильм - это еще один способ сделать так. Вы также можете использовать Диспетчер файлов, который находится в меню «Управление». Вы можете увидеть все файлы, которые вы там загрузили. Нажмите" +
"красную иконку со значком мусорной корзины, чтобы удалить файл."
			},
			VIDEO_FORMATS: {
				TITLE: 'Какие форматы видео поддерживаются?',
				TEXT: "Streama поддерживает в настоящее время только те форматы видеофайлов, поддерживаемые проигрывателем стандарта HTML5. Вы можете проверить, совместим ли ваш видеофайл с HTML5-плеером,"+
				" перетащив ваш файл на пустую закладку в вашем браузере. Если видео откроется и начнет воспроизводиться, значит формат поддерживается."
			},
			SUBTITLES: {
				TITLE: 'Как добавить субтитры к видео?',
				TEXT: "Вы можете добавить субтитры к видео, нажав кнопку «Управление», которая находится на странице информации о видео. Вы можете перетащить туда файлы субтитров. "+
"Раньше вам приходилось вручную преобразовывать их в совместимый формат файла (WebVTT), мучаясь с перекодированием! Теперь приложение обрабатывает за вас весь рутинный процесс."
			},
			INVITE_USERS: {
				TITLE: 'Как я могу пригласить друзей посмотреть мои размещенные видео?',
				TEXT:"Вы можете поделиться своими видео с друзьями, предложив им просмотр на размещенном вами сайте с использованием Streama. Перейдите в меню «Пользователи» и нажмите «Пригласить пользователя». Заполните форму приглашения и "+
"выберите роль приглашенного пользователя. Пользователи с ролью Admin могут редактировать пункт «Пользователи и настройки». Пользователи с ролью Content Manager могут редактировать контент. Ваш друг будет извещен о" +
"приглашении по электронной почте. Вы также можете обмениваться видеосессиями с друзьями, нажав кнопку «Поделиться» видеопроигрывателя, связав URL-адрес сессии с ними."
			},
			BASE_URL: {
				TITLE: "Какой базовый URL-адрес Streama и как его настроить?",
				TEXT: "Базовый URL-адрес используется для воспроизведения видео и ссылки в приглашении по электронной почте."
			},
			NOTIFICATIONS: {
				TITLE: "Что такое уведомления?",
				TEXT: "Вы можете уведомить своих приглашенных друзей о новых загруженных видео, отправив им уведомления. Вы можете отправить их, добавляя в очередь уведомлений, нажав на кнопку "+
"«Добавить уведомлениe», которая находится на странице информации вашего видео, и перейти в меню «Уведомления», нажав кнопку «Отправить в очередь»."
			},
			VIDEO_PLAYER_SHORTCUTS: {
				TITLE: "Имеет ли видеоплеер сочетания клавиш?",
				TEXT: "Да. Пауза/Воспроизведение: пробел. Управление звуком: клавиши со стрелками вверх и вниз. Промотать видео вперед/назад: клавиши со стрелками влево и вправо. Длинная промотка:" +
				" Клавиша Ctrl  + клавиши со стрелками влево и вправо. Выключение/выключение полноэкранного режима: Клавиши Alt + Enter. Включение/выключение субтитров: клавиша S(«Ы»), Приглушение звука: M(«Ь»), Вернуться" +
				" к предыдущему экрану: клавиши Delete или Backspace."
			},
			FAVORITE_GENRES: {
				TITLE: "Как любимые жанры пользователя влияют на потоки?",
				TEXT: "В процессе..."
			},
			USEFUL_LINKS: {
				TITLE: "Полезные ссылки",
				TEXT: "Тоже в процессе..."
			}
		}
	});
}]);
})();
