const {assert} = require('chai');

describe('visiting /', () => {
  describe('when there are no videos', () => {
    it('the videos container should be empty', () => {
      browser.url('/');

      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('when there are some videos created', () => {
    it('it display the information of the created videos', () => {
      const title = 'Some existing title';
      const description = 'Some existing description';
      const videoUrl = 'https>//example.com/video';

      browser.url('/videos/create');
      browser.setValue('#url-input', videoUrl);
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.click('#submit-video-btn');
      browser.url('/');

      assert.include(browser.getText('#videos-container'), title);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), videoUrl);
    });
  });
});
