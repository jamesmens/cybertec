import { toast } from "react-toastify"
import { CubeSpinner } from "react-spinners-kit";
import { Type } from "react-bootstrap-icons";
export function saveEditorContent(convertToRaw, editorState) {
    const contentState = convertToRaw(editorState.getCurrentContent());
    const contentString = JSON.stringify(contentState);
    return contentString;
}

export const Showavater = (div) => {
    const container = document.getElementById(div);
    let scrollHeight = window.scrollY
    let condition = null
    window.addEventListener('scroll', function () {
        let scrollHeight = window.scrollY

        if (scrollHeight > 550) {

            if (container && container.classList) {
                condition = container.classList.contains("showprofile")
            }

            if (condition === false) {
                container.classList.add("showprofile")


            }

        }
        else if (scrollHeight < 550) {
            if (condition === true) {
                container.classList.remove("showprofile")

            }

        }

    });

}
export const Showtabs = (div) => {
    const container = document.getElementById(div);
    let scrollHeight = window.scrollY
    let condition = null
    window.addEventListener('scroll', function () {
        let scrollHeight = window.scrollY
        if (scrollHeight > 4) {
            if (container && container.classList) {
                condition = container.classList.contains("hidetabs")
            }

            if (condition === false) {
                container.classList.add("hidetabs")


            }
        }

        if (scrollHeight < 4) {
            if (condition === true) {
                container.classList.remove("hidetabs")

            }

        }

    });

}



export const showToastify = (type, message) => {

    switch (type) {
        case "SUCCESS":
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case "ERROR":
            toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT

            })
            break;
        default:
            return null

    }


}


export const Divloader = () => {
    return (
        <>
            <div className="divLoader_c">

                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
                <div className="divLoader">

                </div>
            </div>
        </>
    )
}




export const wordCapitalization = (word) => {
    let newword = ""
    newword = word.charAt(0).toUpperCase() + word.slice(1)
    return newword;
}

export const Highlighteffect = (id, div) => {
    const container = document.getElementById(id);
    const target = document.getElementById(div)
    container.addEventListener("mouseover", function (event) {
        target.classList.add("showbtn")
    });

    container.addEventListener("mouseout", function () {
        target.classList.remove("showbtn")
    });

}
export const ScrollEffects = (skill, contacts) => {

    window.addEventListener('scroll', function () {
        const contain = document.querySelectorAll(`.${skill}`)
        const contact = document.querySelectorAll(`.${contacts}`)
        contain.forEach(cont => {
            if (cont.scrollIntoView) {

                if (!(cont.classList.contains("positionEffect"))) {

                    cont.classList.add("positionEffect");


                }
            }
        })
        contact.forEach(cont => {
            if (cont.scrollIntoView) {

                if (!(cont.classList.contains("positionEffectup"))) {

                    cont.classList.add("positionEffectup");


                }
            }
        })


    })




}
export const onClickEffect = (divc) => {
    const container = document.getElementById(divc)

    container.classList.add("hoverbtnclick")


    container.addEventListener("mouseout", () => {
        container.classList.remove("hoverbtnclick")

    });

}

export const ScrollToDiv = (div) => {
    const container = document.getElementById(div)
    container.scrollIntoView({ behavior: "smooth" })

    // window.scrollTo(0, container.scrollHeight || document.documentElement.scrollHeight);
}

