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
    const [video, setVideo] = useState<ILesson>();
    const getVideo = async () => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
            };
    
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:5500/api/video/"+lessonId,
                headers: config_header,
            };
    
            const videoResponse = await axios.request(config);
            setVideo(videoResponse.data);
        } catch (error) {
            console.error("Error fetching get video:", error);
        }
    };

    
    useEffect(() => {
        getVideo();
    }, []);
    return(
        <div>
            {video && `http://localhost:5500/api/caption?path=${video.en}`}
            {video ? (
                <>
                
                <video id="videoPlayer" controls>

                    <source src={`http://localhost:5500/api/video?path=${video.file}`} type="video/mp4"/>
                    {video.en && (
                            <track
                                kind="captions"
                                //src={`http://localhost:5500/api/caption?path=${video.en}`}
                                src = "C:/Users/Dell/Desktop/watch-video-web/Client/watch-video-course/caption/001 Technical requirements_en.vtt"
                                srcLang="en"
                                label="English"
                                
                           />
                    )}
                </video>

                </>
            ) : (
                <p>Loading...</p>
            )}
            
              
        </div>
    )
}

export default LessonVideo;
