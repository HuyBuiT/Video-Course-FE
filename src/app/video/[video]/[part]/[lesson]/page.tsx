 "use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player"

interface ILesson{
    _id?: string
    name: string;
    file: string;
    en?: string;
    vn?:string;
}
const LessonVideo =({params}: {params:{lesson:string}}) => {
    const lessonId = params.lesson
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
