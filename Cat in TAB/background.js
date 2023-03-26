/* global chrome */
/* global firebase */
var firebaseConfig = {
  apiKey: "AIzaSyDu1AkGGjWmoInQVkn_mfz-YGpLEQsrK2U",
  authDomain: "tabextend.firebaseapp.com",
  databaseURL: "https://tabextend.firebaseio.com",
  projectId: "tabextend",
  storageBucket: "tabextend.appspot.com",
  messagingSenderId: "182574072812",
  appId: "1:182574072812:web:eb3e886319348d98da76c9",
  measurementId: "G-64GK0X0LJB",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
// ? Current version
let newTabs = {};
let tabGroups = {};
let unsubscribe;
var provider = new firebase.auth.GoogleAuthProvider();

let db = firebase.firestore();
let urlPattern = ["https://*/*", "http://*/*"];
//Chrome
let extensionUrl = "chrome-extension://ffikidnnejmibopbgbelephlpigeniph/index.html";
let _on = false;
let blockToastClose = false;
//Edge
//let extensionUrl = "chrome-extension://afddlgcjhdhkgimldgmppegmnbmogolg/index.html";

firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .then(function () {
    console.log("Offline persistence enabled");
  })
  .catch(function (err) {
    console.log("failed to enable offline peristence");
  });

// Util/helper
function debounce(func, timeout) {
  let timer;
  return (...args) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 1200);
  };
}
/*
// Util/helper
 async function getFromLocal(key) {
  return new Promise((resolve, reject) => {
      try {
          chrome.storage.local.get(key, function (value) {
              resolve(value);
          })
      }
      catch (ex) {
          reject(ex);
      }
  });
}

// Util/helper
const saveToLocal = (key, data) => {
    let dataToSave = { [key]: data }
    chrome.storage.local.set(dataToSave, function() {
      console.log("Saved to local:", key, "data:", data)
    });
} */

// Listen for clicks to the extension icon
chrome.browserAction.onClicked.addListener((tab) => {
  _on ? disable(tab) : enable(tab);
  _on = !_on;
  /* chrome.tabs.create({
    url: "chrome://newtab",
  }); */
  // chrome.tabs.create({ url: "/index.html" });
});

// authstuff: if user is not signed in -> sign them in anonymously + setFirstTimeData
let initialDataUnsub = firebase.auth().onAuthStateChanged(function (user) {
  console.log("onAuthStateChanged init run, users: ", user);
  if (user) {
    setupListener();
    if (initialDataUnsub) {
      console.log("unsubb onAuthState init listener");
      initialDataUnsub();
    }
  } else {
    console.log("No user logged in on init");
    if (initialDataUnsub) {
      console.log("unsubb onAuthState init listener");
      initialDataUnsub();
    }
  }
});

const setInitialData = (email, userId) => {
  let userData = { name: "", email: email, userPlan: "tour" };
  //const userId = await getFromLocal("userId");
  //var userId = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(userId)
    .set(
      {
        userId,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        browser: "Chrome, 1.9.2",
        extended: false,
        workspaces: [
          {
            name: "Workspace 1",
            catLength: 3,
            id: "1",
            emoji: "📒",
            catData: [
              { id: "1", name: "Quicklinks", tabIndex: 0 },
              { id: "2", name: "Read later", tabIndex: 1 },
              { id: "3", name: "Tools", tabIndex: 2 },
            ],
          },
        ],
        ...userData,
      },
      { merge: true }
    )
    .then(function () {
      db.collection("items")
        .doc(userId)
        .set({
          WSid: "1",
          workspace: true,
          owner: userId,
          lastTypeUpdated: "initData",
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          categories: [
            { id: "1", name: "Quicklinks", tabIndex: 0 },
            { id: "2", name: "Read later", tabIndex: 1 },
            { id: "3", name: "Tools", tabIndex: 2 },
          ],
          userInfo: {
            itemsSaved: 0,
          },
          tabData: [],
        })
        .then(function (docRef) {})
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 16);
        });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 17);
    });
};

const updateUserEmail = (data) => {
  let newEmail = data.email;
  var userId = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(userId)
    .set({ email: newEmail }, { merge: true })
    .then(function () {
      db.collection("users")
        .doc(userId)
        .get()
        .then(function (doc) {
          let userData = doc.data();
          chrome.tabs.query(
            {
              url: ["chrome://newtab/", extensionUrl],
            },
            function (tab) {
              tab.forEach((tab) =>
                chrome.tabs.sendMessage(tab.id, {
                  msg: "newUserData",
                  userData: userData,
                })
              );
            }
          );
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 19);
        });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 20);
    });
};

const updateUserDataFromApp = (data) => {
  let newUserData = data;
  var userId = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(userId)
    .set(newUserData, { merge: true })
    .then(function () {})
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode);
    });
};

// ? Add Context menu on install
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "Save to:",
    id: "saveTo",
    contexts: ["all"],
    documentUrlPatterns: urlPattern,
  });
  chrome.contextMenus.create({
    title: "Close site and save to:",
    id: "closeNsave",
    contexts: ["all"],
    documentUrlPatterns: urlPattern,
  });
  chrome.contextMenus.create({
    title: "Add text-selection to group:",
    id: "textSelection",
    contexts: ["selection"],
    documentUrlPatterns: urlPattern,
  });
  chrome.contextMenus.create({
    id: "noSpaces",
    title: "Create a group in tabExtend",
    contexts: ["selection"],
    parentId: "textSelection",
    enabled: false,
    documentUrlPatterns: urlPattern,
  });
});

// ? Context with spaces
const updateContextMenu = (data) => {
  chrome.contextMenus.removeAll(function () {});
  chrome.contextMenus.create({
    title: "Add text-selection to group:",
    id: "textSelection",
    contexts: ["selection"],
    documentUrlPatterns: urlPattern,
  });
  chrome.contextMenus.create({
    title: "Save to:",
    id: "saveTo",
    contexts: ["all"],
    documentUrlPatterns: urlPattern,
  });
  chrome.contextMenus.create({
    title: "Close site and save to:",
    id: "closeNsave",
    contexts: ["all"],
    documentUrlPatterns: urlPattern,
  });
  if (data.tabData !== undefined) {
    //låser ner save när ld är true
    let enabled = !data.trailLimitReached;
    //Filtrerar public shared groups
    let filteredCat = data.categories.filter((cat) => cat.shared !== true);
    filteredCat.map((c, index) => {
      return chrome.contextMenus.create({
        id: c.id,
        title: c.name.length > 0 ? c.name : "Untitled",
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: "saveTo",
      });
    });
    filteredCat.map((c, index) => {
      return chrome.contextMenus.create({
        id: "close" + c.id,
        title: c.name.length > 0 ? c.name : "Untitled",
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: "closeNsave",
      });
    });

    //Menyer för alla groups med cat.id som parentId
    data.tabData.map((m, index) => {
      let parentCategory = m.categoryID;
      let emojiToShow = m.emoji.length > 10 ? " ◩ " : m.emoji;
      return chrome.contextMenus.create({
        id: "i" + index,
        title: emojiToShow + " " + m.title,
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: parentCategory,
        enabled: enabled,
      });
    });

    data.tabData.map((m, index) => {
      let parentCategory = "close" + m.categoryID;
      let emojiToShow = m.emoji.length > 10 ? " ◩ " : m.emoji;
      return chrome.contextMenus.create({
        id: "c" + index,
        title: emojiToShow + " " + m.title,
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: parentCategory,
        enabled: enabled,
      });
    });
    //Skapar createNewGroup för varje categorie
    filteredCat.map((c, index) => {
      return chrome.contextMenus.create({
        id: "newSpace" + c.id,
        title: "＋ New group",
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: c.id,
        enabled: enabled,
      });
    });
    filteredCat.map((c, index) => {
      return chrome.contextMenus.create({
        id: "newAndClose" + c.id,
        title: "＋ New group",
        contexts: ["all"],
        documentUrlPatterns: urlPattern,
        parentId: "close" + c.id,
        enabled: enabled,
      });
    });
    data.tabData.map((m, index) => {
      let emojiToShow = m.emoji.length > 10 ? " ◩ " : m.emoji;
      return chrome.contextMenus.create({
        id: "ii" + index,
        title: emojiToShow + " " + m.title,
        contexts: ["selection"],
        parentId: "textSelection",
        documentUrlPatterns: urlPattern,
        enabled: enabled,
      });
    });
  } else {
    chrome.contextMenus.create({
      id: "noSpacesTextSel",
      title: "Create a group in tabExtend",
      contexts: ["selection"],
      parentId: "textSelection",
      enabled: false,
      documentUrlPatterns: urlPattern,
    });
    chrome.contextMenus.create({
      id: "noSpaces",
      title: "Create a group in tabExtend",
      contexts: ["all"],
      parentId: "saveTo",
      enabled: false,
      documentUrlPatterns: urlPattern,
    });
    chrome.contextMenus.create({
      id: "noSpacesClose",
      title: "Create a group in tabExtend",
      contexts: ["all"],
      parentId: "closeNsave",
      enabled: false,
      documentUrlPatterns: urlPattern,
    });
  }
};

// ? Contextlistener
chrome.contextMenus.onClicked.addListener(function (itemData, tab) {
  //saveToStorage(itemData.selectionText);
  if (itemData.menuItemId.substring(0, 8) === "newSpace") {
    let categoryId = itemData.parentMenuItemId;
    createNewSpaceWithTab(categoryId, tab, false);
  } else if (itemData.menuItemId.substring(0, 11) === "newAndClose") {
    let categoryId = itemData.parentMenuItemId.substring(5);
    createNewSpaceWithTab(categoryId, tab, true);
  } else if (itemData.parentMenuItemId.substring(0, 5) === "close") {
    var idToSaveClose = itemData.menuItemId.substring(1);
    addAndCloseSite(idToSaveClose, tab);
  } else if (itemData.parentMenuItemId === "textSelection") {
    var idToSaveTextFrom = itemData.menuItemId.substring(2);
    addNote(idToSaveTextFrom, itemData.selectionText, tab);
  } else {
    var idToSave = itemData.menuItemId.substring(1);
    saveToSpace(idToSave, tab);
  }
});

const sendErrorToFront = (errorText, errorCode, num) => {
  console.log("Sending error: ", errorText, "num: ", num, "errorCode: ", errorCode);
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      tab.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, {
          msg: "errorMessage",
          text: errorText,
          code: errorCode,
        })
      );
    }
  );
};

const sendSuccessToFront = (message) => {
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      tab.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, {
          msg: "successMessage",
          text: message,
        })
      );
    }
  );
};

const debounceSave = debounce((data, type, userId, currentRef, sendResponse) => {
  db.collection("items")
    .doc(currentRef)
    .update({
      lastUser: userId,
      lastTypeUpdated: type,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      ...data,
    })
    .then(function () {
      sendResponse({ msg: "success" });
      console.log("data saved");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
      sendErrorToFront(errorMessage, errorCode, 5);
    });
}, 1200);

const updateRefData = (data, type, userId, currentWSid, sendResponse) => {
  let currentRef;
  let cloudData;
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        currentRef = doc.id;
        cloudData = doc.data();
      });
    })
    .then(() => {
      if (cloudData.WSid !== currentWSid) {
        changeFirstWStoTrue(userId, currentWSid);
        sendErrorToFront("你还要再拖动他, try reload", "43", 400);
        sendResponse({
          msg: "error",
          content: "你还要再拖动他 while saving your data try reload",
        });
        return;
      } else if (cloudData.shared === true) {
        let sharedRef = cloudData.sharedRef;
        db.collection("items")
          .doc(sharedRef)
          .update({
            lastUser: userId,
            lastTypeUpdated: type,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            ...data,
          })
          .then(function () {
            console.log("shared data saved");
            sendResponse({ msg: "success" });
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendResponse({ msg: "error", content: errorMessage });
            sendErrorToFront(errorMessage, errorCode, 400);
          });
      } else {
        debounceSave(data, type, userId, currentRef, sendResponse);
      }
    });
};

