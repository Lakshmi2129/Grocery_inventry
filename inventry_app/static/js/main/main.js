/**
 * getCookie function decodes the cookie value to replace  CSRF token
 * @param {string} name
 * @return {string} [decoded cookie value]
 */
 function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(
          cookie.substring(name.length + 1)
        )
        break
      }
    }
  }
  return cookieValue
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
access();
/**
 * access function Restrict the user with theri permissions
 * @returns {void}
 */
function access() {
  $.get('profile-api', (res) => {
    if (res.length != 0) {
      var name = res[0].display_name
      var ele = `<div>
        <img class="user-profile m-0" src="${res[0].profile_image}" alt="">
    </div>
    <div class="user-name-role d-block mx-3">
        <div class="bolder">
        ${name}
        </div>
        <div class="user-role" id="role_display">

        </div>
    </div>
  `
  $("#user-name").html(ele)
  }

  })

  // $.get('userRoleAllow', function (res) {
  //   role = ''
  //   user_name = res['cUserName']

  //   $('#user_name_display').html(user_name)
  //   if (res.roles.is_superuser == true && res.roles.is_staff == true && res.roles.is_active == true) {
  //     role += 'Super Admin'

  //   } else if (res.roles.is_superuser == false && res.roles.is_staff == true && res.roles.is_active == true) {
  //     role += 'Manager'

  //   } else if (res.roles.is_superuser == false && res.roles.is_staff == false && res.roles.is_active == true) {
  //     role += 'User'
  //   }

  //   $('#role_display').html(role)
  // })
}

$(document).ready(function () {
  $.get('userRoleAllow', function (res) {
    // console.log(res)
    user_name = res['username']
    role = ''

    $('#user_name_display').html(user_name)
    if (res.superadmin == true && res.manager == true && res.user == true) {
      role += 'Super Admin'

    } else if (res.superadmin == false && res.manager == true && res.user == true) {
      role += 'Manager'

    } else if (res.superadmin == false && res.manager == false && res.user == true) {
      role += 'User'
    }

    $('#role_display').html(role)
    $('#user_name_display').html(user_name)
  })

  
  $("body").click
    (
      function (e) {
        if (e.target.className != "mdi mdi-bell") {
          $(".notification-wrap").removeClass("notify-active")

        }


      }
    );




  $('[data-toggle="minimize"]').on("click", function () {
    $("#logo_img").toggleClass("d-none")
    $("#blogo").toggleClass("d-none")
    $("#cicon").toggleClass("d-block")
  })
  $("#color_change").submit(function (evt) {
    evt.preventDefault();
    var formData = new FormData($(this)[0]);
    $.ajax({
      url: 'colorOptions',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: 'multipart/form-data',
      processData: false,
      success: function (response) {
        getColor()
      }
    });
    return false;





  });


  jQuery.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (
        settings.type.toUpperCase() == "POST" ||
        settings.type.toUpperCase() == "GET" ||
        settings.type.toUpperCase() == "PUT" ||
        settings.type.toUpperCase() == "DELETE"
      ) {
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
      }
    }
  })


  jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });

});

$("#notification").html(``)

$(document).ready(function () {
  
  jQuery.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (
        settings.type.toUpperCase() == "POST" ||
        settings.type.toUpperCase() == "GET" ||
        settings.type.toUpperCase() == "PUT" ||
        settings.type.toUpperCase() == "DELETE"
      ) {
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
      }
    }
  })

  jQuery.each(["put", "delete"], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });

});

access()
function access() {
  $.get('profile-api', (res) => {
    if (res.length != 0) {
      var name = res[0].display_name
      var ele = `<div>
        <img class="user-profile m-0" src="${res[0].profile_image}" alt="">
    </div>
    <div class="user-name-role d-block mx-3">
        <div class="bolder">
        ${name}
        </div>
        <div class="user-role" id="role_display">

        </div>
    </div>
  `
  $("#user-name").html(ele)
  }

  })
}


// test
// Instance the tour
// var tour = new Tour({
//   steps: [
 
//   {
//     element: "#video_img",
//     title: "Title of my step",
//     content: "Content of my step"
//   }
// ]});

// // Initialize the tour
// tour.init();

// // Start the tour
// tour.start();
// // test end

// tourguide..............



// // shepherd
// const tour = new Shepherd.Tour({
//   defaultStepOptions: {
//     cancelIcon: {
//       enabled: true
//     },
//     classes: 'class-1 class-2',
//     scrollTo: { behavior: 'smooth', block: 'center' }
//   }
// });

// tour.addStep({
//   title: 'Creating a Shepherd Tour',
//   text: `Creating a Shepherd tour is easy. too!\
//   Just create a \`Tour\` instance, and add as many steps as you want.`,
//   attachTo: {
//     element: '.hero-example',
//     on: 'top'
//   },
//   buttons: [
//     {
//       action() {
//         return this.back();
//       },
//       classes: 'shepherd-button-secondary',
//       text: 'Back'
//     },
//     {
//       action() {
//         return this.next();
//       },
//       text: 'Next'
//     }
//   ],
//   id: 'creating'
// });

// tour.start();