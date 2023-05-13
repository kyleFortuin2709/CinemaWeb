const {
   getBannerDetails,
   getComingSoonDetails,
   getNowShowingDetails,
   getNowShowingMovies,
   getComingSoonMovies,
   getFilters,
   getShows
} = require('./home.service');

module.exports.homeController = {
  getHomePageDetails: () => {
    return Promise.all([
      getNowShowingMovies(),
      getComingSoonMovies()
    ]).then(([nowShowing, comingSoon]) => {
      const bannerShows = nowShowing.slice(0, 3)
      return Promise.all([
        getBannerDetails(bannerShows),
        getNowShowingDetails(nowShowing),
        getComingSoonDetails(comingSoon),
        getShows()
      ]).then(([
        bannerData,
        nowShowingData,
        comingSoonData,
        shows
      ])=> {
        const filters = getFilters(nowShowingData, comingSoonData, shows)
        return {
          filters,
          bannerData,
          nowShowingData,
          comingSoonData
        };
      });

    })
  }
}