const updateSharedWS = (id, sharedWith, isCurrentWS, newlyShared, hasWsIdOne, newWsId) => {
  let userId = firebase.auth().currentUser.uid;
  let currentRef;
  let roles = [];
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        currentRef = doc.id;
        let data = doc.data();
        roles = data.roles ? data.roles : [];
      });
    })
    .then(() => {
      db.collection("items")
        .doc(currentRef)
        .update({
          WSid: hasWsIdOne ? newWsId : id,
          lastTypeUpdated: "sharedData",
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
          //roles: [...roles, sharedWith],
          roles: sharedWith,
        })
        .then(function () {
          if (isCurrentWS) {
            getRolesData(true, id, isCurrentWS);
          } else return;
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 5);
        });
    });
};

const getRolesData = (isOwner, id, isCurrentWS) => {
  let userId = firebase.auth().currentUser.uid;
  //nästa rad är alltid true atm
  if (isOwner) {
    db.collection("items")
      .where("owner", "==", userId)
      .where("WSid", "==", id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let data = doc.data();
          isCurrentWS && queryAndSendtoFront("newRoles", data.roles);
        });
      });
  } else {
    db.collection("items")
      .doc(id)
      .get()
      .then(function (doc) {
        let data = doc.data();
        queryAndSendtoFront("newRoles", data.roles);
      });
  }
};

const updateTabsDataFirestore = async (updatedData, type, currentWSid, sendResponse) => {
  //const itemRef = await getFromLocal("itemRef");
  let userId = firebase.auth().currentUser.uid;
  //let type = "tab";
  updateRefData(updatedData, type, userId, currentWSid, sendResponse);
  updateContextMenu(updatedData);
};

const addCategorieData = async (data, currentWSid, sendResponse) => {
  //const itemRef = await getFromLocal("itemRef");
  let userId = firebase.auth().currentUser.uid;
  let type = "category";
  let categories = data.categories;
  updateRefData({ categories }, type, userId, currentWSid, sendResponse);
  //update category data on all fronts
  sendDataToFront(data, "newCatData");
};

const saveNewWSdata = (data) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(userId)
    .set(data, { merge: true })
    .then(function () {
      getUserData(userId);
    });
};

const joinWorkspace = (wsData, docRef, email, name) => {
  let userId = firebase.auth().currentUser.uid;
  let roles;
  let urls;
  let batch = db.batch();
  db.collection("items")
    .where("owner", "==", userId)
    .where("sharedRef", "==", docRef)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let currentItemRef = doc.id;
        db.collection("items")
          .doc(docRef)
          .get()
          .then(function (doc) {
            const data = doc.data();
            roles = data.roles;
            if (data?.urls) {
              urls = data.urls;
            } else {
              urls = [];
            }
            let index = roles.findIndex((target) => target.email === email);
            let targetRole = roles[index];
            let newRole = {
              email: targetRole.email,
              name: name,
              status: "Collaborator",
              userId: userId,
            };
            roles[index] = newRole;
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 155);
            return;
          })
          .then(() => {
            let currentItem = db.collection("items").doc(docRef);
            batch.set(
              currentItem,
              {
                lastTypeUpdated: "deleteData",
                roles: roles,
                //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            );
            let newItem = db.collection("users").doc(userId);
            batch.set(
              newItem,
              {
                workspaces: wsData,
              },
              { merge: true }
            );
            let sharedItem = db.collection("items").doc(currentItemRef);
            batch.set(
              sharedItem,
              {
                urls: urls,
              },
              { merge: true }
            );
            batch
              .commit()
              .then(() => {
                console.log("batch write done");
                getUserData(userId);
              })
              .catch(function (error) {
                console.log("Error writing batch");
                var errorCode = error.code;
                var errorMessage = error.message;
                sendErrorToFront(errorMessage, errorCode, 286);
              });
          });
      });
    });
};

const removeWorkspace = (
  wsData,
  docRef,
  email,
  isCurrentLetsChange,
  changeFromId,
  changeToWsId
) => {
  if (isCurrentLetsChange === true) {
    changeWorkspace(changeToWsId, changeFromId);
  }
  let userId = firebase.auth().currentUser.uid;
  let batch = db.batch();
  let currentItem;
  let roles;
  let cc;
  db.collection("items")
    .doc(docRef)
    .get()
    .then(function (doc) {
      const data = doc.data();
      roles = data.roles;
      cc = data.cc;
      let index = roles.findIndex((target) => target.email === email);
      roles.splice(index, 1);
      let ccIndex = cc.findIndex((item) => item === userId);
      cc.splice(ccIndex, 1);
      currentItem = db.collection("items").doc(docRef);
    })
    .then(() => {
      batch.set(
        currentItem,
        {
          lastTypeUpdated: "deleteData",
          roles: roles,
          cc: cc,
          //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      let newItem = db.collection("users").doc(userId);
      batch.set(
        newItem,
        {
          workspaces: wsData,
        },
        { merge: true }
      );
      batch
        .commit()
        .then(() => {
          console.log("removeWorkspace: batch write done");
          getUserData(userId);
          let deleteWS = db
            .collection("items")
            .where("owner", "==", userId)
            .where("refId", "==", docRef);
          deleteWS.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              console.log("Deleting doc: ", doc.data());
              doc.ref.delete();
            });
          });
        })
        .catch(function (error) {
          console.log("removeWorkspace: Error writing batch");
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 286);
        });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 155);
      return;
    });
};

const removeUserFromWS = (newRoles, removedData, wsId) => {
  let userId = firebase.auth().currentUser.uid;
  console.log("removeUserFromWS", removedData);
  let currentItemRef;
  let currentRemoved;
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", wsId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        currentItemRef = doc.id;
        let data = doc.data();
        currentRemoved = data.removed ? data.removed : [];
      });
    })
    .then(() => {
      console.log("Removing user");
      db.collection("items")
        .doc(currentItemRef)
        .set(
          {
            roles: newRoles,
            removed: [...currentRemoved, removedData],
            lastTypeUpdated: "removeUser",
          },
          { merge: true }
        )
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 156);
        });
    });
};

const deleteWSdataN = (wsData, isShared, wsId, changeToWS, currentWS) => {
  let userId = firebase.auth().currentUser.uid;
  let refToDelete;
  let oldRoles;
  let data;
  if (currentWS === wsId) {
    changeWorkspace(changeToWS, currentWS);
  }
  let deleteWS = db.collection("items").where("owner", "==", userId).where("WSid", "==", wsId);
  if (isShared) {
    deleteWS
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data = doc.data();
          refToDelete = doc.id;
          oldRoles = data.roles !== undefined ? data.roles : [{ userId: userId }];
        });
      })
      .then(() => {
        db.collection("items")
          .doc(refToDelete)
          .set(
            {
              roles: [],
              removed: oldRoles,
              isDeleted: true,
              lastTypeUpdated: "removeUser",
              lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          )
          .then(function (docRef) {
            db.collection("users").doc(userId).set(wsData, { merge: true });
            //doc.ref.delete();
            //updateContextMenu(newData);
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 476);
          });
      });
  } else {
    deleteWS
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      })
      .then(() => {
        db.collection("users").doc(userId).set(wsData, { merge: true });
      });
  }
};

const getUserData = (userId) => {
  db.collection("users")
    .doc(userId)
    .get()
    .then(function (doc) {
      const userData = doc.data();
      chrome.tabs.query(
        {
          url: ["chrome://newtab/", extensionUrl],
        },
        function (tab) {
          tab.forEach((tab) =>
            chrome.tabs.sendMessage(tab.id, {
              msg: "newUserData",
              userData,
            })
          );
        }
      );
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 7);
    });
};

//setup -> ws true -> if sharedDoc ->
let blockedWhileChanging = null;

const changeWorkspace = (changeToWSid, currentWSid, setupNew) => {
  console.log("changeWorkspace....newWSid: ", changeToWSid, "currentWSid: ", currentWSid);
  blockedWhileChanging = changeToWSid;
  //let newWSid = newWSid;
  //let currentWSid = currentWSid;
  let itemRef;
  let currentIsSharedDoc;
  //let initialDataSent = false;
  initialDataSent = false;
  let currentItemRef;
  let userId = firebase.auth().currentUser.uid;
  let batch = db.batch();
  let currentItem;
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", changeToWSid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        itemRef = doc.id;
        //let newTabData = doc.data();
        //if sharedDoc
      });
    })
    .then(() => {
      db.collection("items")
        .where("owner", "==", userId)
        .where("WSid", "==", currentWSid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            currentItemRef = doc.id;
            currentItem = db.collection("items").doc(currentItemRef);
            currentIsSharedDoc = doc.data().shareLinkDoc;
          });
        })
        .then(() => {
          batch.set(
            currentItem,
            {
              //lastTypeUpdated: "tab",
              //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
              workspace: false,
            },
            { merge: true }
          );
          let newItem = db.collection("items").doc(itemRef);
          batch.set(
            newItem,
            {
              workspace: true,
            },
            { merge: true }
          );
          batch
            .commit()
            .then(() => {
              blockedWhileChanging = null;
              if (currentIsSharedDoc || setupNew) {
                setupListener();
              }
              console.log("batch write done..currentIsSharedDoc: ", currentIsSharedDoc);
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("Error writing batch", errorCode, 285);
              //sendErrorToFront(errorMessage, errorCode, 285);
              blockedWhileChanging = null;
            });
        });
    });
};

const createWorkspace = (userData, currentCatLength, currentWSid, catData) => {
  //const itemRef = await getFromLocal("itemRef");
  let userObject;
  let workspaces = userData.workspaces !== undefined ? userData.workspaces : false;
  let userId = firebase.auth().currentUser.uid;
  let newId = create_UUID();
  if (workspaces) {
    let newWSTitle = "Workspace " + (workspaces.length + 1);
    userObject = [
      ...workspaces,
      {
        name: newWSTitle,
        catLength: currentCatLength,
        id: newId,
        emoji: "📦",
        catData: catData,
      },
    ];
  } else if (workspaces === false) {
    userObject = [
      {
        name: "Workspace 1",
        catLength: currentCatLength,
        id: "1",
        emoji: "📒",
        catData: catData,
      },
      {
        name: "Workspace 2",
        catLength: 1,
        id: newId,
        emoji: "🗄️",
        catData: [],
      },
    ];
  }
  db.collection("users")
    .doc(userId)
    .set({ workspaces: userObject }, { merge: true })
    .then(function () {
      db.collection("items")
        .doc()
        .set(
          {
            owner: userId,
            lastTypeUpdated: "initData",
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            categories: [{ id: "1", name: "Untitled", tabIndex: 0 }],
            userInfo: {
              itemsSaved: 0,
            },
            tabData: [],
            workspace: false,
            WSid: newId,
          },
          { merge: true }
        )
        .then(function (docRef) {
          console.log("changingWorkspace: ", newId, currentWSid);
          getUserData(userId);
          let fromWSid = currentWSid ? currentWSid : "1";
          let isOwner = true;
          changeWorkspace(newId, fromWSid);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 332);
        });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 17);
    });
};

const createFirstWS = (currentCatLength, name, emoji, catData) => {
  let userId = firebase.auth().currentUser.uid;
  let userObject = [
    {
      name: name,
      catLength: currentCatLength,
      id: "1",
      emoji: emoji,
      catData: catData,
    },
  ];
  db.collection("users")
    .doc(userId)
    .set({ workspaces: userObject }, { merge: true })
    .then(function () {})
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 283);
    });
};

