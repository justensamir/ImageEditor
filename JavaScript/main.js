// get Filters
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

// get Upload, download and reset buttons 
let uploadBtn = document.getElementById("upload");
let downloadBtn = document.getElementById("download");
let resetBtn = document.querySelector('span');

// get image 
let image = document.getElementById("img");
let imgBox = document.querySelector(".img-box");

//get container
let container = document.querySelector('.container');
// get canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

window.onload = function() {
    downloadBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    imgBox.style.visibility = 'hidden';
}

uploadBtn.onchange = function() {
    reset();
    downloadBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    imgBox.style.visibility = 'visible';
    let file = new FileReader();
    file.readAsDataURL(uploadBtn.files[0]);
    file.onload = function(){
        image.setAttribute('src',file.result);
    }
    // copy image to canvas
    image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image,0,0,canvas.width, canvas.height);
        image.style.display = 'none';
    }
}

// resetBtn.onclick = function() {
//     downloadBtn.style.display = 'none';
//     resetBtn.style.display = 'none';
//     image.setAttribute('src','');
//     imgBox.style.display = 'none';
// }

// get all filters
let filters = document.querySelectorAll("ul li input");

// let output = document.querySelector('output');
filters.forEach( filter => {
    filter.addEventListener('input',function(){
        ctx.drawImage(image,0,0,canvas.width, canvas.height);
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
        // output.innerHTML = `${saturate.value}`;
    })
});

function reset(){
    image.style.filter = 'none';
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
}

downloadBtn.onclick = function(){
    downloadBtn.href = canvas.toDataURL();
}

let lightMood = document.querySelector('.fa-sun');
let darkMood = document.querySelector('.fa-moon');
let uploadLabel = document.querySelector('.upload label');
let filtersLabels = document.querySelectorAll('label');

lightMood.onclick = function(){
    document.body.style.backgroundColor = '#FAF9F6';
    container.classList.add('light-mood');
    uploadLabel.className = 'light-upload';
    
    for(let i=0; i<filtersLabels.length;i++){
        filtersLabels[i].style.color = '#000';
    }
}

darkMood.onclick = function(){
    document.body.style.backgroundColor = '#333';
    container.classList.remove('light-mood');
    uploadLabel.className = 'dark-upload';
    for(let i=0; i<filtersLabels.length;i++){
        filtersLabels[i].style.color = '#fff';
    }
}
