let isDes = true;

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].split('');
    str[i][0] = str[i][0].toUpperCase();
    str[i] = str[i].join('');
  }
  return str.join(' ');
};

function strDes(a, b) {
  if (a.title > b.title) return -1;
  else if (a.title < b.title) return 1;
  else return 0;
};

function strAsc(a, b) {
  if (a.title > b.title) return 1;
  else if (a.title < b.title) return -1;
  else return 0;
}

function loadData(value) {
  $.getJSON("data.json", function(data) {
    $.each(data, function(i, img) {
      img.title = titleCase(img.title);
    });
    if (value === 1) {
      data.sort(strDes);
    } else {
      data.sort(strAsc)
    };
    $.each(data, function(i, img) {
      if (img.is_published) {
        let description, title;
        if (img.description.length > 200) {
          description = img.description.slice(0, 199) + '...';
        } else {
          description = img.description;
        }
        title = img.title;
        let ImageBox = "<div class='image-card'>" +
          "<img src='images/" + img.image_name +
          " ' ><p class='image-text'>" +
          title + "</p><hr><p class='image-description' >" +
          description + "</p>" +
          "<div class='img-icons'>" + "<i class='material-icons md-36 md-dark'>favorite</i>" +
          "<i class='material-icons md-36 md-dark'>grade</i></div>" + "</div>"

        $(ImageBox).appendTo($(".image-content"));
      }
    });
  });
}

function updateImageContent() {
  $(".image-content").load("http://localhost:8888/AJAX/index.html" + " .image-content");
}

$(document).ready(function() {
  loadData(1);
  $(document).on("click", ".sort", function() {
    if (isDes == true) {
      updateImageContent();
      $(document).ready(function() {
        loadData(2);
        isDes = false;
      });
    }
    if (isDes == false) {
      updateImageContent();
      $(document).ready(function() {
        loadData(1);
        isDes = true;
      });
    }
  });
  $(window).scroll(function() {
    if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
      if (isDes) {
        loadData(1);
      } else {
        loadData(2);
      }
    }
  });
});