const sendToWorkspace = (cargo, toWSid, toCategory) => {
  let userId = firebase.auth().currentUser.uid;
  let currentRef;
  let tabData;
  let newTabData;
  let isShared;
  let data;
  let docId;
  let isPublicDoc;
  let slug;
  console.log("Movin cargo: ", cargo);
  cargo.categoryID = toCategory;
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", toWSid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data = doc.data();
        isShared = data.shared !== undefined ? true : false;
        docId = doc.id;
        let categories = data.categories;
        isPublicDoc = categories.filter((cat) => cat.id === toCategory)[0].shared ? true : false;
        slug = categories.filter((cat) => cat.id === toCategory)[0].slug;
      });
    })
    .then(() => {
      if (isPublicDoc) {
        db.collection("shared")
          .doc(slug)
          .get()
          .then((doc) => {
            let publicData = doc.data();
            tabData = publicData.tabData;
            newTabData = [...tabData, cargo];
            db.collection("shared")
              .doc(slug)
              .update({
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                tabData: newTabData,
              })
              .then(function () {
                console.log("Data moved to public group successfully");
                return;
              })
              .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                sendErrorToFront(errorMessage, errorCode, 5);
                return;
              });
          })
          .catch((error) => {
            console.log("Error getting sharedData: ", error);
          });
      } else if (isShared) {
        currentRef = data.sharedRef;
        db.collection("items")
          .doc(currentRef)
          .get()
          .then((doc) => {
            let sharedData = doc.data();
            tabData = sharedData.tabData;
            newTabData = [...tabData, cargo];
            db.collection("items")
              .doc(currentRef)
              .update({
                lastTypeUpdated: "tab",
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                tabData: newTabData,
              })
              .then(function () {
                //console.log("data sparad");
              })
              .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                sendErrorToFront(errorMessage, errorCode, 5);
              });
          })
          .catch((error) => {
            console.log("Error getting sharedData: ", error);
          });
      } else {
        tabData = data.tabData;
        newTabData = [...tabData, cargo];
        db.collection("items")
          .doc(docId)
          .update({
            lastTypeUpdated: "tab",
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            tabData: newTabData,
          })
          .then(function () {
            //console.log("data sparad");
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 5);
          });
      }
    });
  //
};

const updateRoles = (refToChange, newRoles) => {
  db.collection("items")
    .doc(refToChange)
    .update({
      roles: newRoles,
      lastTypeUpdated: "deleteData",
    })
    .then(function () {
      console.log("Name updated in shared doc, new roles: ", newRoles);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Something went wrong updating name in shared doc");
    });
};

const updateAllSharedDocs = (newName) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("items")
    .where("owner", "==", userId)
    .where("shared", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        let isSharedLinkDoc = data.shareLinkDoc !== undefined ? data.shareLinkDoc : false;
        let refToChange = isSharedLinkDoc ? data.sharedRef : doc.id;
        if (isSharedLinkDoc) {
          db.collection("items")
            .doc(refToChange)
            .get()
            .then(function (doc) {
              const data = doc.data();
              let newRoles = data.roles;
              let index = newRoles.findIndex((ws) => ws.userId === userId);
              newRoles[index].name = newName;
              updateRoles(refToChange, newRoles);
            });
        } else {
          let newRoles = data.roles;
          let index = newRoles.findIndex((ws) => ws.userId === userId);
          newRoles[index].name = newName;
          updateRoles(refToChange, newRoles);
        }
      });
    });
};

let initialDataSent = false;

//TODO testa denna
chrome.runtime.onStartup.addListener(() => {
  localStorage.setItem("openGroupsData", null);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setupListener();
    } else {
      console.log("sending message: noUserSignedIn");
      queryAndSendtoFront("noUserSignedIn", []);
    }
  });
});

chrome.runtime.onConnect.addListener(function (port) {
  let lastSaved = null;
  console.assert(port.name === "clcl");
  port.onMessage.addListener(function (msg) {
    if (msg.initial === "wake up") {
      initialDataSent = false;
      initialUserDataSent = false;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("CLCL körs i bg, user: ", user);
          setupListener();
        } else {
          console.log("sending message: noUserSignedIn");
          queryAndSendtoFront("noUserSignedIn", []);
        }
      });
    }
  });
});

const setupListener = () => {
  blockedWhileChanging = null;
  let userId = firebase.auth().currentUser.uid;
  unsubscribe && unsubscribe() && console.log("Unsubb");
  unsubscribe = db
    .collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .onSnapshot((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          let initialData = doc.data();
          if (initialData.shareLinkDoc === true) {
            unsubscribe && unsubscribe() && console.log("Unsubb inside");
            unsubscribe = db
              .collection("items")
              .doc(initialData.sharedRef)
              .onSnapshot((doc) => {
                let sharedInitialData = doc.data();
                if (
                  blockedWhileChanging !== null &&
                  blockedWhileChanging !== sharedInitialData.WSid
                ) {
                  console.log("blockedWhileChanging: ", blockedWhileChanging);
                  console.log("SSTF: 1", sharedInitialData);
                  return;
                } else if (sharedInitialData.lastTypeUpdated === "removeUser") {
                  console.log("SSTF: 2", sharedInitialData);
                  if (
                    sharedInitialData.roles.find((users) => users.userId === userId) === undefined
                  ) {
                    console.log("SSTF: 2.5");
                    unsubscribe && unsubscribe();
                    blockedWhileChanging = sharedInitialData.WSid;
                    getRefAndChangeWS(userId, sharedInitialData.WSid);
                    queryAndSendtoFront("isRemovedFromCurrentWS", sharedInitialData.WSid);
                  }
                } else if (sharedInitialData.lastUser !== userId || initialDataSent === false) {
                  console.log("SSTF: 3", sharedInitialData);
                  let lastChanged = sharedInitialData.lastUpdated?.toDate();
                  let timeUpdated = lastChanged?.toLocaleTimeString();
                  let dateUpdated = lastChanged?.toDateString();
                  sendDataToFront(sharedInitialData, "initialDataCargo", timeUpdated, dateUpdated);
                  initialDataSent = true;
                } else if (sharedInitialData.lastUpdated !== null) {
                  console.log("SSTF: 4", sharedInitialData);
                  let lastChanged = sharedInitialData.lastUpdated.toDate();
                  let timeUpdated = lastChanged.toLocaleTimeString();
                  let dateUpdated = lastChanged.toDateString();
                  let dateObj = {
                    lastUser: sharedInitialData.lastUser,
                    timeUpdated: timeUpdated,
                    dateUpdated: dateUpdated,
                    owner: sharedInitialData.owner,
                  };
                  queryAndSendtoFront("dataSavedTimeOnly", dateObj);
                }
              });
          } else {
            if (blockedWhileChanging !== null && blockedWhileChanging !== initialData.WSid) {
              console.log("STF: 2", initialData);
              return;
            } else if (initialData.isDeleted === true) {
              console.log("STF: 2.5");
              return;
            } else if (initialData.lastUser !== userId || initialDataSent === false) {
              console.log("STF: 3", initialData);
              let lastChanged = initialData.lastUpdated?.toDate();
              let timeUpdated = lastChanged?.toLocaleTimeString();
              let dateUpdated = lastChanged?.toDateString();
              sendDataToFront(initialData, "initialDataCargo", timeUpdated, dateUpdated);
              initialDataSent = true;
            } else if (initialData.lastUpdated !== null) {
              console.log("STF: 4", initialData);
              let lastChanged = initialData.lastUpdated.toDate();
              let timeUpdated = lastChanged.toLocaleTimeString();
              let dateUpdated = lastChanged.toDateString();
              let dateObj = {
                lastUser: initialData.lastUser,
                timeUpdated: timeUpdated,
                dateUpdated: dateUpdated,
                owner: initialData.owner,
                roles: initialData.roles,
              };
              queryAndSendtoFront("dataSavedTimeOnly", dateObj);
            }
          }
        });
      } else {
        changeFirstWStoTrue(userId, false);
      }
    });
};

const changeFirstWStoTrue = (userId, currentWSid) => {
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      let size = querySnapshot.size;
      if (size > 1) {
        querySnapshot.forEach((doc) => {
          let refref = doc.id;
          db.collection("items")
            .doc(refref)
            .set({ workspace: false }, { merge: true })
            .then(() => {
              //setupListener();
              return;
            });
        });
      } else if (size === 0) {
        db.collection("items")
          .where("owner", "==", userId)
          .get()
          .then(function (querySnapshot) {
            let firstRef = querySnapshot.docs[0].id;
            db.collection("items").doc(firstRef).set({ workspace: true }, { merge: true });
          });
      }
    });
};

const getRefAndChangeWS = (userId, changeFromWSid) => {
  let changeToRef;
  db.collection("items")
    .where("owner", "==", userId)
    .get()
    .then(function (querySnapshot) {
      changeToRef = querySnapshot.docs[0].data().WSid;
    })
    .then(() => {
      changeWorkspace(changeToRef, changeFromWSid, true);
    });
};

const sendDataToFront = (currentTabData, msg, timeUpdated, dateUpdated) => {
  updateContextMenu(currentTabData);
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      tab.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, {
          msg: msg,
          timeUpdated: timeUpdated,
          dateUpdated: dateUpdated,
          source: "server",
          //userId: userId,
          currentTabData,
        })
      );
    }
  );
};

const getUrls = (tabData, sharedCategorySlugs) => {
  let tempTabData = tabData;
  sharedCategorySlugs.forEach((sharedSlug) => {
    db.collection("shared")
      .doc(sharedSlug)
      .get()
      .then(function (doc) {
        let data = doc.data();
        tempTabData = { ...tempTabData, ...data?.tabData };
      });
  });
  let urlArray = [];
  if (tempTabData) {
    tempTabData.forEach((group) => {
      if (group?.tabs) {
        group.tabs.forEach((tab) => {
          if (tab?.isStacked) {
            tab.stackedItems.forEach((tabInStack) => {
              if (tabInStack?.url) {
                let urlInStackClean = cleanUrl(tabInStack.url);
                if (urlInStackClean) {
                  urlArray.push(urlInStackClean);
                }
              }
            });
          } else if (tab?.url) {
            let urlClean = cleanUrl(tab.url);
            if (urlClean) {
              urlArray.push(urlClean);
            }
          }
        });
      }
    });
  }
  return urlArray;
};

const cleanUrl = (url) => {
  if (url.length > 400) {
    return false;
  }
  let urlClean = url.split("#")[0];
  urlClean = urlClean.endsWith("/") ? urlClean.slice(0, -1) : urlClean;
  return urlClean;
};

