import React from "react";
import { redirect, useRouter } from "next/navigation";

const VideosbuttonsListArea = ({ data }) => {

    const router = useRouter();
    const { buttonList } = data;
    const ButtonItem = Array.isArray(buttonList) ? buttonList.slice(0, 8) : null;
    return (
        <>
            <div className="container button-block mb-5" >
                 <div className="row mb-5">
  <div className="col-12 col-md-8">
    <h1>Latest insights & updates</h1>
  </div>
  <div className="col-12 col-md-4 mt-2 mt-md-1">
    <p>
      Keep up with all our latest news. Check out articles, download
      reports, listen to our podcast or get information about events.
    </p>
  </div>
 
</div>


                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {ButtonItem != null
                                ? ButtonItem.map(({ name, url }, i) => (
                                    <button
                                        key={i + "button"}
                                        className="btn btn-light btn-custom-filters mt-1 ms-2 p-2"
                                        onClick={() => router.push(`/${url}`)}
                                    >{name}</button>
                                )
                                )
                                : null}
                        </div>
                    </div >
                </div>
            </div>
        </>
    );
};
export default VideosbuttonsListArea;