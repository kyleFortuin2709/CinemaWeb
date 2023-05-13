const {
   getBannerDetails,
   getComingSoonDetails,
   getNowShowingDetails,
   getNowShowingMovies,
   getComingSoonMovies,
   getFilters
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
        getComingSoonDetails(comingSoon)
      ]).then(([
        bannerData,
        nowShowingData,
        comingSoonData
      ])=> {
        const filters = getFilters(nowShowingData, comingSoonData)
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