let initialUserDataSent = false;

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  var userId = null;
  if (firebase.auth().currentUser) {
    userId = firebase.auth().currentUser.uid;
  }
  if (req.msg === "getInitialUserData") {
    if (initialUserDataSent === false) {
      db.collection("users")
        .doc(userId)
        .get()
        .then(function (doc) {
          const userData = doc.data();
          sendResponse({ userData });
          initialUserDataSent = true;
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 7);
          sendResponse({});
        });
    } else {
      sendResponse({ userData: false });
    }
  }
  if (req.msg === "getDeletedItemsData") {
    db.collection("deletedItems")
      .doc(userId)
      .get()
      .then(function (doc) {
        const deletedItemsData = doc.data();
        sendResponse({ deletedItemsData });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 7);
        sendResponse({});
      });
  }
  if (req.msg === "deleteDeletedItemsDataById") {
    let idsToDelete = req.idsToDelete;
    db.collection("deletedItems")
      .doc(userId)
      .get()
      .then(function (doc) {
        const deletedItemsData = doc.data();
        let filteredDeletedItems = deletedItemsData.deletedItems.filter(
          (item) => !idsToDelete.includes(item.deletedData.id)
        );
        updateFullDeletedItem(userId, filteredDeletedItems);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 7);
      });
  }
  if (req.msg === "fullUpdate") {
    let newData = req.data;
    let filtered = req.filtered;
    let currentWSid = req.currentWSid;
    let urlChanged = req.urlChanged;
    let sharedCategorySlugs = req.sharedCategorySlugs;
    if (urlChanged) {
      let tabData = filtered ? req.allTabData.tabData : newData.tabData;
      let urlArray = getUrls(tabData, sharedCategorySlugs);
      newData = { ...newData, ...{ urls: urlArray } };
    }
    updateMultipleFront(filtered ? req.allTabData : newData);
    updateTabsDataFirestore(newData, "tab", currentWSid, sendResponse);
    //sendResponse({});
  }
  if (req.msg === "deleteUpdate") {
    let newData = req.data;
    let filtered = req.filtered;
    let currentWSid = req.currentWSid;
    let urlChanged = req.urlChanged;
    let sharedCategorySlugs = req.sharedCategorySlugs;
    if (urlChanged) {
      let tabData = filtered ? req.allTabData.tabData : newData.tabData;
      let urlArray = getUrls(tabData, sharedCategorySlugs);
      newData = { ...newData, ...{ urls: urlArray } };
    }
    updateMultipleFront(filtered ? req.allTabData : newData);
    updateTabsDataFirestore(newData, "deleteData", currentWSid, sendResponse);
    //sendResponse({});
  }
  if (req.msg === "addCategorieData") {
    let currentWSid = req.currentWSid;
    addCategorieData(req.data, currentWSid, sendResponse);
    if (req.ws.workspaces !== false) {
      saveNewWSdata(req.ws);
    }
    //sendResponse({});
  }
  if (req.msg === "saveWSinfo") {
    if (req.ws.workspaces !== false) {
      saveNewWSdata(req.ws);
    }
    sendResponse({});
  }
  if (req.msg === "joinWorkspace") {
    if (req.ws.workspaces !== false) {
      joinWorkspace(req.ws, req.docRef, req.email, req.name);
    }
    sendResponse({});
  }
  if (req.msg === "removeWorkspace") {
    if (req.ws.workspaces !== false) {
      removeWorkspace(
        req.ws,
        req.docRef,
        req.email,
        req.isCurrentLetsChange,
        req.changeFromId,
        req.changeToWsId
      );
    }
    sendResponse({});
  }
  if (req.msg === "removeUserFromWS") {
    removeUserFromWS(req.newRoles, req.removedData, req.wsId);
    sendResponse({});
  }
  if (req.msg === "createFirstWS") {
    createFirstWS(req.currentCatLength, req.name, req.emoji, req.catData);
    sendResponse({});
  }
  if (req.msg === "deleteWS") {
    if (req.ws.workspaces !== undefined) {
      deleteWSdataN(req.ws, req.isShared, req.id, req.changeToWS, req.currentWS);
    }
    sendResponse({});
  }
  if (req.msg === "signUpGoogle") {
    var anonUser = firebase.auth().currentUser;
    //console.log("signUpGoogle, currentUser: ", firebase.auth().currentUser);
    anonUser
      .linkWithPopup(provider)
      .then(function (result) {
        //let googleToken = result.credential;
        sendSuccessToFront("Account successfully created");
        updateUserEmail(result.user);
        //console.log("updateUserEmail: ", result.user);
        sendResponse({});
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 8);
        sendResponse({});
      });
  }
  if (req.msg === "newSignUpGoogle") {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let isNewUser = result.additionalUserInfo.isNewUser;
        let user = result.user;
        console.log("user -> ", user);
        console.log("isNewUser -> ", isNewUser);
        let userId = user.uid;
        let email = user.email;
        if (isNewUser) {
          setInitialData(email, userId);
          sendResponse("success");
        } else {
          sendResponse("success");
        }
        // ...
      })
      .catch((error) => {
        console.log("error signing up ? -> ");
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 8);
        sendResponse("error");
      });
  }
  if (req.msg === "signInGoogle") {
    //deleteAnonUser();
    var anonymousUser = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(anonymousUser)
      .set({ deadAccount: true }, { merge: true })
      .then(function () {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            //var token = result.credential.accessToken;
            var newUser = result.user;
            //console.log(result.user);
            db.collection("users")
              .doc(result.user.uid)
              .get()
              .then(function (doc) {
                //check if user has a userObj
                let userData = doc.data();
                if (userData) {
                  queryAndSendtoFront("newUserLogin", []);
                  sendResponse({});
                } else {
                  sendErrorToFront(
                    "No account found. Use Sign up instead of Sign in to create account",
                    100,
                    8
                  );
                  var userTodel = firebase.auth().currentUser;
                  return userTodel
                    .delete()
                    .then(function () {
                      firebase.auth().signOut();
                    })
                    .catch(function (error) {});
                }
              });
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 9);
            db.collection("users").doc(anonymousUser).set({ deadAccount: false }, { merge: true });
            sendResponse({});
          });
      });
  }
  if (req.msg === "newSignInGoogle") {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        //let user = result.user;
        sendResponse("success");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 10);
        sendResponse("error");
        // ..
      });
  }
  if (req.msg === "signUpEmailPassword") {
    var credential = firebase.auth.EmailAuthProvider.credential(req.email, req.password);
    firebase
      .auth()
      .currentUser.linkWithCredential(credential)
      .then(
        function (result) {
          let message = "Account successfully created";
          sendSuccessToFront(message);
          updateUserEmail(result.user);
          sendResponse({});
        },
        function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 10);
          sendResponse({});
        }
      );
  }
  if (req.msg === "newSignUpEmailPassword") {
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.email, req.password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        let userId = user.uid;
        setInitialData(req.email, userId);
        sendResponse("success");
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 10);
        sendResponse("error");
        // ..
      });
  }
  if (req.msg === "signInEmailPassword") {
    //deleteAnonUser();
    var anonymousUser = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(anonymousUser)
      .set({ deadAccount: true }, { merge: true })
      .then(function () {
        firebase
          .auth()
          .signInWithEmailAndPassword(req.email, req.password)
          .then(function (result) {
            var newUser = result.user;
            queryAndSendtoFront("newUserLogin", []);
            sendResponse({});
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 11);
            db.collection("users").doc(anonymousUser).set({ deadAccount: false }, { merge: true });
            sendResponse({});
          });
      });
  }
  if (req.msg === "newSignInEmailPassword") {
    firebase
      .auth()
      .signInWithEmailAndPassword(req.email, req.password)
      .then(function (result) {
        sendResponse("success");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 11);
        sendResponse("error");
      });
  }
  if (req.msg === "createAnonAccount") {
    firebase
      .auth()
      .signInAnonymously()
      .then((result) => {
        var user = result.user;
        let userId = user.uid;
        let email = "";
        setInitialData(email, userId);
        sendResponse("success");
        //isNewUser = result.additionalUserInfo.isNewUser;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 15);
        sendResponse("error");
      });
  }
  if (req.msg === "sendPasswordResetEmail") {
    let resetEmail = req.email;
    firebase
      .auth()
      .sendPasswordResetEmail(resetEmail)
      .then(function () {
        sendResponse("success");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 12);
        sendResponse("error");
      });
  }
  if (req.msg === "signOut") {
    //userData = { displayName: "", userEmail: "", userPlan: "free" }
    //itemRef = null
    localStorage.setItem("categorySelected", 0);
    firebase
      .auth()
      .signOut()
      .then(function () {
        queryAndSendtoFront("userLoggedOut", []);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (req.msg === "newUserData") {
    updateUserDataFromApp(req.data);
    sendResponse({});
  }
  if (req.msg === "newUserAndSharedData") {
    //let userId = firebase.auth().currentUser.uid;
    updateUserDataFromApp(req.userData);
    if (req.proPlan === true) {
      updateAllSharedDocs(req.newName);
    }
    sendResponse({});
  }
  if (req.msg === "changeWorkspace") {
    changeWorkspace(req.newWSid, req.currentWSid);
    sendResponse({});
  }
  if (req.msg === "fetchOwnWSRoles") {
    let id = req.id;
    db.collection("items")
      .where("owner", "==", userId)
      .where("WSid", "==", id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let data = doc.data();
          sendResponse(data.roles);
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 144);
      });
  }
  if (req.msg === "fetchWSRoles") {
    let id = req.id;
    db.collection("items")
      .doc(id)
      .get()
      .then(function (doc) {
        let data = doc.data();
        sendResponse(data.roles);
        //queryAndSendtoFront("newRoles", data.roles);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 144);
      });
  }
  if (req.msg === "newWorkspace") {
    createWorkspace(req.data, req.currentCatLength, req.currentWSid, req.catData);
    sendResponse({});
  }
  if (req.msg === "sendDataToWorkspace") {
    sendToWorkspace(req.cargo, req.toWSid, req.toCategory);
    sendResponse({});
  }
  if (req.msg === "sendInviteToWS") {
    saveNewWSdata(req.newWSdata);
    updateSharedWS(
      req.WSid,
      req.shareWith,
      req.isCurrentWS,
      req.newlyShared,
      req.hasWsIdOne,
      req.newWsId
    );
    //updateUserDataFromApp(req.data);
    sendResponse({ msg: "inviteSent" });
  }
  if (req.msg === "getTeamEmails") {
    db.collection("teams")
      .doc(req.team)
      .get()
      .then(function (doc) {
        let data = doc.data();
        sendResponse({ msg: "success", members: data.members });
        //queryAndSendtoFront("newRoles", data.roles);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 144);
        sendResponse({ msg: "error" });
      });
  }
  if (req.msg === "initShareCategory") {
    let catId = req.catId;
    let slug = req.slug;
    let ownerName = req.ownerName;
    let ownerEmail = req.ownerEmail;
    let publicStatus = req.public;
    let currentRef;
    db.collection("items")
      .where("owner", "==", userId)
      .where("workspace", "==", true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          currentRef = doc.id;
          let docData = doc.data();
          let catIndex = docData.categories.findIndex((cats) => cats.id === catId);
          let name = docData.categories[catIndex].name;
          console.log("catIndex: ", catIndex);
          if (catIndex !== -1) {
            batchPublicShare(
              sendResponse,
              docData,
              catIndex,
              currentRef,
              catId,
              slug,
              name,
              ownerName,
              ownerEmail,
              publicStatus
            );
          } else {
            //categorie Id is not in WS
            console.log("error");
            sendResponse({ msg: "error" });
          }
        });
      });
  }
  if (req.msg === "stopShareCategory") {
    //fetch currentRef
    //fetch slug doc
    //payload -> slug doc tabs
    //delete payload.slug
    let catId = req.catId;
    let slug = req.slug;
    let currentRef;
    db.collection("items")
      .where("owner", "==", userId)
      .where("workspace", "==", true)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          currentRef = doc.id;
          let docData = doc.data();
          let catIndex = docData.categories.findIndex((cats) => cats.id === catId);
          if (catIndex !== -1) {
            batchStopPublicShare(sendResponse, docData, catIndex, currentRef, catId, slug);
          } else {
            //categorie Id is not in WS
            console.log("error");
            sendResponse({ msg: "error" });
          }
        });
      });
  }
  if (req.msg === "fetchPublicCat") {
    let slug = req.slug;
    db.collection("shared")
      .doc(slug)
      .get()
      .then(function (doc) {
        let data = doc.data();
        sendResponse({
          msg: "success",
          data: data.tabData,
          public: data.public,
          viewers: data.viewers ? data.viewers : [],
        });
        //queryAndSendtoFront("newRoles", data.roles);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 124);
      });
  }
  if (req.msg === "setNewViewer") {
    let slug = req.slug;
    let emailPayload = req.emailPayload;
    let addOrRemove = req.addOrRemove;
    let newViewers;
    db.collection("shared")
      .doc(slug)
      .get()
      .then(function (doc) {
        let data = doc.data();
        let viewers = data.viewers ? data.viewers : [];
        console.log("addOrRemove -> ", addOrRemove);
        if (addOrRemove === "add") {
          newViewers = [...viewers, emailPayload];
        } else if (addOrRemove === "remove") {
          newViewers = viewers.filter((email) => email !== emailPayload);
        }
        console.log("newViewers -> ", newViewers);
        db.collection("shared")
          .doc(slug)
          .set(
            {
              viewers: newViewers,
            },
            { merge: true }
          )
          .then(() => {
            sendResponse({
              msg: "success",
              newViewers: newViewers,
            });
            //queryAndSendtoFront("newRoles", data.roles);
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            sendErrorToFront(errorMessage, errorCode, 384);
          });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 124);
      });
  }
  if (req.msg === "updatePublicData") {
    let slug = req.slug;
    let sharedData = req.sharedData;
    let allTabData = req.allTabData;
    let wsData = req.wsData;
    let currentWSid = req.currentWSid;
    let urlChanged = req.urlChanged;
    let sharedCategorySlugs = req.sharedCategorySlugs;

    if (urlChanged) {
      let urlArray = getUrls(allTabData.tabData, sharedCategorySlugs);
      wsData = { ...wsData, ...{ urls: urlArray } };
    }

    updateMultipleFront(allTabData);
    let userId = firebase.auth().currentUser.uid;
    updateRefData(wsData, "tab", userId, currentWSid, sendResponse);
    //let contextData = { ...sharedData, categories: wsData.categories };
    updatePublicData(slug, userId, sharedData, sendResponse);
  }
  if (req.msg === "updateOnlyPublic") {
    let slug = req.slug;
    let newData = req.newData;
    console.log("Update public with new data: ", req.newData);
    let userId = firebase.auth().currentUser.uid;
    //let contextData = { ...sharedData, categories: wsData.categories };
    updatePublicData(slug, userId, newData);
  }
  if (req.msg === "updateDeletedItems") {
    let newData = req.newData;
    let userId = firebase.auth().currentUser.uid;
    //let contextData = { ...sharedData, categories: wsData.categories };
    updateDeletedItems(userId, newData, sendResponse);
  }

  if (req.msg === "updateFullDeletedItem") {
    let newData = req.newData;
    console.log("Remove deleted item: ", req.newData);
    let userId = firebase.auth().currentUser.uid;
    //let contextData = { ...sharedData, categories: wsData.categories };
    updateFullDeletedItem(userId, newData);
  }

  if (req.msg === "emptyDeletedItems") {
    console.log("Remove deleted item: ", req.newData);
    let userId = firebase.auth().currentUser.uid;
    //let contextData = { ...sharedData, categories: wsData.categories };
    emptyDeletedItems(userId, sendResponse);
  }

  if (req.msg === "movePublicData") {
    movePublicData(
      req.fromCatSlug,
      req.toCatSlug,
      req.fromData,
      req.allTabData,
      req.WSid,
      req.payload
    );
    let currentWSid = req.WSid;
    updateRefData(req.wsData, "tab", userId, currentWSid, sendResponse);
    //updateContextMenu(req.nonSharedData);
    //updateMultipleFront(req.nonSharedData);
  }
  if (req.msg === "deleteSharedDoc") {
    let slug = req.slug;
    let data = req.data;
    let currentWSid = req.currentWSid;
    let userId = firebase.auth().currentUser.uid;
    updateMultipleFront(data);
    updateRefData(data, "tab", userId, currentWSid, sendResponse);
    updateContextMenu(data);
    if (req.ws.workspaces !== false) {
      saveNewWSdata(req.ws);
    }
    let sharedDbItem = db.collection("shared").doc(slug);
    sharedDbItem.delete().then(() => console.log("Shared doc deleted done"));
  }
  if (req.msg === "saveItemToPublic") {
    let payload = req.payload;
    let allDatafiltered = req.allDatafiltered;
    let WSid = req.WSid;
    let fromCatSlug = req.fromCatSlug;
    let toCatSlug = req.toCatSlug;
    let fromData = req.fromData;
    let fromDataFinal = fromData !== null ? fromData : allDatafiltered;
    let toGroupId = req.toGroupId;
    let multipleItems = req.multipleItems;
    if (toCatSlug) {
      db.collection("shared")
        .doc(toCatSlug)
        .get()
        .then(function (doc) {
          let docData = doc.data();
          let targetIndex = docData.tabData.findIndex((group) => group.id === toGroupId);
          console.log("targetIndex: ", targetIndex);
          if (multipleItems) {
            docData.tabData[targetIndex].tabs.push(...payload);
          } else {
            docData.tabData[targetIndex].tabs.push(payload);
          }
          batchMoveData(WSid, fromCatSlug, fromDataFinal, docData.tabData, toCatSlug);
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          sendErrorToFront(errorMessage, errorCode, 214);
        });
    } else {
      batchMoveData(WSid, fromCatSlug, fromDataFinal, allDatafiltered, toCatSlug);
    }
  }
  if (req.msg === "fetchAllWS") {
    getAllWSData(sendResponse);
  }

  //! Added from shadow dom test
  if (req.msg === "closePopover") {
    disable(sender.tab);
  }

  if (req.msg === "closeFromToaster") {
    if (blockToastClose === false) {
      disable(sender.tab);
    }
  }

  if (req.msg === "openUrl") {
    chrome.tabs.create({ url: req.url, active: false });
  }

  if (req.msg === "openDashboard") {
    chrome.tabs.create(
      {
        url: "/index.html",
      },
      () => {
        disable(sender.tab);
      }
    );
  }

  if (req.msg === "pinTab") {
    chrome.tabs.update(req.tabId, { pinned: true }, () => {
      sendResponse({ msg: "success" });
    });
  }

  if (req.msg === "unPinTab") {
    chrome.tabs.update(req.tabId, { pinned: false }, () => {
      sendResponse({ msg: "unpinned" });
    });
  }

  if (req.msg === "fetchUserAndWsData_pop") {
    getUserDataSendToPopover(sendResponse);
  }

  if (req.msg === "getWSdataTo_pop") {
    getWsDataSendToPopover(req.WSid, sendResponse);
  }

  if (req.msg === "saveToGroup") {
    saveToGroupInWS(
      req.groupId,
      req.tab,
      req.WSidOrSlug,
      req.comment,
      req.todo,
      req.doneStatus,
      req.commentColor,
      sendResponse
    );
  }

  if (req.msg === "saveToSharedGroup") {
    saveToSharedGroup(
      req.groupId,
      req.tab,
      req.WSidOrSlug,
      req.comment,
      req.todo,
      req.doneStatus,
      req.commentColor,
      sendResponse
    );
  }

  if (req.msg === "saveToNewGroup") {
    let categoryId = req.categoryId;
    let tab = req.tab;
    let comment = req.comment;
    let todo = req.todo;
    let doneStatus = req.doneStatus;
    let commentColor = req.commentColor;
    let sharedSlug = req.sharedSlug;
    let refId = req.refId;
    createNewSpaceWithTabAndRefId(
      categoryId,
      tab,
      false,
      comment,
      todo,
      doneStatus,
      commentColor,
      sharedSlug,
      refId,
      sendResponse
    );
  }

  if (req.msg === "updateItemInWS") {
    updateItemInWS(
      req.groupIndex,
      req.itemIndex,
      req.refId,
      req.itemObj,
      req.isStacked,
      req.stackIndex,
      req.type,
      sendResponse
    );
  }

  if (req.msg === "updateItemInWSShared") {
    updateItemInWSShared(
      req.groupIndex,
      req.itemIndex,
      req.refId,
      req.itemObj,
      req.isStacked,
      req.stackIndex,
      req.type,
      req.sharedRefId,
      sendResponse
    );
  }
  if (req.msg === "setBadge") {
    let tabId = req.tabId;
    let text = req.text;
    setBadge(tabId, text);
  }
  return true;
});

