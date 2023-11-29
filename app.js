//! PHILIPPIANS 4:13
//! I CAN DO ALL THINGS THROUGH CHRIST WHO STRENGTHENS ME.\

//* Search Function
function searchFunctionality() {
  //? get all necessary elements

  const searchTrigger = document.getElementById("searchTrigger");
  const searchInput = document.getElementById("inputSearch");

  //todo 1. An EventLister to Listen to click on the div element to automaticaly focus the input elemet.

  searchTrigger.addEventListener("click", () => {
    searchInput.focus();
  });

  //?  Function To Handle Logic
  const InputFocusHandler = () => {
    // Add a focus class to the div
    searchTrigger.classList.add("search-input-focused");
  };

  const InputBlurHandler = () => {
    // Remove the focus class from the div
    searchTrigger.classList.remove("search-input-focused");
  };

  //todo 2. An EventLister to listen to the focus on the input field to add a focus style to the div element

  searchInput.addEventListener("focus", InputFocusHandler);

  //todo 3. Remove the focus style from the div element when the user is not focus on the input element

  searchInput.addEventListener("blur", InputBlurHandler);
}

//! JEREMIAH 29:11
//! FOR I KNOW THE PLANS I HAVE FOR YOU, DECLARES THE LORD, PLANS FOR WELFARE AND NOT FOR EVIL, TO GIVE YOU A FUTURE AND A HOPE.

//* Notifiction Function
function notificationFunctionailty() {
  // Get all necessary elements
  const notificationButton = document.querySelector("#notification");
  const notificationContainer = document.querySelector("#notification-alert");
  let isExpanded = false;

  // Function to toggle the visibility of the container
  const toggleAlertContainer = () => {
    isExpanded = !isExpanded;
    notificationContainer.style.display = isExpanded ? "flex" : "none";
    notificationButton.setAttribute("aria-expanded", isExpanded.toString());
  };

  // Function to handle the notification button click
  function handleButtonClick(event) {
    event.stopPropagation();
    toggleAlertContainer();
    if (isExpanded) {
      notificationContainer.addEventListener(
        "keyup",
        handleCloseOnEscapeKeyPress
      );
    }
  }

  // Function to close the container when there is a focus inside the container
  const handleCloseOnEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      toggleAlertContainer();
      notificationButton.focus();
    }
  };

  // Function to close the container when clicking outside
  const closeAlertContainer = (event) => {
    if (
      isExpanded &&
      (event.key === "Escape" || event.target !== notificationButton) &&
      !notificationContainer.contains(event.target)
    ) {
      toggleAlertContainer();
      notificationButton.focus();
    }
  };

  // Add a click event listener to the notification button
  notificationButton.addEventListener("click", handleButtonClick);

  // Close the container when the user clicks on the document
  document.addEventListener("click", closeAlertContainer);
  document.addEventListener("keyup", closeAlertContainer);
}

