import React, { useEffect, useState } from "react";
const LessonVideo =() => {
    const url = window.location.href.split('/');
    const lessonId = url[url.length -1];
    return(
        <div>
            {lessonId ? (
                <>
                
                <video id="videoPlayer" controls>

                    <source src={`${process.env.REACT_APP_API_URL}/play_video?id=${lessonId}`} type="video/mp4"/>
                    
                </video>

                </>
            ) : (
                <p>Loading...</p>
            )}
            
              
        </div>
    )
}

export default LessonVideo;