const getAllWSData = async (sendResponse) => {
  let userId = firebase.auth().currentUser.uid;
  let allData = [];
  const items = await db.collection("items").where("owner", "==", userId).get();
  for (const doc of items.docs) {
    let data = doc.data();
    if (data.shareLinkDoc === true) {
      console.log("data is shared");
      await db
        .collection("items")
        .doc(data.sharedRef)
        .get()
        .then((doc) => {
          let sharedData = doc.data();
          allData.push(sharedData);
        });
    } else {
      allData.push(data);
    }

    /* const deviceTokens = await db.collection('users/' + member.id + '/devices').get();
    for (const deviceToken of deviceTokens.docs) {
      allData.push(deviceToken.data().token);
    } */
  }
  console.log("success allData: ", allData);
  sendResponse({ msg: "success", allWSdata: allData });
  //return await sendPush(tokens);
};

const updatePublicData = (slug, userId, sharedData, sendResponse, addUrl, originRef) => {
  db.collection("shared")
    .doc(slug)
    .update({
      lastUser: userId,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      ...sharedData,
    })
    .then(function () {
      if (addUrl) {
        let urlClean = cleanUrl(addUrl);
        if (urlClean) {
          db.collection("items")
            .doc(originRef)
            .update({
              lastUser: userId,
              lastTypeUpdated: "tab",
              lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
              urls: firebase.firestore.FieldValue.arrayUnion(urlClean),
            });
        }

        //queryAndSendtoFront("newRoles", data.roles);
      }
      if (sendResponse) {
        sendResponse({ msg: "success" });
      }

      //let data = doc.data();
      //sendResponse({ msg: "success", data: data.tabData });
      //queryAndSendtoFront("newRoles", data.roles);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
      sendErrorToFront(errorMessage, errorCode, 144);
    });
};

const updateDeletedItems = (userId, newData, sendResponse) => {
  var deletedItemsRef = db.collection("deletedItems").doc(userId);

  deletedItemsRef
    .get()
    .then(function (doc) {
      let deletedItemsData = doc.data();
      let mergedData;
      if (deletedItemsData?.deletedItems) {
        mergedData = [...newData, ...deletedItemsData.deletedItems];
      } else {
        mergedData = newData;
      }
      if (mergedData.length > 50) {
        mergedData = mergedData.splice(0, 50);
      }
      updateFullDeletedItem(userId, mergedData, sendResponse);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
      sendErrorToFront(errorMessage, errorCode, 400);
    });
};

const updateFullDeletedItem = (userId, newData, sendResponse) => {
  var deletedItemsRef = db.collection("deletedItems").doc(userId);
  deletedItemsRef
    .set({
      deletedItems: newData,
    })
    .then(function () {
      sendResponse({ msg: "success" });
      //let data = doc.data();
      //queryAndSendtoFront("newRoles", data.roles);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
      sendErrorToFront(errorMessage, errorCode, 144);
    });
};

const emptyDeletedItems = (userId, sendResponse) => {
  var deletedItemsRef = db.collection("deletedItems").doc(userId);
  deletedItemsRef
    .set({
      deletedItems: [],
    })
    .then(function () {
      sendResponse({ msg: "success" });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 144);
    });
};

const movePublicData = (fromCatSlug, toCatSlug, fromData, allData, WSid, payload) => {
  let allDatafiltered = allData.tabData.filter((group) => group.slug === undefined);
  let fromDataFinal = fromData !== null ? fromData : allDatafiltered;
  if (toCatSlug) {
    //Move to shared cat from _
    db.collection("shared")
      .doc(toCatSlug)
      .get()
      .then(function (doc) {
        let toPublicData = doc.data();
        console.log("allData: ", allData);
        let toData = [...toPublicData.tabData, payload];
        batchMoveData(WSid, fromCatSlug, fromDataFinal, toData, toCatSlug);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        sendErrorToFront(errorMessage, errorCode, 144);
      });
  } else {
    //Move to WS cat from _
    batchMoveData(WSid, fromCatSlug, fromDataFinal, allDatafiltered, toCatSlug);
  }
};

const batchMoveData = async (WSid, fromCatSlug, fromData, toData, toCatSlug) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (WSid === doc.data().WSid) {
          if (fromCatSlug === false || toCatSlug === false) {
            let data = doc.data();
            if (data.shareLinkDoc) {
              console.log("data is shared");
              db.collection("items")
                .doc(data.sharedRef)
                .get()
                .then((doc) => {
                  let currentRef = doc.id;
                  batchData2ndStep(fromCatSlug, currentRef, toCatSlug, toData, userId, fromData);
                });
            } else {
              let currentRef = doc.id;
              batchData2ndStep(fromCatSlug, currentRef, toCatSlug, toData, userId, fromData);
              return;
            }
            let currentRef = doc.id;
            batchData2ndStep(fromCatSlug, currentRef, toCatSlug, toData, userId, fromData);
            return;
          }
          //fromCatSlug ? false
          //toCatSlug ? false
        }
      });
    });
};

