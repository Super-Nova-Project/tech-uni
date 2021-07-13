import React from "react";
import "./Footer.scss";
// import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
function Footer() {
  return (
    <div>

      <section className="section footer">

        {/* <div className="s-wave">
          <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcc6e3a8cfd6631cbf66546_grey-s-wave-top-wide.svg" alt="" className="s-wave-image" />
        </div> */}
        {/* <div className="footer__padding"></div> */}

        <div className="continer">
         
          <div className="row">
            <div className="col-md-4">
              <h6>Eraser. For Education</h6>
              <p className=" mb-1">
                It is an online education website that will help the educational
                process to be easy and safe due to the COVID-19 situation.
              </p>
            </div>
            <div className="col-md-4">

              <div className="hrsc" />
              <div className="socialIcons">
                <Box>
                  <a href="https://github.com/Super-Nova-Project"><GitHubIcon /></a>
                  <a><TwitterIcon /></a>
                  <a><YouTubeIcon /></a>
                  <a><FacebookIcon /></a>
                </Box>
              </div>
            </div>
            {/* ------------------------------------------ */}
            <div className="col-md-4 ">
            <div className="hrsc1"/>
              <h6>Contact Information</h6>
              <div>
                <p className="mb-1"> 7th circle , Amman , Jordan</p>
              </div>
              <div>
                <p className="mb-1">+962 799-581-288</p>
              </div>
              <div>
                <p className="mb-1">+962 - 796-663-286 </p>
              </div>
              <div>
                <p className="mb-1">eraser@gmail.com </p>
              </div>
            </div>
          </div>
          <div class="footer-bg">
          <div className="gray-bg">
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd75de3bec651aa532853d_gr-big-l-c-1.svg" alt="" className="gr-big-l-c-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd75d5bfc31d2d278077f4_gr-big-l-b-1.svg" alt="" className="gr-big-l-b-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcc78e08be617f470968675_yl-ft-big-center-center-2.svg" alt="" className="gr-big-l-t-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7aa805abdc97c250ab7b_gr-big-r-b-1.svg" alt="" className="gr-big-r-b-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7ab9137dcb1a4e2b2a6d_gr-big-r-c-1.svg" alt="" className="gr-big-r-c-1 size " />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7ac8137dcb11c02b2ab3_gr-sm-b-c-1.svg" alt="" className="gr-sm-b-c-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7ad33bec656fd832d64e_gr-sm-c-m-1.svg" alt="" className="gr-sm-c-m-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7b06137dcbee8d2b2d61_gr-sm-l-b-1.svg" alt="" className="gr-sm-l-b-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7b2de221b6000cfcc802_gr-sm-l-c-1.svg" alt="" className="gr-sm-l-c-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7b191b8bff50373e7844_gr-sm-r-c-1.svg" alt="" className="gr-sm-r-c-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcd7b44137dcb4a852b2e21_gr-sm-r-c-1-1.svg" alt="" className="gr-sm-r-c-1-1 size" />
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcc5db2e31d38e595b6d85b_hero-ai-3.svg" alt="" className="gr-sm-r-t-1 size" />
          </div>
            <img src="https://assets.website-files.com/5dbaec16f510ee7b1c0004d6/5dcc6521881da452dbe6e7d1_footer-wave-nice.svg" alt="" class="bg-image bg-image--footer" />
          </div>
        </div>

      </section>
    </div>

  );
}

export default Footer;