//* Account Menu
function userAccountMenuFunctionality() {
  // get the menu trigger
  //get the menu
  const menuTigger = document.querySelector("#menuTrigger");
  const menu = document.querySelector("#profile-menu-content");
  const menuItems = menu.querySelectorAll('[role="menuitem"]');

  const closeMenu = () => {
    menuTigger.ariaExpanded = "false";
    menuTigger.focus();
  };

  const handleMenuItemArrowKeyPress = (event, menuItemIndex) => {
    // helpful variable: to check the current index of the menuitems
    //if it is the last
    const isLastMenuItem = menuItemIndex === menuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    // menu indicators
    const nextMenuItem = menuItems.item(menuItemIndex + 1);
    const PrevMenuItem = menuItems.item(menuItemIndex - 1);

    // if userPresses arrow down or right
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      // check is items is last
      if (isLastMenuItem) {
        menuItems.item(0).focus();
        return;
      }
      // then focus on the next item
      nextMenuItem.focus();
    }
    // check is user pressed arrow up or left
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      // check if current index is the fisrt item
      if (isFirstMenuItem) {
        menuItems.item(menuItems.length - 1).focus();
        return;
      }
      PrevMenuItem.focus();
    }
  };
  const openMenu = () => {
    menuTigger.ariaExpanded = "true";
    menuItems.item(0).focus();
    menu.addEventListener("keyup", handleCloseOnEscapeKeyPress);

    // add an event listiner to the menu items
    menuItems.forEach((item, menuItemIndex) => {
      item.addEventListener("keyup", (event) => {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  };
  // Function to toggle the visibility of the menu container
  const toggleProfileMenuContainer = () => {
    const isExpanded = menuTigger.attributes["aria-expanded"].value === "true";
    // add a display block to the menu
    menu.classList.toggle("menu-active");
    if (!isExpanded) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const handleCloseOnEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      toggleProfileMenuContainer();
      menuTigger.focus();
    }
  };

  // when the menu is clicked
  const handleButtonClick = (event) => {
    event.stopPropagation();
    toggleProfileMenuContainer();
  };

  const closeMenuContainer = (event) => {
    const isExpanded = menuTigger.getAttribute("aria-expanded") === "true";
    if (
      isExpanded &&
      (event.key === "Escape" || event.target !== menuTigger) &&
      !menu.contains(event.target)
    ) {
      toggleProfileMenuContainer();
      menuTigger.focus();
    }
  };
  // add an eventListerner to the menu trigger
  menuTigger.addEventListener("click", handleButtonClick);
  // Close the container when the user clicks on the document
  document.addEventListener("click", closeMenuContainer);
  document.addEventListener("keyup", closeMenuContainer);
}

//* onboarding logic
function onboardingFunctionality() {
  //get the cheron icons
  const chevronDown = document.querySelector("#chevronDown");
  const chevronUp = document.querySelector("#chevronUp");
  const button = document.querySelector("#chevron");
  const progress = document.getElementById("progress");
  const progressBar = document.getElementById("progress-bar");
  const todoContainer = document.querySelector("#onboarding-todolists");
  const checkButton = document.querySelectorAll("#checkboxButton");
  const allCheckBoxStatus = document.querySelectorAll("#checkbox-status");
  const HIDDEN_CLASS = "hidden";
  let isVisible = false;
  let isCompleted = "completed";
  // counter to track the progress
  let count = 0;
  // setting the progress
  progress.innerText = count;
  //hide
  const hideTodoList = () => {
    chevronDown.classList.remove(HIDDEN_CLASS);
    chevronUp.classList.add(HIDDEN_CLASS);
    button.ariaExpanded = false;
    todoContainer.classList.toggle("lists-hidden");
  };
  // show
  const showTodoList = () => {
    chevronDown.classList.add(HIDDEN_CLASS);
    chevronUp.classList.remove(HIDDEN_CLASS);
    button.ariaExpanded = true;
    todoContainer.classList.toggle("lists-hidden");
  };

  // time for God to take control, for i am the handmaid of the lord let it be done according to his word.

  // update the progress bar
  const updateProgressBar = () => {
    const baseWidth = 10;
    const progressPercentage = (count / checkButton.length) * 90;
    const finalWidth = baseWidth + progressPercentage;
    const constrainedWidth = Math.min(finalWidth, 100);
    progressBar.style.width = `${constrainedWidth}%`;
  };

  const handleCheckButtonClick = (button, buttonIndex) => {
    // get the elements
    const defaultCheckButton = checkButton
      .item(buttonIndex)
      .querySelector(".default-list-icon");
    const loadingCheckButton = checkButton
      .item(buttonIndex)
      .querySelector(".loading-spinner-icon");
    const completedCheckButton = checkButton
      .item(buttonIndex)
      .querySelector(".completed-icon");
    const checkBoxStatus = allCheckBoxStatus.item(buttonIndex);
    // increase count
    function increaseCount() {
      if (count < 5) {
        count++;
      }
      updateCountAndAria();
    }

    // decrease count
    function decreaseCount() {
      if (count > 0) {
        count--;
      }
      updateCountAndAria();
    }

    // update count and ARIA attributes
    function updateCountAndAria() {
      progress.innerText = count;
      progress.setAttribute("aria-valuenow", count);
      progress.setAttribute("aria-live", "polite");
    }

    const resetAriaLabelAsDone = () => {
      button.ariaLabel = button.ariaLabel.replace("as done", "as not done");
    };

    const resetAriaLabelAsNotDone = () => {
      button.ariaLabel = button.ariaLabel.replace("as not done", "as done");
    };

    const handleCheckButtonToggle = () => {
      // when i click on the checkList
      // get the index of the checkbox

      // get container for that checkbox
      const checkBoxContainer = todoContainer
        .querySelectorAll("li")
        .item(buttonIndex);
      const isExpanded =
        checkBoxContainer.classList.contains("list-guide-active");

      // it checks if it is expanded
      if (isExpanded) {
        const stepsButtons = document.querySelectorAll("#listTrigger");
        // Convert the NodeList to an array and filter check buttons without the class "completed"
        const incompleteCheckButtons = Array.from(checkButton).filter(
          (button) => !button.classList.contains("completed")
        );
        //check if the button index is the lastElement
        if (buttonIndex === stepsButtons.length - 1) {
        } else {
          stepsButtons.item(buttonIndex + 1).click();
        }
      }
      // if it is expanded
      // it closes it expanded container
      // look for the next element and expands it
      // if not expanded it does noting.
    };

    const handleCompleted = () => {
      defaultCheckButton.classList.add(HIDDEN_CLASS);
      loadingCheckButton.classList.remove(HIDDEN_CLASS);
      checkBoxStatus.ariaLabel = "Loading, Please wait...";
      button.disabled = true;
      // show the completed icon after 500ms
      setTimeout(() => {
        loadingCheckButton.classList.add(HIDDEN_CLASS);
        completedCheckButton.classList.remove(HIDDEN_CLASS);
        checkButton.item(buttonIndex).classList.add(isCompleted);
        increaseCount();
        updateProgressBar();
        resetAriaLabelAsDone();
        button.disabled = false;

        checkBoxStatus.ariaLabel = `Successful marked as done`;
        button.focus();
        handleCheckButtonToggle();
      }, 2000);
    };

    const handleNotCompleted = () => {
      completedCheckButton.classList.add(HIDDEN_CLASS);
      loadingCheckButton.classList.remove(HIDDEN_CLASS);

      checkBoxStatus.ariaLabel = "Loading, Please wait...";
      button.disabled = true;

      setTimeout(() => {
        loadingCheckButton.classList.add(HIDDEN_CLASS);
        defaultCheckButton.classList.remove(HIDDEN_CLASS);
        checkButton.item(buttonIndex).classList.remove(isCompleted);
        decreaseCount();
        updateProgressBar();
        button.disabled = false;
        resetAriaLabelAsNotDone();

        checkBoxStatus.ariaLabel = `Successful marked as not done`;
      }, 2000);
    };
    // handle if completed or not
    const markAsDone = checkButton
      .item(buttonIndex)
      .classList.contains("completed");

    if (markAsDone) {
      handleNotCompleted();
    } else {
      handleCompleted();
    }
  };

  const toggleTheDodoList = () => {
    isVisible = !isVisible;
    if (isVisible) {
      hideTodoList();
    } else {
      showTodoList();
    }
  };

  const handleToggleOnKeyPress = (event) => {
    if (event.key === "ArrowUp") {
      toggleTheDodoList();
    }
  };

  // add event listener to checkbox buttons
  // get the index  of the clicked button
  // create an anomnmous function
  checkButton.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
      handleCheckButtonClick(button, buttonIndex);
    });
  });
  button.addEventListener("click", toggleTheDodoList);
  button.addEventListener("keyup", (event) => handleToggleOnKeyPress(event));

  //
  OnboardingStepsFunctionality(todoContainer);
}