const batchData2ndStep = (fromCatSlug, currentRef, toCatSlug, toData, userId, fromData) => {
  let batch = db.batch();
  let fromDbItem = fromCatSlug
    ? db.collection("shared").doc(fromCatSlug)
    : db.collection("items").doc(currentRef);
  let toDbItem = toCatSlug
    ? db.collection("shared").doc(toCatSlug)
    : db.collection("items").doc(currentRef);
  batch.set(
    fromDbItem,
    {
      lastUser: userId,
      tabData: fromData,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  batch.set(
    toDbItem,
    {
      lastUser: userId,
      tabData: toData,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  batch
    .commit()
    .then(() => {
      //updateMultipleFront
    })
    .catch(function (error) {
      console.log("Error writing batch");
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      sendErrorToFront(errorMessage, errorCode, 286);
    });
};

const batchPublicShare = (
  sendResponse,
  docData,
  catIndex,
  currentRef,
  catId,
  slug,
  name,
  ownerName,
  ownerEmail,
  publicStatus
) => {
  let newCatData = docData.categories;
  newCatData[catIndex].shared = true;
  newCatData[catIndex].slug = slug;
  let tabData = docData.tabData;
  let inWSid = docData.WSid ? docData.WSid : "1";
  let filteredTabData = tabData.filter((group) => group.categoryID !== catId);
  let payload = tabData.filter((group) => group.categoryID === catId);
  let markedPayload = payload.map((group) => ({ ...group, slug: slug }));
  let userId = firebase.auth().currentUser.uid;
  let batch = db.batch();
  let currentDbItem = db.collection("items").doc(currentRef);
  let sharedDbItem = db.collection("shared").doc(slug);
  batch.set(
    currentDbItem,
    {
      WSid: inWSid,
      categories: newCatData,
      tabData: filteredTabData,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      lastUser: userId,
    },
    { merge: true }
  );
  batch.set(
    sharedDbItem,
    {
      originRef: currentRef,
      inWSid: inWSid,
      tabData: markedPayload,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      owner: userId,
      name: name,
      ownerName: ownerName,
      ownerEmail: ownerEmail,
      public: publicStatus,
      //sharedWith: []
    },
    { merge: true }
  );
  batch
    .commit()
    .then(() => {
      console.log("batch write done");
      sendResponse({ msg: "success" });
    })
    .catch(function (error) {
      sendResponse({ msg: "error" });
      console.log("Error writing batch");
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      sendErrorToFront(errorMessage, errorCode, 286);
    });
};

const batchStopPublicShare = (sendResponse, docData, catIndex, currentRef, catId, slug) => {
  console.log("batchStopPublicShare");
  let newCatData = docData.categories;
  delete newCatData[catIndex].shared;
  delete newCatData[catIndex].slug;
  let tabData = docData.tabData;
  let userId = firebase.auth().currentUser.uid;
  db.collection("shared")
    .doc(slug)
    .get()
    .then(function (doc) {
      let publicData = doc.data();
      let tabsToMerge = publicData.tabData;
      tabsToMerge.forEach((group) => delete group.slug);
      let newTabData = [...tabData, ...tabsToMerge];
      console.log("Merged data: ", newTabData, "newCatData: ", newCatData);
      //delete shared doc
      //save mergeData + newCatData
      let batch = db.batch();
      let sharedDbItem = db.collection("shared").doc(slug);
      let currentDbItem = db.collection("items").doc(currentRef);
      batch.delete(sharedDbItem);
      batch.set(
        currentDbItem,
        {
          categories: newCatData,
          lastUser: userId,
          tabData: newTabData,
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      batch
        .commit()
        .then(() => {
          console.log("batchStopPublicShare done");
          sendResponse({ msg: "success" });
        })
        .catch(function (error) {
          sendResponse({ msg: "error" });
          console.log("Error writing batch");
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          sendErrorToFront(errorMessage, errorCode, 286);
        });
      /* let batch = db.batch();
    let sharedDbItem = db.collection("shared").doc(slug);
    let currentDbItem = db.collection("items").doc(currentRef);
    batch.set(
      currentDbItem,
      {
        categories: newCatData,
        tabData: filteredTabData,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    batch.set(
      sharedDbItem,
      {
        inWSid: inWSid,
        tabData: markedPayload,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        owner: userId,
        public: true,
        //sharedWith: []
      },
      { merge: true }
    );
    batch
      .commit()
      .then(() => {
        console.log("batch write done");
        sendResponse({ msg: "success" });
      })
      .catch(function (error) {
        sendResponse({ msg: "error" });
        console.log("Error writing batch");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        sendErrorToFront(errorMessage, errorCode, 286);
      }); */
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 144);
    });
  //let filteredTabData = tabData.filter((group) => group.categoryID !== catId);
  //let payload = tabData.filter((group) => group.categoryID === catId);
  //let markedPayload = payload.map((group) => ({ ...group, slug: slug }));
};

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

const addAndCloseSite = (index, tab) => {
  if (tab.index === 0) {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      if (tabs.length === 1) {
        let id = tabs[0].id;
        saveToSpace(index, tab);
        chrome.tabs.update(id, { url: "chrome://newtab/" });
      } else {
        chrome.tabs.remove(tab.id);
        saveToSpace(index, tab);
      }
    });
  } else {
    chrome.tabs.remove(tab.id);
    saveToSpace(index, tab);
  }
};

const queryAndSendtoFront = (msg, newData) => {
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      tab.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, {
          msg: msg,
          data: newData,
        })
      );
    }
  );
};

const queryAndSendtoFrontWithWSId = (WSid, newData) => {
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      tab.forEach((tab) =>
        chrome.tabs.sendMessage(tab.id, {
          msg: "newTabsWithWSId",
          data: newData,
          WSid: WSid,
        })
      );
    }
  );
};

const createNewSpaceWithTab = (categoryID, tab, andClose, comment, sendResponse) => {
  let userId = firebase.auth().currentUser.uid;
  let currentTabData = [];
  let currentRef;
  let urlArray;
  comment = comment ? comment : "";
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let tempData = doc.data();
        if (tempData.shared === true) {
          currentRef = tempData.sharedRef;
          db.collection("items")
            .doc(currentRef)
            .get()
            .then(function (doc) {
              currentTabData = doc.data();
              urlArray = doc.data().urls;
              let urlClean = cleanUrl(tab.url);
              if (urlArray && urlClean) {
                urlArray.push(urlClean);
              } else if (urlClean) {
                urlArray = [urlClean];
              } else if (!urlArray) {
                urlArray = [];
              }
              const dateCreated = new Date().toString();
              const spaceId = create_UUID();
              const tabId = create_UUID();
              let oldData = [...currentTabData.tabData];
              let newData = [
                ...oldData,
                {
                  id: spaceId,
                  title: "Untitled",
                  createdBy: userId,
                  emoji: "📬",
                  comments: 0,
                  categoryID: categoryID,
                  lastAdded: dateCreated,
                  focus: false,
                  tabs: [
                    {
                      id: tabId,
                      title: tab.title,
                      favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                      url: tab.url,
                      comment: comment,
                      commentColor: false,
                      note: false,
                      todo: false,
                      justAdded: false,
                      doneStatus: false,
                      dateCreated: dateCreated,
                    },
                  ],
                },
              ];
              SaveBgData(newData, currentRef, urlArray, sendResponse);
              andClose && chrome.tabs.update(tab.id, { url: "chrome://newtab/" });
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              sendErrorToFront(errorMessage, errorCode, 135);
              return;
            });
        } else {
          currentRef = doc.id;
          currentTabData = doc.data();
          urlArray = doc.data().urls;
          let urlClean = cleanUrl(tab.url);
          if (urlArray && urlClean) {
            urlArray.push(urlClean);
          } else if (urlClean) {
            urlArray = [urlClean];
          } else if (!urlArray) {
            urlArray = [];
          }
          const dateCreated = new Date().toString();
          const spaceId = create_UUID();
          const tabId = create_UUID();
          let oldData = [...currentTabData.tabData];
          let newData = [
            ...oldData,
            {
              id: spaceId,
              title: "Untitled",
              createdBy: userId,
              emoji: "📬",
              comments: 0,
              categoryID: categoryID,
              lastAdded: dateCreated,
              focus: false,
              tabs: [
                {
                  id: tabId,
                  title: tab.title,
                  favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                  url: tab.url,
                  comment: comment,
                  commentColor: false,
                  note: false,
                  todo: false,
                  justAdded: false,
                  doneStatus: false,
                  dateCreated: dateCreated,
                },
              ],
            },
          ];
          SaveBgData(newData, currentRef, urlArray, sendResponse);
          andClose && chrome.tabs.update(tab.id, { url: "chrome://newtab/" });
        }
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (sendResponse) {
        sendResponse({ msg: "error", content: errorMessage });
      } else {
        sendErrorToFront(errorMessage, errorCode, 13);
      }
    });
};

const createNewSpaceWithTabAndRefId = (
  categoryID,
  tab,
  andClose,
  comment,
  todo,
  doneStatus,
  commentColor,
  sharedSlug,
  refId,
  sendResponse
) => {
  let userId = firebase.auth().currentUser.uid;
  let currentTabData = [];
  let urlArray;
  comment = comment ? comment : "";

  if (sharedSlug) {
    db.collection("shared")
      .doc(sharedSlug)
      .get()
      .then(function (doc) {
        currentTabData = doc.data();

        const dateCreated = new Date().toString();
        const spaceId = create_UUID();
        const tabId = create_UUID();
        let oldData = [...currentTabData.tabData];
        let newData = [
          ...oldData,
          {
            id: spaceId,
            title: "Untitled",
            createdBy: userId,
            emoji: "📬",
            comments: 0,
            categoryID: categoryID,
            lastAdded: dateCreated,
            focus: false,
            tabs: [
              {
                id: tabId,
                title: tab.title,
                favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                url: tab.url,
                comment: comment,
                commentColor: commentColor,
                note: comment.length > 0 ? true : false,
                todo: todo,
                justAdded: false,
                doneStatus: doneStatus,
                dateCreated: dateCreated,
              },
            ],
          },
        ];
        let updateData = { tabData: newData };
        queryAndSendtoFrontWithWSId(currentTabData.inWSid, newData);
        updatePublicData(
          sharedSlug,
          userId,
          updateData,
          sendResponse,
          tab.url,
          currentTabData.originRef
        );
      });
    // get shared Doc 2 append new data to tabs 3 update public data , supply new url also 4 update front
  } else {
    db.collection("items")
      .doc(refId)
      .get()
      .then(function (doc) {
        currentTabData = doc.data();
        const dateCreated = new Date().toString();
        const spaceId = create_UUID();
        const tabId = create_UUID();
        let oldData = [...currentTabData.tabData];
        let newData = [
          ...oldData,
          {
            id: spaceId,
            title: "Untitled",
            createdBy: userId,
            emoji: "📬",
            comments: 0,
            categoryID: categoryID,
            lastAdded: dateCreated,
            focus: false,
            tabs: [
              {
                id: tabId,
                title: tab.title,
                favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                url: tab.url,
                comment: comment,
                commentColor: commentColor,
                note: comment.length > 0 ? true : false,
                todo: todo,
                justAdded: false,
                doneStatus: doneStatus,
                dateCreated: dateCreated,
              },
            ],
          },
        ];
        urlArray = doc.data().urls;
        let urlClean = cleanUrl(tab.url);
        if (urlArray && urlClean) {
          urlArray.push(urlClean);
        } else if (urlClean) {
          urlArray = [urlClean];
        } else if (!urlArray) {
          urlArray = [];
        }
        SaveBgData(newData, refId, urlArray, sendResponse, currentTabData.WSid);
      });
    // get doc 2 append new data to tabs 3 append url to url array 4 update and  5 update front
  }
};

const saveToSpace = (index, tab) => {
  let userId = firebase.auth().currentUser.uid;
  let currentTabData = [];
  let currentRef;
  let urlArray;
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let tempData = doc.data();
        if (tempData.shared === true) {
          currentRef = tempData.sharedRef;
          db.collection("items")
            .doc(currentRef)
            .get()
            .then(function (doc) {
              currentTabData = doc.data();
              let newData = [...currentTabData.tabData];
              urlArray = doc.data().urls;
              let urlClean = cleanUrl(tab.url);
              if (urlArray && urlClean) {
                urlArray.push(urlClean);
              } else if (urlClean) {
                urlArray = [urlClean];
              } else if (!urlArray) {
                urlArray = [];
              }
              const newId = create_UUID();
              let dateobj = new Date().toString();
              let dateCreated = dateobj;
              let newTabs = [
                ...newData[index].tabs,
                {
                  id: newId,
                  title: tab.title,
                  favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                  url: tab.url,
                  comment: "",
                  commentColor: false,
                  note: false,
                  todo: false,
                  justAdded: false,
                  doneStatus: false,
                  dateCreated: dateCreated,
                },
              ];
              newData[index].tabs = newTabs;
              SaveBgData(newData, currentRef, urlArray);
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              sendErrorToFront(errorMessage, errorCode, 135);
              return;
            });
        } else {
          currentRef = doc.id;
          currentTabData = doc.data();
          urlArray = doc.data().urls;
          let urlClean = cleanUrl(tab.url);
          if (urlArray && urlClean) {
            urlArray.push(urlClean);
          } else if (urlClean) {
            urlArray = [urlClean];
          } else if (!urlArray) {
            urlArray = [];
          }
          let newData = [...currentTabData.tabData];
          const newId = create_UUID();
          let dateobj = new Date().toString();
          let dateCreated = dateobj;
          let newTabs = [
            ...newData[index].tabs,
            {
              id: newId,
              title: tab.title,
              favIcon: tab.favIconUrl ? tab.favIconUrl : "",
              url: tab.url,
              comment: "",
              commentColor: false,
              note: false,
              todo: false,
              justAdded: false,
              doneStatus: false,
              dateCreated: dateCreated,
            },
          ];
          newData[index].tabs = newTabs;
          SaveBgData(newData, currentRef, urlArray);
        }
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 14);
    });
};

