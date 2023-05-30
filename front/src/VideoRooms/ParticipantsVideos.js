import React from "react";
import { useSelector } from "react-redux";
import Video from "./Video";
import VideoRoomButtons from "./VideoRoomButtons";

const ParticipantsVideos = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const localStream = useSelector((state) => state.videoRooms.localStream);
  const remoteStream = useSelector((state) => state.videoRooms.remoteStream);
  const isMicOn = useSelector((state) => state.videoRooms.isMicOn);

  return (
    <div className="map_page_v_rooms_videos_container">
      {inRoom && <VideoRoomButtons inRoom={inRoom} />}
      {inRoom && localStream && <Video stream={localStream} muted={!isMicOn} />}
      {inRoom && remoteStream && <Video stream={remoteStream} />}
    </div>
  );
};

export default ParticipantsVideos;
