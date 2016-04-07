/* eslint max-len:0 */

export default {
  mapPage: {
    searchBar: {
      searchButton: {
        label: 'Search'
      },
      searchLabel: 'tweet keywords',
      searchInput: {
        placeholder: 'search keywords'
      }
    },
    slidePanel: {
      header: 'Settings:',
      languageSelector: {
        label: 'Language'
      },
      clickRadius: {
        label: 'Cursor Click Radius in KM'
      },
      mapClick: {
        label: 'Enable Map Click'
      },
      showFilter: {
        label: 'Show Filter in Popup'
      },
      showTimeStamps: {
        label: 'Show Time Stamps in Popup'
      },
      footer1: 'Visualization tool to view tweets by location and content.',
      footer2: 'A product of collaboration between HealthMap.org (Boston Children&#39;s Hospital), Mozilla Science Lab and our community.'
    },
    dataPopup: {
      header: '%{smart_count} Tweet |||| %{smart_count} Tweets',
      noDataText: 'No Tweets Found'
    },
    toaster: {
      smallSearchString: 'Search string has to be at least %{smart_count} characters long',
      foundTweets: 'Found %{smart_count} tweets |||| Found %{smart_count} tweet'
    }
  }
};