const addNote = (index, textCopyied, tab) => {
  var userId = firebase.auth().currentUser.uid;
  let currentTabData = [];
  let currentRef;
  let urlArray;
  db.collection("items")
    .where("owner", "==", userId)
    .where("workspace", "==", true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let tempData = doc.data();
        if (tempData.shared === true) {
          currentRef = tempData.sharedRef;
          db.collection("items")
            .doc(currentRef)
            .get()
            .then(function (doc) {
              currentTabData = doc.data();
              urlArray = doc.data().urls;
              let urlClean = cleanUrl(tab.url);
              if (urlArray && urlClean) {
                urlArray.push(urlClean);
              } else if (urlClean) {
                urlArray = [urlClean];
              } else if (!urlArray) {
                urlArray = [];
              }
              let newData = [...currentTabData.tabData];
              const newId = create_UUID();
              let dateobj = new Date().toString();
              let dateCreated = dateobj;
              let trimmedText = textCopyied.slice(0, 2400);
              let newTabs = [
                ...newData[index].tabs,
                {
                  id: newId,
                  title: tab.title,
                  favIcon: tab.favIconUrl ? tab.favIconUrl : "",
                  url: tab.url,
                  comment: trimmedText,
                  commentColor: false,
                  note: true,
                  todo: false,
                  justAdded: false,
                  doneStatus: false,
                  type: "textCopied",
                  dateCreated: dateCreated,
                },
              ];
              newData[index].tabs = newTabs;
              SaveBgData(newData, currentRef, urlArray);
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              sendErrorToFront(errorMessage, errorCode, 135);
              return;
            });
        } else {
          currentRef = doc.id;
          currentTabData = doc.data();
          urlArray = doc.data().urls;
          let urlClean = cleanUrl(tab.url);
          if (urlArray && urlClean) {
            urlArray.push(urlClean);
          } else if (urlClean) {
            urlArray = [urlClean];
          } else if (!urlArray) {
            urlArray = [];
          }
          let newData = [...currentTabData.tabData];
          const newId = create_UUID();
          let dateobj = new Date().toString();
          let dateCreated = dateobj;
          let trimmedText = textCopyied.slice(0, 2400);
          let newTabs = [
            ...newData[index].tabs,
            {
              id: newId,
              title: tab.title,
              favIcon: tab.favIconUrl ? tab.favIconUrl : "",
              url: tab.url,
              comment: trimmedText,
              commentColor: false,
              note: true,
              todo: false,
              justAdded: false,
              doneStatus: false,
              type: "textCopied",
              dateCreated: dateCreated,
            },
          ];
          newData[index].tabs = newTabs;
          SaveBgData(newData, currentRef, urlArray);
        }
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendErrorToFront(errorMessage, errorCode, 14);
    });
};

const SaveBgData = async (newData, ref, urlArray, sendResponse, WSidToFront) => {
  if (sendResponse) {
    let userId = firebase.auth().currentUser.uid;
    let trialLimitReached = await checkTrialLimit(userId);
    if (trialLimitReached) {
      console.log("trialLimitReached: ", trialLimitReached);
      sendResponse({ msg: "trailLimitReached" });
      return;
    }
  }
  db.collection("items")
    .doc(ref)
    .update({
      lastTypeUpdated: "tab",
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      tabData: newData,
      "userInfo.itemsSaved": firebase.firestore.FieldValue.increment(1),
      ...(urlArray && { urls: urlArray }),
    })
    .then(function (docRef) {
      if (WSidToFront) {
        queryAndSendtoFrontWithWSId(WSidToFront, newData);
      } else {
        queryAndSendtoFront("newTabData", newData);
      }
      if (sendResponse) {
        console.log("6. sendResponse success");
        sendResponse({ msg: "success" });
      }
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (sendResponse) {
        sendResponse({ msg: "error", content: errorMessage });
      }
      sendErrorToFront(errorMessage, errorCode, 13);
    });
};

const updateMultipleFront = (data) => {
  chrome.tabs.query(
    {
      url: ["chrome://newtab/", extensionUrl],
    },
    function (tab) {
      if (tab.length > 1) {
        tab.forEach((tab) => {
          if (tab.active === true) {
            return;
          } else {
            let newData = data.tabData;
            newData.forEach((e) => (e.focus = false));
            chrome.tabs.sendMessage(tab.id, {
              msg: "updateDataOnFront",
              data: newData,
              active: false,
            });
          }
        });
      } else return;
    }
  );
};

const saveToLocal = (key, data) => {
  let dataToSave = { [key]: data };
  chrome.storage.local.set(dataToSave, function () {});
};

/* const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )

await setStorageData({ data: [someData] }) */

const captureThumbnail = (tab) => {
  if (
    !tab.url.includes("chrome://") &&
    !tab.url.includes("chrome-extension://") &&
    !tab.url.includes("https://chrome.google.com/webstore")
  ) {
    chrome.tabs.captureVisibleTab(null, { quality: 20 }, function (dataUrl) {
      let url = tab.url;
      //let base = new URL(url);
      //let key = base.host;
      saveToLocal(url, dataUrl);
    });
  }
};

chrome.tabs.onUpdated.addListener(function (id, info, tab) {
  if (tab.groupId !== -1) {
    tabGroups[id] = tab.groupId;
  }
  //Checka globalstate (storage) om thumbnail permission är true ->
  if (info.url === "chrome://newtab/") {
    newTabs[id] = tab.url;
  } else if (info.status === "complete" && tab.active === true) {
    //let groupId = tab.groupId;
    /* chrome.tabGroups.get({ groupId: groupId }, (i) => {
      console.log(i);
    }); */
    _on = false;
    captureThumbnail(tab);
  } else return;
});

/* chrome.tabGroups.onCreated.addListener(function (info) {
  console.log("info: ", info);
}); 
chrome.tabs.onRemoved.addListener(listener: function)
*/

//newTabs = {}
chrome.tabs.onRemoved.addListener((tabId, info) => {
  /* if (newTabs[tabId]) {
    //TODO unsubb all
    unsubscribe();
  } */
  // if (info.isWindowClosing) {}
  if (tabGroups[tabId]) {
    let groupId = tabGroups[tabId];
    chrome.tabs.query({ groupId: groupId }, (tabs) => {
      if (tabs.length === 0) {
        let openGroupsData = JSON.parse(localStorage.getItem("openGroupsData"));
        if (openGroupsData !== null) {
          let filteredGroupsData = openGroupsData.filter((group) => group.groupId !== groupId);
          localStorage.setItem("openGroupsData", JSON.stringify(filteredGroupsData));
        }
      }
    });
    delete tabGroups[tabId];
    //rensa local storage på
    /* let openGroupsData = JSON.parse(localStorage.getItem("openGroupsData"));
    openGroupsData.filter((group) => group.groupId === info.groupId)
    console.log("Rensar localstorage: ", openGroupsData)
    localStorage.setItem("openGroupsData", JSON.stringify(openGroupsData)); */
  }
  delete newTabs[tabId];
  let length = Object.keys(newTabs).length;
  if (length < 1) {
    unsubscribe && unsubscribe();
  }
});

chrome.tabs.onActivated.addListener((activeTabId) => {
  _on = false;
  chrome.tabs.query({ active: true }, (tab) => {
    if (tab[0].status === "complete") {
      captureThumbnail(tab[0]);
    } else return;
  });
});

//! New From shadow dom

let enable = (tab) => {
  blockToastClose = true;
  setTimeout(() => {
    blockToastClose = false;
  }, "2600");
  if (tab.url.includes("chrome://")) {
    chrome.tabs.create({
      url: "/index.html",
    });
    return;
  }
  //captureThumbnail(tab);
  chrome.tabs.executeScript(tab.id, { file: "/static/js/extension.js" }, () => {
    //chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tab.id, { msg: "tabsQueryFromBg", tab: tab });
    let unsubUserAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // firebase.auth().signOut();
        console.log("User är inloggad: ", user);
        //chrome.tabs.sendMessage(tab.id, { msg: "userData", tabs: tabs });
        //let currentUrl = tabs.filter((tab) => tab.active === true)[0].url;
        isUrlSaved(tab.id, tab.url);
        unsubUserAuth();
        //setupListener();
        //Sätt rad 78-79 här -> query + send
      } else {
        console.log("sending message: noUserSignedIn");
        chrome.tabs.create({
          url: "/index.html",
        });
        //Öppna newtab här -> createtab index.html
        // firebase
        //   .auth()
        //   .signInWithEmailAndPassword("brave@testar.ju", "1234567")
        //   .then(function (result) {
        //     console.log("User logged in!", result);
        //   })
        //   .catch(function (error) {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log(errorMessage);
        //   });
        //queryPopoverAndSend("noUserSignedIn", []);
      }
    });
    //});
  });
};

const setBadge = (tabId, text) => {
  chrome.browserAction.setBadgeText({ tabId: tabId, text: text });
  chrome.browserAction.setBadgeBackgroundColor({ tabId: tabId, color: "#409FF7" });
};

const isUrlSaved = async (tabId, url) => {
  let userId = firebase.auth().currentUser.uid;
  url = cleanUrl(url);
  let snapshot = await db
    .collection("items")
    .where("owner", "==", userId)
    .where("urls", "array-contains", url)
    .get();
  let urlCount = 0;
  if (snapshot.empty) {
    chrome.tabs.sendMessage(tabId, {
      msg: "savedStatus",
      status: "notSaved",
    });
    setBadge(tabId, "0");
  } else {
    let finalArr = [];
    for (let doc of snapshot.docs) {
      let data = doc.data();
      let urls = data.urls;
      let urlCountLocal = urls.reduce((total, x) => (x == url ? total + 1 : total), 0);
      urlCount = urlCountLocal + urlCount;
      if (data.shareLinkDoc === true) {
        let sharedSnapshot = await db.collection("items").doc(data.sharedRef).get();
        let sharedData = sharedSnapshot.data();
        if (sharedData?.tabData) {
          let groupObjShared = getGroupObj(
            sharedData.tabData,
            url,
            sharedData.categories,
            data.sharedRef,
            false
          );
          finalArr.push(...groupObjShared);
        }
        if (sharedData && finalArr.length !== urlCount) {
          for (let category of sharedData.categories) {
            if (category.shared) {
              let sharedCatSnapshot = await db.collection("shared").doc(category.slug).get();
              let sharedCategory = sharedCatSnapshot.data();
              if (sharedCategory?.tabData) {
                let groupObjSharedCat = getGroupObj(
                  sharedCategory.tabData,
                  url,
                  sharedData.categories,
                  data.sharedRef,
                  category.slug
                );
                finalArr.push(...groupObjSharedCat);
              }
            }
          }
          // chrome.tabs.sendMessage(tabId, {
          //   msg: "savedStatus",
          //   status: "isSaved",
          //   data: finalArr,
          // });
        }
      } else {
        if (data?.tabData) {
          let groupObj = getGroupObj(data.tabData, url, data.categories, doc.id, false);
          finalArr.push(...groupObj);
        }
        if (finalArr.length !== urlCount) {
          for (let category of data.categories) {
            if (category.shared) {
              let sharedSnapshot = await db.collection("shared").doc(category.slug).get();
              let sharedData = sharedSnapshot.data();
              //let sharedCategory = doc.data();
              if (sharedData?.tabData) {
                let groupObjShared = getGroupObj(
                  sharedData.tabData,
                  url,
                  data.categories,
                  doc.id,
                  category.slug
                );
                finalArr.push(...groupObjShared);
              }
            }
          }
        }
      }
    }
    chrome.tabs.sendMessage(tabId, {
      msg: "savedStatus",
      status: "isSaved",
      data: finalArr,
    });
    setBadge(tabId, "" + finalArr.length);
  }
};