// On boarding step functionality
function OnboardingStepsFunctionality(todoContainer) {
  const stepsButtons = document.querySelectorAll("#listTrigger");
  const todoList = todoContainer.querySelectorAll("li");
  const HIDDEN_CLASS = "hidden";
  const toggleSteps = (stepButton, stepButtonIndex) => {
    //when i click on a button
    // get the container element of the button
    const stepList = todoList.item(stepButtonIndex);
    // check the state of the button container element clicked
    const activeList = stepList.classList.contains("list-guide-active");
    // if it active or not
    if (activeList) {
      // disable the button
      stepButton.disabled = true;
      // if active do noting
    } else {
      // if the list does not contain the active class
      // check for the list with the active class
      let activeElementInList =
        todoContainer.querySelector(".list-guide-active");
      if (activeElementInList) {
        // get all the necessary element
        const pTag = activeElementInList.querySelector(
          '[data-role="todo-text"]'
        );
        const aTag = activeElementInList.querySelector(
          '[data-role="todo-link"]'
        );
        const bTag = activeElementInList.querySelector("#listTrigger");
        activeElementInList.classList.remove("list-guide-active");
        // Close the active element
        pTag.classList.add(HIDDEN_CLASS);
        aTag.classList.add(HIDDEN_CLASS);
        // remove the disable attribut
        bTag.disabled = false;
      }
      // when it close then open clicked button
      setTimeout(() => {
        // add the active class
        const pTag = stepList.querySelector('[data-role="todo-text"]');
        const aTag = stepList.querySelector('[data-role="todo-link"]');
        stepList.classList.add("list-guide-active");
        pTag.classList.remove(HIDDEN_CLASS);
        aTag.classList.remove(HIDDEN_CLASS);
      }, 50);
    }
  };

  // add event listener for all the buttons
  stepsButtons.forEach((stepButton, stepButtonIndex) => {
    stepButton.addEventListener("click", () => {
      toggleSteps(stepButton, stepButtonIndex);
    });
  });
}

/**
 As a merchant, when I click on the dismiss button of the trial callout, the trial callout is immediately removed from the page.
 */
function removePricing() {
  const pricingContainer = document.querySelector(".pricing-plan");
  const closeButton = document.getElementById("close-pricing");
  const handleClose = () => {
    pricingContainer.style.display = "none";
  };
  closeButton.addEventListener("click", handleClose);
}
//chevron to show and hide the question
document.addEventListener("DOMContentLoaded", () => {
  notificationFunctionailty();
  searchFunctionality();
  userAccountMenuFunctionality();
  onboardingFunctionality();
  removePricing();
});
//! I Love Jesus
//! I CAN DO IT AND I WILL BE SUCESSFULL
