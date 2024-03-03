import React, { useEffect, useState } from "react";

const LessonVideo =() => {
    const url = window.location.href.split('/');
    const lessonId = url[url.length -1];
    return(
        <div>
            {lessonId ? (
                <>
                
                <video id="videoPlayer" controls>

                    <source src={`http://localhost:5500/api/play_video?id=${lessonId}`} type="video/mp4"/>
                    
                </video>

                </>
            ) : (
                <p>Loading...</p>
            )}
            
              
        </div>
    )
}

export default LessonVideo;