const getGroupObj = (tabData, url, categories, refId, sharedRefId) => {
  let groupObj = [];
  tabData.forEach((group, groupIndex) => {
    if (group?.tabs) {
      group.tabs.map((item, itemIndex) => {
        if (item.isStacked) {
          item.stackedItems.map((itemInStack, stackIndex) => {
            cleanUrl(itemInStack.url);
            let urlInStackClean = cleanUrl(itemInStack.url);
            if (urlInStackClean === url) {
              let inCategory = categories.filter((cat) => cat.id === group.categoryID)[0].name;
              groupObj.push({
                title: group.title,
                emoji: group.emoji,
                id: itemInStack.id,
                inCategory: inCategory,
                isStacked: item.stackedItems,
                stackIndex: stackIndex,
                itemObj: itemInStack,
                groupIndex: groupIndex,
                itemIndex: itemIndex,
                refId: refId,
                sharedRefId: sharedRefId,
              });
            }
          });
        } else {
          let itemUrlClean = cleanUrl(item.url);
          if (itemUrlClean === url) {
            let inCategory = categories.filter((cat) => cat.id === group.categoryID)[0].name;
            groupObj.push({
              title: group.title,
              emoji: group.emoji,
              id: item.id,
              inCategory: inCategory,
              isStacked: false,
              itemObj: item,
              groupIndex: groupIndex,
              itemIndex: itemIndex,
              refId: refId,
              sharedRefId: sharedRefId,
            });
          }
        }
      });
    }
  });
  return groupObj;
};

/* let findCurrentTab = () => {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then(function (doc) {
      const userData = doc.data();
      queryPopoverAndSend("userDataFromBg", userData);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}; */

let getUserDataSendToPopover = (sendResponse) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      let userData = doc.data();
      db.collection("items")
        .where("owner", "==", userId)
        .where("workspace", "==", true)
        .get()
        .then((querySnapshot) => {
          let tabData = querySnapshot.docs[0].data();
          let refId = querySnapshot.docs[0].id;
          if (tabData.shareLinkDoc === true) {
            db.collection("items")
              .doc(tabData.sharedRef)
              .get()
              .then((doc) => {
                let sharedData = doc.data();
                let refIdShared = doc.id;
                fetchAllDataPart2(userData, sharedData, refIdShared, sendResponse);
              });
          } else {
            fetchAllDataPart2(userData, tabData, refId, sendResponse);
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

let getWsDataSendToPopover = (WSid, sendResponse) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", WSid)
    .get()
    .then((querySnapshot) => {
      let tabData = querySnapshot.docs[0].data();
      if (tabData.shareLinkDoc === true) {
        db.collection("items")
          .doc(tabData.sharedRef)
          .get()
          .then((doc) => {
            let sharedData = doc.data();
            fetchAllDataPart2([], sharedData, tabData.sharedRef, sendResponse);
          });
      } else {
        fetchAllDataPart2([], tabData, querySnapshot.docs[0].id, sendResponse);
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
};

const fetchAllDataPart2 = async (userData, tabData, refId, sendResponse) => {
  let sharedData = [];
  for (const cat of tabData.categories) {
    if (cat.shared) {
      await db
        .collection("shared")
        .doc(cat.slug)
        .get()
        .then((doc) => {
          let sharedCatData = doc.data();
          sharedData.push(...sharedCatData.tabData);
        });
    }
  }
  let allTabData = [...sharedData, ...tabData.tabData];
  tabData.tabData = allTabData;
  sendResponse({ firstCargo: userData.workspaces, secondCargo: tabData, thirdCargo: refId });
};

let disable = (tab) => {
  chrome.tabs.sendMessage(tab.id, {
    msg: "popoverDisabled",
  });
  let code = `document.querySelector('#tabExtend').remove()`;
  chrome.tabs.executeScript(tab.id, { code: code }, () => {
    _on = false;
    console.log("settning on to false -> ", _on);
  });
};

const saveToSharedGroup = (
  groupId,
  tab,
  slug,
  comment,
  todo,
  doneStatus,
  commentColor,
  sendResponse
) => {
  let userId = firebase.auth().currentUser.uid;
  let currentRef;
  const newId = create_UUID();
  let dateobj = new Date().toString();
  let dateCreated = dateobj;
  comment = comment ? comment : "";
  let newTab = {
    id: newId,
    title: tab.title,
    favIcon: tab.favIconUrl ? tab.favIconUrl : "",
    url: tab.url,
    comment: comment,
    commentColor: commentColor,
    note: comment.length > 0 ? true : false,
    todo: todo,
    justAdded: false,
    doneStatus: doneStatus,
    dateCreated: dateCreated,
  };
  db.collection("shared")
    .doc(slug)
    .get()
    .then((doc) => {
      let currentTabData = doc.data();
      //currentTabData = doc.data();
      let newData = [...currentTabData.tabData];
      let index = newData.findIndex((group) => group.id === groupId);
      let newTabs = [...newData[index].tabs, newTab];
      newData[index].tabs = newTabs;
      let updateData = { tabData: newData };
      queryAndSendtoFrontWithWSId(currentTabData.inWSid, newData);
      updatePublicData(slug, userId, updateData, sendResponse, tab.url, currentTabData.originRef);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorMessage: ", errorMessage);
      sendResponse({ msg: "error", content: errorMessage });
    });
};

const saveToGroupInWS = (
  groupId,
  tab,
  WSid,
  comment,
  todo,
  doneStatus,
  commentColor,
  sendResponse
) => {
  let userId = firebase.auth().currentUser.uid;
  let currentTabData = [];
  let currentRef;
  const newId = create_UUID();
  let dateobj = new Date().toString();
  let dateCreated = dateobj;
  let urlArray;
  comment = comment ? comment : "";
  let newTab = {
    id: newId,
    title: tab.title,
    favIcon: tab.favIconUrl ? tab.favIconUrl : "",
    url: tab.url,
    comment: comment,
    commentColor: commentColor,
    note: comment.length > 0 ? true : false,
    todo: todo,
    justAdded: false,
    doneStatus: doneStatus,
    dateCreated: dateCreated,
  };
  db.collection("items")
    .where("owner", "==", userId)
    .where("WSid", "==", WSid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let tempData = doc.data();
        let isSharedLinkDoc = tempData.shareLinkDoc ? tempData.shareLinkDoc : false;
        if (isSharedLinkDoc) {
          currentRef = tempData.sharedRef;
          db.collection("items")
            .doc(currentRef)
            .get()
            .then(function (doc) {
              currentTabData = doc.data();
              urlArray = doc.data().urls;
              let urlClean = cleanUrl(tab.url);
              if (urlArray && urlClean) {
                urlArray.push(urlClean);
              } else if (urlClean) {
                urlArray = [urlClean];
              } else if (!urlArray) {
                urlArray = [];
              }
              let newData = [...currentTabData.tabData];
              let index = newData.findIndex((group) => group.id === groupId);
              let newTabs = [...newData[index].tabs, newTab];
              newData[index].tabs = newTabs;
              SaveBgData(newData, currentRef, urlArray, sendResponse, WSid);
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              sendResponse({ msg: "error", content: errorMessage });
              return;
            });
        } else {
          currentRef = doc.id;
          currentTabData = doc.data();
          urlArray = doc.data().urls;
          let urlClean = cleanUrl(tab.url);
          if (urlArray && urlClean) {
            urlArray.push(urlClean);
          } else if (urlClean) {
            urlArray = [urlClean];
          } else if (!urlArray) {
            urlArray = [];
          }
          let newData = [...currentTabData.tabData];
          let index = newData.findIndex((group) => group.id === groupId);
          let newTabs = [...newData[index].tabs, newTab];
          newData[index].tabs = newTabs;
          SaveBgData(newData, currentRef, urlArray, sendResponse, WSid);
        }
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
    });
};

const updateWS = (updateData, type, refId, sendResponse) => {
  let userId = firebase.auth().currentUser.uid;
  db.collection("items")
    .doc(refId)
    .update({
      lastUser: userId,
      lastTypeUpdated: type,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      ...updateData,
    })
    .then(function () {
      sendResponse({ msg: "success" });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
      sendErrorToFront(errorMessage, errorCode, 400);
    });
};

const updateItemInWS = (
  groupIndex,
  itemIndex,
  refId,
  itemObj,
  isStacked,
  stackIndex,
  type,
  sendResponse
) => {
  db.collection("items")
    .doc(refId)
    .get()
    .then((doc) => {
      let newData = doc.data();
      if (type === "delete") {
        let urlClean = cleanUrl(itemObj.url);
        let urlIndex = newData.urls.indexOf(urlClean);
        if (urlIndex !== -1) {
          newData.urls.splice(urlIndex, 1);
        }
        if (isStacked) {
          let length = newData[groupIndex].tabs[itemIndex].stackedItems.length;
          if (length > 1) {
            newData.tabData[groupIndex].tabs[itemIndex].stackedItems.splice(stackIndex, 1);
          } else {
            newData.tabData[groupIndex].tabs.splice(itemIndex, 1);
          }
        } else {
          newData.tabData[groupIndex].tabs.splice(itemIndex, 1);
        }
        let updateData = {
          tabData: newData.tabData,
          urls: newData.urls,
        };
        // TODO update multiple fronts
        //updateMultipleFront(updateData);
        queryAndSendtoFrontWithWSId(newData.WSid, newData.tabData);
        updateWS(updateData, "deleteData", refId, sendResponse);
      } else {
        if (isStacked) {
          newData.tabData[groupIndex].tabs[itemIndex].stackedItems[stackIndex] = itemObj;
        } else {
          newData.tabData[groupIndex].tabs[itemIndex] = itemObj;
        }
        let updateData = {
          tabData: newData.tabData,
        };
        queryAndSendtoFrontWithWSId(newData.WSid, newData.tabData);
        updateWS(updateData, "tab", refId, sendResponse);
      }
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
    });
};

const updateItemInWSShared = (
  groupIndex,
  itemIndex,
  refId,
  itemObj,
  isStacked,
  stackIndex,
  type,
  sharedRefId,
  sendResponse
) => {
  let userId = firebase.auth().currentUser.uid;

  db.collection("shared")
    .doc(sharedRefId)
    .get()
    .then((doc) => {
      let newData = doc.data();
      //let newData = [...WSData];

      if (type === "delete") {
        db.collection("items")
          .doc(refId)
          .get()
          .then((itemDoc) => {
            let newItemsData = itemDoc.data();
            let urlClean = cleanUrl(itemObj.url);
            let urlIndex = newItemsData.urls.indexOf(urlClean);
            if (urlIndex !== -1) {
              newItemsData.urls.splice(urlIndex, 1);
            }
            if (isStacked) {
              let length = newData[groupIndex].tabs[itemIndex].stackedItems.length;
              if (length > 1) {
                newData.tabData[groupIndex].tabs[itemIndex].stackedItems.splice(stackIndex, 1);
              } else {
                newData.tabData[groupIndex].tabs.splice(itemIndex, 1);
              }
            } else {
              newData.tabData[groupIndex].tabs.splice(itemIndex, 1);
            }
            let updateData = {
              urls: newItemsData.urls,
            };
            //TODO batch update of both docs + deleteditems
            let updateDeleteData = { tabData: newData.tabData };
            //updateMultipleFront(updateDeleteData);
            queryAndSendtoFrontWithWSId(newItemsData.WSid, newData.tabData);
            updatePublicData(sharedRefId, userId, updateDeleteData, sendResponse);
            updateWS(updateData, "tab", refId, sendResponse);
          });
      } else {
        if (isStacked) {
          newData.tabData[groupIndex].tabs[itemIndex].stackedItems[stackIndex] = itemObj;
        } else {
          newData.tabData[groupIndex].tabs[itemIndex] = itemObj;
        }
        let updateData = { tabData: newData.tabData };
        queryAndSendtoFrontWithWSId(newData.inWSid, newData.tabData);
        updatePublicData(sharedRefId, userId, updateData, sendResponse);
      }
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      sendResponse({ msg: "error", content: errorMessage });
    });
};

const checkTrialLimit = async (userId) => {
  let trialLimitReached = false;
  await db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      let userData = doc.data();
      if (userData.userPlan === "trialLimitReached") {
        trialLimitReached = true;
      }
    });
  return trialLimitReached;
};
