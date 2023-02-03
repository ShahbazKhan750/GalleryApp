let addimg=document.querySelector("#add");
let imglistcontainer=document.querySelector(".img-list-container");
let parentimg=document.querySelector(".parent-img");
let left=document.querySelector("#left");
let right=document.querySelector("#right");
let DeleteIcon=document.querySelector("#delete");
//let rightcheck=document.querySelector("#rightarr");
let imgsArr=[];
let uniqueIdentifier=0;


addimg.addEventListener("click",function(){
    let imglink=prompt("please enter the image url");
    if(imglink==null || imglink==""){
        alert("please enter the image url");
           return;
    }

    addimageTolistandShow(imglink);
});

function addimageTolistandShow(imglink){
    //listimg
    let previewimg=document.createElement("img");
    previewimg.setAttribute("src",imglink);
    previewimg.setAttribute("cid",uniqueIdentifier);
    previewimg.setAttribute("class","img-preview");
    imglistcontainer.appendChild(previewimg);

    //imgshow
      
    setShowImage(imglink,uniqueIdentifier);

     //to enable image changes on click

     handleImageFunctionality(uniqueIdentifier,imglink,previewimg);

     uniqueIdentifier++;
}

function handleImageFunctionality(uniqueIdentifier,imglink,previewimg){
    let imgindentifierObj={
        cid:uniqueIdentifier,
        url:imglink
    }

    imgsArr.push(imgindentifierObj);

    previewimg.addEventListener("click",function(){
        let CImgid=previewimg.getAttribute("cid");
        let Cimgsrc=previewimg.getAttribute("src");

        setShowImage(Cimgsrc,uniqueIdentifier);
    });
}

function setShowImage(imglink,uniqueIdentifier){
   
    let innerHtmlBlock=`<img class="img-final"  src=${imglink}  cid=${uniqueIdentifier}> `
     

     parentimg.innerHTML=innerHtmlBlock; 
}

right.addEventListener("click",function(e){
    if(parentimg.children.length!=0){
        let cshowimg=parentimg.children[0];
        let cid=cshowimg.getAttribute("cid");

        for(let i=0;i<imgsArr.length;i++){
            let imgDescObj=imgsArr[i];
            if(cid==imgDescObj.cid){
                let nextidx=(i+1)%imgsArr.length;
                let newimgobj=imgsArr[nextidx];

                setShowImage(newimgobj.url,newimgobj.cid);

                return;
            }
        }
    }
});

left.addEventListener("click",function(e){
    if(parentimg.children.length!=0){
        let cshowimg=parentimg.children[0];
        let cid=cshowimg.getAttribute("cid");

        for(let i=0;i<imgsArr.length;i++){
            let imgDescObj=imgsArr[i];
            if(cid==imgDescObj.cid){
                let nextidx=(i-1)%imgsArr.length;
                let newimgobj=imgsArr[nextidx];

                setShowImage(newimgobj.url,newimgobj.cid);

                return;
            }
        }
    }
});

DeleteIcon.addEventListener("click",function(){
    if(parentimg.children.length!=0){
        let cshowimg=parentimg.children[0];
        let cid=cshowimg.getAttribute("cid");

        removeImage(cid);
    }  
    else{
        alert("No image to delete");
    }
});

function removeImage(cid){
    parentimg.children[0].remove();

    //preview remove
    let previewchildrens=imglistcontainer.children;
    for(let i=0;i<previewchildrens;i++){
        let cCid=previewchildrens[i].getAttribute(cid);
        if(cCid==cid){
            previewchildrens[i].remove();
            break;
        }
    }

    for(let i=0;i<imgsArr.length;i++){
        let imgDescObj=imgsArr[i];
        if(imgDescObj.cid==cid){
            imgsArr.splice(i,1);
            break;
        }
    }
}

