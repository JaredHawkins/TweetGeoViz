/* eslint max-len:0 */

export default {
  mapPage: {
    navBar: {
      leftMenuButton: {
        tooltip: {
          en: 'Show Left Menu Settings',
          es: 'Mostrar Ajustes del Menu Izquierdo',
          ru: 'Показать Меню Настроек'
        }
      },
      advancedMenuButton: {
        hideToolTip: {
          en: 'Hide Advanced Menu',
          es: 'Ocultar Menu Avanzado',
          ru: 'Показать Расширенный Поиск'
        },
        showToolTip: {
          en: 'Show Advanced Menu',
          es: 'Mostrar Menu Avanzado',
          ru: 'Спрятать Расширенный Поиск'
        }
      },
      startDate: {
        hintText: {
          en: 'Start Date',
          es: 'Fecha Inicial',
          ru: 'Начальная Дата'
        },
        tooltip: {
          en: 'Clear Start Date',
          es: 'Borrar Fecha Inicial',
          ru: 'Убрать Начальную Дату'
        }
      },
      endDate: {
        hintText: {
          en: 'End Date',
          es: 'Fecha Final',
          ru: 'Конечная Дата'
        },
        tooltip: {
          en: 'Clear End Date',
          es: 'Borrar Fecha Final',
          ru: 'Убрать Конечную Дату'
        }
      },
      searchButton: {
        label: {
          en: 'Search',
          es: 'Búsqueda',
          ru: 'Поиск'
        }
      },
      searchInput: {
        placeholder: {
          en: 'search keywords',
          es: 'buscar palabras clave',
          ru: 'поисковые ключевые слова'
        }
      }
    },
    slidePanel: {
      header: {
        en: 'Settings:',
        es: 'Ajustes',
        ru: 'Настройки'
      },
      layerSelector: {
        label: {
          en: 'geoJSON Layer',
          es: 'capa GeoJSON',
          ru: 'geoJSON слой'
        }
      },
      languageSelector: {
        label: {
          en: 'Language',
          es: 'Idioma',
          ru: 'Язык'
        }
      },
      clickRadius: {
        label: {
          en: 'Cursor Click Radius in KM',
          es: 'Click Radio del Cursor en KM',
          ru: 'Радиус Клика Мыши в КМ'
        }
      },
      mapClick: {
        label: {
          en: 'Enable Map Click',
          es: 'Habilitar Click en Mapa',
          ru: 'Разрешить Клик на Карте'
        }
      },
      showFilter: {
        label: {
          en: 'Show Filter in Popup',
          es: 'Mostrar Filtro en Popup',
          ru: 'Показывать Фильтр в Всплывающем Окне'
        }
      },
      showTimeStamps: {
        label: {
          en: 'Show Time Stamps in Popup',
          es: 'Mostrar Fecha y Hora en Popup',
          ru: 'Показывать Даты в Всплывающем Окне'
        }
      },
      footer1: {
        en: 'Visualization tool to view tweets by location and content.',
        es: 'Herramienta de visualización para ver los tweets por ubicación y contenido.',
        ru: 'Графический инструмент для просмотра tweets по местоположению и по содержанию.'
      },
      footer2: {
        en: 'A product of collaboration between HealthMap.org (Boston Children&#39;s Hospital), Mozilla Science Lab and our community.',
        es: 'Resultado de la colaboración entre HealthMap.org (Hospital de Niños de Boston), Mozilla Science Lab y nuestra comunidad.',
        ru: 'Продукт сотрудничества между HealthMap.org (Бостонской Детской Больницы), Mozilla Science Lab и нашего сообщества.'
      }
    },
    dataPopup: {
     header: {
        en: '%{smart_count} Tweet |||| %{smart_count} Tweets',
        es: '%{smart_count} Tweet |||| %{smart_count} Tweets',
        ru: '%{smart_count} Tweet |||| %{smart_count} Tweets'
      },
      noDataText: {
        en: 'No Tweets Found',
        es: 'No se encontraron Tweets',
        ru: 'Никакие Tweets не найдены'
      },
      closeButton: {
        tooltip: {
          en: 'Close Popup',
          es: 'Cerrar popup',
          ru: 'Закрыть Всплывающее Окно'
        }
      },
      filter: {
        hintText: {
          en: 'Filter Tweets...',
          es: 'Filtrar Tweets...',
          ru: 'Фильтровать Tweets...'
        }
      }
    },
    toaster: {
      smallSearchString: {
        en: 'Search string has to be at least %{smart_count} characters long',
        es: 'Cadena de Busqueda debe ser al menos %{smart_count} caracteres de largo',
        ru: 'Поисковая строка должна быть как минимум %{smart_count} символов'
      },
      foundTweets: {
        en: 'Found %{smart_count} tweet |||| Found %{smart_count} tweets',
        es: 'Encontrados %{smart_count} tweet |||| Encontrados %{smart_count} tweets',
        ru: 'Найден %{smart_count} tweet |||| Найдено %{smart_count} tweets'
      }
    }
  },
  notFoundPage: {
    header: {
      en: 'Page Not Found',
      es: 'Pagina no encontrada',
      ru: 'Страница не найдена'
    },
    body: {
      en: 'Whoops! Sorry, there is nothing to see here.',
      es: 'Oh! Lo siento, no hay nada que ver aqui.',
      ru: 'Ох! Просим прощения, но здесь ничего нет.'
    }
  }
};