export const AccessContent = () => {



    const about = document.getElementById("abouts");
    const experi = document.getElementById("expeience");
    const works = document.getElementById("works");
    const contactme = document.getElementById("contactme");
    const tab1 = document.getElementById("about_id");
    const tab2 = document.getElementById("experience_id");
    const tab3 = document.getElementById("work_id");
    const tab4 = document.getElementById("contact_id");
    const progressb = document.querySelectorAll('.progressb')
    const lineAnim = document.querySelectorAll(".lineani");
    const lineAnimw = document.querySelectorAll(".lineAniw");
    const expbox = document.querySelectorAll('.l_experience_box');
   const Contenttab=document.querySelectorAll(".fix_contact_l");
   const lines=document.querySelectorAll(".lines")

    window.addEventListener("scroll", () => {
        var atop = about.getBoundingClientRect().top
        var abottom = about.getBoundingClientRect().bottom
        var etop = experi.getBoundingClientRect().top
        var ebottom = experi.getBoundingClientRect().bottom
        var wtop = works.getBoundingClientRect().top
        var wbottom = works.getBoundingClientRect().bottom
        var ctop = contactme.getBoundingClientRect().top
        var cbottom = contactme.getBoundingClientRect().bottom
       
        let topheight=atop+100
        if (topheight > window.innerHeight){
            Contenttab.forEach(div => {
                if ((div.classList.contains("Contenttab_show"))) {
                    div.classList.remove("Contenttab_show");
                }
            })
        }
        else{
            Contenttab.forEach(div => {
                if (!(div.classList.contains("Contenttab_show"))) {
                    div.classList.add("Contenttab_show");
                }
            })

        }
        if (atop < 100 && abottom > 160) {
            tab1.classList.add("spintab");
            progressb.forEach(div => {
                if (!(div.classList.contains("l_progressbarcount_show"))) {
                    div.classList.add("l_progressbarcount_show");
                }
            })
      
           
        }
        else {
            tab1.classList.remove("spintab");
        }
        if (etop < 100 && ebottom > 160) {
            tab2.classList.add("spintab");
            lineAnim.forEach(line => {
                if (!(line.classList.contains("lineAnim"))) {
                    line.classList.add("lineAnim");

                }


            })
            expbox.forEach(span => {
                if (!(span.classList.contains("expbox"))) {
                    span.classList.add("expbox");



                }

            })
        }
        else {
            tab2.classList.remove("spintab");
        }
        if (wtop < 140 && wbottom > 160) {
            tab3.classList.add("spintab");
            lineAnimw.forEach(line => {
                if (!(line.classList.contains("lineAnim"))) {
                    line.classList.add("lineAnimw");
                   
                }
            })
        }
        else {
            tab3.classList.remove("spintab");
        }
        if (ctop < 100 && cbottom > 160) {
            tab4.classList.add("spintab");
            lines.forEach(div=>{
                if(!(div.classList.contains("lines_width"))){
                    div.classList.add("lines_width")

                }

            })
        }
        else {
            tab4.classList.remove("spintab");
        }
    })
}



export const AnimationF = () => {

    const projectCon = document.querySelectorAll(".projectM");
    const skillData=document.querySelectorAll('.skillData');
    const l_stick_contact=document.getElementById("l_stick_contact")
if(l_stick_contact){
    if(!(l_stick_contact.classList.contains("l_showStcks"))){
        setTimeout(() =>{
            l_stick_contact.classList.add("l_showStcks");
        },3000)
    
    }
  
}
    window.addEventListener("scroll", () => {


        projectCon.forEach(div => {
            if (div.getBoundingClientRect().top  < window.innerHeight-150) {
                if (!(div.classList.contains("workshow_a"))) {
                    div.classList.add("workshow_a");

                }

            }


        })

    

        skillData.forEach(span => {
            if (span.getBoundingClientRect().top < window.innerHeight) {
                setInterval(()=>{
                if (!(span.classList.contains("skillDat"))) {
                    span.classList.add("skillDat");
                    span.classList.remove("skillData");

                }
                
            },200)

            }


        })


    }

    )
}
export const DivVisibility = (container) => {
    window.addEventListener('scroll', function () {
        var element = document.getElementById(container);
        var position = element.getBoundingClientRect();

        // checking whether fully visible
        if (position.top <= 5) {
            element.classList.add("skicky_btn")

        }
        else if (position.top >= 5) {
            element.classList.remove("skicky_btn");
        }


    });

}



export const CopyToboard = (id) => {


    const container = document.getElementById(id);
    const space = document.createRange();
    space.selectNode(container);

    const sections = window.getSelection();
    sections.removeAllRanges();
    sections.addRange(space);
    navigator.clipboard.writeText(container.textContent);

}


export const PromptText = () => {
    const cursorFollow = document.getElementById('cursor-follow');

    this.addEventListener('mousemove', e => {
        cursorFollow.style.display = 'block';
        cursorFollow.style.top = e.clientY + 'px';
        cursorFollow.style.left = e.clientX + 'px';
    });

    document.addEventListener('mouseout', e => {
        cursorFollow.style.display = 'none';
    });

}