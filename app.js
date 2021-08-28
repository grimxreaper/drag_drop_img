document.querySelectorAll(".dropBoxInput").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-box");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-box--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-box--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-box--over");
  });
});

function updateThumbnail(dropZoneElement, file) {
  let thumbnail = dropZoneElement.querySelector(".drop-box__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".dropBoxInstruction")) {
    dropZoneElement.querySelector(".dropBoxInstruction").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnail) {
    thumbnail = document.createElement("div");
    thumbnail.classList.add("drop-box__thumb");
    dropZoneElement.appendChild(thumbnail);
  }

  thumbnail.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnail.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnail.style.backgroundImage = null;
  }
}
