import React, { Component } from 'react';
import { myConfig } from '../../config.js';
import './WorkItem.css';

class WorkItem extends Component {
    render() {
      return (
          <div className="workitem">
              <div className="timeline">
                <div className="column">
                    <div className="title">
                        <h1> ID: 001 </h1>
                        <h2> Workplace widget should not show any posts that only contain an image  </h2>
                    </div>
                    <div className="description">
                        <p> In the existing logic the workplace feed fetches from the groups and while processing, it checks for content exists else remove the feed. So suppose while fetching the max post(4 feed) from the workplace and if it has 2 posts with content and other two posts as images. Then in the intranet workplace widget front end view you can see only two workplace posts.

                        Please find attachment for more clear understanding.</p>
                        <p> In the existing logic the workplace feed fetches from the groups and while processing, it checks for content exists else remove the feed. So suppose while fetching the max post(4 feed) from the workplace and if it has 2 posts with content and other two posts as images. Then in the intranet workplace widget front end view you can see only two workplace posts.

                        Please find attachment for more clear understanding.</p>
                        <p> In the existing logic the workplace feed fetches from the groups and while processing, it checks for content exists else remove the feed. So suppose while fetching the max post(4 feed) from the workplace and if it has 2 posts with content and other two posts as images. Then in the intranet workplace widget front end view you can see only two workplace posts.

                        Please find attachment for more clear understanding.</p>
                    </div>
                </div>
            </div>
          </div>
      );
    }
}
export default WorkItem;
