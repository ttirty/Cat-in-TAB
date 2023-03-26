(this["webpackJsonpdroptabs"] = this["webpackJsonpdroptabs"] || []).push([
    [2],
    [
        /* 0 */
        ,
        /* 1 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
            var toConsumableArray = __webpack_require__(7);

            // EXTERNAL MODULE: ./node_modules/zustand/index.js
            var zustand = __webpack_require__(64);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
            var objectSpread2 = __webpack_require__(38);

            // EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v1.js + 2 modules
            var v1 = __webpack_require__(221);

            // CONCATENATED MODULE: ./src/stores/actions/categoryActions.js
            /* global chrome */
            var saveCategory = function saveCategory(set, get, value) {
                if (value !== get().category) { set({ isLoadingCats: true }); } set({ category: value });
                localStorage.setItem('categorySelected', value);
                /* chrome.runtime.sendMessage({
                    msg: "changeCategorySelected",
                    data: { category: value },
                  }); */
            };
            var setOpenGroupsLocalData = function setOpenGroupsLocalData(set, get, value) {
                set({ openGroups: value });
                localStorage.setItem('openGroupsData', JSON.stringify(value));
            };
            var saveCategories = function saveCategories(set, get, newData) {
                var workspaces = false;
                if (get().userState.workspaces !== undefined) {
                    workspaces = get().userState.workspaces;
                    var currentWSid = get().currentWSid;
                    var index = workspaces.findIndex(function(target) { return target.id === currentWSid; });
                    workspaces[index].catLength = newData.length;
                    workspaces[index].catData = newData;
                }
                if (newData.length > 0) {
                    set({ categories: newData });
                    chrome.runtime.sendMessage({ msg: 'addCategorieData', currentWSid: get().currentWSid, data: { categories: newData, tabData: get().tabs }, ws: { workspaces: workspaces } });
                }
            };
            var saveWSinfoAction = function saveWSinfoAction(set, get, id, newName, emoji) {
                var finalName = newName.slice(0, 24);
                var workspaces = false;
                if (get().userState === undefined) { return; }
                if (get().userState.workspaces !== undefined) {
                    workspaces = get().userState.workspaces;
                    var index = workspaces.findIndex(function(target) { return target.id === id; });
                    workspaces[index].emoji = emoji;
                    workspaces[index].name = finalName;
                    var ws;
                    if (workspaces[index].shared === true) { //Om ws är shared -> skicka ändringar till cloudf.
                        var globalWsChangesObj = { WSid: id, newName: newName, newEmoji: emoji };
                        ws = { workspaces: workspaces, globalWsChanges: [globalWsChangesObj] };
                    } else { ws = { workspaces: workspaces }; } chrome.runtime.sendMessage({ msg: 'saveWSinfo', ws: ws });
                } else { createFirstWS(get, finalName, emoji); }
            };
            var saveFirstWS = function saveFirstWS(get) { createFirstWS(get, 'Workspace 1', '📒'); };
            var createFirstWS = function createFirstWS(get, name, emoji) {
                var catData = get().categories;
                var currentCatLength = catData.length;
                var newData = get().userState;
                newData.workspaces = [{ id: '1', name: name, emoji: emoji, catLength: currentCatLength, catData: catData }];
                get().setUserState(newData);
                chrome.runtime.sendMessage({ msg: 'createFirstWS', currentCatLength: currentCatLength, catData: catData, name: name, emoji: emoji });
                get().setIsLoadingUser(false);
            };
            var moveToWorkspaceAction = function moveToWorkspaceAction(set, get, workspaceId, groupId, title, toCategory) { //console.log("workspaceId: ", workspaceId, "groupId: ", groupId);
                var newData = get().tabs;
                var fromIndex = newData.findIndex(function(space) { return space.id === groupId; });
                var cargo = newData[fromIndex];
                newData.splice(fromIndex, 1);
                get().setTabs(newData, 'deleteUpdate');
                chrome.runtime.sendMessage({ msg: 'sendDataToWorkspace', cargo: cargo, toWSid: workspaceId, toCategory: toCategory });
                var subtitle = 'Into: ' + title;
                get().setShowToast('Group moved', subtitle, 'success'); //get workspace -> tabs -> categories - 1 get
                //slice ur current tabs - 1 save
                //spara till ny tabs - 1 save
            };
            var deleteWSaction = function deleteWSaction(set, get, id, isShared) {
                if (get().userState === undefined || get().userState.workspaces.length === 1) { return; }
                if (get().userState.workspaces !== undefined) {
                    var workspaces = get().userState.workspaces;
                    var firstWSid = workspaces[0].id;
                    var currentWSid = get().currentWSid;
                    var changeToWS = id === currentWSid ? firstWSid : currentWSid;
                    var newWSdata = workspaces.filter(function(item) { return item.id !== id; });
                    var newData = get().userState;
                    newData.workspaces = newWSdata;
                    get().setUserState(newData);
                    if (id === currentWSid) {
                        get().setCurrentWSid(changeToWS);
                        get().setIsLoadingSpacesToShow(true);
                        get().setIsLoadingCategories(true);
                    }
                    chrome.runtime.sendMessage({ msg: 'deleteWS', isShared: isShared, ws: { workspaces: newWSdata }, id: id, changeToWS: changeToWS, currentWS: currentWSid });
                }
            };
            var denyInviteAction = function denyInviteAction(get, id) {
                get().setIsLoadingUser(true); //Comparee current id === id -> if so change WS
                var isCurrentLetsChange = false;
                var changeToWsId;
                if (get().currentWSid === id) {
                    isCurrentLetsChange = true;
                    var firstId = get().userState.workspaces[0].id;
                    changeToWsId = firstId !== id ? firstId : get().userState.workspaces[1].id;
                    get().setIsLoadingCategories(true);
                    get().setIsLoadingSpacesToShow(true); //changeWorkspaceAction(get, "first");
                }
                var newWorkspaces = get().userState.workspaces;
                var email = get().userState.email;
                var name = get().userState.userName;
                var index = newWorkspaces.findIndex(function(target) { return target.id === id; });
                var docRef = newWorkspaces[index].sharedRef;
                newWorkspaces.splice(index, 1);
                chrome.runtime.sendMessage({ msg: 'removeWorkspace', ws: newWorkspaces, docRef: docRef, email: email, name: name, isCurrentLetsChange: isCurrentLetsChange, changeFromId: id, changeToWsId: changeToWsId }, function(resp) {});
            };
            var changeWorkspaceAction = function changeWorkspaceAction(get, id, selectedCategory) { //loading
                //get().setIsLoadingCategories(true);
                //get().setIsLoadingSpacesToShow(true);
                get().setSharedHydrated([]);
                var currentWSid = get().currentWSid;
                var workspaces = get().userState.workspaces;
                var changeToFirstWS = false;
                var isOwner = false;
                var firstIndexedWS;
                if (id === 'first') {
                    changeToFirstWS = true;
                    firstIndexedWS = workspaces[0].id;
                } else {
                    var index = workspaces.findIndex(function(ws) { return ws.id === id; });
                    isOwner = workspaces[index].owner === false ? false : true;
                }
                var changeToCat = selectedCategory ? selectedCategory : 0;
                get().setCategorySelected(changeToCat);
                chrome.runtime.sendMessage({ msg: 'changeWorkspace', newWSid: changeToFirstWS ? firstIndexedWS : id, currentWSid: currentWSid, isOwner: isOwner }, function(response) {});
            };
            var categoryActions_newCategory = function newCategory(get) {
                var currentData = get().categories;
                var tabIndex = currentData.length + 1;
                var newData = [].concat(Object(toConsumableArray["a" /* default */ ])(currentData), [{ name: '', id: Object(v1["a" /* default */ ])(), tabIndex: tabIndex }]);
                get().setCategories(newData);
            }; //Korrar minispaces som visas wsPickern
            var categoryActions_correctCategoryLengthAction = function correctCategoryLengthAction(get, set, id, newLength) {
                if (get().userState.workspaces) {
                    var workspaces = get().userState.workspaces;
                    var index = workspaces.findIndex(function(target) { return target.id === id; });
                    workspaces[index].catLength = newLength;
                    var newData = Object(objectSpread2["a" /* default */ ])({}, get().userState);
                    newData.workspaces = workspaces;
                    get().setUserState(newData);
                    chrome.runtime.sendMessage({ msg: 'newUserData', data: { workspaces: workspaces } });
                } else return;
            };
            var deleteCategoryFunction = function deleteCategoryFunction(get, id, index, shared, slug) { //var restoreItems = get().tabs;
                var currentData = get().categories;
                var newData = currentData.filter(function(item) { return item.id !== id; });
                if (index === get().category) { get().setCategorySelected(0); }
                var newTabsData = get().tabs.filter(function(item) { return item.categoryID !== id; });
                var filteredData = newTabsData.filter(function(group) { return group.slug === undefined; });
                if (shared) {
                    get().setCategoriesState(newData);
                    var workspaces = false;
                    if (get().userState.workspaces !== undefined) {
                        workspaces = get().userState.workspaces;
                        var currentWSid = get().currentWSid;
                        var _index = workspaces.findIndex(function(target) { return target.id === currentWSid; });
                        workspaces[_index].catLength = newData.length;
                        workspaces[_index].catData = newData;
                    }
                    chrome.runtime.sendMessage({ msg: 'deleteSharedDoc', slug: slug, currentWSid: get().currentWSid, data: { tabData: filteredData, categories: newData }, ws: { workspaces: workspaces } });
                } else {
                    get().setTabs(newTabsData, 'deleteUpdate');
                    get().setCategories(newData);
                } //get().setCategorySelected(0);
            };
            // CONCATENATED MODULE: ./src/stores/actions/noteActions.js
            /* global chrome */
            var setDoneStatusFunction = function setDoneStatusFunction(get, isDone, spaceId, tabId) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === tabId; });
                newData[spaceIndex].tabs[tabIndex].doneStatus = isDone;
                get().setTabs(newData, 'fullUpdate');
            };
            var submitCommentAction = function submitCommentAction(get, value, spaceId, tabId, commentColor, todo) {
                var dateobj = new Date().toString();
                var dateCreated = dateobj;
                var userId = get().userState.userId;
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === tabId; });
                newData[spaceIndex].tabs[tabIndex].comment = value;
                newData[spaceIndex].tabs[tabIndex].commentColor = commentColor;
                newData[spaceIndex].tabs[tabIndex].todo = todo;
                newData[spaceIndex].tabs[tabIndex].editor = userId;
                if (newData[spaceIndex].tabs[tabIndex].justAdded === false) {
                    newData[spaceIndex].tabs[tabIndex].edited = dateCreated;
                    delete newData[spaceIndex].tabs[tabIndex].justAdded;
                } else { //newData[spaceIndex].tabs[tabIndex].justAdded = false;
                    delete newData[spaceIndex].tabs[tabIndex].justAdded;
                }
                if (get().userState.userPlan === 'trialLimitReached' || get().userState.userPlan === 'paused') {
                    newData[spaceIndex].tabs[tabIndex].wontSave = true;
                    get().setTabs(newData, 'tempDbUpdate');
                    get().setLimitDialogOpen(true);
                } else {
                    get().setTabs(newData, 'fullUpdate'); //get().setUserItems(get().userItems + 1);
                }
            };
            var removeCommentAction = function removeCommentAction(get, spaceId, tabId) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === tabId; });
                newData[spaceIndex].tabs[tabIndex].note = false;
                newData[spaceIndex].tabs[tabIndex].comment = '';
                get().setTabs(newData, 'deleteUpdate');
            };
            var noteActions_addNoteAction = function addNoteAction(get, id, prevNoteId, prevNoteType) {
                var newData = get().tabs;
                var userId = get().userState.userId;
                var newId = Object(v1["a" /* default */ ])();
                var dateobj = new Date().toString();
                var dateCreated = dateobj;
                var todo = prevNoteType ? true : false;
                var index = newData.findIndex(function(target) { return target.id === id; });
                var prevNoteIndex = prevNoteId ? newData[index].tabs.findIndex(function(target) { return target.id === prevNoteId; }) + 1 : newData[index].tabs.length;
                var newNote = { id: newId, title: 'Note', favIcon: '', url: '', comment: '', commentColor: false, note: true, todo: todo, justAdded: true, dateCreated: dateCreated, editor: userId };
                newData[index].tabs.splice(prevNoteIndex, 0, newNote); //newData[index].tabs = newTabs;
                get().setTabs(newData, 'tempDbUpdate');
                get().setUserItems(get().userItems + 1); //setTabs(newData, newData => sendUpdateToDB(newData))
            };
            var discardNoteAction = function discardNoteAction(get, spaceId, tabId) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var deleted = newData[spaceIndex].tabs.filter(function(item) { return item.id !== tabId; });
                newData[spaceIndex].tabs = deleted;
                get().setUserItems(get().userItems - 1);
                get().setTabs(newData, 'tempDbUpdate');
            };
            var restoreTabsAfterDeletedAction = function restoreTabsAfterDeletedAction(get, spaceIndex, tabsToRe) {
                var newData = get().tabs; //var spaceIndex = newData.findIndex(target => target.id === spaceId)
                newData[spaceIndex].tabs = tabsToRe;
                get().setTabs(newData, 'deleteUpdate');
            };
            var deleteOrCloseAction = function deleteOrCloseAction(get, activeTabSelection, selectedItems) {
                if (activeTabSelection === false) { deleteItems(get, selectedItems); } else {
                    var newActiveTabs = get().activeTabs;
                    selectedItems.forEach(function(id) {
                        var tabIndex = newActiveTabs.findIndex(function(item) { return item.id === id; });
                        var tab = newActiveTabs[tabIndex];
                        var browserId = tab.browserId;
                        chrome.tabs.remove(browserId);
                        newActiveTabs.splice(tabIndex, 1);
                    });
                    get().setActiveTabs(newActiveTabs); //unselectAllAction();
                }
            };
            var deleteItems = function deleteItems(get, selectedItems) {
                var tabs = get().tabs;
                var newTabs = get().tabs;
                var countLenght = selectedItems.length;
                var resArray = tabs.map(function(space, index) { return null; });
                var deletedItemArray = [];
                selectedItems.forEach(function(idToRemove) {
                    var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === idToRemove; }); }).id;
                    var spaceIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                    var filteredTabs = newTabs[spaceIndex].tabs.filter(function(tab) { return tab.id !== idToRemove; });
                    var deletedItem = newTabs[spaceIndex].tabs.filter(function(tab) { return tab.id === idToRemove; });
                    deletedItemArray.push(deletedItem[0]);
                    if (resArray[spaceIndex] === null) { resArray.splice(spaceIndex, 1, newTabs[spaceIndex].tabs); } newTabs[spaceIndex].tabs = filteredTabs;
                });
                get().setTabs(newTabs, 'deleteUpdate');
                if (deletedItemArray.length === 1) { get().setDeletedData([deletedItemArray[0]], 'item'); } else { get().setDeletedData(deletedItemArray, 'item'); } //get().setDeletedData(deletedItem[0], "item")
                var toastMessage = countLenght + ' items deleted';
                get().setPrevTabs(resArray);
                get().setShowToast(toastMessage, resArray, 'restoreMultiple'); //resClick(resArray, countLenght, get);
                //setKeepSelectionAction();
                //unselectAllAction();
            };
            // EXTERNAL MODULE: ./src/Utils/defaultEmojis.js
            var defaultEmojis = __webpack_require__(56);

            // CONCATENATED MODULE: ./src/stores/actions/spaceActions.js
            /* global chrome */
            var submitEmojiAction = function submitEmojiAction(get, emoji, id) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === id; });
                newData[index].emoji = emoji;
                get().setTabs(newData, 'deleteUpdate');
            };
            var submitTitleAction = function submitTitleAction(get, newTitle, id) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === id; });
                newData[index].title = newTitle;
                newData[index].focus = false;
                get().setTabs(newData, 'deleteUpdate');
            };
            var submitStackTitleAction = function submitStackTitleAction(get, newTitle, stackId, spaceId) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var itemIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === stackId; });
                newData[spaceIndex].tabs[itemIndex].title = newTitle; //newData[index].title = newTitle;
                //newData[index].focus = false;
                get().setTabs(newData, 'deleteUpdate');
            };
            var spaceActions_duplicateGroupAction = function duplicateGroupAction(get, set, spaceId) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === spaceId; });
                var duplicatedSpace = Object(objectSpread2["a" /* default */ ])({}, newData[index]);
                var newtabs = [];
                duplicatedSpace.tabs.forEach(function(item) {
                    var clone = Object(objectSpread2["a" /* default */ ])({}, item);
                    var newId = Object(v1["a" /* default */ ])();
                    clone.id = newId;
                    newtabs.push(clone);
                });
                var newId = Object(v1["a" /* default */ ])();
                duplicatedSpace.id = newId;
                duplicatedSpace.tabs = newtabs;
                var lastStringPos = duplicatedSpace.title.charAt(duplicatedSpace.title.length - 1);
                var nextlastStringPos = duplicatedSpace.title.charAt(duplicatedSpace.title.length - 2);
                var nextnextLastStringPos = duplicatedSpace.title.charAt(duplicatedSpace.title.length - 3);
                var newTitle;
                if (lastStringPos === ')' && nextlastStringPos >= '0' && nextlastStringPos <= '9' && nextnextLastStringPos === '(') {
                    newTitle = duplicatedSpace.title.slice(0, -3) + '(' + (parseInt(nextlastStringPos) + 1) + ')';
                    console.log(newTitle);
                } else { newTitle = duplicatedSpace.title + '(1)'; } duplicatedSpace.title = newTitle;
                newData.push(duplicatedSpace);
                get().setTabs(newData, 'deleteUpdate');
            };
            var submitSiteDetailsAction = function submitSiteDetailsAction(get, spaceId, tabId, newTitle, newUrl, isStacked) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === tabId; });
                if (isStacked) {
                    var stackedIndex = newData[spaceIndex].tabs[tabIndex].stackedItems.findIndex(function(tab) { return tab.id === isStacked; });
                    newData[spaceIndex].tabs[tabIndex].stackedItems[stackedIndex].title = newTitle;
                    newData[spaceIndex].tabs[tabIndex].stackedItems[stackedIndex].url = newUrl;
                } else {
                    newData[spaceIndex].tabs[tabIndex].title = newTitle;
                    newData[spaceIndex].tabs[tabIndex].url = newUrl;
                }
                get().setTabs(newData, 'deleteUpdate');
            };
            var moveTabToSpaceAction = function moveTabToSpaceAction(set, get, toSpace, fromSpace, tabId, isStacked) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(target) { return target.id === fromSpace; });
                var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === tabId; });
                var toSpaceIndex = newData.findIndex(function(space) { return space.id === toSpace; });
                var payload;
                if (isStacked) {
                    var stackedIndex = newData[spaceIndex].tabs[tabIndex].stackedItems.findIndex(function(tab) { return tab.id === isStacked; });
                    payload = newData[spaceIndex].tabs[tabIndex].stackedItems[stackedIndex];
                    newData[spaceIndex].tabs[tabIndex].stackedItems.splice(stackedIndex, 1);
                    if (newData[spaceIndex].tabs[tabIndex].stackedItems.length === 1) {
                        var lastOne = newData[spaceIndex].tabs[tabIndex].stackedItems[0];
                        newData[spaceIndex].tabs[tabIndex].title = lastOne.title;
                        newData[spaceIndex].tabs[tabIndex].url = lastOne.url;
                        newData[spaceIndex].tabs[tabIndex].favIcon = lastOne.favIcon;
                        newData[spaceIndex].tabs[tabIndex].comment = lastOne.comment;
                        delete newData[spaceIndex].tabs[tabIndex].stackedItems;
                        delete newData[spaceIndex].tabs[tabIndex].isStacked;
                    }
                } else {
                    payload = newData[spaceIndex].tabs.filter(function(tab) { return tab.id === tabId; })[0];
                    newData[spaceIndex].tabs.splice(tabIndex, 1);
                }
                var fromCatSlug = newData[spaceIndex].slug ? newData[spaceIndex].slug : false;
                var toCatSlug = newData[toSpaceIndex].slug ? newData[toSpaceIndex].slug : false;
                if (fromCatSlug === false && toCatSlug === false) {
                    newData[toSpaceIndex].tabs.push(payload);
                    get().setTabs(newData, 'deleteUpdate');
                } else {
                    var newHydration = get().sharedHydrated.filter(function(slug) { return slug !== toCatSlug; });
                    var newFilteredData = newData.filter(function(group) { return group.slug !== toCatSlug; });
                    set({ sharedHydrated: newHydration });
                    get().setTabs(newFilteredData, 'deleteUpdate');
                    var fromData = fromCatSlug ? newData.filter(function(group) { return group.categoryID === newData[spaceIndex].categoryID; }) : null;
                    var allDatafiltered = get().tabs.filter(function(group) { return group.slug === undefined; });
                    var nonPubData = toCatSlug ? null : allDatafiltered[toSpaceIndex].tabs.push(payload);
                    var toGroupId = newData[toSpaceIndex].id;
                    chrome.runtime.sendMessage({ msg: 'saveItemToPublic', fromCatSlug: fromCatSlug, toCatSlug: toCatSlug, payload: payload, fromData: fromData, toData: nonPubData, allDatafiltered: allDatafiltered, multipleItems: false, toGroupId: toGroupId, WSid: get().currentWSid });
                }
            };
            var moveSelectionToSpaceAction = function moveSelectionToSpaceAction(set, get, toSpace, selectionIds) {
                var newData = get().tabs;
                var payload = [];
                selectionIds.forEach(function(id) {
                    var spaceId = newData.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                    var spaceIndex = newData.findIndex(function(item) { return item.id === spaceId; });
                    var tabIndex = newData[spaceIndex].tabs.findIndex(function(target) { return target.id === id; });
                    var tabToMove = newData[spaceIndex].tabs[tabIndex];
                    payload.push(tabToMove);
                    newData[spaceIndex].tabs.splice(tabIndex, 1);
                });
                var toSpaceIndex = newData.findIndex(function(space) { return space.id === toSpace; });
                var currentCat = get().categories[get().category];
                var fromCatSlug = currentCat.slug ? currentCat.slug : false;
                var toCatSlug = newData[toSpaceIndex].slug ? newData[toSpaceIndex].slug : false;
                if (fromCatSlug === false && toCatSlug === false) {
                    var _newData$toSpaceIndex;
                    (_newData$toSpaceIndex = newData[toSpaceIndex].tabs).push.apply(_newData$toSpaceIndex, payload);
                    get().setTabs(newData, 'deleteUpdate');
                } else {
                    var _allDatafiltered$toSp;
                    var newHydration = get().sharedHydrated.filter(function(slug) { return slug !== toCatSlug; });
                    var newFilteredData = newData.filter(function(group) { return group.slug !== toCatSlug; });
                    set({ sharedHydrated: newHydration });
                    get().setTabs(newFilteredData, 'deleteUpdate');
                    var fromData = fromCatSlug ? newData.filter(function(group) { return group.categoryID === currentCat.id; }) : null;
                    var allDatafiltered = get().tabs.filter(function(group) { return group.slug === undefined; });
                    var nonPubData = toCatSlug ? null : (_allDatafiltered$toSp = allDatafiltered[toSpaceIndex].tabs).push.apply(_allDatafiltered$toSp, payload);
                    var toGroupId = newData[toSpaceIndex].id;
                    chrome.runtime.sendMessage({ msg: 'saveItemToPublic', fromCatSlug: fromCatSlug, toCatSlug: toCatSlug, payload: payload, fromData: fromData, toData: nonPubData, allDatafiltered: allDatafiltered, multipleItems: true, toGroupId: toGroupId, WSid: get().currentWSid });
                }
            };
            var removeSitesFromGroupAction = function removeSitesFromGroupAction(get, spaceId, idsToKeep, anyStacksInGroup) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(item) { return item.id === spaceId; });
                var tabArr = newData[spaceIndex].tabs; //console.log('tabArr: ', tabArr, 'idsToKeep: ', idsToKeep);
                var reducedArr;
                if (anyStacksInGroup) {
                    reducedArr = tabArr.filter(function(_ref) {
                        var url = _ref.url,
                            note = _ref.note,
                            isStacked = _ref.isStacked;
                        return idsToKeep.includes(url) || note === true || isStacked === true;
                    });
                    reducedArr.forEach(function(item) {
                        if (item.isStacked) {
                            var reducedStack = item.stackedItems.filter(function(_ref2) {
                                var url = _ref2.url,
                                    note = _ref2.note;
                                return idsToKeep.includes(url) || note === true;
                            });
                            item.stackedItems = reducedStack;
                        } else return;
                    });
                } else {
                    reducedArr = tabArr.filter(function(_ref3) {
                        var url = _ref3.url,
                            note = _ref3.note;
                        return idsToKeep.includes(url) || note === true;
                    });
                }
                newData[spaceIndex].tabs = reducedArr;
                get().setTabs(newData, 'deleteUpdate');
            };
            var spaceActions_addSitesToGroupAction = function addSitesToGroupAction(id, notYetSaved, get) { //let ids = [];
                var tabsToSave = notYetSaved.map(function(tab) {
                    if (tab) {
                        delete tab.active;
                        delete tab.browserId;
                        delete tab.pinned;
                        delete tab.saved; //ids.push(tab.id);
                    }
                    return tab;
                });
                /* console.log('ids', ids);
                    let newActiveTabs = get().activeTabs;
                    ids.forEach((id) => {
                        let index = newActiveTabs.findIndex((tab) => tab.id === id);
                        if (index) {
                            newActiveTabs[index].id = '123';
                        }
                    }); */ //get().setActiveTabs(newActiveTabs);
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(item) { return item.id === id; });
                var tabArr = newData[spaceIndex].tabs;
                var payload = [].concat(Object(toConsumableArray["a" /* default */ ])(tabArr), Object(toConsumableArray["a" /* default */ ])(tabsToSave));
                newData[spaceIndex].tabs = payload;
                get().updateActiveTabs();
                get().setTabs(newData, 'fullUpdate');
                get().setUserItems(get().userItems + 1);
            };
            var moveToCategoryAction = function moveToCategoryAction(set, get, spaceId, toCatId, title) {
                var subtitle = 'Into: ' + title;
                var newData = get().tabs;
                var categories = get().categories;
                var spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                var fromCatId = newData[spaceIndex].categoryID;
                var fromCat = categories.findIndex(function(target) { return target.id === fromCatId; });
                var toCat = categories.findIndex(function(target) { return target.id === toCatId; }); //let toCatId = newData[toCat].categoryID;
                //if
                newData[spaceIndex].categoryID = toCatId;
                var fromCatSlug = categories[fromCat].shared ? categories[fromCat].slug : false;
                var toCatSlug = categories[toCat].shared ? categories[toCat].slug : false; //update
                if (fromCatSlug === false && toCatSlug === false) { get().setTabs(newData, 'deleteUpdate'); } else {
                    var payload;
                    if (toCatSlug !== false) {
                        payload = newData[spaceIndex];
                        payload.slug = toCatSlug;
                        newData.splice(spaceIndex, 1);
                    } else { delete newData[spaceIndex].slug; }
                    var newHydration = get().sharedHydrated.filter(function(slug) { return slug !== toCatSlug; });
                    var newFilteredData = newData.filter(function(group) { return group.slug !== toCatSlug; });
                    set({ sharedHydrated: newHydration });
                    get().setTabs(newFilteredData, 'deleteUpdate');
                    var fromData = fromCatSlug ? newData.filter(function(group) { return group.categoryID === fromCatId; }) : null;
                    chrome.runtime.sendMessage({ msg: 'movePublicData', fromCatSlug: fromCatSlug, toCatSlug: toCatSlug, fromData: fromData, WSid: get().currentWSid, payload: payload, allTabData: { tabData: newData, categories: get().categories } });
                }
                get().setShowToast('Group moved', subtitle, 'success');
            };
            var deleteSpaceAction = function deleteSpaceAction(get, id) {
                var tabs = get().tabs;
                var groupIndex = tabs.findIndex(function(target) { return target.id === id; });
                var groupToRe = tabs[groupIndex];
                var payload = { groupIndex: groupIndex, groupToRe: groupToRe };
                var newSpace = tabs.filter(function(item) { return item.id !== id; }); //const restore = tabs;
                get().setDeletedData([groupToRe], 'group');
                get().setTabs(newSpace, 'deleteUpdate');
                get().setShowToast('Group deleted', payload, 'restore');
            };
            var spaceActions_addListAction = function addListAction(get) {
                var category = get().category;
                var tabs = get().tabs;
                var userId = get().userState.userId;
                var currentCategoryID = get().categories[category].id;
                var currentSlug = get().categories[category].slug && { slug: get().categories[category].slug };
                var spacesInCategorie = tabs.filter(function(tabs) { return tabs.categoryID === currentCategoryID; }).length;
                if (spacesInCategorie < 16) {
                    var dateCreated = new Date().toString();
                    var newId = Object(v1["a" /* default */ ])();
                    var len = defaultEmojis["a" /* default */ ].length;
                    var randomEmoji = defaultEmojis["a" /* default */ ][Math.floor(Math.random() * len)].emoji;
                    var oldTabs = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var newTabs = [].concat(Object(toConsumableArray["a" /* default */ ])(oldTabs), [Object(objectSpread2["a" /* default */ ])({ id: newId, title: 'Untitled', createdBy: userId, emoji: randomEmoji, categoryID: currentCategoryID, lastAdded: dateCreated, focus: true, tabs: [] }, currentSlug)]);
                    get().setShowToast('Group created', 'addSound', 'playFx');
                    get().setTabs(newTabs, 'fullUpdate');
                } else if (spacesInCategorie >= 16) { get().setShowToast('Max groups reached', 'Create a new category to create more groups', 'error'); }
            };
            var changeSpaceWidthAction = function changeSpaceWidthAction(get, id, width, shiftKeyActive) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === id; }); // Buggar sig, shift + resize -> alla groups ändrar size
                /* if (shiftKeyActive === true) {
                    let catId = newData[index].categoryID;
                    newData.forEach((group) => {
                      if (group.categoryID === catId) {
                        return (group.customWidth = width);
                      } else return;
                    });
                  } else {
                    newData[index].customWidth = width;
                  } */
                newData[index].customWidth = width;
                get().setTabs(newData, 'deleteUpdate');
            };
            var setCompactViewAction = function setCompactViewAction(get, spaceId, value) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === spaceId; });
                newData[index].compact = value;
                get().setTabs(newData, 'deleteUpdate');
            };
            var setLockGroupAction = function setLockGroupAction(get, spaceId, value) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === spaceId; });
                newData[index].locked = value;
                get().setTabs(newData, 'deleteUpdate');
            };
            var sortAlphabeticallyAction = function sortAlphabeticallyAction(get, spaceId, sortBy) {
                var newData = get().tabs;
                var index = newData.findIndex(function(target) { return target.id === spaceId; });
                var oldOrder = newData[index].tabs;
                if (oldOrder.length < 1) { get().setShowToast('No items to order', 'There seems to be no items in the group', 'success'); return; }
                if (sortBy === 'alphabetically') {
                    var newOrder = oldOrder.sort(function(a, b) { return a.comment.localeCompare(b.comment) || a.title.localeCompare(b.title); });
                    newData[index].tabs = newOrder;
                } else if (sortBy === 'date') {
                    var _newOrder = oldOrder.sort(function(a, b) { return a.dateCreated.localeCompare(b.dateCreated); });
                    newData[index].tabs = _newOrder;
                }
                var toastString = sortBy === 'alphabetically' ? 'alphabetically' : 'by date';
                get().setTabs(newData, 'deleteUpdate');
                get().setShowToast('Items sorted', 'The items in the groups has been sorted ' + toastString, 'success');
            };
            var copyContentAction = function copyContentAction(get, spaceId) {
                var tabs = get().tabs;
                var index = tabs.findIndex(function(target) { return target.id === spaceId; });
                var textToCopy = tabs[index].tabs.reduce(function(str, space) { return str + (space.url.length > 0 ? space.url + '\n' : '') + (space.comment.length > 0 ? space.comment + '\n' : ''); }, '');
                navigator.clipboard.writeText(textToCopy);
                get().setShowToast('Text copied', 'All text inside group copied to clipboard', 'success');
            };
            var dropSiteFromStackedAction = function dropSiteFromStackedAction(get, set, sitesInside, tabId, stackId, spaceId, lastOneInStackId) {
                var tabIndex = sitesInside.findIndex(function(tab) { return tab.id === tabId; });
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(space) { return space.id === spaceId; });
                var stackIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === stackId; });
                var cutOut = newData[spaceIndex].tabs[stackIndex].stackedItems.splice(tabIndex, 1);
                if (lastOneInStackId) {
                    var payload = newData[spaceIndex].tabs[stackIndex].stackedItems[0];
                    newData[spaceIndex].tabs[stackIndex].title = payload.title;
                    newData[spaceIndex].tabs[stackIndex].url = payload.url;
                    newData[spaceIndex].tabs[stackIndex].favIcon = payload.favIcon;
                    delete newData[spaceIndex].tabs[stackIndex].stackedItems;
                    delete newData[spaceIndex].tabs[stackIndex].isStacked;
                }
                var newIndex = stackIndex + 1;
                newData[spaceIndex].tabs.splice(newIndex, 0, cutOut[0]);
                set({ isLoadingGroup: newData[spaceIndex].id });
                get().setTabs(newData, 'deleteUpdate');
                var title = lastOneInStackId ? 'Two item unstacked' : 'One item unstacked';
                get().setShowToast(title, '', 'success');
            };
            var reOrderStackedSitesAction = function reOrderStackedSitesAction(get, set, fromIndex, toIndex, spaceId, stackId, payload) {
                var newData = get().tabs;
                var spaceIndex = newData.findIndex(function(space) { return space.id === spaceId; });
                var stackIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === stackId; });
                newData[spaceIndex].tabs[stackIndex].stackedItems.splice(fromIndex, 1);
                newData[spaceIndex].tabs[stackIndex].stackedItems.splice([toIndex], 0, payload);
                get().setTabs(newData, 'deleteUpdate');
            };
            // CONCATENATED MODULE: ./src/stores/actions/activeTabsActions.js
            /* global chrome */
            var clearThumbnailByKeyAction = function clearThumbnailByKeyAction(get, favIcon, tabIsSaved, url) { //let tabs = get().tabs;
                var activeTabs = get().activeTabs;
                /* let tabArrays = tabs.map((spaces) => {
                    return spaces.tabs;
                  });
                  let flatten = tabArrays.flat();
                  let siteIsSaved = flatten.some((e) => e.favIcon === favIcon); */
                var siteIsActive = activeTabs === null || activeTabs === void 0 ? void 0 : activeTabs.some(function(e) { return e.favIcon === favIcon; });
                var siteIsSaved = tabIsSaved ? true : false;
                var base = new URL(url);
                var key = base.host;
                if (siteIsActive !== true && siteIsSaved !== true) { chrome.storage.local.remove(key, function(result) {}); }
            };
            var clearUnusedThumbnailAction = function clearUnusedThumbnailAction(get) {
                var activeTabs = get().activeTabs;
                chrome.storage.local.get(function(allData) {
                    var savedUrls = Object.keys(allData);
                    var activeUrls = activeTabs.map(function(a) { return a.url; });
                    var result = savedUrls.filter(function(n) { return !activeUrls.includes(n); });
                    chrome.storage.local.remove(result, function(removed) {});
                });
            };
            var activeTabsActions_updateActiveTabsAction = function updateActiveTabsAction(get) {
                chrome.tabs.query({ currentWindow: true }, function(tabs) {
                    var tabArray = Object.values(tabs);
                    var dateobj = new Date().toString();
                    var dateCreated = dateobj;
                    var currentUrl = window.location.toString();
                    var currentTabs = tabArray.filter(function(tabs) { return tabs.url !== 'chrome://newtab/' && !tabs.url.includes('chrome://') && tabs.url !== currentUrl && tabs.url !== 'edge://newtab/'; }).map(function(a) { return { title: a.title, browserId: a.id, id: Object(v1["a" /* default */ ])(), url: a.url, favIcon: a.favIconUrl, comment: '', dateCreated: dateCreated, pinned: a.pinned, groupId: a.groupId ? a.groupId : null }; });
                    get().setActiveTabs(currentTabs);
                    get().clearUnusedThumbnail();
                });
            };
            // CONCATENATED MODULE: ./src/stores/store.js
            /* global chrome */
            var store_saveTabs = function saveTabs(set, get, newData, type, urlChanged) {
                urlChanged = true;
                if (type === 'tempDbUpdate') { set({ tabs: newData }); return; }
                if (type === 'noDbUpdate') {
                    if (get().sharedHydrated.length > 0) { //get().sharedHydrated.forEach((slug) => )
                        var hydrateSlugs = get().sharedHydrated;
                        var newDataSlugs = newData.filter(function(groups) { return groups.slug; }).map(function(group) { return group.slug; });
                        var uniqueSlugs = Object(toConsumableArray["a" /* default */ ])(new Set(newDataSlugs));
                        var cleanOldData = get().tabs.filter(function(_ref) { var slug = _ref.slug; return !uniqueSlugs.includes(slug); });
                        var hydratedData = cleanOldData.filter(function(_ref2) { var slug = _ref2.slug; return hydrateSlugs.includes(slug); });
                        var merge = [].concat(Object(toConsumableArray["a" /* default */ ])(hydratedData), Object(toConsumableArray["a" /* default */ ])(newData));
                        set({ tabs: merge });
                        return;
                    } else { set({ tabs: newData }); return; }
                }
                set({ tabs: newData });
                var userItemSaved = get().userItems;
                var userPlan = get().userState.userPlan;
                var categories = get().categories; //if (type === 'fullUpdate') {
                var wontSaveData = false;
                if (userPlan === 'trialLimitReached' || userPlan === 'paused') {
                    if (type === 'fullUpdate') { return; } else if (type === 'deleteUpdate') {
                        wontSaveData = true; //TODO få in denna <- Rensa data på wontSave
                        /* let filteredState = newData.map((space) => {
                                        space.tabs = space.tabs.filter((tab) => tab.wontSave !== true);
                                        return space;
                                    }); */
                    }
                }
                set({ prevTabs: get().tabs });
                get().setSpacesToShow();
                var sharedCategorySlugs = [];
                categories.forEach(function(category) { if (category.shared === true) sharedCategorySlugs.push(category.slug); });
                if (get().isPublicCat) {
                    var slug = categories[get().category].slug;
                    var filteredData = newData.filter(function(group) { return group.slug === slug; });
                    chrome.runtime.sendMessage({ msg: 'updatePublicData', slug: categories[get().category].slug, currentWSid: get().currentWSid, sharedData: { tabData: filteredData }, allTabData: { tabData: newData, userInfo: { itemsSaved: userItemSaved }, categories: categories }, wsData: { userInfo: { itemsSaved: userItemSaved }, categories: categories }, sharedCategorySlugs: sharedCategorySlugs, urlChanged: urlChanged });
                } else if (get().sharedHydrated.length > 0) {
                    var _filteredData = newData.filter(function(group) { return group.slug === undefined; });
                    chrome.runtime.sendMessage({ msg: type, filtered: true, currentWSid: get().currentWSid, data: { tabData: _filteredData, userInfo: { itemsSaved: userItemSaved }, categories: categories }, allTabData: { tabData: newData, userInfo: { itemsSaved: userItemSaved }, categories: categories }, sharedCategorySlugs: sharedCategorySlugs, urlChanged: urlChanged });
                } else { chrome.runtime.sendMessage({ msg: type, filtered: false, currentWSid: get().currentWSid, data: { tabData: newData, userInfo: { itemsSaved: userItemSaved }, categories: categories }, sharedCategorySlugs: sharedCategorySlugs, urlChanged: urlChanged }); }
            };
            var saveDeletedData = function saveDeletedData(deletedData, type) {
                var dateDeleted = new Date().toString();
                var deletedDataExtended = [];
                deletedData.forEach(function(deletedDataItem) {
                    var tempDeletedDataObj = {};
                    tempDeletedDataObj['deletedTimestamp'] = dateDeleted;
                    tempDeletedDataObj['deletedType'] = type;
                    tempDeletedDataObj['deletedData'] = deletedDataItem;
                    deletedDataExtended.push(tempDeletedDataObj);
                });
                chrome.runtime.sendMessage({ msg: 'updateDeletedItems', newData: deletedDataExtended });
            };
            var getDeletedData = function getDeletedData(get) { chrome.runtime.sendMessage({ msg: 'getDeletedItemsData' }, function(response) { if (response.deletedItemsData !== false) { get().setDeletedItemsData(response.deletedItemsData); } else return; }); };
            var updateSpacesToShow = function updateSpacesToShow(set, get) {
                var _categories$category;
                var category = get().category;
                var categories = get().categories;
                var sharedHydrated = get().sharedHydrated;
                var currentCategoryID = (_categories$category = categories[category]) === null || _categories$category === void 0 ? void 0 : _categories$category.id;
                var tabs = get().tabs;
                if (currentCategoryID === undefined) { get().setCategorySelected(0); }
                if (categories[category] === undefined) { return; }
                var isSharedCat = categories && categories[category].shared ? true : false;
                isSharedCat ? set({ isPublicCat: true }) : set({ isPublicCat: false });
                if (isSharedCat && !sharedHydrated.includes(categories[category].slug)) {
                    var newSlug = categories[category].slug;
                    store_fetchPublichCat(get, set, newSlug);
                } else {
                    var toShow = tabs.filter(function(space) { return space.categoryID === currentCategoryID; });
                    set({ spacesToShow: toShow });
                    get().setIsLoadingCats(false);
                }
            };
            var store_fetchPublichCat = function fetchPublichCat(get, set, newSlug) {
                chrome.runtime.sendMessage({ msg: 'fetchPublicCat', slug: newSlug }, function(resp) {
                    if (resp.msg === 'success') {
                        var newHydration = [].concat(Object(toConsumableArray["a" /* default */ ])(get().sharedHydrated), [newSlug]);
                        set({ sharedHydrated: newHydration });
                        var tempMerge = [].concat(Object(toConsumableArray["a" /* default */ ])(get().tabs), Object(toConsumableArray["a" /* default */ ])(resp.data));
                        set({ tabs: tempMerge });
                        set({ spacesToShow: resp.data });
                        set({ isLoadingCats: false });
                    } else { //TODO show error modal, fetch not possible
                        console.log('Error: public data fetch failed, please try and reload');
                        /* let newHydration = sharedHydrated.filter(
                                        (slug) => slug !== categories[category].slug
                                    );
                                    console.log('Error, removing slug: ', newHydration);
                                    set({ sharedHydrated: newHydration }); */
                    }
                });
            };
            var store_fetchPublichInMenuAction = function fetchPublichInMenuAction(set, get, newSlug) {
                chrome.runtime.sendMessage({ msg: 'fetchPublicCat', slug: newSlug }, function(resp) {
                    if (resp.msg === 'success') {
                        var sharedHydrated = get().sharedHydrated;
                        var newHydration = [].concat(Object(toConsumableArray["a" /* default */ ])(sharedHydrated), [newSlug]);
                        set({ sharedHydrated: newHydration });
                        var tempMerge = [].concat(Object(toConsumableArray["a" /* default */ ])(get().tabs), Object(toConsumableArray["a" /* default */ ])(resp.data));
                        set({ tabs: tempMerge });
                        set({ isLoadingMenuCats: false });
                    } else {
                        console.log('Error: public data fetch failed, please try and reload'); //TODO handle error
                    }
                });
            };
            var removeWsFromUserStateAction = function removeWsFromUserStateAction(set, get, id) {
                var userState = get().userState;
                if (userState !== undefined) {
                    var workspaces = userState.workspaces;
                    var index = workspaces.findIndex(function(item) { return item.id === id; });
                    userState.workspaces[index].isDeleted = true;
                    set({ userState: userState });
                }
            };
            /* function timeout(delay) {
                return new Promise((res) => setTimeout(res, delay));
            } */
            var store_changeWorkspaceToAction = function changeWorkspaceToAction(get, set, idToChangeTo, catToChangeTo) {
                if (get().currentWSid !== idToChangeTo) {
                    set({ isLoadingCats: true });
                    set({ isLoadingCategories: true });
                    set({ isLoadingSpacesToShow: true });
                    set({ roles: [] });
                    changeWorkspaceAction(get, idToChangeTo, catToChangeTo);
                    set({ currentWSid: idToChangeTo });
                } else { set({ category: catToChangeTo }); }
            }; //const unselectAllAction = useDndStore((state) => state.unselectAll);
            /* const setKeepSelectionAction = useDndStore((state) =>
                state.setKeepSelection(false)
            ); */
            var useStore = Object(zustand["a" /* default */ ])(function(set, get) {
                return {
                    tabs: [],
                    prevTabs: [],
                    setPrevTabs: function setPrevTabs(value) { return set(function(state) { return { prevTabs: value }; }); }, //setPrevState: () => set((prev) => ({ tabs: prev.tabs })),
                    setPrevState: function setPrevState() { store_saveTabs(set, get, get().prevTabs, 'deleteUpdate'); },
                    setTabs: function setTabs(newData, type, urlChanged) { store_saveTabs(set, get, newData, type, urlChanged); },
                    setDeletedData: function setDeletedData(deletedData, type) { saveDeletedData(deletedData, type); },
                    setDeletedDataState: function setDeletedDataState() { getDeletedData(get, set); },
                    currentWSid: '1',
                    isPublicCat: false,
                    sharedHydrated: [],
                    setSharedHydrated: function setSharedHydrated(value) { return set(function(state) { return { sharedHydrated: value }; }); },
                    setCurrentWSid: function setCurrentWSid(value) { return set(function(state) { return { currentWSid: value }; }); },
                    activeTabs: {},
                    setActiveTabs: function setActiveTabs(value) { return set(function(state) { return { activeTabs: value }; }); },
                    spacesToShow: [],
                    setSpacesToShow: function setSpacesToShow() { updateSpacesToShow(set, get); },
                    fetchPublichInMenu: function fetchPublichInMenu(slug) { store_fetchPublichInMenuAction(set, get, slug); },
                    isLoadingMenuCats: false,
                    setLoadingMenuCats: function setLoadingMenuCats(value) { return set(function(state) { return { isLoadingMenuCats: value }; }); },
                    roles: [],
                    setRolesData: function setRolesData(value) { return set(function(state) { return { roles: value }; }); },
                    lastSavedUser: { moveArrow: false, userId: null, lastSaved: null, dateSaved: null },
                    setLastSavedUser: function setLastSavedUser(value) { return set(function(state) { return { lastSavedUser: value }; }); },
                    setDoneStatus: function setDoneStatus(isDone, spaceId, tabId) { setDoneStatusFunction(get, isDone, spaceId, tabId); }, //category state
                    category: 0, //changeCategorySelected: (value) => set((state) => ({ category: value })),
                    isLoadingSpacesToShow: true,
                    setIsLoadingSpacesToShow: function setIsLoadingSpacesToShow(value) { return set(function(state) { return { isLoadingSpacesToShow: value }; }); },
                    isLoadingCats: true,
                    setIsLoadingCats: function setIsLoadingCats(value) { return set(function(state) { return { isLoadingCats: value }; }); },
                    isLoadingCategories: true,
                    setIsLoadingCategories: function setIsLoadingCategories(value) { return set(function(state) { return { isLoadingCategories: value }; }); },
                    setCategorySelected: function setCategorySelected(value) { saveCategory(set, get, value); },
                    moveToWorkspace: function moveToWorkspace(workspaceId, groupId, title, toCategory) { moveToWorkspaceAction(set, get, workspaceId, groupId, title, toCategory); },
                    saveWSinfo: function saveWSinfo(id, newName, emoji) { saveWSinfoAction(set, get, id, newName, emoji); },
                    deleteWS: function deleteWS(id, isShared) { deleteWSaction(set, get, id, isShared); },
                    categories: [],
                    setCategoriesState: function setCategoriesState(value) { return set(function(state) { return { categories: value }; }); },
                    setCategories: function setCategories(newData) { saveCategories(set, get, newData); },
                    openGroups: [],
                    setOpenGroups: function setOpenGroups(newData) { setOpenGroupsLocalData(set, get, newData); },
                    setOpenGroupsGlobalData: function setOpenGroupsGlobalData(value) { return set(function(state) { return { openGroups: value }; }); },
                    createCategory: function createCategory() { categoryActions_newCategory(get); },
                    saveFirstWorkspace: function saveFirstWorkspace() { saveFirstWS(get); },
                    denyInvite: function denyInvite(id) { denyInviteAction(get, id); },
                    changeWorkspace: function changeWorkspace(id, selectedCategory) { changeWorkspaceAction(get, id, selectedCategory); },
                    deleteCategory: function deleteCategory(id, index, shared, slug) { deleteCategoryFunction(get, id, index, shared, slug); }, //userstuff
                    userState: { email: '', name: '' },
                    setUserState: function setUserState(value) { return set(function(state) { return { userState: value }; }); },
                    showInitLogin: false,
                    setShowInitLogin: function setShowInitLogin(value) { return set(function(state) { return { showInitLogin: value }; }); },
                    showBootFailModal: false,
                    setShowBootFailModal: function setShowBootFailModal(value) { return set(function(state) { return { showBootFailModal: value }; }); },
                    removeWsFromUserState: function removeWsFromUserState(id) { removeWsFromUserStateAction(set, get, id); },
                    userItems: null,
                    setUserItems: function setUserItems(value) { return set(function(state) { return { userItems: value }; }); },
                    addOneSave: function addOneSave() { return set(function(state) { return { userItems: get().userItems + 1 }; }); },
                    isAuthOpen: false,
                    setAuthOpen: function setAuthOpen(value) { return set(function(state) { return { isAuthOpen: value }; }); },
                    isCategoryModalOpen: false,
                    setCategoryModalOpen: function setCategoryModalOpen(value) { return set(function(state) { return { isCategoryModalOpen: value }; }); },
                    isBookmarksModalOpen: false,
                    setBookmarksModal: function setBookmarksModal(value) { return set(function(state) { return { isBookmarksModalOpen: value }; }); },
                    limitDialogOpen: false,
                    setLimitDialogOpen: function setLimitDialogOpen() { return set(function(prev) { return { limitDialogOpen: !prev.limitDialogOpen }; }); },
                    isWorkspaceMenuOpen: false,
                    setWorkspaceMenuOpen: function setWorkspaceMenuOpen(value) { return set(function(prev) { return { isWorkspaceMenuOpen: value }; }); },
                    removedFromWS: false,
                    setRemovedModal: function setRemovedModal(value) { return set(function(state) { return { removedFromWS: value }; }); },
                    openWSmodal: false,
                    setWSmodalOpen: function setWSmodalOpen() { return set(function(prev) { return { openWSmodal: !prev.openWSmodal }; }); },
                    showToast: false,
                    setShowToast: function setShowToast(title, subtitle, type) { return set(function(state) { return { showToast: { title: title, subtitle: subtitle, type: type } }; }); },
                    isCustomShortcutsModalOpen: false,
                    setCustomShortcutsModal: function setCustomShortcutsModal(value) { return set(function(state) { return { isCustomShortcutsModalOpen: value }; }); },
                    isDeletedItemsModalOpen: false,
                    setDeletedItemsModal: function setDeletedItemsModal(value) { return set(function(state) { return { isDeletedItemsModalOpen: value }; }); },
                    deletedItemsData: 'loading',
                    setDeletedItemsData: function setDeletedItemsData(value) { return set(function(state) { return { deletedItemsData: value }; }); }, //noteActions
                    submitComment: function submitComment(value, spaceId, tabId, commentColor, todo) { submitCommentAction(get, value, spaceId, tabId, commentColor, todo); },
                    submitEmoji: function submitEmoji(emoji, id) { submitEmojiAction(get, emoji, id); },
                    submitTitle: function submitTitle(newTitle, id) { submitTitleAction(get, newTitle, id); },
                    submitStackTitle: function submitStackTitle(newTitle, stackId, spaceId) { submitStackTitleAction(get, newTitle, stackId, spaceId); },
                    submitSiteDetails: function submitSiteDetails(spaceId, tabId, newTitle, newUrl, isStacked) { submitSiteDetailsAction(get, spaceId, tabId, newTitle, newUrl, isStacked); },
                    moveTabToSpace: function moveTabToSpace(toSpace, fromSpace, tabId, isStacked) { moveTabToSpaceAction(set, get, toSpace, fromSpace, tabId, isStacked); },
                    moveSelectionToSpace: function moveSelectionToSpace(toSpace, selectionIds) { moveSelectionToSpaceAction(set, get, toSpace, selectionIds); },
                    moveToCategory: function moveToCategory(spaceId, categoryIndex, title) { moveToCategoryAction(set, get, spaceId, categoryIndex, title); },
                    addNote: function addNote(id, prevNoteId, prevNoteType) { noteActions_addNoteAction(get, id, prevNoteId, prevNoteType); },
                    discardNote: function discardNote(spaceId, tabId) { discardNoteAction(get, spaceId, tabId); },
                    removeComment: function removeComment(spaceId, tabId) { removeCommentAction(get, spaceId, tabId); },
                    deleteSpace: function deleteSpace(id) { deleteSpaceAction(get, id); },
                    /* deleteNote: (spaceId, tabId, item) => {
                            deleteNoteAction(get, set, spaceId, tabId, item);
                        }, */
                    addList: function addList() { spaceActions_addListAction(get); },
                    duplicateGroup: function duplicateGroup(spaceId) { spaceActions_duplicateGroupAction(get, set, spaceId); },
                    changeSpaceWidth: function changeSpaceWidth(id, width, shiftKeyActive) { changeSpaceWidthAction(get, id, width, shiftKeyActive); },
                    setCompactView: function setCompactView(spaceId, value) { setCompactViewAction(get, spaceId, value); },
                    setLockGroup: function setLockGroup(spaceId, value) { setLockGroupAction(get, spaceId, value); },
                    sortAlphabetically: function sortAlphabetically(spaceId, sortBy) { sortAlphabeticallyAction(get, spaceId, sortBy); }, //ActiveTabsActions
                    updateActiveTabs: function updateActiveTabs() { activeTabsActions_updateActiveTabsAction(get); },
                    clearThumbnailByKey: function clearThumbnailByKey(favIcon, tabIsSaved, url) { clearThumbnailByKeyAction(get, favIcon, tabIsSaved, url); },
                    clearUnusedThumbnail: function clearUnusedThumbnail() { clearUnusedThumbnailAction(get); },
                    copyContent: function copyContent(spaceId) { copyContentAction(get, spaceId); },
                    browserVersion: 0,
                    setVersion: function setVersion(value) { return set(function(state) { return { browserVersion: value }; }); },
                    isLoadingUser: true,
                    setIsLoadingUser: function setIsLoadingUser(value) { return set(function(state) { return { isLoadingUser: value }; }); },
                    isLoadingInvite: false,
                    setIsLoadingInvite: function setIsLoadingInvite(value) { return set(function(state) { return { isLoadingInvite: value }; }); },
                    deleteOrClose: function deleteOrClose(activeTabSelection, selectedItems) { deleteOrCloseAction(get, activeTabSelection, selectedItems); },
                    removeSitesFromGroup: function removeSitesFromGroup(spaceId, idsToKeep, anyStacksInGroup) { removeSitesFromGroupAction(get, spaceId, idsToKeep, anyStacksInGroup); },
                    addSitesToGroup: function addSitesToGroup(id, notYetSaved) { spaceActions_addSitesToGroupAction(id, notYetSaved, get); },
                    changeWorkspaceTo: function changeWorkspaceTo(idToChangeTo, idToChangeFrom) { store_changeWorkspaceToAction(get, set, idToChangeTo, idToChangeFrom); },
                    correctCategoryLength: function correctCategoryLength(id, newLength) { categoryActions_correctCategoryLengthAction(get, set, id, newLength); },
                    isLoadingGroup: false,
                    setIsLoadingGroup: function setIsLoadingGroup(value) { return set(function(state) { return { isLoadingGroup: value }; }); },
                    dropSiteFromStacked: function dropSiteFromStacked(sitesInside, tabId, stackId, spaceId, lastOneInStackId) { dropSiteFromStackedAction(get, set, sitesInside, tabId, stackId, spaceId, lastOneInStackId); },
                    reOrderStackedSites: function reOrderStackedSites(fromIndex, toIndex, spaceId, stackId, payload) { reOrderStackedSitesAction(get, set, fromIndex, toIndex, spaceId, stackId, payload); }
                };
            }); /* harmony default export */
            var store = __webpack_exports__["a"] = (useStore);

            /***/
        }),
        /* 2 */
        ,
        /* 3 */
        ,
        /* 4 */
        ,
        /* 5 */
        ,
        /* 6 */
        ,
        /* 7 */
        ,
        /* 8 */
        ,
        /* 9 */
        ,
        /* 10 */
        ,
        /* 11 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
            /* harmony import */
            var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
            var toggleSelectionAction = function toggleSelectionAction(set, get, taskId, isActiveList) {
                var ids = get().selectedItems;
                var wasSelected = ids.includes(taskId);
                set({ activeTabSelection: isActiveList });
                var newTaskIds = function() { // Task was not previously selected
                    // now will be the only selected item
                    if (!wasSelected) { return [taskId]; } // Task was part of a selected group
                    // will now become the only selected item
                    if (ids.length > 1) { return [taskId]; } // task was previously selected but not in a group
                    // we will now clear the selection
                    return [];
                }(); // console.log("Updating state from toggleSelection");
                set({ selectedItems: newTaskIds });
            };
            var toggleSelectionInGroupAction = function toggleSelectionInGroupAction(set, get, taskId, isActiveList) {
                if (get().activeTabSelection !== isActiveList) {
                    set({ activeTabSelection: isActiveList });
                    set({ selectedItems: [taskId] });
                    return;
                }
                set({ activeTabSelection: isActiveList });
                var ids = get().selectedItems;
                var index = ids.indexOf(taskId); // if not selected - add it to the selected items
                if (index === -1) { // console.log(
                    //   "Updating State from toggleSelectioninGroup for index === -1"
                    // );
                    var newArray = [].concat(Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(ids), [taskId]);
                    set({ selectedItems: newArray });
                    return;
                } // it was previously selected and now needs to be removed from the group
                var shallow = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(ids);
                shallow.splice(index, 1); // console.log("Updating State from toggleSelectioninGroup shallow");
                set({ selectedItems: shallow });
            }; // This behaviour matches the MacOSX finder selection
            /* const multiSelectToAction = (set, get, newTaskId) => {
              const updated = multiSelect(
                this.state.entities,
                this.state.selectedTaskIds,
                newTaskId
              );

              if (updated == null) {
                return;
              }
              // console.log("Updating State from multiSelectTo");
              set({ selectedItems: updated });
            }; */
            var unselectAction = function unselectAction() { unselectAllAction(); };
            var unselectAllAction = function unselectAllAction(set) { set({ selectedItems: [] }); };
            var multiSelectToAction = function multiSelectToAction(get, set, tabs, newItemId, spaceId, isActiveList) {
                if (get().activeTabSelection !== isActiveList) {
                    set({ activeTabSelection: isActiveList });
                    set({ selectedItems: [newItemId] });
                    return;
                }
                set({ activeTabSelection: isActiveList });
                if (isActiveList === true) {
                    var updated = multiSelectActive(get, tabs, newItemId, spaceId);
                    if (updated == null) { return; } // console.log("Updating State from multiSelectTo");
                    set({ selectedItems: updated });
                } else {
                    var _updated = multiSelect(get, tabs, newItemId, spaceId);
                    if (_updated == null) { return; } // console.log("Updating State from multiSelectTo");
                    set({ selectedItems: _updated });
                }
            };
            var multiSelect = function multiSelect(get, tabs, newItemId, spaceId) { // Nothing already selected
                var selectedItems = get().selectedItems;
                if (!selectedItems.length) { return [newItemId]; } //const columnOfNew = getHomeColumn(entities, newTaskId);
                //const indexOfNew = columnOfNew.taskIds.indexOf(newTaskId);
                var spaceOfNew = tabs.find(function(item) { return item.id === spaceId; });
                var indexOfNew = spaceOfNew.tabs.findIndex(function(item) { return item.id === newItemId; });
                var lastSelected = selectedItems[selectedItems.length - 1];
                var lastSelectedSpaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === newItemId; }); }).id;
                var lastSpaceIndex = tabs.findIndex(function(item) { return item.id === lastSelectedSpaceId; });
                var indexOfLast = tabs[lastSpaceIndex].tabs.findIndex(function(tab) { return tab.id === lastSelected; }); //const columnOfLast = getHomeColumn(entities, lastSelected);
                //const indexOfLast = columnOfLast.taskIds.indexOf(lastSelected);
                // multi selecting to another column
                // select everything up to the index of the current item
                if (spaceId !== lastSelectedSpaceId) { return spaceOfNew.tabs.slice(0, indexOfNew + 1); } // multi selecting in the same column
                // need to select everything between the last index and the current index inclusive
                // nothing to do here
                if (indexOfNew === indexOfLast) { return null; }
                var isSelectingForwards = indexOfNew > indexOfLast;
                var start = isSelectingForwards ? indexOfLast : indexOfNew;
                var end = isSelectingForwards ? indexOfNew : indexOfLast;
                var inBetween = spaceOfNew.tabs.slice(start, end + 1);
                var onlyIds = inBetween.map(function(_ref) { var id = _ref.id; return id; }); // everything inbetween needs to have it's selection toggled.
                // with the exception of the start and end values which will always be selected
                var toAdd = onlyIds.filter(function(newItemId) { // if already selected: then no need to select it again
                    if (selectedItems.includes(newItemId)) { return false; }
                    return true;
                });
                var sorted = isSelectingForwards ? toAdd : Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(toAdd).reverse();
                var combined = [].concat(Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(selectedItems), Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(sorted));
                return combined;
            };
            var addStackedAction = function addStackedAction(get, set, spacesToShow, spaceIndex, tabId) { //TODO stacked
            };
            var multiSelectActive = function multiSelectActive(get, activeTabs, newItemId) { // Nothing already selected
                var selectedItems = get().selectedItems;
                if (!selectedItems.length) { return [newItemId]; } //const columnOfNew = getHomeColumn(entities, newTaskId);
                //const indexOfNew = columnOfNew.taskIds.indexOf(newTaskId);
                var indexOfNew = activeTabs.findIndex(function(item) { return item.id === newItemId; });
                var lastSelected = selectedItems[selectedItems.length - 1];
                var indexOfLast = activeTabs.findIndex(function(tab) { return tab.id === lastSelected; }); //const columnOfLast = getHomeColumn(entities, lastSelected);
                //const indexOfLast = columnOfLast.taskIds.indexOf(lastSelected);
                // multi selecting in the same column
                // need to select everything between the last index and the current index inclusive
                // nothing to do here
                if (indexOfNew === indexOfLast) { return null; }
                var isSelectingForwards = indexOfNew > indexOfLast;
                var start = isSelectingForwards ? indexOfLast : indexOfNew;
                var end = isSelectingForwards ? indexOfNew : indexOfLast;
                var inBetween = activeTabs.slice(start, end + 1);
                var onlyIds = inBetween.map(function(_ref2) { var id = _ref2.id; return id; }); // everything inbetween needs to have it's selection toggled.
                // with the exception of the start and end values which will always be selected
                var toAdd = onlyIds.filter(function(newItemId) { // if already selected: then no need to select it again
                    if (selectedItems.includes(newItemId)) { return false; }
                    return true;
                });
                var sorted = isSelectingForwards ? toAdd : Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(toAdd).reverse();
                var combined = [].concat(Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(selectedItems), Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(sorted));
                return combined;
            };
            var useDndStore = Object(zustand__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(function(set, get) { return { isDragging: false, setIsDragging: function setIsDragging(value) { return set(function(state) { return { isDragging: value }; }); }, blockNewNote: false, setblockNewNote: function setblockNewNote(value) { return set(function(state) { return { blockNewNote: value }; }); }, isDraggingSpace: false, setIsDraggingSpace: function setIsDraggingSpace(value) { return set(function(state) { return { isDraggingSpace: value }; }); }, blockHoverSide: false, setBlockHoverSide: function setBlockHoverSide(value) { return set(function(state) { return { blockHoverSide: value }; }); }, spaceDraggedOver: null, setSpaceDraggedOver: function setSpaceDraggedOver(value) { return set(function(state) { return { spaceDraggedOver: value }; }); }, beforeDragStart: false, setBeforeDragStart: function setBeforeDragStart(value) { return set(function(state) { return { beforeDragStart: value }; }); }, dragActiveInModal: false, setDragIsActiveInModal: function setDragIsActiveInModal(value) { return set(function(state) { return { dragActiveInModal: value }; }); }, sideReCalc: false, setSideReCalc: function setSideReCalc(value) { return set(function(state) { return { sideReCalc: value }; }); }, selectedItems: [], setSelectedItems: function setSelectedItems(value) { return set(function(state) { return { selectedItems: value }; }); }, draggingItemId: null, setDraggingId: function setDraggingId(value) { return set(function(state) { return { draggingItemId: value }; }); }, toggleSelection: function toggleSelection(taskId, isActiveList) { toggleSelectionAction(set, get, taskId, isActiveList); }, activeTabSelection: false, toggleSelectionInGroup: function toggleSelectionInGroup(taskId, isActiveList) { toggleSelectionInGroupAction(set, get, taskId, isActiveList); }, multiSelectTo: function multiSelectTo(tabs, newItemId, spaceId, isActiveList) { multiSelectToAction(get, set, tabs, newItemId, spaceId, isActiveList); }, addStacked: function addStacked(spacesToShow, spaceIndex, tabId) { addStackedAction(get, set, spacesToShow, spaceIndex, tabId); }, unselect: function unselect() { unselectAction(); }, unselectAll: function unselectAll() { unselectAllAction(set); }, keepSelection: false, setKeepSelection: function setKeepSelection(value) { return set(function(state) { return { keepSelection: value }; }); } }; }); /* harmony default export */
            __webpack_exports__["a"] = (useDndStore);

            /***/
        }),
        /* 12 */
        ,
        /* 13 */
        ,
        /* 14 */
        ,
        /* 15 */
        ,
        /* 16 */
        ,
        /* 17 */
        ,
        /* 18 */
        ,
        /* 19 */
        ,
        /* 20 */
        ,
        /* 21 */
        ,
        /* 22 */
        ,
        /* 23 */
        ,
        /* 24 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */
            var _Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(169);
            /* harmony import */
            var _Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(_Images_EmptyState_Spaces_png__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */
            var _Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(170);
            /* harmony import */
            var _Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(_Images_EmptyState_SpacesDark_png__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(44);
            var ToastPopper = function ToastPopper(_ref) {
                var onClose = _ref.onClose,
                    title = _ref.title,
                    type = _ref.type,
                    subtitle = _ref.subtitle,
                    resClick = _ref.resClick,
                    colorMode = _ref.colorMode; //Colorstuff
                //const { colorMode, toggleColorMode } = useColorMode();
                var textColor = { light: 'gray.600', dark: '#FFF' };
                var toastBg = { light: '#FFF', dark: '#262A2D' };
                var titleColor = { light: '#1A202C', dark: '#FFF' };
                var subText = { light: 'gray.500', dark: 'gray.400' };
                var iconSmall = { light: 'gray.700', dark: 'gray.400' };
                var buttonBorder = { light: 'gray.300', dark: 'gray.500' };
                var buttonHover = { light: 'gray.100', dark: 'gray.700' };
                var buttonActive = { light: 'gray.200', dark: '#262A2D' };
                var toastShadow = { light: '0 12px 32px -12px rgba(152,169,185,0.85), 0 0px 10px -4px rgba(152,169,185,0.55)', dark: '0 12px 32px -12px rgba(0,0,0,0.9), 0 0px 10px -4px rgba(0,0,0,0.75)' };
                if (type === 'restore') {
                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { minHeight: "40px", bg: toastBg[colorMode], minWidth: "200px", rounded: "10px", boxShadow: toastShadow[colorMode], m: 4 }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { w: "100%", onClick: function onClick() { onClose(); } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { cursor: "pointer", bg: "transparent", name: "close", color: "gray.500", size: "10px", ml: "auto", mt: "16px", mr: "16px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { alignItems: "center" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { bg: "rgb(255, 152, 22, 0.3)", w: "10px", h: "36px", alignItems: "center", roundedRight: "6px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { ml: "22px", mr: "6px", name: "warning-2", color: "#FF9816", size: "20px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { fontSize: "16px", fontWeight: "500", ml: "12px", mr: "40px", color: titleColor[colorMode] }, title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { pl: "66px", mr: "28px", maxWidth: "264px", minWidth: "248px" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], {
                        onClick: function onClick() {
                            resClick();
                            onClose();
                        },
                        mt: "4px",
                        w: "100%",
                        mb: "15px",
                        variant: "outline",
                        borderColor: buttonBorder[colorMode],
                        _hover: { bg: buttonHover[colorMode] },
                        _active: { bg: buttonActive[colorMode] },
                        size: "sm",
                        color: titleColor[colorMode]
                    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "repeat-clock", mr: "8px", color: iconSmall[colorMode] }), "Restore"))));
                }
                if (type === 'warning') { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { minHeight: "40px", bg: toastBg[colorMode], minWidth: "200px", rounded: "10px", boxShadow: toastShadow[colorMode], m: 4 }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { w: "100%", onClick: function onClick() { onClose(); } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { cursor: "pointer", bg: "transparent", name: "close", color: "gray.500", size: "10px", ml: "auto", mt: "16px", mr: "16px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { alignItems: "center" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { bg: "rgb(255, 152, 22, 0.3)", w: "10px", h: "36px", alignItems: "center", roundedRight: "6px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { ml: "22px", mr: "6px", name: "warning-2", color: "#FF9816", size: "20px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { fontSize: "16px", fontWeight: "500", ml: "10px", mr: "40px", color: titleColor[colorMode] }, title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { pl: "66px", mr: "36px", maxWidth: "324px", minWidth: "224px" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { color: subText[colorMode], fontSize: "15px", fontWeight: "400", mt: "-4px", mb: "32px" }, subtitle)))); }
                if (type === 'success') { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { minHeight: "40px", bg: toastBg[colorMode], minWidth: "200px", rounded: "10px", boxShadow: toastShadow[colorMode], m: 4 }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { w: "100%", onClick: function onClick() { onClose(); } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { cursor: "pointer", bg: "transparent", name: "close", color: "gray.500", size: "10px", ml: "auto", mt: "16px", mr: "16px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { alignItems: "center" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { bg: "rgb(59, 222, 134, 0.3)", w: "10px", h: "36px", alignItems: "center", roundedRight: "6px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { ml: "22px", mr: "6px", name: "checkCircle", color: "#3BDE86", size: "24px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { fontSize: "16px", fontWeight: "500", ml: "4px", mr: "40px", color: titleColor[colorMode] }, title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { pl: "66px", mr: "36px", maxWidth: "324px", minWidth: "224px" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { color: subText[colorMode], fontSize: "15px", fontWeight: "400", mt: "-4px", mb: "32px" }, subtitle)))); }
                if (type === 'error') { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { minHeight: "40px", bg: toastBg[colorMode], minWidth: "200px", rounded: "10px", boxShadow: toastShadow[colorMode], m: 4 }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { w: "100%", onClick: function onClick() { onClose(); } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { cursor: "pointer", bg: "transparent", name: "close", color: "gray.500", size: "10px", ml: "auto", mt: "16px", mr: "16px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { alignItems: "center" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { bg: "rgb(245, 101, 101, 0.3)", w: "10px", h: "36px", alignItems: "center", roundedRight: "6px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { ml: "22px", mr: "6px", name: "warning", color: "#F56565", size: "24px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { fontSize: "16px", fontWeight: "500", ml: "12px", mr: "40px", color: titleColor[colorMode] }, title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { pl: "66px", mr: "36px", maxWidth: "324px", minWidth: "224px" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { color: subText[colorMode], fontSize: "15px", fontWeight: "400", mt: "-4px", mb: "32px", ml: "8px" }, subtitle)))); }
                if (type === 'info') {
                    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { minHeight: "40px", bg: toastBg[colorMode], minWidth: "200px", rounded: "10px", boxShadow: toastShadow[colorMode], m: 4 }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { w: "100%", onClick: function onClick() { onClose(); } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { cursor: "pointer", bg: "transparent", name: "close", color: "gray.500", size: "10px", ml: "auto", mt: "16px", mr: "16px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { alignItems: "center" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { bg: "rgba(51,145,255,0.30)", w: "10px", h: "36px", alignItems: "center", roundedRight: "6px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { ml: "22px", mr: "6px", name: "linkIcon", color: "#3391FF", size: "24px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { fontSize: "16px", fontWeight: "500", ml: "4px", mr: "40px", mt: "0px", color: titleColor[colorMode] }, title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { pl: "66px", mr: "28px", maxWidth: "264px", minWidth: "248px" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], {
                        onClick: function onClick() {
                            resClick();
                            onClose();
                        },
                        mt: "4px",
                        w: "100%",
                        mb: "16px",
                        variant: "outline",
                        borderColor: buttonBorder[colorMode],
                        _hover: { bg: buttonHover[colorMode] },
                        _active: { bg: buttonActive[colorMode] },
                        size: "sm",
                        color: titleColor[colorMode]
                    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "plusCircle", mr: "8px", fontSize: "18px", color: iconSmall[colorMode] }), subtitle))));
                }
            }; /* harmony default export */
            __webpack_exports__["a"] = (ToastPopper);

            /***/
        }),
        /* 25 */
        ,
        /* 26 */
        ,
        /* 27 */
        ,
        /* 28 */
        ,
        /* 29 */
        ,
        /* 30 */
        ,
        /* 31 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* unused harmony export commentBg */
            var commentBg = [{ bg: "#FF9999", focus: "#FFC2C2", text: "#311111", iconColor: "#E56B75", iconLight: "#F37474", light: "#FFE0E0" }, { bg: "#FDDD93", focus: "#FEEBBE", text: "#463118", iconColor: "#78552B", iconLight: "#F6B563", light: "#FFF5C9" }, { bg: "#AFFFBA", focus: "#CFFFD6", text: "#123526", iconColor: "#2B7849", iconLight: "#6AE698", light: "#C6FFE9" }, { bg: "#FBB6A6", focus: "#FFDBCE", text: "#381C13", iconColor: "#764B2B", iconLight: "#E7856B", light: "#FFDCC6" }, { bg: "#FCC0FB", focus: "#FFCFFA", text: "#381333", iconColor: "#752A70", iconLight: "#E066DB", light: "#FFC6FF" }, { bg: "#DDC5EF", focus: "#EACFFF", text: "#2B1337", iconColor: "#532A75", iconLight: "#BA69E5", light: "#E4C5FF" }, { bg: "#B6D9FF", focus: "#CFEEFF", text: "#142A3A", iconColor: "#285670", iconLight: "#6BBEE6", light: "#C1EFFE" }, { bg: "#A0B3FF", focus: "#CFD2FF", text: "#18183C", iconColor: "#2C3D79", iconLight: "#6E76E7", light: "#C3C6FE" }, { bg: "#6EE79F", focus: "#CCFEDD", text: "#133820", iconColor: "#297252", iconLight: "#67E1A6", light: "#C3FED3" }, { bg: "#E0FF82", focus: "#F5FFCF", text: "#2B3612", iconColor: "#547229", iconLight: "#ACD836", light: "#F7FDC0" }, { bg: "#FFED78", focus: "#F9ECCA", text: "#373013", iconColor: "#BC9700", iconLight: "#E4CB34", light: "#FEF4C3" }]; /* harmony default export */
            __webpack_exports__["a"] = (commentBg);

            /***/
        }),
        /* 32 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
            /* harmony import */
            var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(107);
            /* harmony import */
            var zustand_middleware__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(zustand_middleware__WEBPACK_IMPORTED_MODULE_1__);
            var usePersistStore = Object(zustand__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(Object(zustand_middleware__WEBPACK_IMPORTED_MODULE_1__["persist"])(function(set, get) {
                return {
                    productTourStep: 0,
                    nextStep: function nextStep(value) { return set(function(value) { return { productTourStep: value }; }); },
                    fxState: false,
                    toggleFxState: function toggleFxState() { return set(function(prev) { return { fxState: !prev.fxState }; }); },
                    showWorkspaceEmoji: false,
                    toggleWorkspaceEmoji: function toggleWorkspaceEmoji() { return set(function(prev) { return { showWorkspaceEmoji: !prev.showWorkspaceEmoji }; }); },
                    showTrashZone: false,
                    toggleTrashZone: function toggleTrashZone() { return set(function(prev) { return { showTrashZone: !prev.showTrashZone }; }); },
                    /* useDefaultNewTabValue: false,
                                toggleDefaultNewTab: () =>
                                    set((prev) => ({
                                        useDefaultNewTabValue: !prev.useDefaultNewTabValue
                                    })), */
                    /* set((prev) => ({
                                       useDefaultNewTab: !prev.useDefaultNewTab
                                   })), */
                    openGroups: [],
                    setOpenGroups: function setOpenGroups() { return set(function(value) { return { openGroups: value }; }); },
                    openNewTabState: false,
                    toggleOpenNewTab: function toggleOpenNewTab() { return set(function(prev) { return { openNewTabState: !prev.openNewTabState }; }); },
                    jumpNewTabState: true,
                    toggleJumpNewTab: function toggleJumpNewTab() { return set(function(prev) { return { jumpNewTabState: !prev.jumpNewTabState }; }); },
                    categorySelected: 0,
                    setCategorySelected: function setCategorySelected(value) { return set(function(value) { return { categorySelected: value }; }); },
                    shortcutCreateNewGroup: '',
                    setShortcutCreateNewGroup: function setShortcutCreateNewGroup(value) { return set(function() { return { shortcutCreateNewGroup: value }; }); },
                    shortcutOpenWorkspacePicker: '',
                    shortcutOpenBin: '',
                    setShortcutOpenBin: function setShortcutOpenBin(value) { return set(function() { return { shortcutOpenBin: value }; }); },
                    setShortcutOpenWorkspacePicker: function setShortcutOpenWorkspacePicker(value) { return set(function() { return { shortcutOpenWorkspacePicker: value }; }); }
                };
            }, {
                name: 'tabextend-settings' // unique name
            })); /* harmony default export */
            __webpack_exports__["a"] = (usePersistStore);

            /***/
        }),
        /* 33 */
        ,
        /* 34 */
        ,
        /* 35 */
        ,
        /* 36 */
        ,
        /* 37 */
        ,
        /* 38 */
        ,
        /* 39 */
        ,
        /* 40 */
        ,
        /* 41 */
        ,
        /* 42 */
        ,
        /* 43 */
        ,
        /* 44 */
        ,
        /* 45 */
        ,
        /* 46 */
        ,
        /* 47 */
        ,
        /* 48 */
        ,
        /* 49 */
        ,
        /* 50 */
        /***/
        (function(module, exports, __webpack_require__) {

            // extracted by mini-css-extract-plugin

            /***/
        }),
        /* 51 */
        ,
        /* 52 */
        ,
        /* 53 */
        ,
        /* 54 */
        ,
        /* 55 */
        ,
        /* 56 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            var defaultEmojis = [{ emoji: '📚' }, { emoji: '🌎' }, { emoji: '🏕️' }, { emoji: '💎' }, { emoji: '🏖️' }, { emoji: '🔗' }, { emoji: '🥑' }, { emoji: '🧀' }, { emoji: '🍊' }, { emoji: '🏔️' }, { emoji: '🔑' }, { emoji: '⛳' }, { emoji: '💭' }, { emoji: '🧺' }, { emoji: '💽' }, { emoji: '🍀' }, { emoji: '💠' }, { emoji: '🥬' }, { emoji: '📥' }, { emoji: '📦' }, { emoji: '🥎' }, { emoji: '🧪' }, { emoji: '🏓' }, { emoji: '🍋' }, { emoji: '🎨' }, { emoji: '🥪' }, { emoji: '🌋' }, { emoji: '📔' }]; /* harmony default export */
            __webpack_exports__["a"] = (defaultEmojis);

            /***/
        }),
        /* 57 */
        ,
        /* 58 */
        ,
        /* 59 */
        ,
        /* 60 */
        ,
        /* 61 */
        ,
        /* 62 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/fallBackSvg.3ac52d95.svg";

            /***/
        }),
        /* 63 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/fallBackSvgDark.049f0700.svg";

            /***/
        }),
        /* 64 */
        ,
        /* 65 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony export (binding) */
            __webpack_require__.d(__webpack_exports__, "a", function() { return LocalIconProvider; });
            /* harmony import */
            var _Images_calendar_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
            /* harmony import */
            var _Images_calendar_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_Images_calendar_png__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */
            var _Images_docs_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(122);
            /* harmony import */
            var _Images_docs_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(_Images_docs_png__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */
            var _Images_excel_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(123);
            /* harmony import */
            var _Images_excel_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(_Images_excel_png__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */
            var _Images_figma_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(124);
            /* harmony import */
            var _Images_figma_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(_Images_figma_png__WEBPACK_IMPORTED_MODULE_3__);
            /* harmony import */
            var _Images_forms_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(125);
            /* harmony import */
            var _Images_forms_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/ __webpack_require__.n(_Images_forms_png__WEBPACK_IMPORTED_MODULE_4__);
            /* harmony import */
            var _Images_github_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(126);
            /* harmony import */
            var _Images_github_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/ __webpack_require__.n(_Images_github_png__WEBPACK_IMPORTED_MODULE_5__);
            /* harmony import */
            var _Images_medium_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(127);
            /* harmony import */
            var _Images_medium_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/ __webpack_require__.n(_Images_medium_png__WEBPACK_IMPORTED_MODULE_6__);
            /* harmony import */
            var _Images_meet_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(128);
            /* harmony import */
            var _Images_meet_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/ __webpack_require__.n(_Images_meet_png__WEBPACK_IMPORTED_MODULE_7__);
            /* harmony import */
            var _Images_notion_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(129);
            /* harmony import */
            var _Images_notion_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/ __webpack_require__.n(_Images_notion_png__WEBPACK_IMPORTED_MODULE_8__);
            /* harmony import */
            var _Images_photoshop_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(130);
            /* harmony import */
            var _Images_photoshop_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/ __webpack_require__.n(_Images_photoshop_png__WEBPACK_IMPORTED_MODULE_9__);
            /* harmony import */
            var _Images_powerpoint_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(131);
            /* harmony import */
            var _Images_powerpoint_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/ __webpack_require__.n(_Images_powerpoint_png__WEBPACK_IMPORTED_MODULE_10__);
            /* harmony import */
            var _Images_sheets_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(132);
            /* harmony import */
            var _Images_sheets_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/ __webpack_require__.n(_Images_sheets_png__WEBPACK_IMPORTED_MODULE_11__);
            /* harmony import */
            var _Images_slides_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(133);
            /* harmony import */
            var _Images_slides_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/ __webpack_require__.n(_Images_slides_png__WEBPACK_IMPORTED_MODULE_12__);
            /* harmony import */
            var _Images_spotify_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(134);
            /* harmony import */
            var _Images_spotify_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/ __webpack_require__.n(_Images_spotify_png__WEBPACK_IMPORTED_MODULE_13__);
            /* harmony import */
            var _Images_twitter_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(135);
            /* harmony import */
            var _Images_twitter_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/ __webpack_require__.n(_Images_twitter_png__WEBPACK_IMPORTED_MODULE_14__);
            /* harmony import */
            var _Images_word_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(136);
            /* harmony import */
            var _Images_word_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/ __webpack_require__.n(_Images_word_png__WEBPACK_IMPORTED_MODULE_15__);
            /* harmony import */
            var _Images_fileIcon_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(145);
            /* harmony import */
            var _Images_fileIcon_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/ __webpack_require__.n(_Images_fileIcon_png__WEBPACK_IMPORTED_MODULE_16__);
            var LocalIconProvider = function LocalIconProvider(title) { var iconToReturn = title === 'Calendar' ? _Images_calendar_png__WEBPACK_IMPORTED_MODULE_0___default.a : title === 'Docs' ? _Images_docs_png__WEBPACK_IMPORTED_MODULE_1___default.a : title === 'Excel' ? _Images_excel_png__WEBPACK_IMPORTED_MODULE_2___default.a : title === 'Figma' ? _Images_figma_png__WEBPACK_IMPORTED_MODULE_3___default.a : title === 'Form' ? _Images_forms_png__WEBPACK_IMPORTED_MODULE_4___default.a : title === 'Github' ? _Images_github_png__WEBPACK_IMPORTED_MODULE_5___default.a : title === 'Medium' ? _Images_medium_png__WEBPACK_IMPORTED_MODULE_6___default.a : title === 'Meet' ? _Images_meet_png__WEBPACK_IMPORTED_MODULE_7___default.a : title === 'Notion' ? _Images_notion_png__WEBPACK_IMPORTED_MODULE_8___default.a : title === 'Photoshop' ? _Images_photoshop_png__WEBPACK_IMPORTED_MODULE_9___default.a : title === 'Powerpoint' ? _Images_powerpoint_png__WEBPACK_IMPORTED_MODULE_10___default.a : title === 'Sheets' ? _Images_sheets_png__WEBPACK_IMPORTED_MODULE_11___default.a : title === 'Slides' ? _Images_slides_png__WEBPACK_IMPORTED_MODULE_12___default.a : title === 'Spotify' ? _Images_spotify_png__WEBPACK_IMPORTED_MODULE_13___default.a : title === 'Twitter' ? _Images_twitter_png__WEBPACK_IMPORTED_MODULE_14___default.a : title === 'Word' ? _Images_word_png__WEBPACK_IMPORTED_MODULE_15___default.a : _Images_fileIcon_png__WEBPACK_IMPORTED_MODULE_16___default.a; return iconToReturn; };

            /***/
        }),
        /* 66 */
        ,
        /* 67 */
        ,
        /* 68 */
        ,
        /* 69 */
        ,
        /* 70 */
        ,
        /* 71 */
        ,
        /* 72 */
        ,
        /* 73 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(167);
            var MenuRowMoveTo = function MenuRowMoveTo(_ref) {
                var title = _ref.title,
                    categoryId = _ref.categoryId,
                    spaceId = _ref.spaceId,
                    onClose = _ref.onClose,
                    emoji = _ref.emoji,
                    index = _ref.index,
                    extraPadding = _ref.extraPadding,
                    extraSmall = _ref.extraSmall,
                    moveToCategory = _ref.moveToCategory,
                    toCategory = _ref.toCategory,
                    disabled = _ref.disabled; //const currentCat = category ? (index === category ? true : false) : false;
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"], { role: "group", disabled: disabled }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], {
                    onClick: function onClick() {
                        moveToCategory(spaceId, categoryId, title, toCategory);
                        onClose();
                    },
                    _groupHover: {},
                    width: "100%",
                    fontSize: extraPadding ? '16px' : 'sm',
                    px: extraPadding ? '18px' : '1rem',
                    justifyContent: "left",
                    variant: "ghost",
                    rounded: "0px",
                    isDisabled: disabled
                }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"], { transition: "0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)", transform: "scale(0)", _groupHover: { transform: !disabled ? 'scale(1)' : '' } }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], { color: "green.300", name: "arrowCircleRight", fontSize: "20px", mr: "10px", ml: "0px" })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"], { display: "flex", transition: "0.25s cubic-bezier(0.165, 0.840, 0.440, 1.000)", transform: "translateX(-26px)", _groupHover: { transform: !disabled ? 'translateX(0px)' : '' }, isTruncated: true, maxWidth: "200px" }, emoji ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { mr: "12px", fontSize: extraSmall ? '18px' : '20px', my: "auto" }, (emoji === null || emoji === void 0 ? void 0 : emoji.length) > 10 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { src: emoji, minW: "22px", minH: "22px", maxW: "22px", maxH: "22px", overflow: "hidden", rounded: "2px" }) : emoji) : '', ' ', title.length > 0 ? title : 'Untitled')));
            }; /* harmony default export */
            __webpack_exports__["a"] = (MenuRowMoveTo);

            /***/
        }),
        /* 74 */
        ,
        /* 75 */
        ,
        /* 76 */
        ,
        /* 77 */
        ,
        /* 78 */
        ,
        /* 79 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
            var UserButton = function UserButton(_ref) {
                var name = _ref.name,
                    role = _ref.role,
                    email = _ref.email,
                    owner = _ref.owner,
                    userId = _ref.userId,
                    removeUserFromWs = _ref.removeUserFromWs,
                    sharedCatVer = _ref.sharedCatVer,
                    py = _ref.py;
                var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* useColorMode */ "b"])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var text = { light: '#1A202C', dark: '#FFF' };
                var iconBg = { light: 'gray.200', dark: '#424a50' };
                var letterColor = { light: 'gray.700', dark: '#b3bac6' };
                var userButtonShadow = { light: '0 2px 8px 0 rgba(142,149,173,0.60), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34' };
                var color = { light: '#FFF', dark: '#262A2D' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(152,169,185,0.50)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var subTitle = { light: 'gray.600', dark: '#FFF' };
                var iconColor = { light: 'gray.600', dark: '#B3BAC6' };
                var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
                    _useState2 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(_useState, 2),
                    removeHover = _useState2[0],
                    setHover = _useState2[1];
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* Popover */ "a"] /* onClose={close} */ , { trigger: removeHover ? 'click' : 'hover', transition: "0s" }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* PopoverTrigger */ "h"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], {
                    mb: py ? '12px' : '',
                    transition: "0s",
                    mr: "16px",
                    bg: iconBg[colorMode] //border="4px solid #D4D8DE"
                        ,
                    rounded: "7px",
                    height: "32px",
                    minWidth: "32px",
                    p: "0px",
                    fontSize: "18px",
                    color: text[colorMode],
                    fontWeight: "600",
                    outline: "none",
                    boxShadow: userButtonShadow[colorMode],
                    opacity: role === 'pending' ? 0.55 : 1
                }, name && name.length > 0 ? name.charAt(0).toUpperCase() : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "incognito", color: letterColor[colorMode], size: "24px", opacity: "0.8" }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* PopoverContent */ "e"], { rounded: "9px", maxWidth: "284px", bg: color[colorMode], boxShadow: linkShadow[colorMode], border: "none", zIndex: "500007", transition: "0s" }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* PopoverArrow */ "b"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* PopoverBody */ "c"], { display: "flex", p: "12px", flexDirection: "column" }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], {
                    mr: "12px",
                    bg: iconBg[colorMode] //border="4px solid #D4D8DE"
                        ,
                    rounded: "7px",
                    height: "48px",
                    minWidth: "48px",
                    p: "0px",
                    fontSize: "18px",
                    color: text[colorMode],
                    fontWeight: "600",
                    outline: "none",
                    opacity: role === 'pending' ? 0.55 : 1,
                    display: "flex"
                }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { m: "auto" }, name && name.length > 0 ? name.charAt(0).toUpperCase() : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "incognito", color: letterColor[colorMode], size: "24px", opacity: "0.8" }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { mt: "2px", fontWeight: "600", fontSize: "18px", opacity: (name === null || name === void 0 ? void 0 : name.length) > 0 ? '1' : '0.5', color: text[colorMode] }, name && name.length > 0 ? name : '-'), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { mt: "-2px", fontWeight: "600", fontSize: "12px", color: text[colorMode], opacity: "0.8", textTransform: "capitalize" }, role))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], { mb: sharedCatVer ? '24px' : '' }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { color: subTitle[colorMode], fontWeight: "500", fontSize: "14px", mt: "16px", maxWidth: "100%", isTruncated: true }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { name: "emailIcon", size: "18px", mr: "12px", color: iconColor[colorMode] }), email)), !sharedCatVer && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { onMouseEnter: function onMouseEnter() { return setHover(true); }, onMouseLeave: function onMouseLeave() { return setHover(false); }, mt: "32px", w: "100%", minWidth: "154px", mx: "auto", px: "8px", isDisabled: role === 'owner' || !owner ? true : false, color: text[colorMode], fontSize: "14px", transition: "0s", onClick: function onClick() { return removeUserFromWs(userId); } }, "Remove user")))));
            }; /* harmony default export */
            __webpack_exports__["a"] = (UserButton);

            /***/
        }),
        /* 80 */
        ,
        /* 81 */
        ,
        /* 82 */
        ,
        /* 83 */
        ,
        /* 84 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            var getCustomEmojis = function getCustomEmojis(userData) {
                var _userData$uploadedEmo; //console.log({userData})
                var customEmojiList = [];
                if ((userData === null || userData === void 0 ? void 0 : (_userData$uploadedEmo = userData.uploadedEmojis) === null || _userData$uploadedEmo === void 0 ? void 0 : _userData$uploadedEmo.length) > 0) { userData.uploadedEmojis.forEach(function(emoji) { customEmojiList.push({ name: emoji.name, short_names: [emoji.name], text: '', emoticons: [], keywords: [emoji.name, 'Custom'], imageUrl: emoji.url, customCategory: 'Custom' }); }); } //console.log({customEmojiList})
                return customEmojiList;
            }; /* harmony default export */
            __webpack_exports__["a"] = (getCustomEmojis);

            /***/
        }),
        /* 85 */
        ,
        /* 86 */
        ,
        /* 87 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/addFx.dae86336.mp3";

            /***/
        }),
        /* 88 */
        ,
        /* 89 */
        ,
        /* 90 */
        ,
        /* 91 */
        ,
        /* 92 */
        ,
        /* 93 */
        ,
        /* 94 */
        ,
        /* 95 */
        ,
        /* 96 */
        ,
        /* 97 */
        ,
        /* 98 */
        ,
        /* 99 */
        ,
        /* 100 */
        ,
        /* 101 */
        ,
        /* 102 */
        ,
        /* 103 */
        ,
        /* 104 */
        ,
        /* 105 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/selectFx.95f3e92d.mp3";

            /***/
        }),
        /* 106 */
        ,
        /* 107 */
        ,
        /* 108 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/removeFx.c8648e83.mp3";

            /***/
        }),
        /* 109 */
        ,
        /* 110 */
        ,
        /* 111 */
        ,
        /* 112 */
        ,
        /* 113 */
        ,
        /* 114 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
            /* harmony import */
            var _Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
            /* harmony import */
            var _categoryDetailRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(175);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(165);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(37);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(23);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(44);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(22);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(166);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(216);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(95);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(102);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(103);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(98);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(70);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(167);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(43);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(104);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(218);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(217);
            /* harmony import */
            var _stores_store__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(1);
            /* harmony import */
            var emoji_mart_css_emoji_mart_css__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(89);
            /* harmony import */
            var emoji_mart_css_emoji_mart_css__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/ __webpack_require__.n(emoji_mart_css_emoji_mart_css__WEBPACK_IMPORTED_MODULE_26__);
            /* harmony import */
            var emoji_mart__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(78);
            /* harmony import */
            var react_hook_form__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(88);
            /* harmony import */
            var uuid__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(221);
            /* harmony import */
            var _userButton__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(79);
            /* harmony import */
            var _Utils_getCustomEmojis__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(84);
            /* global chrome */ //import { Container, Draggable } from "react-smooth-dnd";
            var userStateZu = function userStateZu(state) { return state.userState; };
            var isLoadingInviteZu = function isLoadingInviteZu(state) { return state.isLoadingInvite; };
            var setIsLoadingInviteZu = function setIsLoadingInviteZu(state) { return state.setIsLoadingInvite; };
            var setShowToastZu = function setShowToastZu(state) { return state.setShowToast; };
            var rolesZu = function rolesZu(state) { return state.roles; };
            var setRolesDataZu = function setRolesDataZu(state) { return state.setRolesData; };
            var TeamMember = function TeamMember(_ref) {
                var member = _ref.member,
                    index = _ref.index,
                    addTeamMate = _ref.addTeamMate;
                var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* useColorMode */ "b"])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var subTitle = { light: 'gray.600', dark: 'gray.300' };
                var letterColor = { light: 'gray.700', dark: '#b3bac6' };
                var userButtonShadow = { light: '0 2px 4px 0 rgba(142,149,173,0.40), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34' };
                var iconBg = { light: 'gray.200', dark: '#424a50' };
                var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
                    _useState2 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState, 2),
                    hover = _useState2[0],
                    setHover = _useState2[1];
                return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { label: 'Add: ' + member.email, zIndex: "500005", placement: "bottom" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[ /* default */ "a"], {
                    cursor: "pointer",
                    display: "flex",
                    _hover: { bg: 'blue.300', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5), inset 1px 1px 1px 0 rgba(255,255,255,0.0), inset -1px -1px 1px 0 #E2E4E900' },
                    transition: "transform 0.2s",
                    transform: hover ? 'scale(1.2)' : 'scale(1)',
                    mr: "16px",
                    bg: iconBg[colorMode] //border="4px solid #D4D8DE"
                        ,
                    rounded: "7px",
                    height: "28px",
                    minWidth: "28px",
                    p: "0px",
                    fontSize: "16px",
                    color: text[colorMode],
                    fontWeight: "600",
                    outline: "none",
                    boxShadow: userButtonShadow[colorMode],
                    onMouseEnter: function onMouseEnter() { return setHover(true); },
                    onMouseLeave: function onMouseLeave() { return setHover(false); },
                    onClick: function onClick() { return addTeamMate(member.email); }
                }, hover ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { name: "plusCircle", color: "#FFF", size: "16px", m: "auto" }) : member.name && member.name.length > 0 ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { m: "auto" }, member.name.charAt(0).toUpperCase()) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { name: "incognito", color: hover ? '#FFF' : letterColor[colorMode], size: "16px", opacity: hover ? '1' : '0.8', m: "auto" })));
            };
            var AddUserButton = function AddUserButton(_ref2) {
                var id = _ref2.id,
                    emoji = _ref2.emoji,
                    name = _ref2.name,
                    catLength = _ref2.catLength,
                    isCurrentWS = _ref2.isCurrentWS,
                    currentRoles = _ref2.currentRoles,
                    setCurrentRoles = _ref2.setCurrentRoles,
                    saveWSchanges = _ref2.saveWSchanges; //zuState
                var userState = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(userStateZu);
                var roles = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(rolesZu);
                var isLoadingInvite = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(isLoadingInviteZu);
                var setIsLoadingInvite = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(setIsLoadingInviteZu);
                var setShowToast = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(setShowToastZu);
                var _useColorMode2 = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* useColorMode */ "b"])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(152,169,185,0.50)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var errorColor = { light: 'red.500', dark: '#FFF' };
                var iconColor = { light: 'gray.600', dark: '#B3BAC6' };
                var linkColor = { light: 'blue.500', dark: 'blue.400' };
                var alertBg = { light: 'blue.100', dark: 'gray.700' };
                var subTitle = { light: 'gray.600', dark: 'gray.300' };
                var _useForm = Object(react_hook_form__WEBPACK_IMPORTED_MODULE_28__[ /* useForm */ "a"])({ mode: 'onTouched', reValidateMode: 'onBlur' }),
                    register = _useForm.register,
                    getValues = _useForm.getValues,
                    reset = _useForm.reset,
                    setValue = _useForm.setValue,
                    handleSubmit = _useForm.handleSubmit,
                    errors = _useForm.errors,
                    formState = _useForm.formState,
                    setError = _useForm.setError;
                var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
                    _useState4 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState3, 2),
                    popOpen = _useState4[0],
                    setPopOpen = _useState4[1];
                var open = function open() {
                    setPopOpen(!popOpen);
                    getTeam();
                };
                var close = function close() { return setPopOpen(false); };
                var onSubmit = function onSubmit(data) {
                    if (currentRoles && currentRoles.find(function(o) { return o.email === data.emailField; })) {
                        setShowToast('Looks like this user has already invited', 'Please see list of users', 'error'); //setValue("data.emailField", "");
                        reset();
                        return;
                    }
                    setIsLoadingInvite(true);
                    saveWSchanges(id, name, emoji, false);
                    var email = data.emailField;
                    var workspaces = userState.workspaces;
                    var thisWSindex = workspaces.findIndex(function(ws) { return ws.id === id; });
                    workspaces[thisWSindex].shared = true;
                    workspaces[thisWSindex].owner = true;
                    var hasWsIdOne = false;
                    var newWsId;
                    if (id === '1') {
                        newWsId = Object(uuid__WEBPACK_IMPORTED_MODULE_29__[ /* default */ "a"])();
                        workspaces[thisWSindex].id = newWsId;
                        hasWsIdOne = true; //console.log("Seems like id 1, lets change dat to: ", newWsId);
                    }
                    var newlyShared = (currentRoles === null || currentRoles === void 0 ? void 0 : currentRoles.length) > 0 ? false : true;
                    var oldRoles = !newlyShared ? currentRoles : [{ name: (userState === null || userState === void 0 ? void 0 : userState.name.length) > 0 ? userState.name : 'You', status: 'owner', email: (userState === null || userState === void 0 ? void 0 : userState.email) ? userState.email : '-', userId: userState === null || userState === void 0 ? void 0 : userState.userId }];
                    var shareWith = [].concat(Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(oldRoles), [{ email: email, title: name, id: hasWsIdOne ? newWsId : id, emoji: emoji, catLength: catLength, status: 'pending' }]); //wsToChange.shared = true;
                    chrome.runtime.sendMessage({ msg: 'sendInviteToWS', WSid: id, shareWith: shareWith, newlyShared: newlyShared, newWSdata: { workspaces: workspaces }, isCurrentWS: isCurrentWS, hasWsIdOne: hasWsIdOne, newWsId: newWsId }, function(resp) {
                        if (resp.msg === 'inviteSent') {
                            setShowToast('Invite sent to:', email, 'success');
                            setCurrentRoles(shareWith);
                            setIsLoadingInvite(false);
                            close();
                        }
                    });
                };
                var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
                    _useState6 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState5, 2),
                    teamMembers = _useState6[0],
                    setMembers = _useState6[1];
                var getTeam = function getTeam() {
                    if (userState.team) {
                        setMembers('loading');
                        chrome.runtime.sendMessage({ msg: 'getTeamEmails', team: userState.team }, function(resp) { if (resp.msg === 'success') { setMembers(resp.members); } else if (resp.msg === 'success') { return; } });
                    } else return;
                };
                var addTeamMate = function addTeamMate(email) { setValue('emailField', email); };
                var isOnProPlan = userState.stripeSubscriptionStatus !== 'active';
                return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* Popover */ "a"], { isOpen: popOpen, onClose: close }, function(_ref3) {
                    var isOpen = _ref3.isOpen,
                        onClose = _ref3.onClose;
                    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverTrigger */ "h"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { display: "inline-block", onClick: open }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { rounded: "4px", label: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { p: "2px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { fontWeight: "500", fontSize: "15px", w: "100%", textAlign: "center" }, "Add user")), zIndex: "500000", placement: "bottom" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], {
                        isLoading: isLoadingInvite //border="4px solid #D4D8DE"
                            ,
                        rounded: "7px",
                        height: "32px",
                        minWidth: "32px",
                        p: "0px",
                        color: "#FFF",
                        backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",
                        _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' },
                        boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)",
                        transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)"
                    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { name: "addUser", color: "#FFF", size: "20px" }))))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverContent */ "e"], { zIndex: 4, minWidth: "428px", rounded: "9px", bg: color[colorMode], boxShadow: linkShadow[colorMode], border: "none" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverArrow */ "b"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverCloseButton */ "d"], { mt: "4px", color: iconSmall[colorMode] }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverBody */ "c"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { py: "12px", pl: "12px", pr: "24px", mt: "12px", pb: "32px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[ /* default */ "a"], { alignItems: "top" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[ /* default */ "a"], { fontSize: "18px", fontWeight: "500", lineHeight: "normal", color: text[colorMode] }, "Add and share workspace with:")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", { onSubmit: handleSubmit(onSubmit) }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_14__[ /* default */ "a"], { mt: "12px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_15__[ /* InputLeftElement */ "a"], { children: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { name: "emailIcon", color: iconColor[colorMode], ml: "6px" }) }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_16__[ /* default */ "a"], {
                        isDisabled: false,
                        roundedRight: "0px",
                        roundedLeft: "4px",
                        color: text[colorMode],
                        focusBorderColor: "#63B3ED",
                        variant: "filled" //pr="4.5rem"
                            ,
                        type: "email",
                        name: "emailField",
                        ref: register({ required: true }),
                        placeholder: "Email",
                        className: colorMode === 'light' ? 'signup' : 'signupdark'
                    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { isDisabled: false, color: "#FFF", isLoading: isLoadingInvite, type: 'submit', backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", roundedRight: "4px", roundedLeft: "0px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: "#FFF", fontSize: "15px", px: "8px" }, "Invite"))), errors.emailField && formState.touched.emailField && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: errorColor[colorMode], mt: "6px" }, "An email is required"), errors.invited && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: errorColor[colorMode], mt: "6px" }, "The user has already been invited")), teamMembers !== false && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: subTitle[colorMode], fontWeight: "500", fontSize: "14px", mt: "12px", mb: "12px" }, "Your team:"), teamMembers !== 'loading' ? teamMembers.length > 0 ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[ /* default */ "a"], null, teamMembers.map(function(member, index) { return member.email && member.email !== userState.email && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TeamMember, { member: member, index: index, key: index, addTeamMate: addTeamMate }); })) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: subTitle[colorMode], fontWeight: "500", fontSize: "12px", opacity: "0.6" }, "Empty. Add members at", ' ', react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_17__[ /* default */ "a"], { href: "https://www.tabextend.com/settings/team" }, "tabextend.com")) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_18__[ /* default */ "a"], { size: "sm", color: text[colorMode], opacity: "0.85" })), isOnProPlan && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_19__[ /* Alert */ "a"], { status: "info", rounded: "4px", fontWeight: "500", display: "flex", mt: "12px", bg: alertBg[colorMode] }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_19__[ /* AlertIcon */ "c"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { mr: "24px", color: text[colorMode] }, "Please", ' ', react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_17__[ /* default */ "a"], { href: "https://www.tabextend.com/pricing", target: "_blank", rel: "noopener noreferrer", color: linkColor[colorMode], _hover: { textDecoration: 'underline' } }, "upgrade your plan"), ' ', "to use the realtime share feature"))))));
                });
            };
            var EmojiDisplay = function EmojiDisplay(_ref4) { var emoji = _ref4.emoji; if ((emoji === null || emoji === void 0 ? void 0 : emoji.length) > 10) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_20__[ /* default */ "a"], { src: emoji }); } else { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], null, emoji); } };
            var WorkspaceModal = function WorkspaceModal(_ref5) {
                var siteModalOpen = _ref5.siteModalOpen,
                    closeSiteModal = _ref5.closeSiteModal,
                    emoji = _ref5.emoji,
                    name = _ref5.name,
                    id = _ref5.id,
                    catLength = _ref5.catLength,
                    saveWSchanges = _ref5.saveWSchanges,
                    deleteCurrentWS = _ref5.deleteCurrentWS,
                    currentWSid = _ref5.currentWSid,
                    sharedRef = _ref5.sharedRef,
                    owner = _ref5.owner,
                    shared = _ref5.shared; //Colormodestuff
                var _useColorMode3 = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* useColorMode */ "b"])(),
                    colorMode = _useColorMode3.colorMode,
                    toggleColorMode = _useColorMode3.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var icon = { light: 'gray.500', dark: '#A1A2A4' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var subtitle = { light: 'gray.500', dark: 'gray.400' };
                var bodyBg = { light: 'rgb(244, 245, 247,0.8)', dark: '#181b1d' };
                var iconDarkerColor = { light: 'gray.600', dark: '#FFF' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(152,169,185,0.50)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var hoverButton = { light: 'gray.100', dark: '#32363A' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var emojiCategory = { light: 'gray.200', dark: '#FFF' };
                var emojiPickerShadow = { light: '0 4px 18px -2px rgba(152,169,185,0.80)', dark: '0 4px 18px -2px rgba(0,0,0,0.80)' };
                var secondaryButton = { light: 'solid', dark: 'outline' }; //zustate
                var userState = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(userStateZu);
                var roles = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(rolesZu);
                var setRolesData = Object(_stores_store__WEBPACK_IMPORTED_MODULE_25__[ /* default */ "a"])(setRolesDataZu); //Local state
                var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(name),
                    _useState8 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState7, 2),
                    currentTitle = _useState8[0],
                    setCurrentTitle = _useState8[1];
                Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function() { setCurrentTitle(name); }, [name]);
                var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(emoji),
                    _useState10 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState9, 2),
                    currentEmoji = _useState10[0],
                    setCurrentEmoji = _useState10[1];
                Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function() { setCurrentEmoji(emoji); }, [emoji]);
                var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
                    _useState12 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState11, 2),
                    currentRoles = _useState12[0],
                    setCurrentRoles = _useState12[1];
                var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
                    _useState14 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState13, 2),
                    loadingRoles = _useState14[0],
                    setLoadingRoles = _useState14[1];
                var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
                    _useState16 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState15, 2),
                    editMode = _useState16[0],
                    setEditMode = _useState16[1];
                var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
                    _useState18 = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[ /* default */ "a"])(_useState17, 2),
                    showPicker = _useState18[0],
                    setShowPicker = _useState18[1]; //const categoriesLength = categories.length;
                var initialRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(); //let categorySelected = +localStorage.getItem("categorySelected");
                var onEmojiClick = function onEmojiClick(emoji) {
                    if (emoji.native) { setCurrentEmoji(emoji.native); } else if (emoji.imageUrl) { setCurrentEmoji(emoji.imageUrl); } setShowPicker(false); //submitEmoji(emoji.native, id);
                };
                /* const ref = useRef();
                  useOutsideClick(ref, () => {

                    setShowPicker(!showPicker);
                  }); */ //let roles = ws?.roles;
                //Gör en global roles
                //Gör en loading roles
                // Checka currentWS ? roles : getRoles + setLoading
                //let isOwner = roles.length > 0 ? (ws?.owner ? true : false) : true;
                var isOwner = shared ? owner ? true : false : true;
                var fetchRoles = function fetchRoles(msg, id) {
                    chrome.runtime.sendMessage({ msg: msg, id: id }, function(resp) {
                        /* if (resp !== undefined) {
                                } */
                        setCurrentRoles(resp);
                        setLoadingRoles(false);
                    });
                };
                /* const fetchLatestRoles = async (id) => {
                    await chrome.runtime.sendMessage(
                      {
                        msg: "fetchOwnWSRoles",
                        id: id,
                      },
                      (resp) => {
                        console.log("resp: ", resp);
                        return resp;
                      }
                    );
                  }; */
                Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function() { //isCurrentWS -> ws.shared?
                    if (siteModalOpen) {
                        if (currentWSid === id) {
                            setCurrentRoles(roles);
                            setLoadingRoles(false);
                        } else {
                            var _userState$workspaces;
                            var ws = userState === null || userState === void 0 ? void 0 : (_userState$workspaces = userState.workspaces) === null || _userState$workspaces === void 0 ? void 0 : _userState$workspaces.filter(function(ws) { return ws.id === id; })[0];
                            if (ws === null || ws === void 0 ? void 0 : ws.shared) { if (ws.owner) { fetchRoles('fetchOwnWSRoles', id); } else { fetchRoles('fetchWSRoles', sharedRef); } } else { //console.log("nada");
                                setLoadingRoles(false);
                            }
                        }
                    }
                }, [siteModalOpen]);
                var isCurrentWS = currentWSid === id ? true : false;
                var removeUserFromWs = function removeUserFromWs(userId) {
                    var newRoles = Object(_Users_gustav_Documents_Code_tabextend_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[ /* default */ "a"])(currentRoles);
                    var index = currentRoles === null || currentRoles === void 0 ? void 0 : currentRoles.findIndex(function(target) { return target.userId === userId; });
                    var userToRemove = newRoles[index];
                    newRoles.splice(index, 1);
                    setCurrentRoles(newRoles);
                    setRolesData(newRoles);
                    chrome.runtime.sendMessage({ msg: 'removeUserFromWS', newRoles: newRoles, removedData: userToRemove, wsId: id }, function(resp) {});
                };
                return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* Modal */ "a"], { isOpen: siteModalOpen, onClose: closeSiteModal, size: "534px", isCentered: true, returnFocusOnClose: true, initialFocusRef: initialRef, closeOnOverlayClick: editMode ? false : true }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalOverlay */ "g"], { style: { backdropFilter: 'blur(1px)' } }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalContent */ "d"], { rounded: "12px", bg: color[colorMode], ref: initialRef }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalHeader */ "f"], {
                    fontSize: "20px",
                    fontWeight: "700",
                    pt: "2.375rem",
                    color: text[colorMode],
                    display: "flex",
                    pr: "2.5rem",
                    pb: "0rem"
                    /* onClick={() =>
                                                console.log('WS: ', currentWSid, 'id: ', id)
                                            } */
                }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { mt: "2px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* Popover */ "a"], { isOpen: true, closeOnBlur: true }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverTrigger */ "h"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], {
                    isDisabled: !isOwner,
                    _disabled: { opacity: '1', cursor: 'text' },
                    _focus: { outline: 'none' },
                    zIndex: "2",
                    onClick: function onClick(e) { //e.stopPropagation();
                        setShowPicker(!showPicker);
                    },
                    background: "transparent",
                    _hover: { bg: isOwner ? hoverButton[colorMode] : '' },
                    fontSize: "48px",
                    minWidth: "none",
                    ml: "4px",
                    mr: "8px",
                    px: "12px",
                    height: "70px",
                    maxWidth: "70px",
                    rounded: "12px",
                    transition: "0s",
                    fontWeight: "300"
                }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(EmojiDisplay, { emoji: currentEmoji }))), showPicker && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalOverlay */ "g"], { style: { backdropFilter: 'blur(1px)' }, bg: "transparent", onClick: function onClick() { return setShowPicker(false); } }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverContent */ "e"], {
                    zIndex: 5054321,
                    rounded: "12px",
                    borderWidth: "0px" //overflow="hidden"
                        ,
                    _focus: { outline: 'none' },
                    boxShadow: emojiPickerShadow[colorMode] //ref={ref}
                }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(emoji_mart__WEBPACK_IMPORTED_MODULE_27__[ /* Picker */ "a"] //style={{width: "300px"}}
                    , { color: emojiCategory[colorMode], title: "Select a emoji", emoji: "", native: true, showPreview: false, useButton: false, onSelect: onEmojiClick, theme: colorMode === 'light' ? 'light' : 'dark', custom: (userState === null || userState === void 0 ? void 0 : userState.stripeSubscriptionStatus) === 'active' ? Object(_Utils_getCustomEmojis__WEBPACK_IMPORTED_MODULE_31__[ /* default */ "a"])(userState) : [] }))))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_22__[ /* default */ "c"], {
                    isDisabled: !isOwner,
                    fontSize: "24px",
                    mt: "5px",
                    value: currentTitle,
                    startWithEditView: false,
                    w: "100%",
                    wordBreak: "break-word" //onSubmit={() => setCurrentTitle(currentTitle)}
                        ,
                    onSubmit: function onSubmit() { return setEditMode(false); },
                    onEdit: function onEdit() { return setEditMode(true); }
                }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_22__[ /* EditablePreview */ "b"], { value: currentTitle, _hover: { bg: isOwner ? hoverButton[colorMode] : '', color: text[colorMode] }, transition: "0s" }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_22__[ /* EditableInput */ "a"], { value: currentTitle, onChange: function onChange(e) { return setCurrentTitle(e.target.value.slice(0, 24)); } })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { fontSize: "12px", letterSpacing: "0.68px", mt: "3px", fontWeight: "600", color: subtitle[colorMode] }, catLength === null || catLength === void 0 ? void 0 : catLength.toString(), ' ', catLength === 1 ? 'CATEGORY' : 'CATEGORIES'))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalCloseButton */ "c"], { mt: "4px", color: icon[colorMode], transition: "0s" }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalBody */ "b"], { mt: "12px", pl: "1.5rem", pr: "2.5rem", mb: "12px", position: "relative", bg: bodyBg[colorMode] }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { w: "100%", px: "12px", pt: "8px", pb: "16px", height: "89px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: subtitle[colorMode], fontWeight: "700", fontSize: "14px", mb: "12px" }, "Users"), loadingRoles ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_23__[ /* default */ "a"], { fontSize: "24px", thickness: "0.25", isIndeterminate: true, color: "blue" }) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[ /* default */ "a"], null, (currentRoles === null || currentRoles === void 0 ? void 0 : currentRoles.length) > 0 ? currentRoles.map(function(user) { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_userButton__WEBPACK_IMPORTED_MODULE_30__[ /* default */ "a"], { name: user.name, email: user.email, role: user.status, owner: owner, removeUserFromWs: removeUserFromWs, userId: user.userId }); }) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_userButton__WEBPACK_IMPORTED_MODULE_30__[ /* default */ "a"], { name: userState.name.length > 0 ? userState.name : 'You', role: 'owner', email: userState.email ? userState.email : '-', removeUserFromWs: removeUserFromWs, userId: '0' }), currentRoles ? currentRoles.length > 9 ? '' : isOwner ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(AddUserButton, { id: id, emoji: currentEmoji, name: currentTitle, isCurrentWS: isCurrentWS, catLength: catLength, setCurrentRoles: setCurrentRoles, currentRoles: currentRoles, saveWSchanges: saveWSchanges }) : '' : isOwner ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(AddUserButton, { id: id, emoji: currentEmoji, name: currentTitle, catLength: catLength, isCurrentWS: isCurrentWS, setCurrentRoles: setCurrentRoles, currentRoles: currentRoles, saveWSchanges: saveWSchanges }) : ''))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { color: subtitle[colorMode], mx: "36px" }, "Add users to share the current workspace and collaborate in real time. Read more about", ' ', react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_17__[ /* default */ "a"], { href: "https://www.tabextend.com/guide/share-workspaces", target: "_blank", rel: "noopener noreferrer", color: "blue.500", _hover: { textDecoration: 'underline' } }, "the feature here"), "."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_21__[ /* ModalFooter */ "e"], { pr: "1.7rem" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* Popover */ "a"], null, function(_ref6) {
                    var _userState$workspaces2;
                    var isOpen = _ref6.isOpen,
                        onClose = _ref6.onClose;
                    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverTrigger */ "h"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_24__[ /* default */ "a"], {
                        icon: "trash" //onClick={() => deleteNoteAction(spaceId, tabId, "Site")}
                            ,
                        color: iconDarkerColor[colorMode] //bg={iconBG[colorMode]}
                            //bg="red.400"
                            //color="#FFF"
                            ,
                        mr: 3,
                        transition: "0.12s",
                        isDisabled: (userState === null || userState === void 0 ? void 0 : (_userState$workspaces2 = userState.workspaces) === null || _userState$workspaces2 === void 0 ? void 0 : _userState$workspaces2.length) === 1 ? true : false
                    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverContent */ "e"], { zIndex: 4, minWidth: "380px", bg: color[colorMode], boxShadow: linkShadow[colorMode], border: "none" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverArrow */ "b"], null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverCloseButton */ "d"], { mt: "4px", color: iconSmall[colorMode] }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_9__[ /* PopoverBody */ "c"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"], { py: "12px", pl: "12px", pr: "24px", mt: "12px" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[ /* default */ "a"], { alignItems: "top" }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_7__[ /* default */ "a"], { name: "warning", size: "28px", mt: "8px", color: "red.500" }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_13__[ /* default */ "a"], { ml: "18px", fontSize: "20px", lineHeight: "normal", color: text[colorMode] }, isOwner ? 'Are you sure you want to delete this workspace?' : 'Are you sure you want to remove this workspace?')), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { mt: "8px", ml: "44px", fontSize: "16px", mb: "12px", color: text[colorMode] }, isOwner ? 'All containing categories, groups and saved items will be deleted for all users.' : "You won't have access to the workspace again. The workspace will still be available for other users.")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_12__[ /* default */ "a"], null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { onClick: onClose, ml: "auto", mr: "8px", variant: secondaryButton[colorMode] }, "Cancel"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)", onClick: function onClick() { return deleteCurrentWS(id, isOwner, shared); } }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_10__[ /* default */ "a"], { isTruncated: true, maxWidth: "180px", color: "#FFF" }, isOwner ? 'Delete' : 'Remove', ' ', name))))));
                }), isOwner ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { color: text[colorMode], mr: 3, onClick: closeSiteModal, transition: "0.12s" }, "Cancel"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { mr: "8px", onClick: function onClick() { return saveWSchanges(id, currentTitle, currentEmoji, true); }, color: "#FFF", backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)" }, "Save")) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_11__[ /* default */ "a"], { mr: "8px", onClick: closeSiteModal, color: "#FFF", backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)" }, "Close")))));
            }; /* harmony default export */
            __webpack_exports__["a"] = (WorkspaceModal);

            /***/
        }),
        /* 115 */
        ,
        /* 116 */
        ,
        /* 117 */
        ,
        /* 118 */
        ,
        /* 119 */
        ,
        /* 120 */
        ,
        /* 121 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 122 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAMAAAD3eH5ZAAABL1BMVEUAAABLjvVEg/BQkfVUk/VSkfWmxfqmxvqmxfumxfqmxfqnx/tGhfFAgPimxPumxvlalPWixPhFhPFHh/JNi/NEhPNHh/JZlPVGhfCjw/palfWoxvumxvqmxfpFhe9Ni/BLh+9GhvFblfVZlfRblO9rludGhO9Zk/NHhu+kxPpJivRPjvVLi/VNjfXy8vJRj/VTkPVGiPRVkfWlxPqnxvpGh/SsxfNHhvBDe+JEeeBEfuVGfuZGfOTf5/LF1vJGf+hpnvSGrvRGgOlHg+1Ee+OIsPRGh/NGeuFDeN5HhO9EfORDeOBGgOpGgutCd91rnvWIr/RalfW7z/NYlPVsl+dJhu9Ge+JIh/JtmOdnnPVGfebu7/JJifNEhPCdvvd4pPKiw/mUufdhmfVShOFkk+dWnnWSAAAAKnRSTlMAf/5/f3/4/PRIQmGyBE9YRjzOgnNG+ff28eZ1b2o1LB/mzbUP8OmakzhE+Lw3AAAFcklEQVR42u3Wh3bTQBCFYQE2ppia0HuHkYQsBzAQegmhE5qpCe39nwGLoku8ERI7O+OV8e8HsL5zd8/ZoEKbtp46undhxV4YdSu0L9Bu0/Re49M6RolRWNyMtuLQUQhcIc61dBVbd5kEPuJca3+gEAwSCFXF4b1dEUSWmuJYVw7ROhCotLUrhsjSURwTQ+htcXwXAxGWIbI2BmLhNEkjWvKKhjjCVNQRIa9oMAzVEKainoih211XxLIt6oo419oSIC1Eh48o3KK+iBlsMUJE8i+IODYQM2vFFA3mENURUNQaAYUKoiOByBSbg0E1R8y0RBQNCwMDgS2kER05RLaFV4jQAiGzRUNoiNg0QCGP6EghoFgvjegIISQVDQsDAwGFIKLDGqIcAYUcoiOOgEII0Sk28BEiCiAgcDeEiZBUNDsVShgIGEzFGCBm1q1XRCRCCCj0EeWGMgQUG7QQiQuEqKLp3gAEDIWt3eAz4lMJAlsoIBJLxGcDIbdFU8gQ3yxFYAtvEW8NhNwWTbcGIMLFcgO2kEQklkNkLZUjoNgmh0g4iPCzgZDaounYAES8sAgEYwseImEioi+fYChtD0PRdG+AYmERiHLFGfeIxB4BxaulT0DInaimQwMQUHxdWgTC4kRxEAlvCPRqfv7rtzdGL1fshAsECOwhoLg3n/ekLHeIxMYAhKkYdCn7rdD88tgIEBwNAcWlXw6zhwIIELhDoCjKtshawbA8F4iktNAGkSsulSosEWuSxPh8J0MA8VuBLuZBw0MgqSEyxevBt7/+FRDDGAVEaDtEprjyOu9iUb4jBoq8i4XJI0K705QrHniAsDIAgS3uFCeNCHkIKJA6gm8wFQ+GE0aELAQUs7OzJgIxEHIGIKBAl3+XX3lJRMgfAgoYzAQRoYMhoLiMFBGhEwQUAggtA+rNDvUuTwoRukZAYSaDCF0aoLi+LGFEKICAwoiBUDOUK9wjQoYBiCLFrTwBBAhCCCjM3CJCaQNRTwgBggKCeo+M2AgIJA1AQMFHMAQw2AyRKR4PxUaESGMIKPiIVSGzmIOg/u0/4yH0DbliHBDU+1PBQugbUH/UiJiBgOJ+HgOhagACijoiCEHBQox+CCisET4YBorej9QRsQsEFKwl1A1AmFsoI2JXQ0ChjojdDQFFfRBUXF8QceOsk54DUaioCYL+2gShhqAJwg8ETRB+IGiEiKtOujBCBIr/WlQejRwRx/VHCBi0EXGpwX+EgEEbEZcbfEfEAgZlRFzF4DUi/lny9O/dqNaCIsIcwdWzQw8BQb0R8aA6I+KsGiLiP5sgJogJogLiyzUnLUoi7IoqR7/zDRFVj3xFSBlSRURUf0QkZ7BG+GNQQ0SSBiVEVFtE9271nhW3VG5Ia//sGAdEOkH4gUhlEdHb2iOiSAWRCiAgqDkiylJCpE4RAKCFC066q4iI2NE/lzpDREjbwEbkfz5BsAzeIWgMEDYG3xA2Bt8Q5C/ixQWbLAxyCMtnx/v/CJGOASKdIPxApGOASCcIPxCpJqJ706aqBg+eHVRYfRAcgycI4hg8QbAMfiCIao8gpsEHBNfgAYJICHFeDUFyBi0ECRiUESRqUEGQrEEDQQIGXQQhqSGEEUQKBlEEuSzVRECgZRBCEJI3SCBIolQLQUjTwEUQO75hDBDn2YgpKkx/iDlLxDQx4xvQTkvEjg9kpmtA2y0Rx3eSkbIBTQWWtUm8tCJi7qAt4mCfClI3tAPr2satUDWgjwftEYePEELqhrmpgNGO3YRGt0N7U8BT4ESpEEzEHAy2HdreB0PRAMLqKRhs2zR9pNevDkmr9WGuUh8/rm4fChCDseP09pM7ey67v7pKu7e3pw8H5X0HRaWCG5uIwxkAAAAASUVORK5CYII="

            /***/
        }),
        /* 123 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 124 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 125 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 126 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 127 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 128 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 129 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAMAAAD3eH5ZAAABoVBMVEUAAAD+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAD8/Pz9/f0FBQX6+voHBwfr6+uZmZn09PSBgYHo6OggICDU1NQ4ODg7OzsKCgrS0tLl5eUSEhLv7+8ODg74+PgYGBgdHR329vbPz88jIyPx8fG6urrf39/Ly8tKSkq9vb3j4+PX19fFxcWIiIhOTk4xMTHY2NiysrJkZGRbW1snJyepqalVVVW2travr6+mpqadnZ1tbW1CQkKFhYV8fHx2dnY/Pz/h4eHIyMh5eXloaGiNjY2Li4tgYGBSUlLa2trCwsKgoKBzc3NwcHAzMzOsrKxFRUUsLCyioqKSkpIqKirc3NyXl5dYWFiVlZWPj48uLi6/v7+UlJRgjzlEAAAANnRSTlMA/vwCFc3YJQT58QoN9exG5+HHti4gw7CLgDPdZF05GwjTvVM9FxGla03PoJuFdyhylVeqkHru1iErAAASmElEQVR42u2dB1fbSBDHkQTEYHqHhARCSS+Xu0O7ko0xAYN7wcYYML0Teu8lIeU+9c0KUDEWyGA71r3737tY7yXWm9/sbNGsvJOVUjEMc/VBZCjIfvao7mnxq/qP7/54UV7WWFpUSLe1FRaV5lT/Vf+0hcnKIDHM1YehwWg0tj6rrGgmdv/1pvp52evc0pL8wjy6jSZqEyRcF5Y+r60w/j4OubuzGOLuiqdg9staMLsq53FRHn2ttutPuSSQvPInLVlplGS6gfi7oKWy4umrJ+9r3v75vKwx93FJUX4emCo3GT7uErRHVX2qWkMymiGCD2N25Ye65lefngjRXfX6cUm+5G4xVBIXfK/8VfItZy69bSxozSbeLm4S3F0Owf24tCifdEwpVNqSIJoueV+ZRLcbWmEwaS5uqv9YSzolcXeezN15Kv5+OEbVU8ND7Te0PCp+UvsXRAkZSkoEd0uxkgZBY9RmMw9pAWNxbXlpoWhx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"

            /***/
        }),
        /* 130 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAMAAAD3eH5ZAAABHVBMVEUAAAAAAAAAHTUAHTYAHTUAHTUAGTIAHDQAGzYAFSgAHTQAHTUAHTQAHDQAACUAHTUAHTUAHTUAHTQAFDYADyMAHTUAHTUAHTUAHjQAHTUAHDQAHTUAHTQAHDMAHjUAGjIAGTMAFzUAHjMAGTUAHjYxqP8HOVwvo/kwpv0CJkIFMFAqluYBIz4rmOgjgsggerwuofYsnvAELUwAIDgtnvIok+AedrcYaqUFNVclidIhf8UBITosm+0RWo4AHjcGN1oUYJcJRG0HOmEtn/Qnj9wjhMwKSncKSXQnjdkkhs8feLsWaKIWZZ8NUYAMTXsIQGgDKkcmjNccc7Iab60ZbaoUY5wRXZIKR3EBITsPVogHPmQFMlQgfMANU4MCJ0OVT5s7AAAAJHRSTlMAAd78+fIvYiUNwJSMSQTZpZrpGAfl0cruta2FeGtaOyghblHefsY+AAAGNElEQVR42uzXW07DQAyF4eNOkuba3KCkJUUEzv7XiCIeiqoklCfsyt8O/pnRyMYaSd7K08sujvj/oq7Om7HK8CfZ/jxQn2OZCO4j1VnD8S+rX3v87rCvqVpo37FNPndUL7Q9NqSnQAuGywEr5BLTijzFoqyhIV2FBdORpoRRcCt5pjWF3DZ0tKcV6/cwK/BDb7OBHK8NTzmNiq5/VEmzhgnfKhqWC2aZgXFpw4f1xzSLewCT3uXhPi0AUxPTkpAipXkNCpoXwc4KsQ58AB6hhUdo4RFaeIQWHqGFR2jhEVp4hBYeoYVHaOERWniEFh7xRY29LaUOg2EYvpn/o4G20A20pUiBshNkK4oKS+//MpY6ItKEQssMCc95Dt7JZpIQua+GUfxkGA2SIHuE++z7q0evEpZH9fteTTfNO7trWdo3q2ubvb73PAgMuoLcES2cpTvy51cIyRlRwNlsb96gS0mISNLXBl1GgQjAbl+WoUQEYA7oAopEgHlFyk2VCKDWorzUiUD1hXJSKALajPJRKQJazrlQKgJ2QHmoFYGeQTkoFoEnykG1CBZTdqpFoE7ZXSvi32q1evL9h0++V64xHMOGlNm1Ikp0oDhb3UFsRNnJiPjmDuoQYS3KTELETvTehcADZSYhYq9gglejE4zFthDHhaC0MGhHYgQFNjgsoGMa86a3NC2Gb0yzzF64Wg+dSGoEvTBw1kcKhhUbQkx/fDEkRpAHjkcCxbWONHdPH/IiAnbOpnCbJk7x5UXQCEnM5UqXOG0sMaINjkOHphbOUJEYMQcnTmQyqB7hgNOhv5qA8hEuOMPDQ/gGIqL0CMfGDUQYqcspCnELEQ44G/rVwU1EzMHZ0q/+bUQ0wfmgnRa7jYgQSVZEOz5ErNp9r2Zq6kQsLCQt6dc9krTxdOv+DI1nk1BXIeIBnEfacRgSqhtKKE3HtuSIWAOnSTtDJL2RQGPQZxIjSiY4bHt80zODxApj801SRHDijT1BgkUp5ERMqxCYUMrhFJOIvIhNyCDAgrSIUYME5ERErfaSQaic/mAKiyRwnYi42KAvrrEIOuuKyXAE69DeO3h6JyLOdSKY1q1+6VoMqcoR7W0g0u+4JKTK177Voj9eqxCqz17pL8UiJtzFSkxvO7SnVsR/du5tN1EoCuP4PMy3hoNgBQRFwUM91qpVRzvaqu//GGMn2guQvaVpw9qJv2sS8mcFbliQfPjMKZP+dLBwxiqilLy8W5sEnPX5eE4RThtJMQlVVu84YRThPCKlGZKYtjIBPhF2G1fUeyRRmVpsIkITVw11ef6QR4RW2yJDR16hBxaDiP4bAEGF1NgtOsLetSAyr5BUySw0Ijx4kKiHJOUviorQx89t3MB77ZFM2SsgQlsGMxO3cgOdJOIfjtCX4bgUVU+iqNQfPKxfR+0m8mmXJRlV92cjNAPf4HEvznhGEsMIwJxGlM1pIoVhBNAaNTTK8hdXMIw4cTd2zuU7hhGANRvnXFtjGAE0dxGlVT1kYhgBuCGlaBYEGEbg6FOSbkCkmAjDgsCQUjhG7KOdh0wLNSZRJvJ329tPU+F4T5TpxJ7WcdWakmyAaQSRvty8WEiaaZTUANhGfHAGm677WeIt5gOdUjYA64j/ev5gPwkmDwP7+vuZ31AgQsJvQf2IGFA+IjIA5SNiAKpHhB4AxSOcd5yoHaG94IPSEZfvDFWOiC5zYBjRoNs8uThjGNF1bhpD3MQFwwgYcV8nMXtzhFz+CGNcSth7+KLWW03QUWnk2y34hcK4w2nD1yjBCf8Mj8ij+H/ZWPXRoVNbBZNJsKp1Zl3TQl7FR6TdIxR2j+DiHvGvvXvJQRCIgihaKNCg2PhBjRrF6Nv/GtVE418ZViXv7OCmoQmjYuERLDyChUew8AgWHsHCI1h4BAuPYOERLDyChUew8AgWHsECS9OHncmr0WivY18EIJi4OgLJwrQdcdaatOto/MSEpQX0l++3uGp1R7LHETehb5oWJe4qkzTd44HmdPw0x5NEsGKe40XcmJhejjdJ0LqjBjN8kgt9L9KqwWflROWq7Y3wXSvxj5RtSvwSA/0z1R8X+CfuqE8jGxboZF+RHke6Cg06S4rDuuZ6y7PBcPSl4ARLjv2bnB3OpwAAAABJRU5ErkJggg=="

            /***/
        }),
        /* 131 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 132 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 133 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 134 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 135 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAllBMVEUAAAAAovUFoPcAovYBovUAovUHo/IBo/YDo/YCovUDpPUIpPQEovM2vPIBofMBo/YDovUDovUEpPUAo/cEovQHovIGovQRqfMiqv8Bo/YBo/YBofMJqPYGofMLqvQKpfUWrfQCo/YBovQBovUAo/YAofMCovUBo/UFovMEo/QCovYCnuwCo/UCovYFpPQCofFAgMEAovWAL5sSAAAAMXRSTlMA3yC+/O8P+KWdeDEfBM60qp9tX1pOQRQH2MOQR0ArGAvz8ejf2tSulJGKiIFwcGoEIu/6bwAAANVJREFUKM/NzVcWgyAQQNEBYtfYNV3Te2H/mwsEFTR85+R9jXPPIPy4wiHk4vOpBF5uKljblLd2y4QUwNuHijNtu0HAFj6lY7/VXOrMjSu2wWxEWcMRlSHMNy+Dz5H34bHUKVPeSXweXC9QeQ4if9duLGRIvgr1nNSimp6CzQ3VtgBRqGezYWzolEDbYqvhtOPJKraGiiYdm5rXE5BlVHcscwePjzD0wmcyUjiDQauZcvvoW5mHyi0qFApSMmUms6vBf2PUmTH34KtgeXeio+0kyxr+pjfzaUNz9eGKIQAAAABJRU5ErkJggg=="

            /***/
        }),
        /* 136 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAMAAAD3eH5ZAAACdlBMVEUAAAAnb70PP5EVUKsncMAsfdIXWb0jZa0hZ8EPP5BCpe4UUK4VUKo/ouoWUaoPQZMVUK0UUbQSSJ4SSJwXVbgVUa4YVKUjXIsXUqgNMnAUUpgkbLA2i9AcW7IQOXIhWIoXUrU5k9MIIkwURpE0fcgteLUjX5VBpO1Bo+oRQpFEnOUZTpIqbaUiXI8QQJFAousdYb8TQ5JCoesSQ5NCouoURo8SRZJFoOdEmug3jdI4js8SR5wXRoAxgMQeX68eX64eXKUSSqghacIgZ8YYV7c9mN8PN34KLFtAouxEoupBpe4PP5EYWbwrfNP///8cX78cYMAZXL4WVLgUULQgZMIXVroUT7EdYsEUUrYZWr07lNYgZcIHIEYeY8EXWLsXRHsUT7MNMm4KLmgQQpcTTa4NM3IUTa87m+cgZ8YTTK0aXb4KLWcUTbAgZsMNM3MMMW0aXb8IJlUNN3wSS6oNNnk9m+ASS6w9mt8MM3QKLWYMMnD8/P4JJ1cPQZQMMnFyntgKLmr9/v4OOoTy9vwhZ8T2+v1JfckXUqMRRZgNOIAIJFLQ3/JKescUSZwQQ5qoweYVTp/v9fvn7/nE1u6yyeiuxeeLq9xQgs0hYsAHI1Dc5/XW4/S5zeqQrt6GqNtnktJAd8g8dMYybsUWUKEHIUv5/P290e18odh5n9hcitA3ccYOPYwOO4fk7fidueKZteBsl9Vhj9EracMNOYPg6vajveR4o9l1mtVUhc5Jf8wta8QKKmHp8frL2/DH2O+gu+OVs+CBpNpym9cjZMEmZL8eXrlAoutYh85Fe8ooZsHB0+22zOp2o9kmZsIxa8EbWro+m+ASR6GF+/1lAAAASnRSTlMA/e7+/a+v/f6vr/7+hv6G/sn+/sn+/vn+hhUJ/v7++smGhl8d/Prn2dc9/vv588S6uaSjnZV1ayv+/v7+/f39/OTbr5KGhoaEeKXrzegAAA+vSURBVHja7NGxC4JAFMfxxgiaHZqCUpGiiKBoKAiCeosNgqA4N90o/gP+azn7J3V6ko5eIfzE97l3cON9eSPG2NAdp3ZGMOy9o58w2xGazVGzYWETHsvR28OGEFkLnYgHYdrrLMIiUBqrcAjVoX3EgVDt2kfcCdWkfcSUUHEECo5AwREoOAIFR6DgCBQcgYIjUHAECo5AwREoOAIFR6AYWsQtiX87cf4iDZ1GzIM/5FTrbUQQZESVHkfUFX2OSKgTKmJ7HbfjNUVffuQ/a/LtquO+z+baXC1P3a5CRaSpECJMRRiGopgmT13Pk9NU/L1UPJ5+NTLBlQ3yyikfF8MwzGWgxKR0EiFSlfDhzVxWo4iCMKyg6BPoRnDlSn0AQcEHaKfTw4jIMLoUGgZ6PwuRQV3MIl7iBTUaFa8QTSReMsRLIuIdX8mqmjp/nenT7kz9031G05v68ledqtPZ2e3SP6cksfNaYzhBsasNHD7dspjED7q+HCSMA0rx/8MHRL9PCARBKHCCvely/LAgsUFu8UMxEgbRl92kfQ4QHDI7QXmFfBIAEpM0ZhJcoIs0BcAeBB3dSzqyh3TozCaJICiFpCTSYiAlDGyBUAiBxg+GHHkEij+nSfu3krYd2yRt37KFLKB0iiD6CsFrUtAsgEyi10wyimntJ4jDmw1BLsj+FGF0+Epd0PBJSiDS2M2Hmi6xFTs2GYIApKJB0O+AYhoBAEKgFEBQjgRilwfEzhB/H9XAFIkNoS0AQ5tDLgZMLjB4QyD8uDekNkwAQgrpChcSG5whtKh50eagICbNIkCAAcHLF+QPYQ4EE5oQBAMFLQviB0GTSkeIPkXOHIAwhFp3Fgf4WyHA0ARSFoVzTVj8JvFAbgZBh44rQUmaERwh0NZSBpYCMAEY8qSYExVVVZTVRQ8I+JDI5m26OfhovoADvDSmUqFygeh0UQ4Jgt60BiGFQPKvYqgKurzSSSoB+dRY0DOw4QR8wLjaiEDVUHo68c8Zg4Q5KYCYkEXNLpTigqsTjYcGvkAgJiQQTSAl2cC3b00ogUm7M4m+lCBpDJJLBmAMVYlM8oNoHrjRF+jTUy/yPCxGkHYG2OALoVo9Cy3g8IlDDz2FnqcMy29+vZlcS4XJH2K5Bc3boUFJ8mst09080S08vCMbE3TSF2L8yALpqQfCIJWwEkE8TprDgwEerscEJF+Inv02r3SiV2Ki5xQltJaUwzN7eCNmKLwgsKu+RiCD5xJ5dGRYakU6961ez9fx7PLniMHPCXSGjRa0hBlDt1UBhNbru+ocHn2YQsiyzA2iJ4pS5mW9r42mIH5WuamiOr5tewIgCmHwciK0td4iQrkqRpheSdFDVyIEbtDR42dmA0F4ORG94Z6zzO5EswVJCxdFcR8zRsWD0g08OT8GQiYM2UMfCJlUmeWJRbkwfXb71JrWU2vQfK/jwYj+l8EFN4joLcbCOQRzVqLHmPSjBjHHRVFgSrJO+IK3VSU46QjRY0kJ9NYsmMCQ86czbImGl/XxitQzqRIIK/t7BTKJ5FcT7ISOGI8tLZBJXBar4acjNBJCAMPvIRrMAzNCdOqUlxMMIJf1rGFXGBTibsgi5M0GcolEjKpbBMAXEJwgenpi4PtGC1rFnxpIYdu6zjSia2AgPW3hx5kKDMddIIILvHwe2v4TvxBbDBn/Dr9yQoBmW0FvyQQQCIMbhFCIF7YLzUZD3v1BaA/jAZK/ML23nTmrMxy/5AGhJsyIrB/czk0hXYYz+QqmK2O4eRmdvAwIYHAqbKHQ8+dXa72/7W3MLDqZTXqzNqwu2DlEETIGYAQvJ2ADU7w6j4C+Ip/KUQi8Kp7AKZtWN2y6hQ2MIGo71UT8d8NRwxl0/Mj21W+hqT8aY9L7aAciRWACVyekM2OxgK4BYhljX1WcQP7fw6R3Fc3lZsYeyCeo7QMBBJad4FYAEap9jbdVNPWPCpGVazgQqQ3G0G47QmDAsBP/YKwMVdh3HxekuygKHvVY9zE2ztcyqU2XD4T2ZeKovXtZVoibw1AlDHHBti8duO/ZgUgqGgRtRwixQBD4tu47rxCYRd5JUxgCkhCY4iWwviN+Xvjjm04Yk57api+5VBTXUbYFC2X8IpvoDiZfZbB6cIPIBQFzkmQ4DtIlQcyh1YnmEfNkTjq5CCqLXwkcnchjzfyl1cxanAiiKCwUCJLQhBElL/pHfPTRBtGQkAIJI8ZgRIjakhf1QUVxG8Rx3xXcF8QNFXHBBRRB8R95763Uqa7qtKY0c2LHZVTq49xT91Zl5t3ZQE4MW+ftGg3EK1TP+ZTltoJrYMhDzK0kLV9B2rJAWk1OjCywLKfd5ZOM2/f3oTGw9OeDyLFA3HPQBYQ2vQ5vJM0k1aSSLpAWMwTyILoKiA/MIIcFGKNJmFkfp6QOyutiB0HwIQaDjTMqUbVUpOXxpfFe+ELpV3QeYnSMhr4C4pR3WHi+dV0qENiN3vKgl37HSLjehMEhwInBnKpVW8HypiFArPXlBuuTaxnikj2aagNB9YPtqkMQaCwvgdB0DO22KSelkiSdWPqPxuiycnLaftsdcYjhqc3tHU3i/+HbLTQOamz4+r7rXiG1hcFCzKlKFZmYohGACCVFLvpIEOjHX3EXcwztkFKAzWo+dcXUNq+GQFAkBjMJMvGP69cRENQYZFnYVB+jtuDxe4SGknwVvbHph8FKMjFTVbVKxOqjiEII3o4+HURycw36ncY/fYJQbO00z+BABARAkBeNBu1OnIlavRKzyAgBAgj8TSXvXHLX4f7jSgpJDETnmk1c6h8quNDgV2MU7KqqRK9Wx0PQ/TZDoIJIr9edc53NKrchnW2i9R340rYIgCC1G4cHvMVWVbWWRisWgr8NgG0gUblgR7LT363PqRH3Bky6t5uHkI+cDw3LwI9ALFVlHVtj4yz8cTQEAeCjW1cu77Ut+UsjBFYTx79HzTswBTbAByOzxVaTZFk6VaGbA0K+rwe65M6b9pcvwEA7Ema+3d9e4HLErB5pGFHMMsSA+kRdRfaJif+2QOCDBggrm/90y7ZjIPA1wCMs3XbGg59hgqwfMhC8xap0+gIEldF2n+Ilpu1zuOhghJQYRNhX71qcY2EhQWZ2qilV02mZtP+beAhePhC0vLuPUc9aS4wNVqB8cdD2xcAHaHYTZ2Ip9bqpZgKkegRh0wBtRblcttOfMEA4Y5zCYSMwAQwGYqauMDtBOma55RKIgrRGuRy0Fx2CAHXsVRMS/gO7qo9gIZTKOaHj6iYeQrOwcbrWLMJt0vfg6xdNJRV8YCcGHOwEY8d0pPFzEUKLUvsxKgxZG1xjhJQnBEEwZnMutGZbrU2jAVCJE3qaJGVOmHF77Ul/jW+bwUXG9QDiZSHSswJBGgW7HnPGRsHFQ+h1OmUIkgk09JhiYNY/gvh5IPgOg7CSjA0WYrCUZqfY3QkEeuwf6bEQ+Q9vz/oQ1zwb+E2aHDS/PiQwAA6irsY4oaNw9N+d0JqNsBo1Oew9BiB37PEpL5cwoJxmKtQoJlhpPIGD0Fb2L5/3yuW5XCYBgU87xz2IO7J2lBEQcplAn4jk+BsCIDR3av9T9FPe3sMAQJD3L9xBoON+GKB8JlREJqJgBCIwIZVJ74P3PTVNULTtK0958qdFIBcCim2bNg7ECRVxxo7DAkQKmWn126GcPsMGd2b4cdzpRs6FAIGcGMh5ohKxO0XNg5ohfAZ77oG8OAenT68vFBF6/PT2mnKqqMqUPQAgQxRtyPVmQOAETav3IVBJgQn8o0cQctuRIBPRuZ3EiVIE2ND0wmBUaG6iEKFLv9or5VRzZ+xpX58BorSSYINDaIydVkMfpJy6JFNOiaqof1tprlB0KUSAAAjXGBzBmDTMors5AHm1uj2RQMxVa8jE1IdAQDgXOqEL5l0kiWAbyvMMkB5TdLv9vdLsCIIyEcug8TYRBBgMAT/BpgQPiiZYBBixrddiE1oE0TMQSQInpitAAAFCnoulZAQOuOAQGKDLsSb1JNhyjVlL46XTSZ0QhJIsGApA2ByPBqVWmIZtpo5atHgC6RNFXyBWJeEoriemKJdGn+iMswHKVZJnAwrJ86FHHIaAly8Mppzmxs9OOhKr3AlB4G0JNoTdDRSSAzAEnUF86LG6JPaBfvSHBqKmkgWZneBE4IG8QX4WyvsziZ3gNJMVAsEU/f5o7KgjE9ECfDmE39wC0dqFIBBXUdAaWGIC+2ABMoEYcJ9IkgXoE8hELs+FedsphAi3VdmSZNDoslqEMCQCgTC7EzIxdQGiGGcEOhxXTZj9TUkopL2RB+yGRciyNVRN3Cf+Uk6afvw/hBcDKOjOuIrxJXlmD0R9tqFLHMNhlmUPJRMVLqdIaX4mhKAoF31w+xEwsK8GiWYGKiBi6BsEsWFIT8YUm8WJalKdFCLKEkAwASAKnxzmVZhV+bHzhQn10HAMM351s+zXG7kBrCtVQXeC4nkwT/kQmPWQhbI4Y0saF2nOgTzkAId6mJHobXDz6I6je3Y9e7h//6YF0pJFi/w6IsEHTwhDOCixBySTBrMnZfJkQ3oebCCIC0d37d95ZP+aBRJBiA3huO0zYE7yDDBhaFEp9STM8j7sGiNYZMVv9stetWEYiOOPUApZuoU+QV+hUNpBr+AlCu5icLHwIAnbCG/ykN27t3jz6Jfr3alVbNNCKQQ54J9O9yF5uH9kQXzuoq5FEaKurynCCVh+us2Y/0siDU4FXQYw5B37phuNrxF4uA8yiqK2adpCiMH27CqQiJen3YV7cvvdfr+/X/B88hxPRwAcUcJAvC9LsJINpouApm2yUdTWWnYNSMSfeYz+RQciikQMvb8TtyeiawCl8ErcrIguy9pMKW5rW/fMcWsiurbNRm44F9bWZ+YIKeKtKLKfxu9WjOOoOE94koja+oMIKeKBc+gmoZ44V1yBpxWjaB1Ln8OugRqmMviQtYM/iKAioDeFnSkFzVGCzWLAisRRjs8p3IRgoMZ1YScaAp8Etevap4Ekfrjc4aJyM/noJxqCiqDWCYM/tysgM5j6HKFXiiAJyuRsQlARujqAHbSOKdGxruJDpSswrTV6yg6Q05oPcTo7h6AiYkeayhQDGBJ7i6XbRkexwoBrNZsSVoRMJXYlSQhZSr3LL0vRNDzllt0WjIHNCXwSpAKAQGCzYJfKl1LixDpfvkshRbyKXAD594CKLJ8bTPTCZXbo2ZKQIu7YWtlErIVNxFrYRKyFTcRnu3RsAzAIA1H0lC4rmJI0bpAQgiW8/z5ZIAXuLuLeBl/6LBTBQhEsFMFCESwUweK0iBqsBrY9wapinwenZvj/TxMZIxh5QYb14OOGpNWCzCxIs3pfPPoyiMiHFxP642PFosZjAAAAAElFTkSuQmCC"

            /***/
        }),
        /* 137 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
            /* harmony import */
            var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
            /* harmony import */
            var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
            /* harmony import */
            var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27);
            /* harmony import */
            var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
            /* harmony import */
            var _stores_dndStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);
            var isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var sideReCalcZu = function sideReCalcZu(state) { return state.sideReCalc; };
            var DropTabNewSpace = function DropTabNewSpace() {
                var isDragging = Object(_stores_dndStore__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"])(isDraggingZu);
                var sideReCalc = Object(_stores_dndStore__WEBPACK_IMPORTED_MODULE_8__[ /* default */ "a"])(sideReCalcZu); //Colorstuff
                var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[ /* useColorMode */ "b"])(),
                    colorMode = _useColorMode.colorMode;
                var MotionBox = framer_motion__WEBPACK_IMPORTED_MODULE_6__[ /* motion */ "c"].custom(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"]);
                var container = {
                    hidden: { scale: 0.9, opacity: 0, originY: 0, transition: { type: 'spring', duration: 0.15 } },
                    show: { scale: 1, opacity: 0.45, originY: 0.5, transition: { type: 'spring', duration: 0.15 } },
                    exit: { scale: 0, opacity: 0, originY: 0, transition: { duration: 0 } },
                    hover: { //background: "rgb(65, 225, 139, 0.2)",
                        //border:"2px solid #41E18B",
                        opacity: 1,
                        transition: { ease: 'linear', duration: 0.25 }
                    }
                };
                var dropZone = { rest: { scale: 1 }, hover: { scale: 0.98, transition: { ease: 'easeOut', duration: 0.05 } } };
                var icon = { rest: { scale: 0.75, y: -50, opacity: 0, originY: 1 }, hover: { scale: 1.75, y: 0, opacity: 1, originY: 0, transition: { type: 'spring', duration: 0.15 } } };
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], {
                    pointerEvents: isDragging ? '' : 'none',
                    position: "relative" //width="21.850vw"
                        //w={isDragging ? '367px' : '2px'}
                        //minWidth={isDragging ? '240px' : '2px'}
                        //minHeight="calc(80vh - 164px)"
                        ,
                    width: "21.850vw",
                    minWidth: "240px",
                    minHeight: "calc(80vh - 164px)",
                    maxW: "367px",
                    display: "flex",
                    textAlign: "left",
                    borderRadius: "16px",
                    zIndex: "1",
                    transform: sideReCalc ? 'translateX(-184px)' : 'none',
                    transition: "transform 0.0s" //bg="purple.400"
                }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_7__[ /* Droppable */ "c"], { droppableId: "newList", type: "tab" }, function(provided, snapshot) { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], Object.assign({ ref: provided.innerRef }, provided.droppableProps, { bg: "transparent", width: "21.850vw", minWidth: "240px", maxW: "367px", minHeight: "calc(80vh - 164px)", display: "flex", cursor: "pointer", borderRadius: "16px", zIndex: "2", paddingTop: "96px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_7__[ /* Draggable */ "b"], { draggableId: 'DROPZONE', index: 1, key: 1000 }, function(provided, snapshot) { return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[ /* default */ "a"], Object.assign({ bg: "transparent", ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, provided.dragHandleProps)); }), provided.placeholder); }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_6__[ /* AnimatePresence */ "a"], null, isDragging ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MotionBox, {
                    zIndex: "3",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    variants: container,
                    bg: "rgb(65, 225, 139, 0.1)",
                    initial: "hidden",
                    animate: "show",
                    opacity: "0.8",
                    border: "2px solid #41E18B" //background="rgb(65, 225, 139, 0.2)"
                        ,
                    exit: "exit",
                    whileHover: "hover" //width="21.850vw"
                        ,
                    width: "21.850vw",
                    minWidth: "280px",
                    maxW: "367px",
                    height: "100%",
                    display: "flex",
                    cursor: "pointer",
                    textAlign: "left",
                    borderRadius: "16px"
                }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MotionBox, { variants: dropZone, initial: "rest", display: "Flex", flexDir: "column", alignItems: "center", w: "100%", h: "100%" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], { display: "flex", p: "18px", w: "100%", opacity: "0.4" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], { background: "#41E18B", mt: "0.5rem", fontSize: "2.95rem", ml: "4px", px: "12px", height: "54px", w: "54px", rounded: "8px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[ /* default */ "a"], { ml: "0.8rem", mr: "0.6rem", mt: "0.65rem", flexDir: "column", textAlign: "left" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], { bg: "#41E18B", rounded: "6px", height: "24px", w: "136px" }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_2__[ /* default */ "a"], { bg: "#41E18B", rounded: "4px", height: "18px", mt: "6px", w: "64px" }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MotionBox, { variants: icon, m: "auto", display: "flex", alignItems: "center", pb: "20vh" }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_5__[ /* default */ "a"], { m: "auto", name: "arrowCircleDown", fontSize: "54px", color: "#41E18B" })))) : ''));
            }; /* harmony default export */
            __webpack_exports__["a"] = (DropTabNewSpace); //transition="transform 0.15s cubic-bezier(.374,.019,.035,1.861), opacity 0.2s" _hover={{transform: "scale(1.025)", boxShadow: "2px 10px 28px 0 rgba(152,169,185,0.28)", opacity: "1"}}
            //<MotionBox variants={icon} m="auto" backgroundImage="radial-gradient(circle at top left, #FFFFFF20 35%, #ACF4DC40 100%)" height="64px" width="64px" display="flex" alignItems="center" rounded="50%">

            /***/
        }),
        /* 138 */
        ,
        /* 139 */
        ,
        /* 140 */
        ,
        /* 141 */
        ,
        /* 142 */
        ,
        /* 143 */
        ,
        /* 144 */
        ,
        /* 145 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABBVBMVEUAAAD////b3+S/xs2osbq2vcbY3eKmrrjW2+HW3eKxucSiq7Skr7ers7zS193T2d+hq7SnrrittLvGzNPBx83a3+Slr7jK0dLQ192rsru1vsSwt7/BxdK6uunI0NbEytGlr7fa3uPV2t/S2N3N09m1vsW1usPM09rCys+lrri2vsOqtLymrLnJ0NfFzNTGzdXK0NfHztbL0tnW2+DT2N7P1dzHzdW+xc3b3+TN09nDytLM0tnY3eLJz9bEy9OyusLO1NrCytKjrLWjrbagqrPR192wucK9xMvAx86krre5wMiut7+7wsqvuMCstL2qs7yosrqnsLmhq7OfqLHAx8+lrba0u8J80sOSAAAALnRSTlMAAbq2mP6Yl5SXNePCnpqP+/DouqGZlY+Li3FnPgXy8vLw8PDby7q5ua2JfigmzkwOsQAAAehJREFUSMfF02lD4jAQBuDtSvdAXHfXY93DvbyvJuVoaWvT0oNWWqAg+v9/imNQYwok+kXn4/A+kGSGN69Uysa/nXXlGfm37XbDX1Oekz9vxPhQeWoe4o1m03eXlCfnm3Gr1XIMJqR533IcC2tMiPMt38FQDhOSvFXHrq67uM6ELK8bCBk6E9I8QpqGECekeV7I87yQ50tCmp8RsvyskOVnhSAvFrN5kZDnmbBByPNMYCPZn4qNNqxz7NP90eaXbdsa0vLBCgX/Y8uxYJ/dhXnSMRMzTbziCwV/JomNBQcCkKr9bjcrgilY967N3wfCE5neqPY3iKLpkZTjvaWzLTiSAPTDzdOj2smjUWwJLg2gG2yWdmkVntUVgfdlEMM76YtBWAYfYHLcLaSgAaOjgHTuijwCXlgpgY+wHBR00rx3W3kyIQg9gIt5wAHQMdVBUYyKYpj1JsRAYOaDd7cAA+gNo0uoKAqzXHN1IEKgpd7VZa2q0IFW1zB2dRAiADNd3r5vbu86IISAwIhWWPfTdIlFgH/xVfo3kQJ+nADIgmeloB9UyuOkXzMf6CTJeNCkgHXZ9eDH4ZNUHY4rXLfOulx9M4idJrk6CKPvgi6rX6rXzwbDURB9roq6rH58HV0F43G0/FPQfZG6AZDz59rOuT2rAAAAAElFTkSuQmCC"

            /***/
        }),
        /* 146 */
        ,
        /* 147 */
        ,
        /* 148 */
        ,
        /* 149 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/happyBell.8820bac7.mp3";

            /***/
        }),
        /* 150 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/undone.697c0239.mp3";

            /***/
        }),
        /* 151 */
        ,
        /* 152 */
        ,
        /* 153 */
        ,
        /* 154 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 155 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 156 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 157 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAABcCAMAAAC/WWw/AAAAtFBMVEUAAAA4fVlV64A24Hk24Hk8WVA14Hk14Xk14X01tWtBUFA6Rkc24Hg6Z1M133hES1BCSU5HT1RGTVJAR0xJUVVNVFlLU1dKUlY+RUs9REo6QUc8Q0lOVlpPV1s13XcyzXAz03I02XUz1nQxyG0wwGk5QEY22HY4v28023Y8VU5GXVg5uW02tGo9pGo8g15Cd143z3Q4ynNDWFRGalsxxWs7o2hBiGNQWlw9mGVAmmg/mWc9U07mXHa1AAAADnRSTlMAkgbz1dWUjysr8/O9vQ9pHNMAAAdMSURBVGjetZsJU9swEIWh95nY5HAc0oMeSRtIUkKh1///X5WE5Lcryd7VdLoIOp1ph2/e20OWlRMbz54+ejhK4+3bLxcf3r9/9+7q7ubHmy5WPmZmIeY2GvfDxbSZ+qgRZ/Y7xHhsFomqevH49PnJfTx4MsqHZ/p454jAZJblWUVEHqsxyyE1gWkKprMepGpc2WV+nD5wTK/6mN5eXHwwTIcUKaKa26/7CCo1FAlQjIpH5eO1pYJOGaGMd9CJURkkRKdSoEJEQtWeyH5xpbo4Nfk0Goa64t6FgFBzyxSwXECnac0jiGQWta8yCzF+fvJ01OteKtTKLktEhZqHLLdKeaRgnl2cKC9UJNWjYaE+3gDJE6XmIclhnoeCSMjziMjnOOLxyUMB6kem8Fb9heeI0sLzRHCP68ShXpwIKfX9DQuvEyoP5vmM4lLRdKqFwkMMQVmhAIW6g1Kpd0inRCcgUSxrHcWaVJNJCRR6OWFCh3JYzjpgEaph68A0DOVS6lPMxOrOmueBHBH1jvcnSIUsh1QcSwEF84J7HMtHOvH41POhEUoJtTJfeaEAZAqPJBRDAlDfyINKNvRKDXUoDD2h7qQeZaAqtVI0xVOhOqL8dAHUYDpN7JdWqRW4ZuAiHcpRYeLViVJpN4BOY5ZPRTmVWochbL6BlColFR6Q9EpZJHQDTgXvMIcxXYCUhaoi+yZlUOjkLKP6c3yaFSotPASAdFCrvq3BjE28ZAojn+4269wvWG/2nEsPtbJUcI4XXmNXVHhsr2nW9nLUG5dHKpQeCoXH+yafw2BKCg9MOSomk14pH3yriRmcLzxsye9Gg7HvUhxYCxEK5hEq0g+QUKl5FmszDLXx5hUrlXaoWUTUYOLFjy7rYag1kAqUGhh5wBrYQo2ECAOvVKlZtP/NbjWhEpJcCcWRFgVKxQnV4MGTlB5LKJVSqU4LGWqW3/56JN6i4oTSQNmZx5B09sG6tEPND7vN9Xp9vdkdmni8KKECEtxT2cebAWlR292a1NFum9v8SlBpRqmguHkzUP1aR+X9e+qIvH/aRI+8UykF9/iBz3aTaYXbYqU8DrJcoxRrm2aFk4ybb7n/9O3Gd/L/C8W8Q0ZtwcSptkwn2b4onyaFUNiuGKk2vcMsekTXQkEnvX1QyVH96v8tP617YadZYJ+TqdC+uV2debTurr5+vaI1uGVb8jL7XLRaKBDZ2NF/+LVtv9K/78CkVgpMeqg5ny9z1qBaE6xd1TheUSsVclxrX3qQcRhloBAHr1MJFLxbtGr72HjZDUPdhjxXQ6EdtAsNFGTC64TNMNSlh9IrtSDmteqc4qcG113dtSS6GrwGU0lOLYJQMtQ8eAemZo26Q6AG15ZInVMBaOITSgOV25FLUCVK+abZtQNdouMYqqOS7LNEWigUXhuEOi9QqglMYqIb60qUclTQ6VyjlJ/DeMkhtoQipRb3SdUipWSo3Dm51DwJUyVBQSWznE7nsn2s8DyVNGbGhTm1gEq6nArzLgjlYnAg31KhZKUQlscsjVIQCkeIQ1uXiyM7QhShuFB6+9JDg98DmzwwaXIqpBSYNFDBPbxBr82f/dvhM2qeItHRo7x5OiiXUMY5emjQ++Bw5EKJ9oXKg1AqKEMU3TQwq+57xIoPgCUoIFkiF0sRKv+Gyqzsw6jTCaG0r20hlEopNKj4vGf6M3psv/hZRzpplQKQUqkGrTw+KOcHHLfH+LWLDqoNUME9GcoQ8YRi7/Wnh9tLexR0eXuo07eLGig78xiSxj64lz3WHLoAoYRCh2otlEYp3jQjolq65CNDhYxyRI5JlVNTVF5Nuc7MEi756HLKReddqVIl1460UCC6xzIhQ/G7Bpyq5+JRRe/TSIf7IZ3aUqj8C6ozlVLSaxCi1NLap4PK6wT7xshyNANg7YUXRvciQScVFFqUlWlafsln+NUaaVFLo1ShfTXPc8k8xPFygOkPTfOlXqkuCgsPLxf3va9rQQQmPVR6DVFn3iR6b9Y9DGMLhRa1LITiE6/sPg3CE2FTzr3TQw2/1ldcqImEIg8KCz5eCuzzQKzuajKDBSYEO9X0REGqJYhMfFbnVFan3puRyCgGBSy21fRcevsAlBGqnAlACzddAOSxPmug0DTF8eKQZPdat3jdnVP3NPYBSbjWWkVCTSKhSJLbgFCUSJlTvBnQfJIvjSFoM+Cb8jBdoJR4pRI3/jL3yRGqXhDcQy9wTMw7w7QUoaxOCJkKXDwCkvcuUIUEh0xmidd040sZ/94M+OMw18ksE+KF5iPTCZHeJx8DCVmO6aITysZL8er3lt2n+ccO1dpFCm+J0iNKPRYvye9ReMpOnpYdtY6bFxeei1P54wTSVlO/N0gf0LlMLsvN93P5gxf73H1ysW1yqi48FekH1DkvlOYjKjeYeMr75B4LHWpCk/w8KJXRycTrB6oP8+wHRl5ll8Y6ZLlHymEZrlPDpPvY0357hFDlY5hvNeEcC9sL/Mee/gLWU/j24ZMLywAAAABJRU5ErkJggg=="

            /***/
        }),
        /* 158 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 159 */
        /***/
        (function(module, exports) {

            module.exports = "data:image/png;base64,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"

            /***/
        }),
        /* 160 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/EmptyState_Tabs.f60f22b3.png";

            /***/
        }),
        /* 161 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/EmptyState_TabsDark.d368d4af.png";

            /***/
        }),
        /* 162 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/popFx.377e920c.mp3";

            /***/
        }),
        /* 163 */
        ,
        /* 164 */
        ,
        /* 165 */
        ,
        /* 166 */
        ,
        /* 167 */
        ,
        /* 168 */
        ,
        /* 169 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/EmptyState_Spaces.5cfbacbc.png";

            /***/
        }),
        /* 170 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__.p + "static/media/EmptyState_SpacesDark.d91c024c.png";

            /***/
        }),
        /* 171 */
        ,
        /* 172 */
        ,
        /* 173 */
        ,
        /* 174 */
        ,
        /* 175 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
            var slicedToArray = __webpack_require__(3);

            // EXTERNAL MODULE: ./node_modules/react/index.js
            var react = __webpack_require__(0);
            var react_default = /*#__PURE__*/ __webpack_require__.n(react);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/ColorModeProvider/index.js
            var ColorModeProvider = __webpack_require__(18);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Flex/index.js
            var Flex = __webpack_require__(22);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Editable/index.js
            var Editable = __webpack_require__(104);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Popover/index.js
            var Popover = __webpack_require__(37);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/IconButton/index.js
            var IconButton = __webpack_require__(217);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Box/index.js + 1 modules
            var Box = __webpack_require__(8);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Icon/index.js
            var Icon = __webpack_require__(20);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Heading/index.js
            var Heading = __webpack_require__(166);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Text/index.js
            var Text = __webpack_require__(23);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Button/index.js + 1 modules
            var Button = __webpack_require__(44);

            // EXTERNAL MODULE: ./src/stores/store.js + 4 modules
            var store = __webpack_require__(1);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
            var toConsumableArray = __webpack_require__(7);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/InputGroup/index.js
            var InputGroup = __webpack_require__(216);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/InputElement/index.js
            var InputElement = __webpack_require__(95);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Input/index.js + 1 modules
            var Input = __webpack_require__(102);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Tooltip/index.js
            var Tooltip = __webpack_require__(165);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/PseudoBox/index.js
            var PseudoBox = __webpack_require__(21);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Link/index.js
            var Link = __webpack_require__(103);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/RadioGroup/index.js
            var RadioGroup = __webpack_require__(224);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Radio/index.js + 1 modules
            var Radio = __webpack_require__(232);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/CircularProgress/index.js
            var CircularProgress = __webpack_require__(218);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Spinner/index.js
            var Spinner = __webpack_require__(98);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Alert/index.js + 1 modules
            var Alert = __webpack_require__(70);

            // EXTERNAL MODULE: ./node_modules/emoji-mart/css/emoji-mart.css
            var emoji_mart = __webpack_require__(89);

            // EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v1.js + 2 modules
            var v1 = __webpack_require__(221);

            // EXTERNAL MODULE: ./src/Components/userButton.js
            var userButton = __webpack_require__(79);

            // EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.js
            var index_esm = __webpack_require__(88);

            // CONCATENATED MODULE: ./src/Components/shareCategoryPopover.js
            /* global chrome */
            var userStateZu = function userStateZu(state) { return state.userState; };
            var tabsZu = function tabsZu(state) { return state.tabs; };
            var setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var setCategoriesStateZu = function setCategoriesStateZu(state) { return state.setCategoriesState; };
            var setCategoriesZu = function setCategoriesZu(state) { return state.setCategories; };
            var categoriesZu = function categoriesZu(state) { return state.categories; };
            var sharedHydratedZu = function sharedHydratedZu(state) { return state.sharedHydrated; };
            var setSharedHydratedZu = function setSharedHydratedZu(state) { return state.setSharedHydrated; };
            var setShowToastZu = function setShowToastZu(state) { return state.setShowToast; };
            var setIsLoadingCategoriesZu = function setIsLoadingCategoriesZu(state) { return state.setIsLoadingCategories; };
            var setIsLoadingSpacesToShowZu = function setIsLoadingSpacesToShowZu(state) { return state.setIsLoadingSpacesToShow; };
            var rolesZu = function rolesZu(state) { return state.roles; };
            var currentWSidZu = function currentWSidZu(state) { return state.currentWSid; };
            var shareCategoryPopover_AddUserSection = function AddUserSection(_ref) {
                var currentInvited = _ref.currentInvited,
                    collaborators = _ref.collaborators,
                    viewers = _ref.viewers,
                    slug = _ref.slug,
                    shared = _ref.shared,
                    isOwnerOfWS = _ref.isOwnerOfWS,
                    setViewers = _ref.setViewers,
                    isLoadingPub = _ref.isLoadingPub,
                    setLoadingPubRoles = _ref.setLoadingPubRoles,
                    loadingPubRoles = _ref.loadingPubRoles; //zuState
                var userState = Object(store["a" /* default */ ])(userStateZu);
                var setShowToast = Object(store["a" /* default */ ])(setShowToastZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var text = { light: '#1A202C', dark: '#FFF' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var errorColor = { light: 'red.500', dark: '#FFF' };
                var iconColor = { light: 'gray.600', dark: '#B3BAC6' };
                var _useForm = Object(index_esm["a" /* useForm */ ])({ mode: 'onTouched', reValidateMode: 'onBlur' }),
                    register = _useForm.register,
                    getValues = _useForm.getValues,
                    reset = _useForm.reset,
                    setValue = _useForm.setValue,
                    handleSubmit = _useForm.handleSubmit,
                    errors = _useForm.errors,
                    formState = _useForm.formState,
                    setError = _useForm.setError;
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    popOpen = _useState2[0],
                    setPopOpen = _useState2[1];
                var open = function open() { setPopOpen(!popOpen); };
                var close = function close() { return setPopOpen(false); }; //Check if in currentRoles
                //new CC
                //send CC to bg
                //
                var onSubmit = function onSubmit(data) {
                    if (collaborators && collaborators.find(function(o) { return o.email === data.emailField; }) || viewers && viewers.find(function(email) { return email === data.emailField; })) {
                        setShowToast('Looks like this user has already invited', 'Please see list of users', 'error'); //setValue("data.emailField", "");
                        reset();
                        return;
                    }
                    setLoadingPubRoles(true);
                    var email = data.emailField;
                    chrome.runtime.sendMessage({ msg: 'setNewViewer', addOrRemove: 'add', emailPayload: email, slug: slug }, function(resp) {
                        if (resp.msg === 'success') {
                            setShowToast('Invite sent to:', email, 'success');
                            var newViewers = resp.newViewers;
                            setViewers(newViewers);
                            setLoadingPubRoles(false);
                            close();
                        }
                    });
                };
                return react_default.a.createElement(Box["a" /* default */ ], { py: "4px" }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "top" }), react_default.a.createElement("form", { onSubmit: handleSubmit(onSubmit) }, react_default.a.createElement(InputGroup["a" /* default */ ], { mt: "4px" }, react_default.a.createElement(InputElement["a" /* InputLeftElement */ ], { children: react_default.a.createElement(Icon["a" /* default */ ], { name: "emailIcon", color: iconColor[colorMode], ml: "6px" }) }), react_default.a.createElement(Input["a" /* default */ ], {
                    isDisabled: isOwnerOfWS || !shared,
                    roundedRight: "0px",
                    roundedLeft: "4px",
                    color: text[colorMode],
                    focusBorderColor: "#63B3ED",
                    variant: "filled" //pr="4.5rem"
                        ,
                    type: "email",
                    name: "emailField",
                    ref: register({ required: true }),
                    placeholder: "Email",
                    className: colorMode === 'light' ? 'signup' : 'signupdark'
                }), react_default.a.createElement(Button["a" /* default */ ], { isDisabled: isOwnerOfWS || !shared, color: "#FFF", isLoading: isLoadingPub, type: 'submit', backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", roundedRight: "4px", roundedLeft: "0px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Text["a" /* default */ ], { color: "#FFF", fontSize: "12px", px: "8px" }, "Invite"))), errors.emailField && formState.touched.emailField && react_default.a.createElement(Text["a" /* default */ ], { color: errorColor[colorMode], mt: "6px" }, "An email is required"), errors.invited && react_default.a.createElement(Text["a" /* default */ ], { color: errorColor[colorMode], mt: "6px" }, "The user has already been invited")), !shared && !isOwnerOfWS ? react_default.a.createElement(Text["a" /* default */ ], { color: text[colorMode], mt: "8px" }, "Share category to invite new users") : '');
            };
            var shareCategoryPopover_ShareCategoryPopover = function ShareCategoryPopover(_ref2) {
                var categoryName = _ref2.categoryName,
                    item = _ref2.item;
                var userState = Object(store["a" /* default */ ])(userStateZu);
                var tabs = Object(store["a" /* default */ ])(tabsZu);
                var setTabs = Object(store["a" /* default */ ])(setTabsZu);
                var categories = Object(store["a" /* default */ ])(categoriesZu);
                var setCategoriesState = Object(store["a" /* default */ ])(setCategoriesStateZu);
                var setCategories = Object(store["a" /* default */ ])(setCategoriesZu);
                var sharedHydrated = Object(store["a" /* default */ ])(sharedHydratedZu);
                var setSharedHydrated = Object(store["a" /* default */ ])(setSharedHydratedZu);
                var setShowToast = Object(store["a" /* default */ ])(setShowToastZu);
                var setIsLoadingCategories = Object(store["a" /* default */ ])(setIsLoadingCategoriesZu);
                var setIsLoadingSpacesToShow = Object(store["a" /* default */ ])(setIsLoadingSpacesToShowZu);
                var roles = Object(store["a" /* default */ ])(rolesZu);
                var currentWSid = Object(store["a" /* default */ ])(currentWSidZu);
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var lightColor = { light: 'gray.100', dark: '#3F454D' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var bodyBg = { light: 'gray.100', dark: '#181b1d' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(152,169,185,0.50)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var linkColor = { light: 'blue.500', dark: 'blue.400' };
                var alertBg = { light: 'blue.100', dark: 'gray.700' };
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    popOpen = _useState4[0],
                    setPopOpen = _useState4[1];
                var open = function open() { setPopOpen(!popOpen); };
                var close = function close() { return setPopOpen(false); };
                var _useState5 = Object(react["useState"])(item.shared),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    shared = _useState6[0],
                    setShared = _useState6[1];
                var _useState7 = Object(react["useState"])(false),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    loadingSharing = _useState8[0],
                    setLoading = _useState8[1];
                var _useState9 = Object(react["useState"])(),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    randomSlug = _useState10[0],
                    setSlug = _useState10[1]; //public or invited stuff
                var _useState11 = Object(react["useState"])('1'),
                    _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                    shareOption = _useState12[0],
                    setShareOption = _useState12[1];
                var _useState13 = Object(react["useState"])([]),
                    _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                    viewers = _useState14[0],
                    setViewers = _useState14[1];
                var _useState15 = Object(react["useState"])(true),
                    _useState16 = Object(slicedToArray["a" /* default */ ])(_useState15, 2),
                    loadingPubRoles = _useState16[0],
                    setLoadingPubRoles = _useState16[1];
                Object(react["useEffect"])(function() {
                    var uuid = Object(v1["a" /* default */ ])();
                    var newSlug = (userState.userId.slice(0, 10) + uuid.slice(0, 8)).toLowerCase();
                    setSlug(newSlug);
                }, []);
                var base = 'https://www.tabextend.com/shared/';
                var uuid = Object(v1["a" /* default */ ])();
                var slug = item.shared ? item.slug : randomSlug;
                var url = base + slug;
                var initShareCategory = function initShareCategory() {
                    setIsLoadingSpacesToShow(true);
                    setLoading(true);
                    setIsLoadingCategories(true);
                    var publicStatus = shareOption === '2' ? false : true;
                    chrome.runtime.sendMessage({ msg: 'initShareCategory', catId: item.id, slug: slug, ownerName: userState.name, ownerEmail: userState.email, public: publicStatus }, function(resp) {
                        if (resp.msg === 'success') {
                            var catIndex = categories.findIndex(function(cats) { return cats.id === item.id; });
                            var newCatData = categories;
                            newCatData[catIndex].shared = true;
                            newCatData[catIndex].slug = slug; //tabs -> forEach = categoryID === item.id -> slug
                            var newTabs = tabs;
                            newTabs.forEach(function(group) { if (group.categoryID === item.id) { return group.slug = slug; } });
                            var newHydration = [].concat(Object(toConsumableArray["a" /* default */ ])(sharedHydrated), [newCatData[catIndex].slug]);
                            setSharedHydrated(newHydration);
                            setTabs(newTabs, 'noDbUpdate');
                            setCategoriesState(newCatData);
                            setLoading(false);
                            setShared(true);
                            setIsLoadingCategories(false);
                            setIsLoadingSpacesToShow(false);
                            setLoadingPubRoles(false);
                        }
                    });
                };
                var stopPublicSharing = function stopPublicSharing() {
                    setLoading(true);
                    setIsLoadingCategories(true);
                    chrome.runtime.sendMessage({ msg: 'stopShareCategory', catId: item.id, slug: item.slug }, function(resp) {
                        if (resp.msg === 'success') {
                            var catIndex = categories.findIndex(function(cats) { return cats.id === item.id; });
                            var newCatData = categories;
                            delete newCatData[catIndex].shared;
                            delete newCatData[catIndex].slug;
                            var newHydration = sharedHydrated.filter(function(slug) { return slug !== newCatData[catIndex].slug; });
                            setSharedHydrated(newHydration);
                            setCategoriesState(newCatData);
                            setLoading(false);
                            setShared(false);
                            setIsLoadingCategories(false);
                            close();
                        } else {
                            setLoading(false);
                            setIsLoadingCategories(false);
                        }
                    });
                };
                var copyLink = function copyLink() {
                    navigator.clipboard.writeText(url);
                    setShowToast('Url copied', 'Full link copied to clipboard', 'success');
                };
                var isOnProPlan = true;
                var workspaces = userState.workspaces;
                var wsIndex = workspaces === null || workspaces === void 0 ? void 0 : workspaces.findIndex(function(ws) { return ws.id === currentWSid; });
                var isOwnerOfWS = userState.workspaces[wsIndex].shared ? userState.workspaces[wsIndex].owner ? true : false : true; //const [isInviteOnly, setIsInviteOnly] = useState(false);
                Object(react["useEffect"])(function() { if (popOpen === true) { item.inviteOnly === true ? setShareOption('2') : setShareOption('1'); } }, [popOpen]);
                Object(react["useEffect"])(function() { if (shareOption === '2' && shared) { fetchPublicRoles(); } }, [shareOption]);
                var fetchPublicRoles = function fetchPublicRoles() {
                    chrome.runtime.sendMessage({ msg: 'fetchPublicCat', slug: item.slug }, function(resp) {
                        if (resp.msg === 'success') {
                            var _viewers = resp.viewers;
                            setViewers(_viewers);
                            setLoadingPubRoles(false);
                        } else { //TODO handle error
                        }
                    });
                };
                var shareToggle = function shareToggle(e) {
                    setShareOption(e.target.value);
                    var catIndex = categories.findIndex(function(cats) { return cats.id === item.id; });
                    var newCatData = categories;
                    var newStatus = e.target.value === '2' ? true : false;
                    newCatData[catIndex].inviteOnly = newStatus;
                    if (shared) { chrome.runtime.sendMessage({ msg: 'updateOnlyPublic', slug: slug, newData: { public: !newStatus } }); } setCategories(newCatData);
                };
                var removeViewerFromCat = function removeViewerFromCat(userEmail) {
                    setLoadingPubRoles(true);
                    chrome.runtime.sendMessage({ msg: 'setNewViewer', addOrRemove: 'remove', emailPayload: userEmail, slug: slug }, function(resp) {
                        if (resp.msg === 'success') {
                            setShowToast('User removed as viewer:', userEmail, 'success');
                            var newViewers = resp.newViewers;
                            setViewers(newViewers);
                            setLoadingPubRoles(false);
                        }
                    });
                };
                return react_default.a.createElement(Popover["a" /* Popover */ ], { isOpen: popOpen, onClose: close }, function(_ref3) {
                    var isOpen = _ref3.isOpen,
                        onClose = _ref3.onClose;
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Popover["h" /* PopoverTrigger */ ], null, react_default.a.createElement(Box["a" /* default */ ], { display: "inline-block", onClick: open }, react_default.a.createElement(Tooltip["a" /* default */ ], { rounded: "4px", label: react_default.a.createElement(Box["a" /* default */ ], { p: "2px" }, react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "15px", w: "100%", textAlign: "center" }, item.shared ? 'See public link' : 'Share via public link')), zIndex: "500000", placement: "bottom" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                        opacity: isOpen ? '0.6' : '1',
                        icon: "globeIcon",
                        ml: "auto",
                        transition: "0s",
                        color: item.shared ? '#FFF' : iconSmall[colorMode],
                        variantColor: item.shared ? 'blue' : '',
                        backgroundImage: item.shared ? 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)' : '',
                        _hover: { backgroundImage: item.shared ? 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)' : '', boxShadow: item.shared ? '0 10px 16px -8px rgba(49, 144, 255,0.5)' : '' },
                        boxShadow: item.shared ? '0 12px 18px -10px rgba(49, 144, 255,0.35)' : '' //bg={item.shared ? 'green.400' : ''}
                    })))), react_default.a.createElement(Popover["e" /* PopoverContent */ ], { zIndex: 4, minWidth: "478px", rounded: "9px", bg: color[colorMode], boxShadow: linkShadow[colorMode], border: "none" }, react_default.a.createElement(Popover["b" /* PopoverArrow */ ], null), react_default.a.createElement(Popover["d" /* PopoverCloseButton */ ], { mt: "4px", color: iconSmall[colorMode] }), react_default.a.createElement(Popover["c" /* PopoverBody */ ], null, react_default.a.createElement(Box["a" /* default */ ], { py: "12px", pl: "12px", pr: "24px", mt: "12px", pb: "16px" }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "top" }, react_default.a.createElement(Heading["a" /* default */ ], { fontSize: "18px", fontWeight: "500", lineHeight: "normal", color: text[colorMode] }, react_default.a.createElement(Icon["a" /* default */ ], { name: "globeIcon", size: "28px", color: iconSmall[colorMode], mr: "8px", mt: "-2px" }), "Share category via link")), react_default.a.createElement(PseudoBox["a" /* default */ ], { mt: "16px", bg: lightColor[colorMode], pl: "8px", h: "42px", rounded: "4px", display: "flex", alignItems: "center" }, shared ? react_default.a.createElement(Link["a" /* default */ ], { my: "auto", color: text[colorMode], href: url, isExternal: true }, url) : react_default.a.createElement(Text["a" /* default */ ], { shared: true, opacity: "0.65", my: "auto", color: text[colorMode], cursor: "not-allowed" }, url), react_default.a.createElement(Button["a" /* default */ ], { onClick: function onClick() { return copyLink(); }, isDisabled: shared ? false : true, color: shared ? '#FFF' : text[colorMode], ml: "auto", minH: "100%", minW: "48px", roundedRight: "4px", roundedLeft: "0px", fontSize: "12px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)", backgroundImage: shared ? 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)' : '', _hover: { backgroundImage: shared ? 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)' : '', boxShadow: shared ? '0 10px 16px -8px rgba(49, 144, 255,0.5)' : '' }, boxShadow: shared ? '0 12px 18px -10px rgba(49, 144, 255,0.35)' : '' }, "Copy")), react_default.a.createElement(RadioGroup["a" /* default */ ], { mt: "12px", onChange: function onChange(e) { return shareToggle(e); }, isDisabled: isOnProPlan || !isOwnerOfWS, value: shareOption, spacing: 5, isInline: true, color: text[colorMode] }, react_default.a.createElement(Radio["a" /* default */ ], { isDisabled: isOnProPlan || !isOwnerOfWS, value: "1", opacity: shareOption === '2' ? '0.75' : '1' }, "Anyone with link"), react_default.a.createElement(Radio["a" /* default */ ], { isDisabled: isOnProPlan || !isOwnerOfWS, value: "2", opacity: shareOption === '1' ? '0.75' : '1' }, "Only invited users")), shareOption === '2' && (!roles ? react_default.a.createElement(CircularProgress["a" /* default */ ], { fontSize: "24px", thickness: "0.25", isIndeterminate: true, color: "blue" }) : react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Flex["a" /* default */ ], { w: "100%", bg: bodyBg[colorMode], px: "16px", rounded: "6px", mt: "8px", pt: "12px", flexWrap: "wrap", minH: "44px" }, (roles === null || roles === void 0 ? void 0 : roles.length) > 0 && roles.map(function(user) { return react_default.a.createElement(userButton["a" /* default */ ], { key: user.userId, name: user.name, email: user.email, role: user.status, sharedCatVer: true, owner: true, userId: user.userId, py: true }); }), shared ? loadingPubRoles ? react_default.a.createElement(Spinner["a" /* default */ ], { mt: "8px", size: "18px", color: "blue.400" }) : viewers === null || viewers === void 0 ? void 0 : viewers.map(function(user) {
                        return react_default.a.createElement(userButton["a" /* default */ ] //name={'User'}
                            , { email: user, role: 'Viewer', owner: isOwnerOfWS, userId: user, removeUserFromWs: removeViewerFromCat, py: true });
                    }) : ''), react_default.a.createElement(shareCategoryPopover_AddUserSection, { shared: shared, collaborators: roles, viewers: viewers, slug: slug, setViewers: setViewers, setLoadingPubRoles: setLoadingPubRoles, loadingPubRoles: loadingPubRoles }))), isOnProPlan ? react_default.a.createElement(Alert["a" /* Alert */ ], { status: "info", rounded: "4px", fontWeight: "500", display: "flex", mt: "24px", bg: alertBg[colorMode] }, react_default.a.createElement(Alert["c" /* AlertIcon */ ], null), react_default.a.createElement(Text["a" /* default */ ], { mr: "24px", color: text[colorMode] }, "Please", ' ', react_default.a.createElement(Link["a" /* default */ ], { href: "https://www.tabextend.com/pricing", target: "_blank", rel: "noopener noreferrer", color: linkColor[colorMode], _hover: { textDecoration: 'underline' } }, "upgrade your plan"), ' ', "to share categrory")) : react_default.a.createElement(Flex["a" /* default */ ], { mt: "36px" }, react_default.a.createElement(Button["a" /* default */ ], { ml: "auto", onClick: function onClick() { return onClose(); }, transition: "all 0s", color: text[colorMode], rounded: "4px" }, "Cancel"), shared || item.shared ? react_default.a.createElement(Button["a" /* default */ ], { rounded: "4px", ml: "4px", transition: "0s", variantColor: "red", onClick: function onClick() { return stopPublicSharing(); }, isLoading: loadingSharing, isDisabled: isOnProPlan || !isOwnerOfWS }, "Stop sharing") : react_default.a.createElement(Button["a" /* default */ ], { onClick: function onClick() { return initShareCategory(); }, color: "#FFF", TODO: true, isLoading: loadingSharing, isDisabled: isOnProPlan || !isOwnerOfWS, type: 'submit', backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "0s", ml: "4px" }, react_default.a.createElement(Text["a" /* default */ ], { color: "#FFF", fontSize: "15px", px: "8px" }, "Share ", categoryName)))))));
                });
            }; /* harmony default export */
            var shareCategoryPopover = (shareCategoryPopover_ShareCategoryPopover);
            // CONCATENATED MODULE: ./src/Components/categoryDetailRow.js
            var deleteCategoryZu = function deleteCategoryZu(state) { return state.deleteCategory; }; //const categoryZu = (state) => state.category;
            var categoryDetailRow_CategoryDetailRow = function CategoryDetailRow(_ref) {
                var index = _ref.index,
                    submitName = _ref.submitName,
                    categoriesLength = _ref.categoriesLength,
                    category = _ref.category,
                    provided = _ref.provided;
                var deleteCategory = Object(store["a" /* default */ ])(deleteCategoryZu);
                var _useState = Object(react["useState"])(category.name),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    categoryName = _useState2[0],
                    setCategoryName = _useState2[1];
                var handleChange = function handleChange(event) { return setCategoryName(event.target.value); }; //Colormodestuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var lightColor = { light: 'gray.100', dark: '#3F454D' };
                var icon = { light: 'gray.500', dark: '#A1A2A4' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var color = { light: '#FFF', dark: '#262A2D' };
                var primaryButton = { light: 'blue', dark: 'red' };
                var secondaryButton = { light: 'solid', dark: 'outline' };
                var selectedBorder = { light: 'gray.200', dark: '#727476' };
                var linkShadow = { light: '2px 5px 32px 0 rgba(152,169,185,0.50), 0 4px 18px -4px rgba(158,161,181,0.30)', dark: '2px 5px 30px 0 rgba(0,0,0,0.70), 0 4px 16px -4px rgba(0,0,0,0.50)' }; //const hasWorkspaces = userState.workspaces !== undefined ? true : false;
                return react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center" }, react_default.a.createElement(Editable["c" /* default */ ], { placeholder: "Untitled", fontSize: "18px", color: text[colorMode], width: "100%", fontWeight: "500", value: categoryName, pr: '0.75rem', onSubmit: function onSubmit(e) { return submitName(categoryName, index); } }, react_default.a.createElement(Editable["b" /* EditablePreview */ ], { _hover: { bg: selectedBorder[colorMode] }, value: categoryName }), react_default.a.createElement(Editable["a" /* EditableInput */ ], { value: categoryName, onChange: handleChange })), react_default.a.createElement(shareCategoryPopover, { categoryName: category.name, item: category }), react_default.a.createElement(Popover["a" /* Popover */ ], null, function(_ref2) {
                    var isOpen = _ref2.isOpen,
                        onClose = _ref2.onClose;
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Popover["h" /* PopoverTrigger */ ], null, react_default.a.createElement(IconButton["a" /* default */ ], { isDisabled: categoriesLength > 1 ? false : true, transition: "0s", ml: "8px", color: iconSmall[colorMode], icon: "trash" })), react_default.a.createElement(Popover["e" /* PopoverContent */ ], { zIndex: 4, minWidth: "380px", bg: color[colorMode], boxShadow: linkShadow[colorMode], border: "none", rounded: "9px" }, react_default.a.createElement(Popover["b" /* PopoverArrow */ ], null), react_default.a.createElement(Popover["d" /* PopoverCloseButton */ ], { mt: "4px", color: iconSmall[colorMode] }), react_default.a.createElement(Popover["c" /* PopoverBody */ ], null, react_default.a.createElement(Box["a" /* default */ ], { py: "12px", pl: "12px", pr: "24px", mt: "12px" }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "top" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "warning", size: "28px", mt: "8px", color: "red.500" }), react_default.a.createElement(Heading["a" /* default */ ], { ml: "18px", fontSize: "20px", lineHeight: "normal", color: text[colorMode] }, "Are you sure you want to delete this category?")), react_default.a.createElement(Text["a" /* default */ ], { mt: "8px", ml: "44px", fontSize: "16px", mb: "12px", color: text[colorMode] }, "All containing groups and saved items will be deleted")), react_default.a.createElement(Flex["a" /* default */ ], null, react_default.a.createElement(Button["a" /* default */ ], { onClick: onClose, ml: "auto", mr: "8px", variant: secondaryButton[colorMode] }, "Cancel"), react_default.a.createElement(Button["a" /* default */ ], { variantColor: primaryButton[colorMode], onClick: function onClick() { return deleteCategory(category.id, index, category.shared, category.slug); } }, react_default.a.createElement(Text["a" /* default */ ], { isTruncated: true, maxWidth: "180px" }, "Delete ", categoryName))))));
                }), react_default.a.createElement("div", Object.assign({}, provided.dragHandleProps, { style: { display: 'inline-block' } }), react_default.a.createElement(Icon["a" /* default */ ], { ml: "12px", fontSize: "14px", color: icon[colorMode], name: "drag-handle", cursor: "grab", className: "column-drag-handle" })));
            }; /* harmony default export */
            var categoryDetailRow = __webpack_exports__["a"] = (categoryDetailRow_CategoryDetailRow);

            /***/
        }),
        /* 176 */
        ,
        /* 177 */
        ,
        /* 178 */
        /***/
        (function(module, exports, __webpack_require__) {

            module.exports = __webpack_require__(215);


            /***/
        }),
        /* 179 */
        ,
        /* 180 */
        ,
        /* 181 */
        ,
        /* 182 */
        ,
        /* 183 */
        /***/
        (function(module, exports, __webpack_require__) {

            // extracted by mini-css-extract-plugin

            /***/
        }),
        /* 184 */
        ,
        /* 185 */
        ,
        /* 186 */
        ,
        /* 187 */
        ,
        /* 188 */
        ,
        /* 189 */
        ,
        /* 190 */
        ,
        /* 191 */
        ,
        /* 192 */
        ,
        /* 193 */
        ,
        /* 194 */
        ,
        /* 195 */
        ,
        /* 196 */
        ,
        /* 197 */
        ,
        /* 198 */
        ,
        /* 199 */
        ,
        /* 200 */
        ,
        /* 201 */
        ,
        /* 202 */
        ,
        /* 203 */
        ,
        /* 204 */
        ,
        /* 205 */
        ,
        /* 206 */
        ,
        /* 207 */
        ,
        /* 208 */
        ,
        /* 209 */
        ,
        /* 210 */
        ,
        /* 211 */
        ,
        /* 212 */
        ,
        /* 213 */
        ,
        /* 214 */
        ,
        /* 215 */
        /***/
        (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);

            // EXTERNAL MODULE: ./node_modules/react/index.js
            var react = __webpack_require__(0);
            var react_default = /*#__PURE__*/ __webpack_require__.n(react);

            // EXTERNAL MODULE: ./node_modules/react-dom/index.js
            var react_dom = __webpack_require__(45);
            var react_dom_default = /*#__PURE__*/ __webpack_require__.n(react_dom);

            // EXTERNAL MODULE: ./src/index.css
            var src = __webpack_require__(183);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
            var regenerator = __webpack_require__(14);
            var regenerator_default = /*#__PURE__*/ __webpack_require__.n(regenerator);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
            var asyncToGenerator = __webpack_require__(25);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/ColorModeProvider/index.js
            var ColorModeProvider = __webpack_require__(18);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Toast/index.js + 19 modules
            var Toast = __webpack_require__(229);

            // EXTERNAL MODULE: ./src/Utils/toastPopper.js
            var toastPopper = __webpack_require__(24);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
            var toConsumableArray = __webpack_require__(7);

            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
            var slicedToArray = __webpack_require__(3);

            // EXTERNAL MODULE: ./node_modules/react-hotkeys-hook/dist-web/index.js + 1 modules
            var dist_web = __webpack_require__(53);

            // EXTERNAL MODULE: ./src/Utils/defaultEmojis.js
            var defaultEmojis = __webpack_require__(56);

            // EXTERNAL MODULE: ./src/stores/store.js + 4 modules
            var store = __webpack_require__(1);

            // EXTERNAL MODULE: ./src/stores/persistStore.js
            var persistStore = __webpack_require__(32);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/useDisclosure/index.js
            var useDisclosure = __webpack_require__(142);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/AlertDialog/index.js
            var AlertDialog = __webpack_require__(225);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Modal/index.js + 2 modules
            var Modal = __webpack_require__(43);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Button/index.js + 1 modules
            var Button = __webpack_require__(44);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Icon/index.js
            var Icon = __webpack_require__(20);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Box/index.js + 1 modules
            var Box = __webpack_require__(8);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/IconButton/index.js
            var IconButton = __webpack_require__(217);

            // EXTERNAL MODULE: ./node_modules/use-sound/dist/use-sound.esm.js
            var use_sound_esm = __webpack_require__(51);

            // EXTERNAL MODULE: ./src/fx/addFx.mp3
            var addFx = __webpack_require__(87);
            var addFx_default = /*#__PURE__*/ __webpack_require__.n(addFx);

            // EXTERNAL MODULE: ./src/fx/removeFx.mp3
            var removeFx = __webpack_require__(108);
            var removeFx_default = /*#__PURE__*/ __webpack_require__.n(removeFx);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/PseudoBox/index.js
            var PseudoBox = __webpack_require__(21);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Text/index.js
            var Text = __webpack_require__(23);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Tooltip/index.js
            var Tooltip = __webpack_require__(165);

            // EXTERNAL MODULE: ./src/Components/workspaceModal.js
            var workspaceModal = __webpack_require__(114);

            // CONCATENATED MODULE: ./src/Components/rolesRow.js
            /* global chrome */
            var tabsZu = function tabsZu(state) { return state.tabs; };
            var rolesZu = function rolesZu(state) { return state.roles; };
            var userStateZu = function userStateZu(state) { return state.userState; };
            var lastSavedUserZu = function lastSavedUserZu(state) { return state.lastSavedUser; };
            var setLastSavedUserZu = function setLastSavedUserZu(state) { return state.setLastSavedUser; };
            var currentWSidZu = function currentWSidZu(state) { return state.currentWSid; };
            var saveWSinfoZu = function saveWSinfoZu(state) { return state.saveWSinfo; };
            var setIsLoadingUserZu = function setIsLoadingUserZu(state) { return state.setIsLoadingUser; };
            var deleteWSZu = function deleteWSZu(state) { return state.deleteWS; };
            var denyInviteZu = function denyInviteZu(state) { return state.denyInvite; };
            var isLoadingUserZu = function isLoadingUserZu(state) { return state.isLoadingUser; };
            var rolesRow_ShareWithBox = function ShareWithBox(_ref) {
                var name = _ref.name,
                    userId = _ref.userId,
                    setLastSavedLocal = _ref.setLastSavedLocal,
                    lastSavedLocal = _ref.lastSavedLocal; //zuState
                var lastSavedUser = Object(store["a" /* default */ ])(lastSavedUserZu);
                var tabs = Object(store["a" /* default */ ])(tabsZu);
                var roles = Object(store["a" /* default */ ])(rolesZu);
                var setLastSavedUser = Object(store["a" /* default */ ])(setLastSavedUserZu); //localState
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    saveEvent = _useState2[0],
                    setSaveEvent = _useState2[1];
                var arrowDown = function arrowDown() { setSaveEvent(!saveEvent); };
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode;
                var letterColor = { light: 'gray.700', dark: '#b3bac6' };
                /* initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.25,
                    ease: "easeInOut",
                  }} */ //useEffect( id === id => setSaveEvent(true) -> w8 1sec -> false)
                Object(react["useEffect"])(function() {
                    if (lastSavedUser.userId === userId && lastSavedUser.moveArrow === true) {
                        setSaveEvent(true);
                        var timer1 = setTimeout(function() {
                            setSaveEvent(false);
                            setLastSavedUser({ moveArrow: false, userId: lastSavedUser.userId, lastSaved: lastSavedUser.lastSaved, dateSaved: lastSavedUser.dateSaved });
                            setLastSavedLocal({ name: name, lastSaved: lastSavedUser.lastSaved, dateSaved: lastSavedUser.dateSaved });
                        }, 900);
                        return function() { clearTimeout(timer1); };
                    } else if (lastSavedUser.lastSaved !== (lastSavedLocal === null || lastSavedLocal === void 0 ? void 0 : lastSavedLocal.lastSaved) && lastSavedUser.userId !== null) {
                        var roleTarget = roles === null || roles === void 0 ? void 0 : roles.filter(function(target) { return target.userId === lastSavedUser.userId; });
                        var editorName = roleTarget[0] !== undefined ? roleTarget[0].name : roles[0].name;
                        setLastSavedLocal({ name: editorName, lastSaved: lastSavedUser.lastSaved, dateSaved: lastSavedUser.dateSaved });
                    }
                }, [lastSavedUser]);
                return react_default.a.createElement(PseudoBox["a" /* default */ ], { w: "32px", position: "relative", overflow: "hidden" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { h: "32px", w: "32px", position: "absolute", left: "0px", top: "0px", display: "flex", opacity: saveEvent ? '0' : '1', transform: saveEvent ? 'translateY(16px) scale(0.5)' : 'translateY(0px) scale(1)', transition: "0.22s cubic-bezier(0.175, 0.885, 0.320, 1.275)" }, react_default.a.createElement(Text["a" /* default */ ], { color: letterColor[colorMode], fontWeight: "600", fontSize: "18px", m: "auto", marginTop: "2px" }, name ? name.charAt(0).toUpperCase() : '?')), react_default.a.createElement(PseudoBox["a" /* default */ ], { h: "32px", w: "32px", position: "absolute", left: "0px", top: "0px", display: "flex", rounded: "50%", opacity: saveEvent ? '1' : '0', transform: saveEvent ? 'translateY(0px) scale(1)' : 'translateY(-24px) scale(0.5)', transition: "0.22s cubic-bezier(0.175, 0.885, 0.320, 1.275)" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "arrow-down", size: "20px", m: "auto", color: letterColor[colorMode] })));
            };
            var rolesRow_RolesRow = function RolesRow() {
                var _roles$filter$, _userState$workspaces; //Zustate
                var roles = Object(store["a" /* default */ ])(rolesZu);
                var userState = Object(store["a" /* default */ ])(userStateZu);
                var currentWSid = Object(store["a" /* default */ ])(currentWSidZu);
                var saveWSinfo = Object(store["a" /* default */ ])(saveWSinfoZu);
                var setIsLoadingUser = Object(store["a" /* default */ ])(setIsLoadingUserZu);
                var deleteWS = Object(store["a" /* default */ ])(deleteWSZu);
                var denyInvite = Object(store["a" /* default */ ])(denyInviteZu);
                var isLoadingUser = Object(store["a" /* default */ ])(isLoadingUserZu); //Local state
                var _useState3 = Object(react["useState"])(null),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    lastSavedLocal = _useState4[0],
                    setLastSavedLocal = _useState4[1];
                Object(react["useEffect"])(function() { if (!roles.length > 0) { setLastSavedLocal(null); } }, [roles]);
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    siteModalOpen = _useState6[0],
                    setSiteModalOpen = _useState6[1]; //Colors
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode;
                var letterColor = { light: 'gray.700', dark: '#b3bac6' };
                var bg = { light: 'gray.50', dark: '#424a50' };
                var mainButtonShadow = { light: '0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 1px 0 rgba(154,160,164,0.40), inset -1px -1px 1px 0 #2A2F34' };
                var hoverMainButton = { light: '#FFF', dark: '#32363A' }; //let isOwner = userState.workspaces[index].owner === false ? false : true;
                var userId = userState.userId;
                var isOwner = (roles === null || roles === void 0 ? void 0 : (_roles$filter$ = roles.filter(function(target) { return target.userId === userId; })[0]) === null || _roles$filter$ === void 0 ? void 0 : _roles$filter$.status) === 'owner' ? true : false;
                var rolesToShow = isOwner ? roles === null || roles === void 0 ? void 0 : roles.filter(function(target) { return target.status === 'Collaborator'; }) : roles === null || roles === void 0 ? void 0 : roles.filter(function(target) { return target.status === 'Collaborator' || target.status === 'owner' || target.status !== 'pending'; }).filter(function(target) { return target.userId !== userId; });
                /* const deny = (id) => {
                    setIsLoadingUser(true);
                    //Comparee current id === id -> if so change WS
                    if (currentWSid === id) {
                      let firstWSIndex = userState.workspaces[0].id;
                      //changeWorkspace(firstWSIndex);
                      //TODO lägg in i changeWorkspace
                    }
                    let newWorkspaces = userState.workspaces;
                    let index = newWorkspaces.findIndex((target) => target.id === id);
                    let docRef = newWorkspaces[index].sharedRef;
                    newWorkspaces.splice(index, 1);
                    chrome.runtime.sendMessage(
                      {
                        msg: "removeWorkspace",
                        ws: newWorkspaces,
                        docRef: docRef,
                        email: userState.email,
                        name: userState.userName,
                      },
                      (resp) => {}
                    );
                  }; */
                var openModalClick = function openModalClick(e) {
                    e.stopPropagation();
                    setSiteModalOpen(true);
                };
                var closeSiteModal = function closeSiteModal() { setSiteModalOpen(false); };
                var saveWSchanges = function saveWSchanges(id, newName, emoji, withLoading) {
                    withLoading && setIsLoadingUser(true);
                    saveWSinfo(id, newName, emoji);
                    withLoading && closeSiteModal();
                };
                var deleteCurrentWS = function deleteCurrentWS(id, isOwner, isShared) { closeSiteModal(); if (isOwner === true) { deleteWS(id, isShared); } else { denyInvite(id); } }; //app -> save(id)
                //useEffect( id === id => setSaveEvent(true) -> w8 1sec -> false)
                var wsModalData = userState === null || userState === void 0 ? void 0 : (_userState$workspaces = userState.workspaces) === null || _userState$workspaces === void 0 ? void 0 : _userState$workspaces.filter(function(target) { return target.id === currentWSid || false; })[0];
                /* const [wsModalData, setWsModalData] = useState();
                  useEffect(() => {
                    let wsModalData = userState?.workspaces?.filter(
                      (target) => target.id === currentWSid || false
                    )[0];
                    setWsModalData(wsModalData);
                  }, [currentWSid, userState]);
                 */
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Tooltip["a" /* default */ ], { zIndex: "100000", rounded: "4px", placement: "bottom", label: lastSavedLocal ? react_default.a.createElement(Box["a" /* default */ ], { p: "2px" }, react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "13px", w: "100%", textAlign: "center" }, "Last change: ", lastSavedLocal.name), react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "11px", w: "100%", textAlign: "center", opacity: "0.8", mt: "-2px" }, lastSavedLocal.lastSaved && lastSavedLocal.lastSaved.slice(0, -3) + ',', ' ', lastSavedLocal.dateSaved && lastSavedLocal.dateSaved)) : react_default.a.createElement(Box["a" /* default */ ], { p: "2px" }, react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", fontSize: "11px", w: "100%", textAlign: "center", opacity: "0.8" }, "Share workspace")) }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    onClick: function onClick(e) { return openModalClick(e); },
                    bg: bg[colorMode],
                    boxShadow: mainButtonShadow[colorMode],
                    cursor: "pointer",
                    rounded: "7px",
                    height: "32px",
                    minWidth: "32px",
                    fontWeight: "600",
                    fontSize: "18px",
                    mr: "12px",
                    display: "flex",
                    _hover: { //boxShadow: isOpen ? "0 0 0 3px #63B3ED" : "",
                        bg: hoverMainButton[colorMode]
                    }
                }, react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Icon["a" /* default */ ], { opacity: isLoadingUser ? '0.75' : '1', transition: "transform 0.20s", name: "sharedIcon", color: letterColor[colorMode], size: "16px", mt: "auto", mb: "auto", ml: "7px" }), !isLoadingUser && rolesToShow.map(function(item) { return react_default.a.createElement(rolesRow_ShareWithBox, { name: item.name, key: item.name, userId: item.userId, setLastSavedLocal: setLastSavedLocal, lastSavedLocal: lastSavedLocal }); })))), (userState === null || userState === void 0 ? void 0 : userState.workspaces) && wsModalData && react_default.a.createElement(workspaceModal["a" /* default */ ], {
                    siteModalOpen: siteModalOpen,
                    closeSiteModal: closeSiteModal //deleteNoteAction={deleteNoteAction}
                        ,
                    name: wsModalData.name,
                    emoji: wsModalData.emoji,
                    id: wsModalData.id,
                    catLength: wsModalData.catLength,
                    saveWSchanges: saveWSchanges,
                    deleteCurrentWS: deleteCurrentWS,
                    currentWSid: currentWSid,
                    sharedRef: wsModalData.sharedRef,
                    owner: wsModalData.owner,
                    shared: wsModalData.shared
                }));
            }; /* harmony default export */
            var rolesRow = (rolesRow_RolesRow);
            // CONCATENATED MODULE: ./src/Components/settingsMenu.js
            /* global chrome */ //import useEventListener from "../Utils/keyEventListener.js"
            var SearchModal = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 0).then(__webpack_require__.bind(null, 263)); });
            var EditSpacesMenu = react_default.a.lazy(function() { return Promise.all( /* import() */ [__webpack_require__.e(1), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, 261)); });
            var AuthPopover = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 8).then(__webpack_require__.bind(null, 262)); });
            var ProductTour = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 6).then(__webpack_require__.bind(null, 258)); });
            var InitLoginModal = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 7).then(__webpack_require__.bind(null, 259)); }); //zustand state
            var settingsMenu_tabsZu = function tabsZu(state) { return state.tabs; };
            var addListZu = function addListZu(state) { return state.addList; };
            var prevTabsZu = function prevTabsZu(state) { return state.prevTabs; };
            var setPrevStateZu = function setPrevStateZu(state) { return state.setPrevState; };
            var setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var categoryZu = function categoryZu(state) { return state.category; };
            var categoriesZu = function categoriesZu(state) { return state.categories; };
            var setAuthOpenZu = function setAuthOpenZu(state) { return state.setAuthOpen; };
            var showToastZu = function showToastZu(state) { return state.showToast; };
            var setShowToastZu = function setShowToastZu(state) { return state.setShowToast; };
            var fxStateZu = function fxStateZu(state) { return state.fxState; };
            var settingsMenu_userStateZu = function userStateZu(state) { return state.userState; };
            var showInitLoginZu = function showInitLoginZu(state) { return state.showInitLogin; };
            var setShowInitLoginZu = function setShowInitLoginZu(state) { return state.setShowInitLogin; };
            var showBootFailModalZu = function showBootFailModalZu(state) { return state.showBootFailModal; };
            var setShowBootFailModalZu = function setShowBootFailModalZu(state) { return state.setShowBootFailModal; };
            var settingsMenu_rolesZu = function rolesZu(state) { return state.roles; };
            var settingsMenu_lastSavedUserZu = function lastSavedUserZu(state) { return state.lastSavedUser; };
            var shortcutCreateNewGroupZu = function shortcutCreateNewGroupZu(state) { return state.shortcutCreateNewGroup; };
            var settingsMenu_BootFailModal = function BootFailModal(_ref) {
                var hideBootFailModal = _ref.hideBootFailModal;
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: 'gray.100', dark: '#262A2D' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var _useDisclosure = Object(useDisclosure["a" /* default */ ])(),
                    isOpen = _useDisclosure.isOpen,
                    onOpen = _useDisclosure.onOpen,
                    onClose = _useDisclosure.onClose;
                var btnRef = react_default.a.useRef();
                var reloadRef = react_default.a.useRef();
                var reloadExtension = function reloadExtension() { chrome.runtime.reload(); };
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(AlertDialog["a" /* AlertDialog */ ], { leastDestructiveRef: reloadRef, finalFocusRef: btnRef, onClose: hideBootFailModal, isOpen: true }, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], null), react_default.a.createElement(AlertDialog["b" /* AlertDialogContent */ ], { rounded: "6px" }, react_default.a.createElement(Modal["f" /* ModalHeader */ ], { mt: "16px", pb: "8px", color: text[colorMode] }, "Background script timed out"), react_default.a.createElement(Modal["c" /* ModalCloseButton */ ], { color: iconSmall[colorMode] }), react_default.a.createElement(Modal["b" /* ModalBody */ ], { color: text[colorMode], bg: color[colorMode], py: "16px", fontSize: "14px", mb: "16px" }, "It looks like the background script did not properly boot up. Reload and ", react_default.a.createElement("b", null, "open a new tab"), " to try again."), react_default.a.createElement(Modal["e" /* ModalFooter */ ], null, react_default.a.createElement(Button["a" /* default */ ], { onClick: function onClick() { return reloadExtension(); }, ml: "auto", ref: reloadRef, color: "#FFF", backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "0s", fontSize: "15px", pl: "24px", pr: "32px" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "refreshIcon", mr: "8px" }), " Reload extension")))));
            };
            var settingsMenu_SettingsMenu = function SettingsMenu() { //zustand state
                var tabs = Object(store["a" /* default */ ])(settingsMenu_tabsZu);
                var addList = Object(store["a" /* default */ ])(addListZu);
                var prevTabs = Object(store["a" /* default */ ])(prevTabsZu); // const setPrevState = useStore(setPrevStateZu);
                var setTabs = Object(store["a" /* default */ ])(setTabsZu);
                var category = Object(store["a" /* default */ ])(categoryZu);
                var categories = Object(store["a" /* default */ ])(categoriesZu);
                var setAuthOpen = Object(store["a" /* default */ ])(setAuthOpenZu);
                var showToast = Object(store["a" /* default */ ])(showToastZu);
                var setShowToast = Object(store["a" /* default */ ])(setShowToastZu);
                var roles = Object(store["a" /* default */ ])(settingsMenu_rolesZu); //persistStore
                var fxState = Object(persistStore["a" /* default */ ])(fxStateZu);
                var lastSavedUser = Object(store["a" /* default */ ])(settingsMenu_lastSavedUserZu);
                var shortcutCreateNewGroup = Object(persistStore["a" /* default */ ])(shortcutCreateNewGroupZu);
                var _useSound = Object(use_sound_esm["a" /* default */ ])(removeFx_default.a),
                    _useSound2 = Object(slicedToArray["a" /* default */ ])(_useSound, 1),
                    playRemoveFx = _useSound2[0];
                var _useSound3 = Object(use_sound_esm["a" /* default */ ])(addFx_default.a),
                    _useSound4 = Object(slicedToArray["a" /* default */ ])(_useSound3, 1),
                    playAddFx = _useSound4[0]; //const { onCopy, hasCopied } = useClipboard(value);
                Object(react["useEffect"])(function() { if (showToast) { showToastMessage(showToast); } }, [showToast]);
                var showToastMessage = function showToastMessage(toastObject) {
                    var title = toastObject.title;
                    var subtitle = toastObject.subtitle;
                    var type = toastObject.type;
                    var idsToDelete = [];
                    if (title === 'Group created') { fxState && playAddFx(); return; }
                    if (type === 'restoreMultiple') {
                        var itemToRes = toastObject.subtitle;
                        var resClick = function resClick() { //
                            var restore = Object(toConsumableArray["a" /* default */ ])(tabs);
                            if (restore !== undefined && restore.length > 0) {
                                restore.forEach(function(space, index) {
                                    if (itemToRes[index] !== null) {
                                        restore[index].tabs = itemToRes[index];
                                        itemToRes[index].forEach(function(item, index) { idsToDelete.push(item.id); });
                                    }
                                });
                                chrome.runtime.sendMessage({ msg: 'deleteDeletedItemsDataById', idsToDelete: idsToDelete });
                                setTabs(restore, 'deleteUpdate');
                            }
                        };
                        toast({ position: 'bottom-right', status: 'success', duration: 3800, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, resClick: resClick, title: title, type: 'restore', subtitle: '', colorMode: colorMode }); } });
                        fxState && playRemoveFx();
                    } else if (type === 'restore') {
                        var groupToRe = toastObject.subtitle.groupToRe;
                        var restore = Object(toConsumableArray["a" /* default */ ])(tabs);
                        var groupIndex = restore.length;
                        var _resClick = function _resClick() {
                            if (restore !== undefined && restore.length > 0) {
                                restore[groupIndex] = groupToRe;
                                idsToDelete.push(groupToRe.id);
                                chrome.runtime.sendMessage({ msg: 'deleteDeletedItemsDataById', idsToDelete: idsToDelete });
                                setTabs(restore, 'deleteUpdate');
                            }
                        };
                        toast({ position: 'bottom-right', status: 'success', duration: 3800, isClosable: true, render: function render(_ref3) { var onClose = _ref3.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, resClick: _resClick, title: title, type: 'restore', subtitle: '', colorMode: colorMode }); } });
                        fxState && playRemoveFx();
                    } else { toast({ position: 'bottom-right', status: 'success', duration: 4400, isClosable: true, render: function render(_ref4) { var onClose = _ref4.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: title, subtitle: subtitle, type: type, colorMode: colorMode }); } }); }
                };
                var openAuth = function openAuth() { return setAuthOpen(true); };
                var closeAuth = function closeAuth() { return setAuthOpen(false); };
                var createGroupShortcut = 'ctrl+g';
                if (shortcutCreateNewGroup) { createGroupShortcut = shortcutCreateNewGroup; } Object(dist_web["a" /* useHotkeys */ ])(createGroupShortcut, function(e) {
                    e.preventDefault();
                    addList();
                }, {}, [createGroupShortcut, categories, category]); // useHotkeys('ctrl+z', () => setPrevState(), {}, []);
                var toast = Object(Toast["a" /* default */ ])(); //colorstuff
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var bg = { light: '#FFF', dark: '#262A2D' };
                var iconColor = { light: 'gray.700', dark: '#B3BAC6' };
                var bgHover = { light: 'gray.300', dark: '#1D2024' };
                var iconBg = { light: 'gray.200', dark: '#424a50' };
                var letterColor = { light: 'gray.700', dark: '#B3BAC6' };
                var spacesBG = { light: 'gray.50', dark: '#15171B' }; //Tour stuff
                var userState = Object(store["a" /* default */ ])(settingsMenu_userStateZu);
                var userPlanIsTour = userState.userPlan === 'tour'; //const showTourInitial = userState.userPlan === "tour";
                var _useState = Object(react["useState"])(true),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    showTour = _useState2[0],
                    setShowTour = _useState2[1];
                var cancelTour = function cancelTour() {
                    setShowTour(false);
                    chrome.runtime.sendMessage({ msg: 'newUserData', data: { userPlan: 'free' } });
                }; //InitLogin
                var showInitLogin = Object(store["a" /* default */ ])(showInitLoginZu);
                var setShowInitLogin = Object(store["a" /* default */ ])(setShowInitLoginZu);
                var hideInitLogin = function hideInitLogin() { setShowInitLogin(false); };
                var showBootFailModal = Object(store["a" /* default */ ])(showBootFailModalZu);
                var setShowBootFailModal = Object(store["a" /* default */ ])(setShowBootFailModalZu);
                var hideBootFailModal = function hideBootFailModal() { setShowBootFailModal(false); };
                /*   const [showTourInitial, setShowTourInitial] = useState(false);
                  

                  useEffect(() => {
                    if (userState.userPlan === "tour") {
                      setShowTourInitial(true);
                    }
                  }, [userState]); */
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ] //opacity={isDragging ? "0" : "1"}
                    , {
                        alignItems: "center",
                        height: "64px",
                        mt: "16px" //mr={["5vw", "4vw", "3vw", "2vw"]}
                            ,
                        pr: "8px",
                        pl: "8px",
                        position: "absolute",
                        display: "flex",
                        right: "24px",
                        zIndex: 3,
                        top: "0",
                        rounded: "16px",
                        bg: spacesBG[colorMode]
                    }, react_default.a.createElement(react["Suspense"], { fallback: react_default.a.createElement(IconButton["a" /* default */ ], { rounded: "8px", icon: "dotdotdot", marginRight: "12px", fontSize: "20px", minWidth: "32px", height: "32px", bg: "transparent", _hover: { bg: bgHover[colorMode] }, color: iconColor[colorMode] }) }, react_default.a.createElement(EditSpacesMenu, {
                        addList: addList //onOpen={onOpen}
                        //isOpen={isOpen}
                        //onClose={onClose}
                    })), react_default.a.createElement(rolesRow, null), react_default.a.createElement(react["Suspense"], {
                        fallback: react_default.a.createElement(Button["a" /* default */ ], {
                            bg: iconBg[colorMode] //border="4px solid #D4D8DE"
                                ,
                            rounded: "7px",
                            height: "32px",
                            minWidth: "32px",
                            opacity: "0.5",
                            p: "0px",
                            mr: "9px",
                            fontSize: "18px",
                            color: letterColor[colorMode],
                            fontWeight: "600"
                        })
                    }, react_default.a.createElement(AuthPopover //isOpen={authOpen}
                        , {
                            open: openAuth,
                            close: closeAuth //onClose={onClose}
                        })), react_default.a.createElement(react["Suspense"], { fallback: null }, userPlanIsTour && react_default.a.createElement(ProductTour, { showTour: showTour, cancelTour: cancelTour })), react_default.a.createElement(react["Suspense"], { fallback: null }, showInitLogin && react_default.a.createElement(InitLoginModal, { hideInitLogin: hideInitLogin })), react_default.a.createElement(react["Suspense"], { fallback: null }, showBootFailModal && react_default.a.createElement(settingsMenu_BootFailModal, { hideBootFailModal: hideBootFailModal }))));
            }; /* harmony default export */
            var settingsMenu = (settingsMenu_SettingsMenu);
            // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
            var objectSpread2 = __webpack_require__(38);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Flex/index.js
            var Flex = __webpack_require__(22);

            // CONCATENATED MODULE: ./src/Utils/useDeselectEvents.js
            var useDeselectEvents_useDeselectEvents = function useDeselectEvents(eventListener, callback) { Object(react["useEffect"])(function() { window.addEventListener(eventListener, callback); return function() { return window.removeEventListener(eventListener, callback); }; }, [callback]); }; /* harmony default export */
            var Utils_useDeselectEvents = (useDeselectEvents_useDeselectEvents);
            // EXTERNAL MODULE: ./src/App.css
            var App = __webpack_require__(50);

            // EXTERNAL MODULE: ./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js + 30 modules
            var react_beautiful_dnd_esm = __webpack_require__(30);

            // EXTERNAL MODULE: ./node_modules/emoji-mart/css/emoji-mart.css
            var emoji_mart = __webpack_require__(89);

            // EXTERNAL MODULE: ./node_modules/emoji-mart/dist-es/index.js + 22 modules
            var dist_es = __webpack_require__(78);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Menu/index.js + 2 modules
            var Menu = __webpack_require__(231);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Popover/index.js
            var Popover = __webpack_require__(37);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Image/index.js
            var Image = __webpack_require__(167);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Editable/index.js
            var Editable = __webpack_require__(104);

            // EXTERNAL MODULE: ./src/fx/selectFx.mp3
            var selectFx = __webpack_require__(105);
            var selectFx_default = /*#__PURE__*/ __webpack_require__.n(selectFx);

            // EXTERNAL MODULE: ./src/Utils/getCustomEmojis.js
            var getCustomEmojis = __webpack_require__(84);

            // CONCATENATED MODULE: ./src/Components/spaceHeader.js
            /* global chrome */ //import styled from "styled-components";
            var SpaceMenu = react_default.a.lazy(function() { return Promise.all( /* import() */ [__webpack_require__.e(1), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, 264)); }); //zuStore
            var activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var submitEmojiZu = function submitEmojiZu(state) { return state.submitEmoji; };
            var submitTitleZu = function submitTitleZu(state) { return state.submitTitle; };
            var spaceHeader_fxStateZu = function fxStateZu(state) { return state.fxState; };
            var browserVersionZu = function browserVersionZu(state) { return state.browserVersion; };
            var spaceHeader_userStateZu = function userStateZu(state) { return state.userState; };
            var openGroupsZu = function openGroupsZu(state) { return state.openGroups; };
            var setOpenGroupsZu = function setOpenGroupsZu(state) { return state.setOpenGroups; };
            var removeSitesFromGroupZu = function removeSitesFromGroupZu(state) { return state.removeSitesFromGroup; };
            var addSitesToGroupZu = function addSitesToGroupZu(state) { return state.addSitesToGroup; };
            var spaceHeader_OpenSitesBar = function OpenSitesBar(_ref) {
                var numberOfsites = _ref.numberOfsites,
                    allTabsUrls = _ref.allTabsUrls,
                    id = _ref.id,
                    anyStacks = _ref.anyStacks; //ZuState
                var activeTabs = Object(store["a" /* default */ ])(activeTabsZu);
                var browserVersion = Object(store["a" /* default */ ])(browserVersionZu);
                var openGroups = Object(store["a" /* default */ ])(openGroupsZu);
                var setOpenGroups = Object(store["a" /* default */ ])(setOpenGroupsZu);
                var removeSitesFromGroup = Object(store["a" /* default */ ])(removeSitesFromGroupZu);
                var addSitesToGroup = Object(store["a" /* default */ ])(addSitesToGroupZu); //Colors
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var buttonBg = { light: 'gray.100', dark: '#262A2D' };
                var hoverBg = { light: 'gray.200', dark: '#434546' };
                var hoverBgOpen = { light: 'gray.200', dark: '#B5E4C7' };
                var buttonBgOpen = { light: '#C9F7DA', dark: '#8FDB99' };
                var buttonText = { light: 'gray.700', dark: '#B0B7C1' };
                var buttonTextOpen = { light: '#003B13', dark: '#003B13' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(152,169,185,0.50)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var red = { light: 'red.100', dark: 'red.300' };
                var color = { light: '#FFF', dark: '#262A2D' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    sitesOpen = _useState2[0],
                    setSitesOpen = _useState2[1];
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    loadingSites = _useState4[0],
                    setLoading = _useState4[1];
                var _useState5 = Object(react["useState"])(null),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    currentGroupId = _useState6[0],
                    setGroupId = _useState6[1];
                var _useState7 = Object(react["useState"])(null),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    howManyInGroup = _useState8[0],
                    setHowManyInGroup = _useState8[1];
                var _useState9 = Object(react["useState"])(null),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    unsavedTabsInGroup = _useState10[0],
                    setUnsaved = _useState10[1];
                var _useState11 = Object(react["useState"])(null),
                    _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                    groupTabsData = _useState12[0],
                    setGroupTabsData = _useState12[1];
                Object(react["useEffect"])(function() {
                    if (activeTabs.length === 0 || allTabsUrls.length === 0) { setSitesOpen(false); return; } //id === openGroups -> id === activeTabs ? -> setGroupId(id) + filter -> howmany
                    if (openGroups === null || openGroups === void 0 ? void 0 : openGroups.some(function(tab) { return tab.id === id; })) {
                        var groupId = openGroups.filter(function(item) { return item.id === id; })[0].groupId;
                        if (activeTabs === null || activeTabs === void 0 ? void 0 : activeTabs.some(function(tab) { return tab.groupId === groupId; })) {
                            setSitesOpen(true);
                            var tabsInGroup = activeTabs.filter(function(tabs) { return tabs.groupId === groupId; });
                            setHowManyInGroup(tabsInGroup.length);
                            var intersection = tabsInGroup.filter(function(el) { return allTabsUrls.includes(el.url); });
                            var newTabs = tabsInGroup.length - intersection.length;
                            setUnsaved(newTabs);
                            setGroupTabsData(tabsInGroup);
                        } else { setSitesOpen(false); }
                    } else { setSitesOpen(false); }
                }, [activeTabs, allTabsUrls]);
                var statusUpdate = function statusUpdate(tabId, changeInfo, tab) {
                    if (changeInfo.status === 'loading') { setLoading(true); }
                    if (changeInfo.status === 'complete') {
                        setLoading(false);
                        setSitesOpen(true);
                        chrome.tabs.onUpdated.removeListener(statusUpdate);
                        return;
                    }
                };
                var createGroup = function createGroup(idArray) {
                    if (browserVersion > 87) {
                        chrome.tabs.group({ tabIds: idArray }, function(groupId) {
                            setGroupId(groupId);
                            var currentLocalState = JSON.parse(localStorage.getItem('openGroupsData'));
                            var noDuplicatesGroupData = currentLocalState !== null ? currentLocalState.filter(function(groups) { return groups.id !== id; }) : [];
                            var persistGroupData = [].concat(Object(toConsumableArray["a" /* default */ ])(noDuplicatesGroupData), [{ id: id, groupId: groupId }]);
                            setOpenGroups(persistGroupData);
                        });
                    }
                };
                var openAllthisWindow = function openAllthisWindow() {
                    var itemsProcessed = 0;
                    var idArray = [];
                    allTabsUrls.forEach(function(element) {
                        chrome.tabs.create({ url: element, active: false }, function(i) {
                            chrome.tabs.onUpdated.addListener(statusUpdate);
                            idArray.push(i.id);
                            itemsProcessed++;
                            if (itemsProcessed === allTabsUrls.length) { createGroup(idArray); }
                        });
                    });
                };
                var updateGroup = function updateGroup() {
                    var notYetSaved = groupTabsData.filter(function(el) { return !allTabsUrls.includes(el.url); });
                    var stillInGroup = groupTabsData.filter(function(el) { return allTabsUrls.includes(el.url); });
                    if (allTabsUrls.length > stillInGroup.length) {
                        var anyStacksInGroup = anyStacks.length > 0 ? true : false;
                        var idsToKeep = stillInGroup.map(function(site) { return site.url; });
                        removeSitesFromGroup(id, idsToKeep, anyStacksInGroup);
                    }
                    if (notYetSaved.length > 0) { addSitesToGroup(id, notYetSaved); }
                };
                var closeGroup = function closeGroup() {
                    var groupId = openGroups.filter(function(item) { return item.id === id; })[0].groupId;
                    var tabsInGroup = activeTabs.filter(function(tabs) { return tabs.groupId === groupId; });
                    tabsInGroup.forEach(function(tab) { chrome.tabs.remove(tab.browserId); });
                };
                var noSites = numberOfsites === 0 ? true : false;
                var sitesRemoved = howManyInGroup - allTabsUrls.length - unsavedTabsInGroup;
                var showRemovedSites = sitesRemoved < 0 ? true : false; //loading state?
                return react_default.a.createElement(Tooltip["a" /* default */ ], { label: sitesOpen ? 'Close all' : 'Open all', closeOnClick: true, variantColor: "blue", zIndex: "100000", placement: "end", rounded: "6px", px: "12px", py: "6px", showDelay: "200", fontSize: "md", mt: "8px" }, sitesOpen ? react_default.a.createElement(Menu["d" /* default */ ], null, react_default.a.createElement(Menu["a" /* MenuButton */ ], { as: Button["a" /* default */ ], bg: buttonBgOpen[colorMode], isLoading: loadingSites, p: "5px 8px 5px 12px", transition: "0s", fontSize: "14px", height: "24px", w: "min-content", mt: "6px", color: buttonTextOpen[colorMode], _hover: { bg: hoverBgOpen } }, numberOfsites + (numberOfsites === 1 ? ' site' : ' sites'), react_default.a.createElement(Icon["a" /* default */ ], { name: "chevronDown", ml: "2px" })), react_default.a.createElement(Menu["c" /* MenuList */ ], { bg: color[colorMode], border: colorMode === 'dark' ? 'none' : '', boxShadow: linkShadow[colorMode], color: text[colorMode], rounded: "7px", transition: "0s" }, react_default.a.createElement(Menu["b" /* MenuItem */ ], { onClick: function onClick() { return updateGroup(); }, fontWeight: "600", fontSize: "14px", h: "40px", isDisabled: unsavedTabsInGroup === 0 && !showRemovedSites ? true : false }, react_default.a.createElement(Icon["a" /* default */ ], { name: "refreshIcon", mr: "8px" }), "Update group", showRemovedSites && react_default.a.createElement(Text["a" /* default */ ], { ml: "auto", letterSpacing: "1.2px", color: "red.500" }, sitesRemoved), react_default.a.createElement(Text["a" /* default */ ], { ml: showRemovedSites ? '4px' : 'auto', letterSpacing: "1.2px", color: "green.500" }, unsavedTabsInGroup > 0 ? '+' + unsavedTabsInGroup : '')), react_default.a.createElement(Menu["b" /* MenuItem */ ], { fontWeight: "600", fontSize: "14px", h: "40px", onClick: function onClick() { return closeGroup(); } }, react_default.a.createElement(Icon["a" /* default */ ], { name: "small-close", mr: "8px", mt: "2px" }), "Close group", react_default.a.createElement(Text["a" /* default */ ], { ml: "auto", opacity: "0.6", letterSpacing: "1.2px" }, howManyInGroup)))) : react_default.a.createElement(Button["a" /* default */ ], {
                    isLoading: loadingSites,
                    isDisabled: noSites,
                    onClick: function onClick() { return openAllthisWindow(); },
                    p: "5px 8px 5px 12px",
                    bg: buttonBg[colorMode] /* sitesOpen && !noSites ? buttonBgOpen[colorMode] :  */ ,
                    transition: "0s",
                    fontSize: "14px",
                    height: "24px",
                    w: "min-content",
                    mt: "6px" //sitesOpen && !noSites ? buttonTextOpen[colorMode]
                        ,
                    color: buttonText[colorMode] //sitesOpen && !noSites ? hoverBgOpen :
                        ,
                    _hover: { bg: hoverBg }
                }, numberOfsites + (numberOfsites === 1 ? ' site' : ' sites'), ' ', react_default.a.createElement(Icon["a" /* default */ ] //sitesOpen && !noSites ? "small-close" :
                    , { name: 'chevronRight', ml: "2px" })));
            };
            var spaceHeader_SpaceHeader = function SpaceHeader(_ref2) {
                var provided = _ref2.provided,
                    currentEmoji = _ref2.currentEmoji,
                    item = _ref2.item,
                    id = _ref2.id,
                    titleData = _ref2.titleData,
                    index = _ref2.index,
                    isDraggingLocal = _ref2.isDraggingLocal,
                    setFocus = _ref2.setFocus,
                    setLoadingList = _ref2.setLoadingList; //Zustate
                var submitEmoji = Object(store["a" /* default */ ])(submitEmojiZu);
                var submitTitle = Object(store["a" /* default */ ])(submitTitleZu);
                var fxState = Object(persistStore["a" /* default */ ])(spaceHeader_fxStateZu);
                var userState = Object(store["a" /* default */ ])(spaceHeader_userStateZu);
                var _useState13 = Object(react["useState"])(currentEmoji),
                    _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                    showEmoji = _useState14[0],
                    setShowEmoji = _useState14[1];
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var title = { light: '#1A202C', dark: '#FFF' };
                var untitledColor = { light: 'gray.300', dark: 'gray.500' };
                var subTitle = { light: 'gray.400', dark: '#A1A2A4' };
                var hoverButton = { light: 'gray.100', dark: '#32363A' };
                var emojiCategory = { light: 'gray.200', dark: '#FFF' };
                var emojiPickerShadow = { light: '0 4px 18px -2px rgba(152,169,185,0.80)', dark: '0 4px 18px -2px rgba(0,0,0,0.80)' }; //Emoji picker stuff
                //const [showPicker, SetShowPicker] = useState(false);
                var onEmojiClick = function onEmojiClick(emoji) {
                    if (emoji.native) {
                        setShowEmoji(emoji.native);
                        submitEmoji(emoji.native, id);
                    } else if (emoji.imageUrl) {
                        setShowEmoji(emoji.imageUrl);
                        submitEmoji(emoji.imageUrl, id);
                    }
                    close(); //SetShowPicker(false);
                };
                Object(react["useEffect"])(function() { setShowEmoji(currentEmoji); }, [currentEmoji]); //Editable text stuff
                var _useState15 = Object(react["useState"])(item.title),
                    _useState16 = Object(slicedToArray["a" /* default */ ])(_useState15, 2),
                    spaceTitle = _useState16[0],
                    setTitle = _useState16[1];
                Object(react["useEffect"])(function() { setTitle(titleData); }, [titleData]);
                var handleChange = function handleChange(event) {
                    var name = event.target.value.slice(0, 24);
                    setTitle(name);
                };
                var _useState17 = Object(react["useState"])(false),
                    _useState18 = Object(slicedToArray["a" /* default */ ])(_useState17, 2),
                    menuOpen = _useState18[0],
                    setMenuOpen = _useState18[1];
                var _useSound = Object(use_sound_esm["a" /* default */ ])(selectFx_default.a),
                    _useSound2 = Object(slicedToArray["a" /* default */ ])(_useSound, 1),
                    playSelectFx = _useSound2[0];
                var openMenuFunc = function openMenuFunc() { setMenuOpen(true); if (fxState) { playSelectFx(); } };
                var _useState19 = Object(react["useState"])(false),
                    _useState20 = Object(slicedToArray["a" /* default */ ])(_useState19, 2),
                    isOpen = _useState20[0],
                    setIsOpen = _useState20[1];
                var open = function open() { return setIsOpen(!isOpen); };
                var close = function close() { return setIsOpen(false); };
                /* const customEmojis = [
                        {
                          name: 'Octocat',
                          short_names: ['octocat'],
                          text: '',
                          emoticons: [],
                          keywords: ['github'],
                          imageUrl: 'https://github.githubassets.com/images/icons/emoji/octocat.png',
                          customCategory: 'GitHub'
                        },
                        {
                          name: 'Test Flag',
                          short_names: ['test'],
                          text: '',
                          emoticons: [],
                          keywords: ['test', 'flag'],
                          spriteUrl: 'https://unpkg.com/emoji-datasource-twitter@4.0.4/img/twitter/sheets-256/64.png',
                        },
                      ] */
                /* const imageSrc = chrome.runtime.getURL("/hidesymbol.png");

                 const customEmojis = [
                   {
                     name: "Hide symbol",
                     short_names: ["Hideemoji"],
                     text: "",
                     emoticons: [],
                     keywords: ["No emoji", "remove symbol", "hide"],
                     imageUrl: imageSrc,
                     customCategory: "Hide symbol",
                   },
                 ]; */ //Räkna utan notes här, find/filter?
                //let numberOfsites = item.tabs.filter((tabs) => tabs.url?.length > 0).length;
                //let notes = item.tabs.filter((tabs) => tabs.note);
                //const numberOfnotes = notes.length;
                var editViewEnabled = item.focus && item.createdBy === (userState === null || userState === void 0 ? void 0 : userState.userId);
                var stackedSitesInside = item.tabs.filter(function(item) { return item.isStacked === true; });
                var stackedUrls = stackedSitesInside.map(function(tab) { return tab.stackedItems; }).flat(1);
                var filterStackedTabsUrls = stackedUrls.map(function(tab) { return tab.url; });
                var filterTabsUrls = item.tabs.map(function(tab) { return tab.url; });
                var allUrls = [].concat(Object(toConsumableArray["a" /* default */ ])(filterStackedTabsUrls), Object(toConsumableArray["a" /* default */ ])(filterTabsUrls));
                var allTabsUrls = allUrls.filter(function(url) { return url !== '' && url !== undefined; }); //console.log({ allTabsUrls });
                var numberOfsites = allTabsUrls.length; //const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
                var headerWidth = item.customWidth ? item.customWidth : 367;
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ], { position: "absolute", top: "0", left: "0", zIndex: "100" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", w: headerWidth, p: "12px", role: "group", cursor: "grab", position: "relative" }, react_default.a.createElement(Box["a" /* default */ ], Object.assign({ zIndex: "1", position: "absolute", w: "100%", h: "100%", top: "0", left: "0" }, provided.dragHandleProps, { outline: "none" })), react_default.a.createElement(Popover["a" /* Popover */ ], { usePortal: true, returnFocusOnClose: false, isOpen: isOpen, onClose: close }, react_default.a.createElement(Popover["h" /* PopoverTrigger */ ], null, react_default.a.createElement(Button["a" /* default */ ], {
                    _focus: { outline: 'none' },
                    zIndex: "2"
                        /* onClick={(e) => {
                                          e.stopPropagation();
                                          SetShowPicker(!showPicker);
                                        }} */
                        ,
                    background: "transparent",
                    _hover: { bg: hoverButton[colorMode] },
                    mt: "0.5rem",
                    fontSize: "47px",
                    minWidth: "none",
                    ml: "4px",
                    px: "12px",
                    height: "64px",
                    maxWidth: "64px",
                    minW: "64px",
                    minH: "64px",
                    rounded: "12px",
                    onClick: open,
                    fontWeight: "300"
                }, (showEmoji === null || showEmoji === void 0 ? void 0 : showEmoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], { src: showEmoji, boxSize: "47px", overflow: "hidden", rounded: "4px" }) : showEmoji)), react_default.a.createElement(Popover["e" /* PopoverContent */ ], {
                    zIndex: 4,
                    rounded: "12px",
                    borderWidth: "0px" //overflow="hidden"
                        ,
                    _focus: { outline: 'none' },
                    boxShadow: emojiPickerShadow[colorMode] //ref={ref}
                }, react_default.a.createElement(dist_es["a" /* Picker */ ], {
                    color: emojiCategory[colorMode] //custom={customEmojis}
                        ,
                    title: "Select a emoji",
                    emoji: "",
                    native: true //native={mac ? true : false}
                        //set={mac ? "" : "apple"}
                        ,
                    showPreview: false,
                    onSelect: onEmojiClick,
                    theme: colorMode === 'light' ? 'light' : 'dark',
                    custom: (userState === null || userState === void 0 ? void 0 : userState.stripeSubscriptionStatus) === 'active' ? Object(getCustomEmojis["a" /* default */ ])(userState) : []
                }))), react_default.a.createElement(Flex["a" /* default */ ], { zIndex: "2", cursor: "pointer", minWidth: "90px", ml: "0.55rem", mr: "0.6rem", mt: "0.75rem", flexDir: "column", textAlign: "left", w: "62%" }, react_default.a.createElement(Editable["c" /* default */ ], {
                    maxW: "100%",
                    whiteSpace: "nowrap",
                    ml: "2px",
                    startWithEditView: editViewEnabled ? true : false,
                    selectAllOnFocus: true,
                    fontWeight: "bold",
                    color: item.title === 'Untitled' ? untitledColor[colorMode] : title[colorMode],
                    fontSize: "19px",
                    placeholder: "Untitled",
                    value: item.title,
                    onSubmit: function onSubmit() {
                        submitTitle(spaceTitle, id);
                        setFocus(false);
                    },
                    onFocus: function onFocus() { return setFocus(true); }
                }, react_default.a.createElement(Editable["b" /* EditablePreview */ ], {
                    _hover: { bg: hoverButton[colorMode], color: item.title === 'Untitled' ? 'gray.400' : title[colorMode] },
                    value: spaceTitle //wordBreak="break-word"
                }), react_default.a.createElement(Editable["a" /* EditableInput */ ], { color: title[colorMode], value: spaceTitle, onChange: handleChange })), react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center" }, react_default.a.createElement(spaceHeader_OpenSitesBar, { numberOfsites: numberOfsites, allTabsUrls: allTabsUrls, id: id, anyStacks: filterStackedTabsUrls }), item.locked && react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Group is locked", rounded: "4px", py: "4px", px: "8px", zIndex: 10000 }, react_default.a.createElement(Icon["a" /* default */ ], { my: "auto", mt: "11px", ml: "8px", name: "lockIcon", fontSize: "14px", color: subTitle[colorMode] })))), react_default.a.createElement(PseudoBox["a" /* default */ ], { zIndex: "2", ml: "auto", mt: "10px", opacity: menuOpen ? '0.6' : '0', transform: menuOpen ? 'translateX(-8px)' : '', transition: "opacity 0.15s, transform 0.18s", _groupHover: { opacity: menuOpen ? '0.6' : '1', transform: 'translateX(-8px)' } }, react_default.a.createElement(react["Suspense"], { fallback: react_default.a.createElement(IconButton["a" /* default */ ], { opacity: "0", icon: "dotdotdot", h: "36px", minW: "36px", bg: "transparent", rounded: "8px", fontSize: "16px", pl: "4px", pr: "5px", py: "8px", cursor: "pointer" }) }, react_default.a.createElement(SpaceMenu, { allTabsUrls: allTabsUrls, lastPosition: item.lastPosition, numberOfsites: numberOfsites, spaceCategoryId: item.categoryID, spaceId: id, isDraggingLocal: isDraggingLocal, compactViewState: item.compact, lockGroupState: item.locked, setLoadingList: setLoadingList, menuOpen: function menuOpen() { return openMenuFunc(); }, menuClosed: function menuClosed() { return setMenuOpen(false); } }))))));
            }; /* harmony default export */
            var spaceHeader = (spaceHeader_SpaceHeader);
            // EXTERNAL MODULE: ./node_modules/framer-motion/dist/framer-motion.es.js + 6 modules
            var framer_motion_es = __webpack_require__(27);

            // CONCATENATED MODULE: ./src/hooks/useBoolean.js
            var useBoolean_useBoolean = function useBoolean(initialValue) {
                var _useState = Object(react["useState"])(initialValue),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    value = _useState2[0],
                    setValue = _useState2[1];
                var on = Object(react["useCallback"])(function() { return setValue(true); }, []);
                var off = Object(react["useCallback"])(function() { return setValue(false); }, []);
                var toggle = Object(react["useCallback"])(function() { return setValue(function(value) { return !value; }); }, []);
                return { value: value, on: on, off: off, toggle: toggle };
            };
            // CONCATENATED MODULE: ./src/hooks/index.js

            // EXTERNAL MODULE: ./src/Utils/commentBg.js
            var commentBg = __webpack_require__(31);

            // EXTERNAL MODULE: ./src/fallBackSvg.svg
            var fallBackSvg = __webpack_require__(62);
            var fallBackSvg_default = /*#__PURE__*/ __webpack_require__.n(fallBackSvg);

            // EXTERNAL MODULE: ./src/fallBackSvgDark.svg
            var fallBackSvgDark = __webpack_require__(63);
            var fallBackSvgDark_default = /*#__PURE__*/ __webpack_require__.n(fallBackSvgDark);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/CircularProgress/index.js
            var CircularProgress = __webpack_require__(218);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Accordion/index.js
            var Accordion = __webpack_require__(226);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Spinner/index.js
            var Spinner = __webpack_require__(98);

            // EXTERNAL MODULE: ./src/Components/menuRowMoveTo.js
            var menuRowMoveTo = __webpack_require__(73);

            // EXTERNAL MODULE: ./src/Utils/localIconProvider.js
            var localIconProvider = __webpack_require__(65);

            // CONCATENATED MODULE: ./src/Components/tabModal.js
            //import { Container, Draggable } from "react-smooth-dnd";
            var tabModal_categoriesZu = function categoriesZu(state) { return state.categories; };
            var tabModal_tabsZu = function tabsZu(state) { return state.tabs; };
            var fetchPublichInMenuZu = function fetchPublichInMenuZu(state) { return state.fetchPublichInMenu; };
            var setLoadingMenuCatsZu = function setLoadingMenuCatsZu(state) { return state.setLoadingMenuCats; };
            var isLoadingMenuCatsZu = function isLoadingMenuCatsZu(state) { return state.isLoadingMenuCats; };
            var sharedHydratedZu = function sharedHydratedZu(state) { return state.sharedHydrated; };
            var tabModal_TabModal = function TabModal(_ref) {
                var siteModalOpen = _ref.siteModalOpen,
                    closeSiteModal = _ref.closeSiteModal,
                    deleteNoteAction = _ref.deleteNoteAction,
                    title = _ref.title,
                    favIcon = _ref.favIcon,
                    url = _ref.url,
                    tabId = _ref.tabId,
                    spaceId = _ref.spaceId,
                    saveAndClose = _ref.saveAndClose,
                    moveToSpace = _ref.moveToSpace; //zustate
                var categories = Object(store["a" /* default */ ])(tabModal_categoriesZu);
                var tabs = Object(store["a" /* default */ ])(tabModal_tabsZu); //Local state
                var oldUrl = url;
                var _useState = Object(react["useState"])(title),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    currentTitle = _useState2[0],
                    setCurrentTitle = _useState2[1];
                var _useState3 = Object(react["useState"])(url),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    currentUrl = _useState4[0],
                    setCurrentUrl = _useState4[1];
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    editMode = _useState6[0],
                    setEditMode = _useState6[1];
                var _useState7 = Object(react["useState"])(false),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    urlError = _useState8[0],
                    setUrlError = _useState8[1];
                var fetchPublichInMenu = Object(store["a" /* default */ ])(fetchPublichInMenuZu);
                var setLoadingMenuCats = Object(store["a" /* default */ ])(setLoadingMenuCatsZu);
                var isLoadingMenuCats = Object(store["a" /* default */ ])(isLoadingMenuCatsZu);
                var sharedHydrated = Object(store["a" /* default */ ])(sharedHydratedZu); //Colormodestuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var icon = { light: 'gray.500', dark: '#A1A2A4' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var iconDarkerColor = { light: 'gray.600', dark: '#FFF' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(0,0,0,0.30)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var hoverButton = { light: 'gray.100', dark: '#32363A' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var changeCurrentUrl = function changeCurrentUrl() {
                    setEditMode(false);
                    setUrlError(false);
                    if (!currentUrl.includes('https://') && !currentUrl.includes('http://') && !currentUrl.includes('slack://') && !currentUrl.includes('file:///')) {
                        setUrlError(true);
                        setCurrentUrl(oldUrl);
                    } else return;
                };
                var categoriesLength = categories.length;
                var initialRef = Object(react["useRef"])();
                var categorySelected = +localStorage.getItem('categorySelected');
                var headerClick = function headerClick(category, catIndex) {
                    if (category.slug) {
                        setLoadingMenuCats(true); //check if its fetched
                        var slug = category.slug;
                        if (!sharedHydrated.includes(slug)) { fetchPublichInMenu(slug); } else { setLoadingMenuCats(false); }
                    } else { return; }
                };
                var localIcon = favIcon === 'localIcon' ? Object(localIconProvider["a" /* LocalIconProvider */ ])(title) : false;
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Modal["a" /* Modal */ ], { isOpen: siteModalOpen, onClose: closeSiteModal, size: "md", isCentered: true, returnFocusOnClose: false, initialFocusRef: initialRef, closeOnOverlayClick: editMode ? false : true }, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], { style: { backdropFilter: 'blur(1px)' } }), react_default.a.createElement(Modal["d" /* ModalContent */ ], { rounded: "12px", bg: color[colorMode], ref: initialRef }, react_default.a.createElement(Modal["f" /* ModalHeader */ ], { fontSize: "20px", fontWeight: "700", pt: "2.375rem", color: text[colorMode], display: "flex", pr: "2.5rem", pb: "0rem" }, react_default.a.createElement(Box["a" /* default */ ], { minHeight: "32px", minWidth: "32px", mr: "16px", mt: "2px" }, react_default.a.createElement(Image["a" /* default */ ], { src: localIcon ? localIcon : favIcon, size: "32px", alt: "-" })), react_default.a.createElement(Editable["c" /* default */ ], {
                    mt: "2px",
                    value: currentTitle,
                    startWithEditView: false,
                    w: "100%",
                    wordBreak: "break-word" //onSubmit={() => setCurrentTitle(currentTitle)}
                        ,
                    onSubmit: function onSubmit() { return setEditMode(false); },
                    onEdit: function onEdit() { return setEditMode(true); }
                }, react_default.a.createElement(Editable["b" /* EditablePreview */ ], { value: currentTitle }), react_default.a.createElement(Editable["a" /* EditableInput */ ], { value: currentTitle, onChange: function onChange(e) { return setCurrentTitle(e.target.value); } }))), react_default.a.createElement(Modal["c" /* ModalCloseButton */ ], { mt: "4px", color: icon[colorMode], transition: "0s" }), react_default.a.createElement(Modal["b" /* ModalBody */ ], { pl: "4.525rem", pr: "2.5rem", mb: "12px", position: "relative" }, react_default.a.createElement(Editable["c" /* default */ ], { fontSize: "14px", value: currentUrl, startWithEditView: false, color: text[colorMode], wordBreak: "break-all", opacity: "0.8", onSubmit: function onSubmit() { return changeCurrentUrl(); }, onEdit: function onEdit() { return setEditMode(true); } }, react_default.a.createElement(Editable["b" /* EditablePreview */ ], { value: currentUrl, _hover: { bg: hoverButton[colorMode], color: text[colorMode] }, transition: "0s" }), react_default.a.createElement(Editable["a" /* EditableInput */ ], { value: currentUrl, onChange: function onChange(e) { return setCurrentUrl(e.target.value.replace(/\s+/g, '')); } })), urlError && react_default.a.createElement(Text["a" /* default */ ], { color: "red.500", position: "absolute", top: "34px", left: "4.525rem", fontSize: "10px" }, "Url must contain https:// or http://")), react_default.a.createElement(Modal["e" /* ModalFooter */ ], { pr: "1.7rem" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "trash",
                    onClick: function onClick() { return deleteNoteAction(spaceId, tabId, 'Site'); },
                    color: iconDarkerColor[colorMode] //bg={iconBG[colorMode]}
                        //bg="red.400"
                        //color="#FFF"
                        ,
                    mr: 3,
                    transition: "0.12s"
                }), react_default.a.createElement(Menu["d" /* default */ ], null, react_default.a.createElement(Menu["a" /* MenuButton */ ], { as: Button["a" /* default */ ], rightIcon: "chevron-down", color: text[colorMode], mr: 3, transition: "0.12s" }, "Move to"), react_default.a.createElement(Menu["c" /* MenuList */ ], { bg: color[colorMode], border: colorMode === 'dark' ? 'none' : '', boxShadow: linkShadow[colorMode], fontSize: "sm", color: text[colorMode] }, react_default.a.createElement(Accordion["a" /* Accordion */ ], { allowMultiple: true }, categories.map(function(category, catIndex) { return react_default.a.createElement(Accordion["d" /* AccordionItem */ ], { borderBottomColor: "transparent", borderTopWidth: "0px", key: category.id, isOpen: false, isDisabled: catIndex === categorySelected ? true : false }, react_default.a.createElement(Accordion["b" /* AccordionHeader */ ], { onClick: function onClick() { return headerClick(category, catIndex); }, height: "40px", py: "0px", pl: "0px", pr: "8px", fontSize: "sm", fontWeight: "600", _focus: { outline: '0' }, _hover: { bg: hoverButton[colorMode] } }, react_default.a.createElement(Box["a" /* default */ ], { flex: "1", textAlign: "left", ml: "16px", color: text[colorMode] }, category.name.length > 0 ? category.name : 'Untitled'), react_default.a.createElement(Accordion["c" /* AccordionIcon */ ], { color: iconSmall[colorMode] })), react_default.a.createElement(Accordion["e" /* AccordionPanel */ ], { p: "0px", m: "0px", mt: "4px" }, react_default.a.createElement(Box["a" /* default */ ], { p: "0px", m: "0px", height: "100%", width: "100%" }, isLoadingMenuCats ? react_default.a.createElement(Flex["a" /* default */ ], null, react_default.a.createElement(Spinner["a" /* default */ ], { size: "sm", ml: "16px" })) : tabs.filter(function(tab) { return tab.categoryID === category.id; }).length > 0 ? tabs.filter(function(tab) { return tab.categoryID === category.id; }).map(function(item, index) { return react_default.a.createElement(menuRowMoveTo["a" /* default */ ], { key: index, moveToCategory: moveToSpace, toCategory: catIndex, spaceId: item.id, title: item.title, onClose: closeSiteModal, emoji: item.emoji, extraSmall: true }); }) : react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", ml: "16px", color: "gray.500", cursor: "not-allowed" }, "No groups")))); })))), react_default.a.createElement(Button["a" /* default */ ], { color: text[colorMode], mr: 3, onClick: closeSiteModal, transition: "0.12s" }, "Cancel"), react_default.a.createElement(Button["a" /* default */ ], { mr: 3, onClick: function onClick() { return saveAndClose(currentTitle, currentUrl); }, color: "#FFF", backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)", _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 10px 16px -8px rgba(49, 144, 255,0.5)' }, boxShadow: "0 12px 18px -10px rgba(49, 144, 255,0.35)", rounded: "4px", transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)" }, "Save")))));
            }; /* harmony default export */
            var tabModal = (tabModal_TabModal);
            // EXTERNAL MODULE: ./src/stores/dndStore.js
            var dndStore = __webpack_require__(11);

            // CONCATENATED MODULE: ./src/Components/tabItem.js
            /* global chrome */ //import useThumbnail from "../stores/thumbnailStore";
            //const fetchUriZu = (state) => state.fetchUri;
            var submitSiteDetailsZu = function submitSiteDetailsZu(state) { return state.submitSiteDetails; };
            var moveTabToSpaceZu = function moveTabToSpaceZu(state) { return state.moveTabToSpace; };
            var setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
            var openNewTabStateZu = function openNewTabStateZu(state) { return state.openNewTabState; };
            var jumpNewTabStateZu = function jumpNewTabStateZu(state) { return state.jumpNewTabState; };
            var unselectAllZu = function unselectAllZu(state) { return state.unselectAll; }; // const selectedItemsZu = (state) => state.selectedItems;
            // const setSelectedItemsZu = (state) => state.setSelectedItems;
            var tabItem_TabItem = function TabItem(_ref) {
                var title = _ref.title,
                    favIcon = _ref.favIcon,
                    url = _ref.url,
                    tabId = _ref.tabId,
                    spaceId = _ref.spaceId,
                    isDragging = _ref.isDragging,
                    deleteNote = _ref.deleteNote,
                    combineTargetFor = _ref.combineTargetFor,
                    compactView = _ref.compactView,
                    isSelected = _ref.isSelected,
                    dateCreated = _ref.dateCreated; //zuState
                var submitSiteDetails = Object(store["a" /* default */ ])(submitSiteDetailsZu);
                var moveTabToSpace = Object(store["a" /* default */ ])(moveTabToSpaceZu);
                var setCategory = Object(store["a" /* default */ ])(setCategoryZu);
                var openNewTabState = Object(persistStore["a" /* default */ ])(openNewTabStateZu);
                var jumpNewTabState = Object(persistStore["a" /* default */ ])(jumpNewTabStateZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(unselectAllZu); //const selectedItems = useStore(selectedItemsZu);
                //const setSelectedItems = useStore(setSelectedItemsZu);
                //const fetchUri = useThumbnail(fetchUriZu);
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    siteModalOpen = _useState2[0],
                    setSiteModalOpen = _useState2[1];
                var _useState3 = Object(react["useState"])(title),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    tabTitle = _useState4[0],
                    setTabTitle = _useState4[1];
                var _useState5 = Object(react["useState"])(url),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    tabUrl = _useState6[0],
                    setTabUrl = _useState6[1];
                var closeSiteModal = function closeSiteModal() { setSiteModalOpen(false); };
                var moveToSpace = function moveToSpace(toSpace, fromSpace, title, toCategory) {
                    moveTabToSpace(toSpace, spaceId, tabId);
                    toCategory !== undefined ? setCategory(toCategory) : setCategory(0);
                };
                var deleteNoteAction = function deleteNoteAction() { deleteNote(spaceId, tabId, 'Site'); };
                var saveAndClose = function saveAndClose(currentTitle, currentUrl) {
                    submitSiteDetails(spaceId, tabId, currentTitle, currentUrl);
                    setTabTitle(currentTitle);
                    setTabUrl(currentUrl);
                    closeSiteModal();
                }; //Styling
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var _useState7 = Object(react["useState"])(false),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    commentColor = _useState8[0],
                    setCommentColor = _useState8[1];
                var color = { light: '#FFF', dark: '#1e2123' };
                var urlText = { light: 'gray.400', dark: '#A1A2A4' };
                var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                var iconBG = { light: 'transparent', dark: '#32363A' };
                var weight = { light: '500', dark: '600' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var favIconBg = { light: '#FFF', dark: 'transparent' };
                var outerShadow = { light: '0 1px 6px -1px rgba(78,80,81,0.30)', dark: '' };
                var hoverShadow = { light: '0 3px 10px -3px rgba(152,169,185,0.80)', dark: '0 3px 10px -3px rgba(0,0,0,0.90)' };
                var draggingShadow = { light: '0px 0px 0px 2px #44E18C, 0 6px 18px -2px rgba(152,169,185,0.60)', dark: '0px 0px 0px 2px #44E18C, 0 6px 18px -1px rgba(0,0,0,0.70)' };
                var combineShadow = { light: '0px 0px 0px 2px #44E18C', dark: '0px 0px 0px 2px #44E18C' };
                var isGitHub = url === null || url === void 0 ? void 0 : url.startsWith('https://github');
                var gitHubFavIcon = colorMode === 'light' ? 'https://github.githubassets.com/favicons/favicon.svg' : 'https://github.githubassets.com/favicons/favicon-dark.svg'; // Fallback image stuff
                var onLoadSuccess = function onLoadSuccess(e) { if (e.target.naturalHeight + e.target.naturalWidth === 0) { setFallbackActive(true); } };
                var _useState9 = Object(react["useState"])(false),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    fallbackActive = _useState10[0],
                    setFallbackActive = _useState10[1];
                var _useState11 = Object(react["useState"])(false),
                    _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                    loading = _useState12[0],
                    setLoadingState = _useState12[1];
                var fallbackSrc = colorMode === 'light' ? fallBackSvg_default.a : fallBackSvgDark_default.a;
                var favIconSrc = favIcon ? isGitHub ? gitHubFavIcon : favIcon : fallbackSrc;
                var localIcon = favIcon === 'localIcon' ? Object(localIconProvider["a" /* LocalIconProvider */ ])(title) : false; //Thumbnail stuff
                /*   const [uri, setUri] = useState(null);

                  const getThumbnailUri = async () => {
                    let base = new URL(url);
                    let key = base.host;
                    const data = await fetchUri(key);
                    let thumbnailUri = data[key];
                    setUri(thumbnailUri);
                  }; */
                var openLink = function openLink(e) {
                    e.stopPropagation();
                    if (e.metaKey || e.ctrlKey || e.which === 2 || e.button === 4) { chrome.tabs.create({ active: false, url: tabUrl }, function() { setLoadingState(false); }); return; } else if (openNewTabState) { chrome.tabs.create({ active: jumpNewTabState, url: tabUrl }, function() { setLoadingState(false); }); return; } else {
                        chrome.tabs.update({ url: tabUrl });
                        setLoadingState(true);
                    }
                };
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    userSelect: "none" //bg={color[colorMode]}
                        ,
                    bg: isDragging ? color[colorMode] : 'transparent',
                    borderRadius: "7px",
                    zIndex: "87",
                    py: compactView ? '2px' : '10px' //opacity={loading ? "0.8" : "1"}
                        ,
                    display: "flex",
                    flexDirection: "column",
                    mx: "6px" //onClick={(e) => selectClick(e)}
                        //cursor={"grab"}
                        ,
                    _active: { cursor: 'grabbing' } //border={isDragging ? "2px solid #41E18B" : ""}
                    //onMouseOver={ !isDragging ? (() => setUrlHovered(url)) : ''}
                    ,
                    boxShadow: isSelected ? '0px 0px 0px 1px #44E18C, 0 0px 3px 2px #00E58380' : isDragging ? draggingShadow[colorMode] : false || combineTargetFor ? combineShadow[colorMode] : '' //style={{ willChange: 'transform' }}
                        ,
                    _hover: isSelected ? '' : isDragging ? '' : { //transform: loading ? '' : 'translateY(-1px)',
                        boxShadow: loading ? '' : hoverShadow[colorMode],
                        cursor: 'grab',
                        zIndex: '300',
                        bg: color[colorMode]
                    },
                    transition: "0.18s cubic-bezier(0.22,0.61,0.36,1)",
                    role: "group"
                }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", position: "relative" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", alignItems: "center", rounded: "8px", minWidth: compactView ? '24px' : '32px', minHeight: compactView ? '24px' : '32px', bg: favIconBg[colorMode], boxShadow: outerShadow[colorMode], mr: "16px", ml: "12px", my: "6px", transform: loading ? 'scale(1.2)' : '', transition: loading ? '0.4s cubic-bezier(0.2,-0.3,0.72,1.47)' : '', position: "relative" }, react_default.a.createElement(Box["a" /* default */ ], { maxHeight: "24px", maxWidth: "24px", m: "auto" }, react_default.a.createElement("img", { src: fallbackActive ? fallbackSrc : localIcon ? localIcon : favIconSrc, alt: "Fav icon", height: compactView ? '16px' : '24px', width: compactView ? '16px' : '24px', onError: function onError() { return setFallbackActive(true); }, onLoad: function onLoad(e) { return onLoadSuccess(e); }, style: { margin: 'auto', borderRadius: '2px', transform: loading ? 'scale(0.5)' : '', transition: loading ? '0.2s linear' : '', fontSize: '8px', textAlign: 'center', fontWeight: '500', maxWidth: '24px', maxHeight: '24px' } })), loading ? react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", h: "100%", w: "100%" }, react_default.a.createElement(CircularProgress["a" /* default */ ], { transform: loading ? 'scale(1)' : 'scale(3)', opacity: loading ? '1' : '0', transition: "0.4s 0.5 linear", m: "auto", fontSize: compactView ? '26px' : '28px', isIndeterminate: true, color: "blue" })) : ''), react_default.a.createElement(Tooltip["a" /* default */ ], {
                    placement: "auto" //onOpen={() => getThumbnailUri()}
                        ,
                    zIndex: "1000",
                    rounded: "6px",
                    px: "12px",
                    py: "6px",
                    showDelay: "160",
                    label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ], null, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "md", fontWeight: "bold", letterSpacing: "0.64px" }, tabTitle), react_default.a.createElement(Text["a" /* default */ ], {
                        fontSize: "12px",
                        opacity: "0.8",
                        mt: "2px",
                        wordBreak: "break-all" //isTruncated
                    }, tabUrl), dateCreated && react_default.a.createElement(Text["a" /* default */ ], {
                        fontSize: "11px",
                        opacity: "0.6",
                        mt: "2px",
                        wordBreak: "break-all" //isTruncated
                    }, "Saved", ' ', dateCreated.substring(15, 21), ",", ' ', dateCreated.substring(0, 15))))
                }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    role: "group",
                    mr: "16px" //maxWidth={titleUrlMax}
                        ,
                    width: compactView ? 'calc(106% - 108px)' : 'calc(100% - 108px)',
                    display: "flex",
                    flexDirection: "column",
                    opacity: loading ? '0.6' : '1',
                    cursor: "pointer"
                }, react_default.a.createElement(PseudoBox["a" /* default */ ] //as="a"
                    //href={url}
                    , { onClick: function onClick(e) { return openLink(e); }, onDragStart: function onDragStart(e) { e.preventDefault(); }, my: "auto", letterSpacing: "0.42px", color: text[colorMode], fontWeight: compactView ? '500' : weight[colorMode], fontSize: "14px", isTruncated: true, py: compactView ? '2px' : '' }, tabTitle), !compactView && react_default.a.createElement(PseudoBox["a" /* default */ ] //_hover={{ textDecoration: "underline" }}
                    , {
                        _groupHover: { textDecoration: 'underline' } //as="a"
                        //href={url}
                        ,
                        onClick: function onClick(e) { return openLink(e); },
                        onDragStart: function onDragStart(e) { e.preventDefault(); },
                        mt: "2px",
                        my: "auto",
                        color: urlText[colorMode],
                        fontWeight: "500",
                        fontSize: "12px",
                        isTruncated: true
                    }, tabUrl === null || tabUrl === void 0 ? void 0 : tabUrl.replace(/(^\w+:|^)\/\//, '')))), react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", right: "0px" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { ml: "4px", mr: "12px", opacity: "0", transition: "0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)", transform: "scale(0)", _groupHover: { transform: isDragging ? '' : 'scale(1)', opacity: isDragging ? '' : '1' } }, react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Edit", zIndex: "1000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "dotdotdot" //onClick={() => deleteNote(spaceId, tabId, "Text-snippet")}
                        ,
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        unselectAll();
                        setSiteModalOpen(true);
                    },
                    color: iconDarkerColor[colorMode],
                    minWidth: "28px",
                    height: "28px",
                    bg: iconBG[colorMode],
                    returnFocusOnClose: false
                })))))), react_default.a.createElement(tabModal, { siteModalOpen: siteModalOpen, closeSiteModal: closeSiteModal, deleteNoteAction: deleteNoteAction, title: title, favIcon: favIcon, url: url, tabId: tabId, spaceId: spaceId, saveAndClose: saveAndClose, moveToSpace: moveToSpace }));
            }; /* harmony default export */
            var tabItem = (Object(react["memo"])(tabItem_TabItem));
            // EXTERNAL MODULE: ./node_modules/@emotion/styled/dist/styled.browser.esm.js + 1 modules
            var styled_browser_esm = __webpack_require__(52);

            // CONCATENATED MODULE: ./src/Utils/useMountEffect.js
            var useMountEffect_useMountEffect = function useMountEffect(fun) { return Object(react["useEffect"])(fun, []); }; /* harmony default export */
            var Utils_useMountEffect = (useMountEffect_useMountEffect);
            // EXTERNAL MODULE: ./node_modules/@emotion/core/dist/core.browser.esm.js + 4 modules
            var core_browser_esm = __webpack_require__(2);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/useClipboard/index.js
            var useClipboard = __webpack_require__(227);

            // CONCATENATED MODULE: ./src/Utils/useOutsideClick.js
            var useOutsideClick_useOutsideClick = function useOutsideClick(ref, callback) {
                var handleClick = function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) { callback(); } };
                Object(react["useEffect"])(function() { document.addEventListener("click", handleClick); return function() { document.removeEventListener("click", handleClick); }; });
            }; /* harmony default export */
            var Utils_useOutsideClick = (useOutsideClick_useOutsideClick);
            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/SimpleGrid/index.js + 1 modules
            var SimpleGrid = __webpack_require__(233);

            // CONCATENATED MODULE: ./src/Components/textToolbar.js
            //import useDndStore from "../stores/dndStore";
            //const setDoneStatusZu = (state) => state.setDoneStatus;
            //const unselectAllZu = (state) => state.unselectAll;
            var textToolbar_userStateZu = function userStateZu(state) { return state.userState; };
            var textToolbar_TextToolbar = function TextToolbar(_ref) {
                var setDoneStatus = _ref.setDoneStatus,
                    setIsDeleted = _ref.setIsDeleted,
                    getCursorPos = _ref.getCursorPos,
                    noteClosed = _ref.noteClosed,
                    hoverListOff = _ref.hoverListOff,
                    editModeActive = _ref.editModeActive,
                    onCopy = _ref.onCopy,
                    showPicker = _ref.showPicker,
                    setShowPicker = _ref.setShowPicker,
                    setShowColorPicker = _ref.setShowColorPicker,
                    showColorPicker = _ref.showColorPicker,
                    setHoverTools = _ref.setHoverTools,
                    todo = _ref.todo,
                    setTodo = _ref.setTodo,
                    setIsDone = _ref.setIsDone,
                    spaceId = _ref.spaceId,
                    tabId = _ref.tabId,
                    setInputFocus = _ref.setInputFocus,
                    commentColor = _ref.commentColor,
                    setCommentColor = _ref.setCommentColor,
                    deleteNote = _ref.deleteNote,
                    setOpen = _ref.setOpen,
                    addEmoji = _ref.addEmoji,
                    modalMode = _ref.modalMode; //zuState
                //const setDoneStatus = useStore(setDoneStatusZu);
                //const unselectAll = useDndStore(unselectAllZu);
                var userState = Object(store["a" /* default */ ])(textToolbar_userStateZu); // ! Note to self: setIsDeleted är ett missvisande namn, används till att stoppa submit on blur
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var commentBgColor = { light: 'gray.100', dark: '#35393c' };
                var commentCopiedTextBgColor = { light: 'gray.300', dark: '#2A2D30' };
                var border = { light: 'gray.200', dark: '#3F454D' };
                var picker = { light: '#FFF', dark: '#3F454D' };
                var selectedShadow = { light: '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #A0AEC0', dark: '0px 0px 0px 2px #262A2D, 0px 0px 0px 4px #FFF' };
                var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                var emojiPickerShadow = { light: '0 4px 18px -2px rgba(152,169,185,0.80)', dark: '0 4px 18px -2px rgba(0,0,0,0.80)' };
                var toolBarShadow = { light: '0 20px 20px -18px rgba(152,169,185,0.85), 0 0px 10px -4px rgba(152,169,185,0.75)', dark: '0 20px 20px -18px rgba(0,0,0,0.9), 0 0px 10px -4px rgba(0,0,0,0.85)' };
                var toolBarShadowModal = { light: '0 20px 20px -18px rgba(0,0,0,0.35), 0 0px 10px -4px rgba(0,0,0,0.25)', dark: '0 20px 20px -18px rgba(0,0,0,0.95), 0 0px 10px -4px rgba(0,0,0,0.9)' };
                var emojiCategory = { light: 'gray.200', dark: '#FFF' }; //Emoji picker stuff
                var onEmojiClick = function onEmojiClick(emoji) {
                    addEmoji(emoji.native); //setInputFocus();
                    //setShowPicker(false);
                };
                var ref = Object(react["useRef"])();
                Utils_useOutsideClick(ref, function() {
                    setShowPicker(false);
                    setShowColorPicker(false);
                }); //`${commentBgColor[colorMode]}`
                var toast = Object(Toast["a" /* default */ ])();
                var showCopyToast = function showCopyToast() {
                    onCopy();
                    toast({ position: 'bottom-right', status: 'success', duration: 3500, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: 'Text copied', subtitle: 'All text inside item copied to clipboard', type: 'success', colorMode: colorMode }); } });
                };
                var sendToDeleteToast = todo ? 'To-do' : 'Note';
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    onMouseEnter: function onMouseEnter() { setHoverTools(true); },
                    onMouseLeave: function onMouseLeave() { setHoverTools(false); },
                    zIndex: "1000",
                    position: "fixed" //pt="4px"
                        ,
                    bottom: "24px",
                    left: "50%",
                    ml: "-152px",
                    w: "304px",
                    height: "52px",
                    rounded: "10px",
                    cursor: "default",
                    transform: showPicker ? '1' : 'scale(0.9475)',
                    _hover: { transform: 'scale(1)' },
                    transition: "transform 0.24s cubic-bezier(.374,.019,.035,1.861)",
                    willChange: "transform"
                }, react_default.a.createElement(Flex["a" /* default */ ], { pl: "16px", pr: "8px", w: "100%", h: "100%", bg: color[colorMode], rounded: "8px", boxShadow: modalMode ? toolBarShadowModal[colorMode] : toolBarShadow[colorMode] }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", w: "100%", position: "relative" }, react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Note", showDelay: "160", zIndex: "2000", placement: "auto-start" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    zIndex: "2",
                    as: "button",
                    outline: "none" //mr="10px"
                        //transform="scale(1)"
                        ,
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' },
                    boxShadow: !todo ? selectedShadow[colorMode] : '0px',
                    cursor: "pointer",
                    bg: border[colorMode],
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        setTodo(false);
                        setIsDone(false);
                        setDoneStatus(false, spaceId, tabId);
                        setInputFocus(); //unselectAll();
                    },
                    rounded: "5px",
                    width: "36px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center"
                }, react_default.a.createElement(Icon["a" /* default */ ], { name: "comment", fontSize: "22px", m: "auto", color: iconDarkerColor[colorMode] }))), react_default.a.createElement(Box["a" /* default */ ], { mx: "-4px", w: "18px", height: "32px", bg: border[colorMode], zIndex: "1" }), react_default.a.createElement(Tooltip["a" /* default */ ], { label: "To-do", showDelay: "160", zIndex: "2000", placement: "auto-start" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    zIndex: "2",
                    as: "button",
                    outline: "none" //mr="10px"
                        ,
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' },
                    boxShadow: todo ? selectedShadow[colorMode] : '0px',
                    cursor: "pointer",
                    bg: border[colorMode],
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        setTodo(true);
                        setInputFocus();
                    },
                    rounded: "5px",
                    width: "36px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center"
                }, react_default.a.createElement(Icon["a" /* default */ ], { name: "checkCircle", fontSize: "22px", m: "auto", color: iconDarkerColor[colorMode] }))), react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Change color", showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "colorSwatch",
                    fontSize: "22px",
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        setShowPicker(false);
                        setShowColorPicker(!showColorPicker);
                    },
                    bg: !commentColor ? border[colorMode] : commentBg["a" /* default */ ][commentColor].iconLight,
                    color: !commentColor ? iconDarkerColor[colorMode] : commentBg["a" /* default */ ][commentColor].text,
                    rounded: "5px",
                    ml: "12px",
                    width: "36px",
                    height: "34px",
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' }
                })), showColorPicker && react_default.a.createElement(Box["a" /* default */ ], { ref: ref, pos: "absolute", bottom: "50px", left: "42px", zIndex: "2001", rounded: "12px", boxShadow: emojiPickerShadow[colorMode], transform: 'scale(0.85)', px: "18px", py: "18px", bg: picker[colorMode] }, react_default.a.createElement(SimpleGrid["a" /* default */ ], { columns: 4, spacing: 3 }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    as: "button",
                    outline: "none",
                    ml: "auto",
                    mr: "10px",
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' },
                    boxShadow: !commentColor ? selectedShadow[colorMode] : '0px',
                    cursor: "pointer",
                    bg: commentBgColor[colorMode],
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick() {
                        setCommentColor(false);
                        setInputFocus();
                    },
                    rounded: "5px",
                    width: "30px",
                    height: "28px",
                    display: "flex"
                }, react_default.a.createElement(Icon["a" /* default */ ], { name: "small-close", m: "auto", color: iconDarkerColor[colorMode], fontSize: "24px" })), commentBg["a" /* default */ ].map(function(color, index) {
                    return react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        key: index //as="button"
                            ,
                        outline: "none",
                        mr: "10px",
                        transform: "scale(1)",
                        transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                        _hover: { transform: 'scale(1.1)' },
                        _active: { transform: 'scale(0.96)' },
                        boxShadow: commentColor === index ? selectedShadow[colorMode] : '0px',
                        cursor: "pointer",
                        bg: color.iconLight,
                        onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                        onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                        onClick: function onClick() {
                            setCommentColor(index);
                            setInputFocus();
                        },
                        rounded: "5px",
                        width: "30px",
                        height: "28px"
                    });
                }))), react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Add emoji", showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "emojiPicker",
                    fontSize: "22px",
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        setShowColorPicker(false);
                        setShowPicker(!showPicker);
                        getCursorPos();
                    },
                    bg: border[colorMode],
                    color: iconDarkerColor[colorMode],
                    rounded: "5px",
                    ml: "10px",
                    width: "36px",
                    height: "34px",
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' }
                })), showPicker && react_default.a.createElement(Box["a" /* default */ ], { ref: ref, pos: "absolute", bottom: "30px", left: "52px", zIndex: "2001", rounded: "12px", boxShadow: emojiPickerShadow[colorMode], transform: 'scale(0.85)' }, react_default.a.createElement(dist_es["a" /* Picker */ ] //style={{width: "300px"}}
                    //autoFocus={true}
                    , {
                        color: emojiCategory[colorMode],
                        title: "Select a emoji",
                        emoji: "",
                        native: true,
                        showPreview: false,
                        useButton: false,
                        onSelect: onEmojiClick,
                        theme: colorMode === 'light' ? 'light' : 'dark' //custom={getCustomEmojis(userState)}
                    })), react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Copy to clipboard", showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "copyToClipboard",
                    fontSize: "22px",
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        showCopyToast();
                    },
                    bg: border[colorMode],
                    color: iconDarkerColor[colorMode],
                    rounded: "5px",
                    ml: "10px",
                    width: "36px",
                    height: "34px",
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)' },
                    _active: { transform: 'scale(0.96)' }
                })), react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Delete", showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "trash",
                    fontSize: "22px",
                    onMouseDown: function onMouseDown() { return setIsDeleted(true); },
                    onMouseUp: function onMouseUp() { return setIsDeleted(false); },
                    onClick: function onClick() {
                        deleteNote(spaceId, tabId, sendToDeleteToast);
                        noteClosed();
                        hoverListOff();
                    },
                    minWidth: "36px",
                    height: "34px",
                    rounded: "5px",
                    mr: "4px",
                    ml: "10px",
                    color: iconDarkerColor[colorMode] //bg="transparent"
                        ,
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)', bg: border[colorMode] },
                    _active: { transform: 'scale(0.96)' }
                }))))));
            }; /* harmony default export */
            var textToolbar = (textToolbar_TextToolbar);
            // CONCATENATED MODULE: ./src/Components/tab.js
            /* global chrome */ //import useThumbnail from "../stores/thumbnailStore";
            var tab_submitSiteDetailsZu = function submitSiteDetailsZu(state) { return state.submitSiteDetails; };
            var tab_moveTabToSpaceZu = function moveTabToSpaceZu(state) { return state.moveTabToSpace; };
            var tab_setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
            var tab_openNewTabStateZu = function openNewTabStateZu(state) { return state.openNewTabState; };
            var tab_jumpNewTabStateZu = function jumpNewTabStateZu(state) { return state.jumpNewTabState; };
            var tab_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var tab_TabItemOnly = function TabItemOnly(_ref) {
                var title = _ref.title,
                    favIcon = _ref.favIcon,
                    url = _ref.url,
                    tabId = _ref.tabId,
                    spaceId = _ref.spaceId,
                    isDragging = _ref.isDragging,
                    deleteNote = _ref.deleteNote,
                    compactView = _ref.compactView,
                    isCombined = _ref.isCombined,
                    isStacked = _ref.isStacked; //zuState
                var submitSiteDetails = Object(store["a" /* default */ ])(tab_submitSiteDetailsZu);
                var moveTabToSpace = Object(store["a" /* default */ ])(tab_moveTabToSpaceZu);
                var setCategory = Object(store["a" /* default */ ])(tab_setCategoryZu);
                var openNewTabState = Object(persistStore["a" /* default */ ])(tab_openNewTabStateZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(tab_unselectAllZu); //const fetchUri = useThumbnail(fetchUriZu);
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    siteModalOpen = _useState2[0],
                    setSiteModalOpen = _useState2[1];
                var _useState3 = Object(react["useState"])(title),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    tabTitle = _useState4[0],
                    setTabTitle = _useState4[1];
                var _useState5 = Object(react["useState"])(url),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    tabUrl = _useState6[0],
                    setTabUrl = _useState6[1];
                var jumpNewTabState = Object(persistStore["a" /* default */ ])(tab_jumpNewTabStateZu);
                var closeSiteModal = function closeSiteModal() { setSiteModalOpen(false); };
                var moveToSpace = function moveToSpace(toSpace, fromSpace, title, toCategory) {
                    moveTabToSpace(toSpace, spaceId, tabId, isStacked);
                    setCategory(toCategory);
                };
                var saveAndClose = function saveAndClose(currentTitle, currentUrl) {
                    submitSiteDetails(spaceId, tabId, currentTitle, currentUrl, isStacked);
                    setTabTitle(currentTitle);
                    setTabUrl(currentUrl);
                    closeSiteModal();
                }; //const fetchUri = useThumbnail(fetchUriZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#1e2123' };
                var favIconBg = { light: '#FFF', dark: 'transparent' }; /* alt för darkmode: #3c4042 */
                var text = { light: '#1A202C', dark: '#FFF' };
                var urlText = { light: 'gray.400', dark: '#A1A2A4' };
                var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                var iconBG = { light: 'transparent', dark: '#32363A' };
                var weight = { light: '500', dark: '600' };
                var outerShadow = { light: '0 1px 6px -1px rgba(78,80,81,0.30)', dark: '' }; //const isGitHub = url.startsWith("https://github");
                var deleteNoteAction = function deleteNoteAction(spaceId, tabId, type) { deleteNote(spaceId, tabId, type, isStacked); };
                var onLoadSuccess = function onLoadSuccess(e) { if (e.target.naturalHeight + e.target.naturalWidth === 0) { setFallbackActive(true); } };
                var _useState7 = Object(react["useState"])(false),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    fallbackActive = _useState8[0],
                    setFallbackActive = _useState8[1];
                var _useState9 = Object(react["useState"])(false),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    loading = _useState10[0],
                    setLoadingState = _useState10[1];
                var isGitHub = url.startsWith('https://github');
                var gitHubFavIcon = colorMode === 'light' ? 'https://github.githubassets.com/favicons/favicon.svg' : 'https://github.githubassets.com/favicons/favicon-dark.svg';
                var fallbackSrc = colorMode === 'light' ? fallBackSvg_default.a : fallBackSvgDark_default.a;
                var favIconSrc = favIcon ? isGitHub ? gitHubFavIcon : favIcon : fallbackSrc;
                var localIcon = favIcon === 'localIcon' ? Object(localIconProvider["a" /* LocalIconProvider */ ])(title) : false; //Thumbnail stuff
                /*   const [uri, setUri] = useState(null);

                  const getThumbnailUri = async () => {
                    let base = new URL(url);
                    let key = base.host;
                    const data = await fetchUri(key);
                    let thumbnailUri = data[key];
                    setUri(thumbnailUri);
                  }; */
                var openLink = function openLink(e) {
                    e.stopPropagation();
                    if (e.metaKey || e.ctrlKey || e.which === 2 || e.button === 4) { chrome.tabs.create({ active: false, url: tabUrl }, function() { setLoadingState(false); }); return; } else if (openNewTabState) { chrome.tabs.create({ active: jumpNewTabState, url: tabUrl }, function() { setLoadingState(false); }); return; } else {
                        chrome.tabs.update({ url: tabUrl });
                        setLoadingState(true);
                    }
                };
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", position: "relative", pt: compactView ? '2px' : '8px' }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", alignItems: "center", rounded: "8px", minWidth: compactView ? '24px' : '32px', minHeight: compactView ? '24px' : '32px', bg: favIconBg[colorMode], boxShadow: outerShadow[colorMode], mr: "16px", ml: isCombined ? '4px' : '12px', my: "6px", transform: loading ? 'scale(1.2)' : '', transition: loading ? '0.4s cubic-bezier(0.2,-0.3,0.72,1.47)' : '', position: "relative" }, react_default.a.createElement("img", { src: fallbackActive ? fallbackSrc : localIcon ? localIcon : favIconSrc, alt: "Fav icon", height: compactView ? '16px' : '24px', width: compactView ? '16px' : '24px', onError: function onError() { return setFallbackActive(true); }, onLoad: function onLoad(e) { return onLoadSuccess(e); }, style: { margin: 'auto', borderRadius: '2px', transform: loading ? 'scale(0.5)' : '', transition: loading ? '0.2s linear' : '', fontSize: '8px', textAlign: 'center', fontWeight: '500', maxWidth: '24px', maxHeight: '24px' } }), loading ? react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", h: "100%", w: "100%" }, react_default.a.createElement(CircularProgress["a" /* default */ ], { transform: loading ? 'scale(1)' : 'scale(3)', opacity: loading ? '1' : '0', transition: "0.4s 0.5 linear", m: "auto", fontSize: compactView ? '26px' : '28px', isIndeterminate: true, emptyColor: "#FFF", color: "blue" })) : ''), react_default.a.createElement(Tooltip["a" /* default */ ], {
                    placement: "auto" //onOpen={() => getThumbnailUri()}
                        ,
                    zIndex: "500000",
                    rounded: "6px",
                    px: "12px",
                    py: "6px",
                    showDelay: "160",
                    label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ] //maxWidth="248px"
                        , null, react_default.a.createElement(Text["a" /* default */ ], {
                            fontSize: "md",
                            fontWeight: "bold" //isTruncated
                                ,
                            letterSpacing: "0.64px"
                        }, tabTitle), react_default.a.createElement(Text["a" /* default */ ], {
                            opacity: "0.8",
                            fontSize: "xs",
                            mt: "2px",
                            wordBreak: "break-all" //pb={uri ? "8px" : ""}
                            //isTruncated
                        }, tabUrl)))
                }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    role: "group",
                    mr: "16px" //maxWidth={titleUrlMax}
                        ,
                    width: compactView ? 'calc(106% - 108px)' : 'calc(100% - 108px)',
                    display: "flex",
                    flexDirection: "column",
                    opacity: loading ? '0.6' : '1',
                    cursor: "pointer"
                }, react_default.a.createElement(PseudoBox["a" /* default */ ] //as="a"
                    //href={url}
                    , { onClick: function onClick(e) { return openLink(e); }, onDragStart: function onDragStart(e) { e.preventDefault(); }, my: "auto", letterSpacing: "0.42px", color: text[colorMode], fontWeight: weight[colorMode], fontSize: "14px", isTruncated: true }, tabTitle), !compactView && react_default.a.createElement(PseudoBox["a" /* default */ ] //_hover={{ textDecoration: "underline" }}
                    , {
                        _groupHover: { textDecoration: 'underline' } //as="a"
                        //href={url}
                        ,
                        onClick: function onClick(e) { return openLink(e); },
                        onDragStart: function onDragStart(e) { e.preventDefault(); },
                        mt: "2px",
                        my: "auto",
                        color: urlText[colorMode],
                        fontWeight: "500",
                        fontSize: "12px",
                        isTruncated: true
                    }, tabUrl.replace(/(^\w+:|^)\/\//, '')))), react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", right: "0px" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    ml: "4px",
                    mr: isCombined ? '4px' : '12px',
                    opacity: "0",
                    transition: "0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                    transform: "scale(0)",
                    _groupHover: { transform: isDragging ? '' : 'scale(1)', opacity: isDragging ? '' : '1' } //willChange="transform"
                }, react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Edit", zIndex: "500000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "dotdotdot" //onClick={() => deleteNote(spaceId, tabId, "Text-snippet")}
                        ,
                    onClick: function onClick(e) {
                        e.stopPropagation();
                        unselectAll();
                        setSiteModalOpen(true);
                    },
                    color: iconDarkerColor[colorMode],
                    minWidth: "28px",
                    height: "28px",
                    bg: iconBG[colorMode],
                    returnFocusOnClose: false
                }))))), react_default.a.createElement(tabModal, { siteModalOpen: siteModalOpen, closeSiteModal: closeSiteModal, deleteNoteAction: deleteNoteAction, title: title, favIcon: favIcon, url: url, tabId: tabId, spaceId: spaceId, saveAndClose: saveAndClose, moveToSpace: moveToSpace }));
            }; /* harmony default export */
            var Components_tab = (Object(react["memo"])(tab_TabItemOnly));
            // CONCATENATED MODULE: ./src/Components/todoCheck.js
            //import { motion, useMotionValue, useTransform } from "framer-motion"
            var todoCheck_TodoCheck = function TodoCheck(_ref) {
                var isDone = _ref.isDone,
                    commentColor = _ref.commentColor,
                    toggleDone = _ref.toggleDone,
                    compactView = _ref.compactView;
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var todoBorder = { light: '#B0B7C1', dark: '#4A5568' };
                var checkColor = { light: '#FFF', dark: '#15171b' };
                var isThereColor = commentColor !== false && commentColor || commentColor === 0 ? true : false;
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    as: "button",
                    transform: "scale(0.825)" //_hover={{ transform: "scale(1.15)" }}
                        ,
                    _hover: { transform: 'scale(1)' },
                    outline: "none",
                    onClick: function onClick() { return toggleDone(); },
                    bg: isDone ? isThereColor ? commentBg["a" /* default */ ][commentColor].iconLight : 'blue.300' : 'transparent',
                    _active: { boxShadow: '0 1px 10px -2px rgba(152,169,185,0.50), inset 0px 0px 0px 2px' + (isThereColor ? commentBg["a" /* default */ ][commentColor].bg : '#63B3ED'), transform: 'scale(0.96)' },
                    ml: "12px",
                    mt: compactView ? '6px' : '8px',
                    height: "28px",
                    minWidth: "28px",
                    rounded: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    transition: '0.16s cubic-bezier(.374,.019,.035,1.861)',
                    boxShadow: 'inset 0px 0px 0px 2px ' + (isDone ? isThereColor ? commentBg["a" /* default */ ][commentColor].bg : '#90CDF4' : todoBorder[colorMode])
                }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", fontSize: "22px", color: isDone ? checkColor[colorMode] : 'transparent', transform: isDone ? 'scale(1)' : 'scale(2)', transition: 'transform 0.3s, color 0.18s', name: "checkDone" })));
            }; /* harmony default export */
            var todoCheck = (todoCheck_TodoCheck);
            // EXTERNAL MODULE: ./src/fx/happyBell.mp3
            var happyBell = __webpack_require__(149);
            var happyBell_default = /*#__PURE__*/ __webpack_require__.n(happyBell);

            // EXTERNAL MODULE: ./src/fx/undone.mp3
            var undone = __webpack_require__(150);
            var undone_default = /*#__PURE__*/ __webpack_require__.n(undone);

            // CONCATENATED MODULE: ./src/Components/spaceNoteInline.js
            /*@jsx jsx*/
            var submitCommentZu = function submitCommentZu(state) { return state.submitComment; }; //const deleteNoteZu = (state) => state.deleteNote;
            var removeCommentZu = function removeCommentZu(state) { return state.removeComment; };
            var discardNoteZu = function discardNoteZu(state) { return state.discardNote; };
            var setDoneStatusZu = function setDoneStatusZu(state) { return state.setDoneStatus; };
            var spaceNoteInline_fxStateZu = function fxStateZu(state) { return state.fxState; };
            var addNoteZu = function addNoteZu(state) { return state.addNote; };
            var spaceNoteInline_rolesZu = function rolesZu(state) { return state.roles; };
            var spaceNoteInline_setShowToastZu = function setShowToastZu(state) { return state.setShowToast; }; //DndStore
            var isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var isDraggingSpaceZu = function isDraggingSpaceZu(state) { return state.isDraggingSpace; };
            var spaceNoteInline_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };

            function useRunAfterUpdate() {
                var afterPaintRef = react_default.a.useRef(null);
                Object(react["useLayoutEffect"])(function() {
                    if (afterPaintRef.current) {
                        afterPaintRef.current();
                        afterPaintRef.current = null;
                    }
                });
                var runAfterUpdate = function runAfterUpdate(fn) { return afterPaintRef.current = fn; };
                return runAfterUpdate;
            }
            var spaceNoteInline_SpaceNoteInline = function SpaceNoteInline(_ref) {
                var isSelected = _ref.isSelected,
                    title = _ref.title,
                    favIcon = _ref.favIcon,
                    url = _ref.url,
                    comment = _ref.comment,
                    tabId = _ref.tabId,
                    spaceId = _ref.spaceId,
                    commentSavedColor = _ref.commentSavedColor,
                    justAdded = _ref.justAdded,
                    doneStatus = _ref.doneStatus,
                    noteOpen = _ref.noteOpen,
                    noteClosed = _ref.noteClosed,
                    hoverListOff = _ref.hoverListOff,
                    isTodo = _ref.isTodo,
                    type = _ref.type,
                    editableFocus = _ref.editableFocus,
                    isDragging = _ref.isDragging,
                    wontSave = _ref.wontSave,
                    modalMode = _ref.modalMode,
                    deleteNote = _ref.deleteNote,
                    combineTargetFor = _ref.combineTargetFor,
                    compactView = _ref.compactView,
                    dateCreated = _ref.dateCreated,
                    edited = _ref.edited,
                    editor = _ref.editor,
                    turnNoteIntoSite = _ref.turnNoteIntoSite;
                var setDoneStatus = Object(store["a" /* default */ ])(setDoneStatusZu); //zuState
                //const deleteNote = useStore(deleteNoteZu);
                //Zustate
                var submitComment = Object(store["a" /* default */ ])(submitCommentZu);
                var removeComment = Object(store["a" /* default */ ])(removeCommentZu);
                var discardNote = Object(store["a" /* default */ ])(discardNoteZu);
                var fxState = Object(persistStore["a" /* default */ ])(spaceNoteInline_fxStateZu);
                var addNote = Object(store["a" /* default */ ])(addNoteZu);
                var roles = Object(store["a" /* default */ ])(spaceNoteInline_rolesZu);
                var setShowToast = Object(store["a" /* default */ ])(spaceNoteInline_setShowToastZu); //Dndstore
                var dragIsActiveSomewhere = Object(dndStore["a" /* default */ ])(isDraggingZu);
                var isDraggingSpace = Object(dndStore["a" /* default */ ])(isDraggingSpaceZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(spaceNoteInline_unselectAllZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var _useState = Object(react["useState"])(commentSavedColor),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    commentColor = _useState2[0],
                    setCommentColor = _useState2[1];
                Object(react["useEffect"])(function() { setCommentColor(commentSavedColor); }, [commentSavedColor]); //Sound
                var _useSound = Object(use_sound_esm["a" /* default */ ])(happyBell_default.a),
                    _useSound2 = Object(slicedToArray["a" /* default */ ])(_useSound, 1),
                    playHappyBell = _useSound2[0];
                var _useSound3 = Object(use_sound_esm["a" /* default */ ])(undone_default.a),
                    _useSound4 = Object(slicedToArray["a" /* default */ ])(_useSound3, 1),
                    playUndone = _useSound4[0]; //ColorStuff
                var color = { light: '#FFF', dark: '#1e2123' };
                var commentBgColor = { light: 'gray.100', dark: '#35393c' };
                var commentCopiedTextBgColor = { light: 'gray.100', dark: '#2A2D30' };
                var textComment = { light: 'gray.700', dark: '#FFFFFF' };
                var hoverShadow = { light: '0 3px 10px -3px rgba(152,169,185,0.80)', dark: '0 3px 10px -3px rgba(0,0,0,0.90)' }; //TODO ändra shadow för combine view
                var draggingShadow = { light: '0px 0px 0px 2px #44E18C, 0 6px 18px -2px rgba(152,169,185,0.60)', dark: '0px 0px 0px 2px #44E18C, 0 6px 18px -1px rgba(0,0,0,0.70)' };
                var combineShadow = { light: '0px 0px 0px 2px #44E18C', dark: '0px 0px 0px 2px #44E18C' }; //OnFocus ->
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    editModeActive = _useState4[0],
                    _setOpen = _useState4[1];
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    hoverTools = _useState6[0],
                    setHoverTools = _useState6[1];
                var focusNote = function focusNote() {
                    unselectAll();
                    _setOpen(true);
                    editableFocus();
                };
                var useFocus = function useFocus() { var htmlElRef = Object(react["useRef"])(null); var setFocus = function setFocus() { htmlElRef.current && htmlElRef.current.focus(); }; return [htmlElRef, setFocus]; };
                var _useFocus = useFocus(),
                    _useFocus2 = Object(slicedToArray["a" /* default */ ])(_useFocus, 2),
                    inputRef = _useFocus2[0],
                    setInputFocus = _useFocus2[1]; //Comment stuff
                var _useState7 = Object(react["useState"])(comment),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    value = _useState8[0],
                    setValue = _useState8[1];
                Object(react["useEffect"])(function() { setValue(comment); }, [comment]);
                var _useState9 = Object(react["useState"])(isTodo),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    todo = _useState10[0],
                    setTodo = _useState10[1];
                Object(react["useEffect"])(function() { setTodo(isTodo); }, [isTodo]);
                var _useState11 = Object(react["useState"])(doneStatus),
                    _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                    isDone = _useState12[0],
                    setIsDone = _useState12[1];
                Object(react["useEffect"])(function() { setIsDone(doneStatus); }, [doneStatus]);
                var _useState13 = Object(react["useState"])(1),
                    _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                    textAreaRows = _useState14[0],
                    setTextAreaRows = _useState14[1];
                var _useState15 = Object(react["useState"])(0),
                    _useState16 = Object(slicedToArray["a" /* default */ ])(_useState15, 2),
                    lastCursorPos = _useState16[0],
                    setLastCursorPos = _useState16[1];
                var sendToDeleteToast = todo ? 'To-do' : 'Note';
                var handleKeyPress = function handleKeyPress(e) {
                    var newVal = e.target.value;
                    if (e.shiftKey && e.keyCode === 13) { return; }
                    if (e.keyCode === 13) {
                        e.target.blur();
                        setHoverTools(false);
                        setShowPicker(false);
                        setShowColorPicker(false);
                        e.preventDefault();
                        addNote(spaceId, tabId, todo);
                    }
                    if (e.keyCode === 27) {
                        e.target.blur();
                        setHoverTools(false);
                        setShowPicker(false);
                        setShowColorPicker(false);
                    }
                    if (e.shiftKey && e.keyCode === 46 || e.shiftKey && e.keyCode === 8) {
                        setHoverTools(false);
                        setShowPicker(false);
                        setShowColorPicker(false);
                        deleteNote(spaceId, tabId, sendToDeleteToast);
                    }
                    if (e.keyCode === 9) {
                        e.preventDefault(); //let newVal = e.target.value;
                        var pos = inputRef.current.selectionEnd;
                        var newPos = inputRef.current.selectionEnd + 3;
                        var insert = '   ';
                        var newString = [newVal.slice(0, pos), insert, newVal.slice(pos)].join(''); //newVal += "   ";
                        setValue(newString);
                        runAfterUpdate(function() {
                            inputRef.current.selectionStart = newPos;
                            inputRef.current.selectionEnd = newPos;
                        });
                    }
                }; //toolbar emojiPicker
                var _useState17 = Object(react["useState"])(false),
                    _useState18 = Object(slicedToArray["a" /* default */ ])(_useState17, 2),
                    showPicker = _useState18[0],
                    setShowPicker = _useState18[1];
                var _useState19 = Object(react["useState"])(false),
                    _useState20 = Object(slicedToArray["a" /* default */ ])(_useState19, 2),
                    showColorPicker = _useState20[0],
                    setShowColorPicker = _useState20[1];
                var addEmoji = function addEmoji(emoji) { //let newVal = value + emoji
                    var newVal = value.slice(0, lastCursorPos) + emoji + value.slice(lastCursorPos);
                    setValue(newVal);
                    setShowPicker(false);
                    setHoverTools(false);
                    setInputFocus();
                    runAfterUpdate(function() {
                        inputRef.current.selectionStart = lastCursorPos + 2;
                        inputRef.current.selectionEnd = lastCursorPos + 2;
                    });
                    submitComment(newVal, spaceId, tabId, commentColor, todo);
                };
                var getCursorPos = function getCursorPos() {
                    var pos = inputRef.current.selectionStart;
                    setLastCursorPos(pos);
                }; //CopyToClipboard
                var _useClipboard = Object(useClipboard["a" /* default */ ])(value),
                    onCopy = _useClipboard.onCopy,
                    hasCopied = _useClipboard.hasCopied;
                var _useState21 = Object(react["useState"])(false),
                    _useState22 = Object(slicedToArray["a" /* default */ ])(_useState21, 2),
                    isDeleted = _useState22[0],
                    setIsDeleted = _useState22[1];
                var close = function close() {
                    if (value.length === 0 && justAdded === true && !hoverTools) { discardNote(spaceId, tabId, modalMode); } else if (value.length === 0 && url.length > 0) { removeComment(spaceId, tabId, modalMode); } else if (!isDeleted && (value !== comment || commentColor !== commentSavedColor || todo !== isTodo)) { // TODO ? Trimma bort whitespace, finns det nån anledning?
                        //let trimmedString = value.trim();
                        submitComment(value, spaceId, tabId, commentColor, todo);
                    } //else if (value.length > 0 && justAdded === false) {
                    //submitComment(value, spaceIndex, tabId, commentColor, todo)
                    setShowPicker(false);
                    setShowColorPicker(false);
                    !hoverTools && noteClosed();
                };
                var toggleDone = function toggleDone(e) {
                    var newStatus = !isDone;
                    setIsDone(newStatus);
                    if (fxState) { if (!isDone) { playHappyBell(); } else { playUndone(); } } setDoneStatus(newStatus, spaceId, tabId); //e.stopPropagation(); -- lägg till event i anropet, om den behövs??
                };
                Utils_useMountEffect(function() {
                    var textareaLineHeight = 21;
                    var minRows = 1;
                    var maxRows = 16;
                    var currentRows = ~~(inputRef.current.scrollHeight / textareaLineHeight);
                    var rows = currentRows < maxRows ? currentRows : maxRows;
                    setTextAreaRows(rows);
                }); // textArea onChange height + Bullet point logic (- to •)
                var runAfterUpdate = useRunAfterUpdate();
                var valueInput = function valueInput(e) {
                    var textareaLineHeight = 21;
                    var minRows = 1;
                    var maxRows = 16;
                    if (e.target.value.length > 5000) { setShowToast("Maximum length exceeded", "Note truncated to 5000 characters", "warning"); }
                    var previousRows = e.target.rows;
                    e.target.rows = minRows; // reset number of rows in textarea
                    var currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
                    if (currentRows === previousRows) { e.target.rows = currentRows; }
                    if (currentRows >= maxRows) {
                        e.target.rows = maxRows;
                        e.target.scrollTop = e.target.scrollHeight;
                    }
                    var newRows = currentRows < maxRows ? currentRows : maxRows;
                    setTextAreaRows(newRows);
                    var newVal1 = e.target.value.slice(0, 5000); //check for arrows and deduct if so is the case, otherwise just selectionEnd
                    var newPos = newVal1.substring(0, newVal1.length - 2).includes('->') ? inputRef.current.selectionEnd - 1 : newVal1.substring(0, newVal1.length - 2).includes('<-') ? inputRef.current.selectionEnd - 1 : inputRef.current.selectionEnd;
                    if (newVal1.includes('/done')) {
                        setTodo(true);
                        toggleDone();
                    }
                    if (newVal1.includes('/todo')) { setTodo(true); }
                    if (newVal1.includes('/red')) { setCommentColor(0); }
                    if (newVal1.includes('/orange')) { setCommentColor(1); }
                    if (newVal1.includes('/green')) { setCommentColor(2); }
                    var newVal2 = newVal1.replace('/done', '');
                    var newVal3 = newVal2.replace('/todo', '');
                    var newVal4 = newVal3.replace('->', '→');
                    var newVal5 = newVal4.replace('<-', '←'); //let newVal6 = newVal5.replace("- ", " • ");
                    var newVal6 = newVal5.replace('/red', '');
                    var newVal7 = newVal6.replace('/orange', '');
                    var newVal8 = newVal7.replace('/green', '');
                    var newVal9 = newVal8.slice(0, 2) === '- ' ? newVal8.replace('- ', '• ') : newVal8;
                    var newVal = newVal9.replace('\n- ', '\n• ');
                    setValue(newVal);
                    runAfterUpdate(function() {
                        inputRef.current.selectionStart = newPos;
                        inputRef.current.selectionEnd = newPos;
                    });
                    return;
                };
                var toast = Object(Toast["a" /* default */ ])();
                var turnIntoLink = function turnIntoLink(pastedData, prevValue) {
                    setHoverTools(false);
                    setShowPicker(false);
                    setShowColorPicker(false);
                    turnNoteIntoSite(pastedData, prevValue, spaceId, tabId);
                };
                var handleOnPaste = function handleOnPaste(e) {
                    var prevValue = e.target.value; //let newValue = e.target.defaultValue;
                    var clipboardData = e.clipboardData || window.clipboardData;
                    var pastedData = clipboardData.getData('Text');
                    var expression = '/https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}';
                    var regex = new RegExp(expression);
                    var pastedUrl = regex.exec(pastedData)[0];
                    if (pastedData.match(regex)) {
                        toast({
                            position: 'bottom-right',
                            status: 'success',
                            duration: 6000,
                            isClosable: true,
                            render: function render(_ref2) {
                                var onClose = _ref2.onClose;
                                return Object(core_browser_esm["d" /* jsx */ ])(toastPopper["a" /* default */ ], {
                                    onClose: onClose,
                                    resClick: function resClick() { return turnIntoLink(pastedUrl, prevValue); },
                                    title: 'Looks like a URL',
                                    subtitle: 'Turn into link' //subtitle={'All text inside item copied to clipboard'}
                                        ,
                                    type: 'info',
                                    colorMode: colorMode
                                });
                            }
                        });
                    }
                };
                var _useBoolean = useBoolean_useBoolean(false),
                    hoverNote = _useBoolean.value,
                    hoverNoteOn = _useBoolean.on,
                    hoverNoteOff = _useBoolean.off; //const focusBoxShadow = "0px 0px 0px 3px #63B3ED";
                var focusBoxShadow = commentColor !== false && commentColor || commentColor === 0 ? '0px 0px 0px 3px ' + commentBg["a" /* default */ ][commentColor].bg : '0px 0px 0px 3px #63B3ED';
                var isEdited = edited ? 'Edited by' : 'Created by';
                var roleTarget = roles === null || roles === void 0 ? void 0 : roles.filter(function(target) { return target.userId === editor; });
                var editedBy = (roles === null || roles === void 0 ? void 0 : roles.length) > 0 && editor ? roleTarget[0] !== undefined ? roleTarget[0].name : false : false;
                return Object(core_browser_esm["d" /* jsx */ ])(react_default.a.Fragment, null, Object(core_browser_esm["d" /* jsx */ ])(PseudoBox["a" /* default */ ], {
                    userSelect: "none",
                    position: "relative" //onMouseOver={() => setMouseDown(true)}
                        //onMouseOut={() => setMouseDown(false)}
                        ,
                    bg: isDragging ? color[colorMode] : 'transparent',
                    borderRadius: "6px",
                    zIndex: "87"
                        /*       pt="12px"
                              pb="8px" */
                        ,
                    pt: compactView ? '0px' : '2px',
                    pb: url.length > 0 ? compactView ? '2px' : '4px' : compactView ? '0px' : '2px' //opacity={open ? "0.75" : "1"}
                        ,
                    display: "flex",
                    flexDirection: "column" //alignItems="center"
                        ,
                    mx: "6px",
                    opacity: wontSave ? '0.4' : '1' //cursor={"grab"}
                        ,
                    _active: { cursor: 'grabbing' },
                    boxShadow: isSelected ? '0px 0px 0px 1px #44E18C, 0 0px 3px 2px #00E58380' : isDragging ? draggingShadow[colorMode] : false || combineTargetFor ? combineShadow[colorMode] : '' //border={isDragging ? "2px solid #41E18B" : "none"}
                        //Fix: Byt denna till framer motion(?)
                        //style={{ willChange: 'transform' }}
                        ,
                    _hover: editModeActive || isSelected ? '' : { //transform: 'translateY(-1px)',
                        //transform: "translate3d(0px, -1px, 0px)",
                        boxShadow: hoverShadow[colorMode],
                        cursor: 'grab',
                        zIndex: '300',
                        bg: color[colorMode]
                    },
                    transition: isDragging ? '' : '0.18s cubic-bezier(0.22,0.61,0.36,1)',
                    role: "group"
                    /* transform="translateZ(0) scale(1.0, 1.0)"
                            style={{ backfaceVisibility: "hidden" }} */
                }, url.length > 0 && Object(core_browser_esm["d" /* jsx */ ])(Components_tab, { modalMode: modalMode, editModeActive: editModeActive, title: title, favIcon: favIcon, url: url, tabId: tabId, spaceId: spaceId, commentSavedColor: commentSavedColor, deleteNote: deleteNote, isDragging: isDragging, compactView: compactView }), Object(core_browser_esm["d" /* jsx */ ])(Flex["a" /* default */ ], null, todo ? Object(core_browser_esm["d" /* jsx */ ])(todoCheck, { isDone: isDone, commentColor: commentColor, toggleDone: toggleDone, compactView: compactView }) : '', Object(core_browser_esm["d" /* jsx */ ])(PseudoBox["a" /* default */ ], {
                    cursor: "grab",
                    bg: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].bg : commentBgColor[colorMode],
                    display: "flex",
                    flexDirection: "column",
                    wordBreak: "break-all",
                    mx: "12px",
                    w: "100%",
                    my: "4px",
                    rounded: "6px",
                    _grouphover: editModeActive ? '' : { //transform: 'translateY(-1px)',
                        boxShadow: hoverShadow[colorMode]
                    },
                    transition: isDragging ? '' : 'transform 0.18s cubic-bezier(.374,.019,.035,1.861)'
                }, editedBy ? Object(core_browser_esm["d" /* jsx */ ])(Tooltip["a" /* default */ ], { label: Object(core_browser_esm["d" /* jsx */ ])(Box["a" /* default */ ], { p: "2px" }, Object(core_browser_esm["d" /* jsx */ ])(Text["a" /* default */ ], { fontWeight: "500", fontSize: "13px", w: "100%", textAlign: "center" }, isEdited, ": ", editedBy), Object(core_browser_esm["d" /* jsx */ ])(Text["a" /* default */ ], { fontWeight: "500", fontSize: "11px", w: "100%", textAlign: "center", opacity: "0.8", mt: "-2px" }, dateCreated.substring(15, 21), ",", ' ', dateCreated.substring(0, 15))), zIndex: "100000", rounded: "4px" }, Object(core_browser_esm["d" /* jsx */ ])(Box["a" /* default */ ], { width: "100%", bg: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].bg : type === 'textCopied' ? commentCopiedTextBgColor[colorMode] : commentBgColor[colorMode], rounded: "6px", minHeight: compactView ? '30px' : '36px', display: "flex", onMouseEnter: hoverNoteOn, onMouseOver: hoverNoteOn, onMouseLeave: hoverNoteOff }, Object(core_browser_esm["d" /* jsx */ ])("textarea", {
                    value: value,
                    ref: inputRef,
                    rows: textAreaRows,
                    onKeyDown: function onKeyDown(e) { return handleKeyPress(e); },
                    onPaste: function onPaste(e) { return handleOnPaste(e); },
                    spellCheck: "false" //defaultValue={value}
                        ,
                    onInput: function onInput(e) { return valueInput(e); } //onkeyup={(e) => keyUpValue(e)}
                        ,
                    onClick: function onClick(e) { return e.stopPropagation(); },
                    onFocus: function onFocus() { focusNote(); },
                    onBlur: function onBlur() {
                        _setOpen(false);
                        close();
                    },
                    autoFocus: justAdded ? true : false,
                    className: colorMode === 'dark' ? hoverNote ? 'groupScrollAreaDarkHover' : 'groupScrollAreaDark' : hoverNote ? 'groupScrollAreaHover' : 'groupScrollArea',
                    css: { //transition: "0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
                        opacity: isDone ? '0.5' : '1',
                        filter: colorMode === 'light' ? 'none' : 'brightness(.8) contrast(1.2)',
                        textDecoration: isDone ? 'line-through' : 'initial',
                        paddingTop: '6px',
                        borderRadius: '6px',
                        paddingBottom: '8px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        width: '100%',
                        maxHeight: '604px',
                        wordBreak: 'break-word',
                        fontStyle: type === 'textCopied' ? 'italic' : 'normal',
                        fontSize: compactView ? '12px' : '14px',
                        fontWeight: '500',
                        whiteSpace: 'pre-line',
                        resize: 'none',
                        color: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].text : textComment[colorMode],
                        backgroundColor: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].bg : 'transparent',
                        '&:focus': { transition: '0.28s', outline: 'none', boxShadow: focusBoxShadow, backgroundColor: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].focus : 'transparent' }
                    }
                }))) : Object(core_browser_esm["d" /* jsx */ ])(Box["a" /* default */ ], { width: "100%", bg: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].bg : type === 'textCopied' ? commentCopiedTextBgColor[colorMode] : commentBgColor[colorMode], rounded: "6px", minHeight: compactView ? '30px' : '36px', display: "flex", onMouseEnter: hoverNoteOn, onMouseOver: hoverNoteOn, onMouseLeave: hoverNoteOff }, Object(core_browser_esm["d" /* jsx */ ])("textarea", {
                    value: value,
                    ref: inputRef,
                    rows: textAreaRows,
                    onKeyDown: function onKeyDown(e) { return handleKeyPress(e); },
                    spellCheck: "false" //defaultValue={value}
                        ,
                    onInput: function onInput(e) { return valueInput(e); } //onkeyup={(e) => keyUpValue(e)}
                        ,
                    onClick: function onClick(e) { return e.stopPropagation(); },
                    onFocus: function onFocus() { focusNote(); },
                    onBlur: function onBlur() {
                        _setOpen(false);
                        close();
                    },
                    autoFocus: justAdded ? true : false,
                    className: colorMode === 'dark' ? hoverNote ? 'groupScrollAreaDarkHover' : 'groupScrollAreaDark' : hoverNote ? 'groupScrollAreaHover' : 'groupScrollArea',
                    css: { //transition: "0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)",
                        opacity: isDone ? '0.5' : '1',
                        filter: colorMode === 'light' ? 'none' : 'brightness(.8) contrast(1.2)',
                        textDecoration: isDone ? 'line-through' : 'initial',
                        paddingTop: '6px',
                        borderRadius: '6px',
                        paddingBottom: '8px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        width: '100%',
                        maxHeight: '604px',
                        wordBreak: 'break-word',
                        fontStyle: type === 'textCopied' ? 'italic' : 'normal',
                        fontSize: compactView ? '12px' : '14px',
                        fontWeight: '500',
                        whiteSpace: 'pre-line',
                        resize: 'none',
                        color: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].text : textComment[colorMode],
                        backgroundColor: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].bg : 'transparent',
                        '&:focus': { transition: '0.28s', outline: 'none', boxShadow: focusBoxShadow, backgroundColor: commentColor !== false && commentColor || commentColor === 0 ? commentBg["a" /* default */ ][commentColor].focus : 'transparent' }
                    }
                }))))), (editModeActive || hoverTools || showPicker || showColorPicker) && !isDragging && !isDraggingSpace && !dragIsActiveSomewhere ? Object(core_browser_esm["d" /* jsx */ ])(textToolbar, { getCursorPos: getCursorPos, noteClosed: noteClosed, onCopy: onCopy, setIsDeleted: setIsDeleted, showPicker: showPicker, setShowPicker: setShowPicker, showColorPicker: showColorPicker, setShowColorPicker: setShowColorPicker, editModeActive: editModeActive, setHoverTools: setHoverTools, todo: todo, setTodo: setTodo, setIsDone: setIsDone, setDoneStatus: setDoneStatus, spaceId: spaceId, tabId: tabId, setInputFocus: setInputFocus, commentColor: commentColor, setCommentColor: setCommentColor, deleteNote: deleteNote, setOpen: function setOpen() { return _setOpen(false); }, addEmoji: addEmoji, hoverListOff: hoverListOff, modalMode: modalMode }) : '');
            }; /* harmony default export */
            var spaceNoteInline = (Object(react["memo"])(spaceNoteInline_SpaceNoteInline));
            // EXTERNAL MODULE: ./node_modules/memoize-one/dist/memoize-one.esm.js
            var memoize_one_esm = __webpack_require__(26);

            // CONCATENATED MODULE: ./src/Components/selectionCount.js
            var selectionCount_SelectionCount = function SelectionCount(_ref) {
                var count = _ref.count;
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: "#FFF", dark: "#1e2123" };
                var text = { light: "gray.700", dark: "#FFFFFF" };
                return react_default.a.createElement(PseudoBox["a" /* default */ ], { position: "absolute", right: "-8px", top: "-12px", boxShadow: "0px 0px 0px 2px #44E18C, 0 0px 3px 2px #00E58380", h: "28px", w: "28px", display: "flex", alignItems: "center", rounded: "5px", bg: color[colorMode], zIndex: "10004" }, react_default.a.createElement(Text["a" /* default */ ], { m: "auto", color: text[colorMode], fontSize: "15px", fontWeight: "600" }, count));
            }; /* harmony default export */
            var selectionCount = (selectionCount_SelectionCount);
            // EXTERNAL MODULE: ./node_modules/@chakra-ui/portal/dist/esm/portal.js
            var portal = __webpack_require__(228);

            // CONCATENATED MODULE: ./src/Components/combinedTabs.js
            /* global chrome */ //import useThumbnail from "../stores/thumbnailStore";
            //const fetchUriZu = (state) => state.fetchUri;
            var combinedTabs_submitSiteDetailsZu = function submitSiteDetailsZu(state) { return state.submitSiteDetails; };
            var combinedTabs_moveTabToSpaceZu = function moveTabToSpaceZu(state) { return state.moveTabToSpace; };
            var combinedTabs_setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
            var combinedTabs_openNewTabStateZu = function openNewTabStateZu(state) { return state.openNewTabState; };
            var combinedTabs_jumpNewTabStateZu = function jumpNewTabStateZu(state) { return state.jumpNewTabState; };
            var dropSiteFromStackedZu = function dropSiteFromStackedZu(state) { return state.dropSiteFromStacked; };
            var reOrderStackedSitesZu = function reOrderStackedSitesZu(state) { return state.reOrderStackedSites; }; // const selectedItemsZu = (state) => state.selectedItems;
            // const setSelectedItemsZu = (state) => state.setSelectedItems;
            var combinedTabs_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var submitStackTitleZu = function submitStackTitleZu(state) { return state.submitStackTitle; };
            var combinedTabs_SiteFavIcon = function SiteFavIcon(_ref) {
                var url = _ref.url,
                    title = _ref.title,
                    dateCreated = _ref.dateCreated,
                    favIcon = _ref.favIcon,
                    openNewTabState = _ref.openNewTabState,
                    jumpNewTabState = _ref.jumpNewTabState;
                var _useState = Object(react["useState"])(title),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    tabTitle = _useState2[0],
                    setTabTitle = _useState2[1];
                var _useState3 = Object(react["useState"])(url),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    tabUrl = _useState4[0],
                    setTabUrl = _useState4[1]; //Styling
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode;
                var favIconBg = { light: '#FFF', dark: 'transparent' };
                var outerShadow = { light: '0 1px 6px -1px rgba(78,80,81,0.30)', dark: '' };
                var hoverShadow = { light: '0 3px 12px -3px rgba(78,80,81,0.50)', dark: '0 3px 10px -3px rgba(0,0,0,0.90), 0 2px 3px 1px rgba(0,0,0,0.80)' };
                var isGitHub = url.startsWith('https://github');
                var gitHubFavIcon = colorMode === 'light' ? 'https://github.githubassets.com/favicons/favicon.svg' : 'https://github.githubassets.com/favicons/favicon-dark.svg'; // Fallback image stuff
                var onLoadSuccess = function onLoadSuccess(e) { if (e.target.naturalHeight + e.target.naturalWidth === 0) { setFallbackActive(true); } };
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    fallbackActive = _useState6[0],
                    setFallbackActive = _useState6[1];
                var _useState7 = Object(react["useState"])(false),
                    _useState8 = Object(slicedToArray["a" /* default */ ])(_useState7, 2),
                    loading = _useState8[0],
                    setLoadingState = _useState8[1];
                var fallbackSrc = colorMode === 'light' ? fallBackSvg_default.a : fallBackSvgDark_default.a;
                var favIconSrc = favIcon ? isGitHub ? gitHubFavIcon : favIcon : fallbackSrc;
                var localIcon = favIcon === 'localIcon' ? Object(localIconProvider["a" /* LocalIconProvider */ ])(title) : false; //Thumbnail stuff
                /*   const [uri, setUri] = useState(null);

                  const getThumbnailUri = async () => {
                    let base = new URL(url);
                    let key = base.host;
                    const data = await fetchUri(key);
                    let thumbnailUri = data[key];
                    setUri(thumbnailUri);
                  }; */
                var openLink = function openLink(e) {
                    e.stopPropagation();
                    if (e.metaKey || e.ctrlKey || e.which === 2 || e.button === 4) { chrome.tabs.create({ active: false, url: tabUrl }, function() { setLoadingState(false); }); return; } else if (openNewTabState) { chrome.tabs.create({ active: jumpNewTabState, url: tabUrl }, function() { setLoadingState(false); }); return; } else {
                        chrome.tabs.update({ url: tabUrl });
                        setLoadingState(true);
                    }
                };
                return react_default.a.createElement(Tooltip["a" /* default */ ], {
                    placement: "bottom" //onOpen={() => getThumbnailUri()}
                        ,
                    zIndex: "500000",
                    rounded: "6px",
                    px: "12px",
                    py: "6px",
                    showDelay: "200",
                    label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ], null, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "md", fontWeight: "bold", letterSpacing: "0.64px" }, tabTitle), react_default.a.createElement(Text["a" /* default */ ], {
                        fontSize: "12px",
                        opacity: "0.8",
                        mt: "2px",
                        wordBreak: "break-all" //isTruncated
                    }, tabUrl), dateCreated && react_default.a.createElement(Text["a" /* default */ ], {
                        fontSize: "11px",
                        opacity: "0.6",
                        mt: "2px",
                        wordBreak: "break-all" //isTruncated
                    }, "Saved ", dateCreated.substring(15, 21), ",", ' ', dateCreated.substring(0, 15))))
                }, react_default.a.createElement(PseudoBox["a" /* default */ ], { cursor: "pointer", display: "flex", alignItems: "center", rounded: "8px", minWidth: "32px", minHeight: "32px", bg: favIconBg[colorMode], boxShadow: outerShadow[colorMode], transform: "scale(1)", _hover: { boxShadow: hoverShadow[colorMode], transform: 'scale(1.075)' }, _active: { boxShadow: outerShadow[colorMode], transform: 'scale(0.975)' }, mr: "4px", ml: "12px", my: "6px", transition: loading ? '0.4s cubic-bezier(0.2,-0.3,0.72,1.47)' : '0.16s cubic-bezier(0.22,0.61,0.36,1)', position: "relative", onClick: function onClick(e) { return openLink(e); } }, react_default.a.createElement(Box["a" /* default */ ], { maxHeight: "24px", maxWidth: "24px", m: "auto" }, react_default.a.createElement("img", { src: fallbackActive ? fallbackSrc : localIcon ? localIcon : favIconSrc, alt: "Fav icon", height: "24px", width: "24px", onError: function onError() { return setFallbackActive(true); }, onLoad: function onLoad(e) { return onLoadSuccess(e); }, style: { margin: 'auto', borderRadius: '2px', fontSize: '8px', textAlign: 'center', fontWeight: '500', maxWidth: '24px', maxHeight: '24px' } })), loading ? react_default.a.createElement(Flex["a" /* default */ ], { position: "absolute", h: "100%", w: "100%" }, react_default.a.createElement(CircularProgress["a" /* default */ ], { transform: loading ? 'scale(1)' : 'scale(3)', opacity: loading ? '1' : '0', transition: "0.4s 0.5 linear", m: "auto", fontSize: "28px", isIndeterminate: true, color: "blue" })) : ''));
            };
            var combinedTabs_CombinedTabs = function CombinedTabs(_ref2) {
                var currentTitle = _ref2.currentTitle,
                    favIcon = _ref2.favIcon,
                    url = _ref2.url,
                    stackId = _ref2.stackId,
                    spaceId = _ref2.spaceId,
                    isDragging = _ref2.isDragging,
                    deleteNote = _ref2.deleteNote,
                    combineTargetFor = _ref2.combineTargetFor,
                    isSelected = _ref2.isSelected,
                    dateCreated = _ref2.dateCreated,
                    sitesInside = _ref2.sitesInside,
                    provided = _ref2.provided; //zuState
                var submitSiteDetails = Object(store["a" /* default */ ])(combinedTabs_submitSiteDetailsZu);
                var moveTabToSpace = Object(store["a" /* default */ ])(combinedTabs_moveTabToSpaceZu);
                var setCategory = Object(store["a" /* default */ ])(combinedTabs_setCategoryZu);
                var dropSiteFromStacked = Object(store["a" /* default */ ])(dropSiteFromStackedZu);
                var reOrderStackedSites = Object(store["a" /* default */ ])(reOrderStackedSitesZu);
                var openNewTabState = Object(persistStore["a" /* default */ ])(combinedTabs_openNewTabStateZu);
                var jumpNewTabState = Object(persistStore["a" /* default */ ])(combinedTabs_jumpNewTabStateZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(combinedTabs_unselectAllZu); //const selectedItems = useStore(selectedItemsZu);
                //const setSelectedItems = useStore(setSelectedItemsZu);
                //const fetchUri = useThumbnail(fetchUriZu);
                var _useState9 = Object(react["useState"])(false),
                    _useState10 = Object(slicedToArray["a" /* default */ ])(_useState9, 2),
                    showList = _useState10[0],
                    setShowList = _useState10[1];
                var _useState11 = Object(react["useState"])(false),
                    _useState12 = Object(slicedToArray["a" /* default */ ])(_useState11, 2),
                    editableFocused = _useState12[0],
                    setEditableFocused = _useState12[1];
                var closeSiteModal = function closeSiteModal() { setShowList(false); };
                /* const moveToSpace = (toSpace, fromSpace, title, toCategory) => {
                        moveTabToSpace(toSpace, spaceId, tabId);
                        toCategory !== undefined ? setCategory(toCategory) : setCategory(0);
                    };


                    const saveAndClose = (currentTitle, currentUrl) => {
                        submitSiteDetails(spaceId, tabId, currentTitle, currentUrl);
                        setTabTitle(currentTitle);
                        setTabUrl(currentUrl);
                        closeSiteModal();
                    }; */ //Styling
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var _useState13 = Object(react["useState"])(false),
                    _useState14 = Object(slicedToArray["a" /* default */ ])(_useState13, 2),
                    commentColor = _useState14[0],
                    setCommentColor = _useState14[1];
                var color = { light: '#FFF', dark: '#1e2123' };
                var urlText = { light: 'gray.400', dark: '#A1A2A4' };
                var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                var iconBG = { light: 'transparent', dark: '#32363A' };
                var weight = { light: '500', dark: '600' };
                var text = { light: '#1A202C', dark: '#FFF' };
                var hoverShadow = { light: '0 3px 10px -3px rgba(152,169,185,0.80)', dark: '0 3px 10px -3px rgba(0,0,0,0.90)' };
                var draggingShadow = { light: '0px 0px 0px 2px #44E18C, 0 6px 18px -2px rgba(152,169,185,0.60)', dark: '0px 0px 0px 2px #44E18C, 0 6px 18px -1px rgba(0,0,0,0.70)' };
                var combineShadow = { light: '0px 0px 0px 2px #44E18C', dark: '0px 0px 0px 2px #44E18C' };
                var dropzoneBg = { light: 'rgb(65, 225, 139, 0.25)', dark: 'rgb(65, 225, 139, 0.25)' };
                var outsideDrop = { light: 'red.300', dark: 'red.400' };
                var _useBoolean = useBoolean_useBoolean(false),
                    hoverList = _useBoolean.value,
                    hoverListOn = _useBoolean.on,
                    hoverListOff = _useBoolean.off; //let sitesInside = tabData.filter((tab) => tab.isCombined === combinedId);
                var _useState15 = Object(react["useState"])(false),
                    _useState16 = Object(slicedToArray["a" /* default */ ])(_useState15, 2),
                    isDraggingTab = _useState16[0],
                    setIsDraggingTab = _useState16[1];
                var onBeforeDragStart = function onBeforeDragStart() { setIsDraggingTab(true); };
                var onDragEnd = function onDragEnd(res) {
                    setIsDraggingTab(false);
                    if (!res.destination) { if (sitesInside.length === 2) { dropSiteFromStacked(sitesInside, res.draggableId, stackId, spaceId, true); } else { dropSiteFromStacked(sitesInside, res.draggableId, stackId, spaceId, false); } } else {
                        var fromIndex = res.source.index;
                        var toIndex = res.destination.index;
                        var payload = sitesInside[fromIndex];
                        reOrderStackedSites(fromIndex, toIndex, spaceId, stackId, payload);
                    }
                };
                var combinedRef = Object(react["useRef"])(null); //let recInfo = combinedRef.getBoundingClientRect();
                var _useState17 = Object(react["useState"])(),
                    _useState18 = Object(slicedToArray["a" /* default */ ])(_useState17, 2),
                    posObj = _useState18[0],
                    setPosObj = _useState18[1];
                /* useEffect(() => {
                        if (showList === true) {
                            let source = combinedRef.current.getBoundingClientRect();
                            let newPosObj = {
                                top: source.top,
                                left: source.left,
                                w: source.width
                            };
                            setPosObj(newPosObj);
                        }
                    }, [showList]); */
                var showListFunc = function showListFunc(e) {
                    e.stopPropagation();
                    unselectAll();
                    /* let source = combinedRef.current.getBoundingClientRect();
                            let newPosObj = {
                                top: source.top,
                                left: source.left - 6,
                                w: source.width
                            };
                            setPosObj(newPosObj); */
                    setShowList(function(prevVal) { return !prevVal; });
                };
                var stackedLength = sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.length; //Editable text stuff
                var _useState19 = Object(react["useState"])(currentTitle),
                    _useState20 = Object(slicedToArray["a" /* default */ ])(_useState19, 2),
                    title = _useState20[0],
                    setTitle = _useState20[1];
                Object(react["useEffect"])(function() { if (currentTitle && !(currentTitle.trim().length === 0)) { setTitle(currentTitle); } else { setTitle((sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.length) + ' STACKED SITES'); } }, [currentTitle, stackedLength]);
                var handleChange = function handleChange(event) {
                    var name = event.target.value.slice(0, 24);
                    setTitle(name);
                };
                Object(react["useEffect"])(function() { if (editableFocused) { unselectAll(); } else return; }, [editableFocused]);
                var handleOnClick = function handleOnClick(e) { if (editableFocused) { e.stopPropagation(); } else return; };
                var submitMiddleware = function submitMiddleware() {
                    var newTitle = title;
                    setTitle(newTitle);
                    submitStackTitle(newTitle, stackId, spaceId);
                };
                var submitStackTitle = Object(store["a" /* default */ ])(submitStackTitleZu);
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    onClick: function onClick(e) { return handleOnClick(e); } //ref={combinedRef}
                        ,
                    userSelect: "none" //bg={color[colorMode]}
                        ,
                    bg: isDragging ? color[colorMode] : 'transparent',
                    borderRadius: "9px",
                    zIndex: "87" //py={showList ? '2px' : '0px'}
                        ,
                    display: "flex",
                    flexDirection: "column",
                    mx: "6px",
                    _active: { cursor: 'grabbing' },
                    boxShadow: isSelected ? '0px 0px 0px 1px #44E18C, 0 0px 3px 2px #00E58380' : isDragging ? draggingShadow[colorMode] : false || combineTargetFor ? combineShadow[colorMode] : showList ? hoverShadow[colorMode] : '' //style={{ willChange: 'transform' }}
                        ,
                    _hover: isSelected ? '' : combineTargetFor ? combineShadow[colorMode] : isDragging ? '' : { //transform: loading ? '' : 'translateY(-1px)',
                        // TODO boxShadow: loading ? '' : hoverShadow[colorMode],
                        boxShadow: hoverShadow[colorMode],
                        cursor: 'grab',
                        zIndex: '300',
                        bg: color[colorMode]
                    },
                    transition: "0.18s cubic-bezier(0.22,0.61,0.36,1)" //role="group"
                        ,
                    onMouseEnter: hoverListOn,
                    onMouseOver: hoverListOn,
                    onMouseLeave: hoverListOff //w={posObj?.w}
                }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", position: "relative", flexDir: "column" }, showList ? react_default.a.createElement(Flex["a" /* default */ ], {
                    flexDir: "column",
                    w: "100%",
                    pb: "10px" //bg="green.200"
                        //{...provided.dragHandleProps}
                        ,
                    pos: "relative"
                }, react_default.a.createElement(Box["a" /* default */ ], Object.assign({ zIndex: "1", position: "absolute", h: "32px", w: "100%", top: "0", left: "0" }, provided.dragHandleProps, { outline: "none" })), react_default.a.createElement(Flex["a" /* default */ ], { h: "32px", pl: "12px", mt: "10px", zIndex: "2", pointerEvents: "none" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "folderIcon", color: "gray.400", mt: "10px", mr: "20px", ml: "6px", fontSize: "20px" }), react_default.a.createElement(Tooltip["a" /* default */ ], {
                    rounded: "4px",
                    label: "Edit title" //zIndex="10000000000"
                }, react_default.a.createElement(Editable["c" /* default */ ], {
                    pointerEvents: "auto",
                    onEdit: function onEdit() { return setEditableFocused(true); },
                    onBlur: function onBlur() { return setEditableFocused(false); }
                        /* onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    e.preventDefault();
                                                                }} */ //onClick={(e) => e.stopPropagation()}
                        /* defaultValue={
                                                                    sitesInside?.length +
                                                                    ' STACKED SITES'
                                                                } */
                        ,
                    placeholder: (sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.length) + ' STACKED SITES',
                    value: title ? title : (sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.length) + ' STACKED SITES',
                    onSubmit: function onSubmit() { return submitMiddleware(); },
                    maxW: "60%" //minW="60%"
                        ,
                    whiteSpace: "nowrap",
                    mt: "12px",
                    ml: "12x",
                    fontSize: "12px",
                    color: "gray.400",
                    fontWeight: "600",
                    letterSpacing: "0.12px"
                }, react_default.a.createElement(Editable["b" /* EditablePreview */ ], { letterSpacing: "0.12px", fontSize: "12px" }), react_default.a.createElement(Editable["a" /* EditableInput */ ], { minW: "100%", value: title, onChange: handleChange })))), react_default.a.createElement(react_beautiful_dnd_esm["a" /* DragDropContext */ ], { onDragEnd: onDragEnd, onBeforeDragStart: onBeforeDragStart }, react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { droppableId: "droppable" }, function(provided, snapshot) {
                    return react_default.a.createElement(PseudoBox["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, { bg: snapshot.isDraggingOver ? dropzoneBg[colorMode] : isDraggingTab ? outsideDrop[colorMode] : 'transparent', mx: "8px", rounded: "8px", outline: "none", mt: "12px" }), !snapshot.isDraggingOver && isDraggingTab && react_default.a.createElement(portal["a" /* Portal */ ], null, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], {
                        style: { backdropFilter: 'blur(2px)' },
                        zIndex: "50000000" //bg="transparent"
                    }), react_default.a.createElement(Box["a" /* default */ ], { zIndex: "50000001", display: "flex", pos: "fixed", h: "100%", w: "100%", top: "0", left: "0", alignItems: "center" }, react_default.a.createElement(Flex["a" /* default */ ], { bg: color[colorMode], padding: "12px", pr: "16px", rounded: "6px", m: "auto", boxShadow: "0 6px 36px -8px rgba(0,0,0,0.50)" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "minusCircle", mr: "8px", color: "gray.300", my: "auto", fontSize: "20px" }), react_default.a.createElement(Text["a" /* default */ ], { m: "auto", fontSize: "16px", color: text[colorMode] }, "Drop to remove", ' ', react_default.a.createElement("b", null, "1"), ' ', "item from stack")))), sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.map(function(site, index) { return react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], { key: site.id, draggableId: site.id.toString(), index: index, style: { overflow: 'visible', outline: 'none' } }, function(provided, snapshot) { return react_default.a.createElement(PseudoBox["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, provided.dragHandleProps, { outline: "none", role: "group", _active: { cursor: 'grabbing' }, py: "2px", userSelect: "none", position: "relative", overflow: "hidden", w: "100%", rounded: snapshot.isDragging ? '8px' : '0px', bg: isDraggingTab ? color[colorMode] : '', boxShadow: snapshot.isDragging ? draggingShadow[colorMode] : '', pb: "12px" }), react_default.a.createElement(Components_tab, { title: site.title, favIcon: site.favIcon, url: site.url, spaceId: spaceId, isDragging: isDragging, deleteNote: deleteNote, compactView: false, isCombined: true, tabId: stackId, isStacked: site.id })); }); }), provided.placeholder);
                }))) : react_default.a.createElement(react_default.a.Fragment, null, title && react_default.a.createElement(Box["a" /* default */ ], Object.assign({ height: "36px", width: "100%" }, provided.dragHandleProps), react_default.a.createElement(Text["a" /* default */ ], { my: "auto", mr: "auto", whiteSpace: "nowrap", mt: "20px", ml: "12px", fontSize: "12px", color: "gray.400", fontWeight: "600", letterSpacing: "0.12px" }, title)), react_default.a.createElement(Flex["a" /* default */ ], Object.assign({
                    maxW: "88%",
                    flexWrap: "wrap",
                    w: "88%",
                    mr: "auto" //bg="blue.500"
                }, provided.dragHandleProps, { py: "10px", outline: "none" }), sitesInside === null || sitesInside === void 0 ? void 0 : sitesInside.map(function(site) { return react_default.a.createElement(combinedTabs_SiteFavIcon, { key: site.id, title: site.title, url: site.url, dateCreated: site.dateCreated, favIcon: site.favIcon, openNewTabState: openNewTabState, jumpNewTabState: jumpNewTabState }); }))), react_default.a.createElement(Flex["a" /* default */ ], {
                    pointerEvents: "auto",
                    zIndex: "3",
                    position: "absolute",
                    right: "0px" //top={showList ? '18px' : '20px'}
                        ,
                    top: "18px"
                }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    ml: "4px",
                    mr: "12px",
                    opacity: hoverList && !isDragging ? '1' : '0',
                    transition: "0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                    transform: hoverList && !isDragging ? 'scale(1)' : 'scale(0)'
                    /* _groupHover={{
                                                    transform: isDragging ? '' : 'scale(1)',
                                                    opacity: isDragging ? '' : '1'
                                                }} */
                }, react_default.a.createElement(Tooltip["a" /* default */ ], {
                    label: showList ? 'Collapse' : 'Expand' //showDelay="300"
                        ,
                    zIndex: "500000"
                }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: showList ? 'chevronUp' : 'chevronDown'
                        /* transform={
                                                                showList ? 'rotateZ(180deg)' : ''
                                                            } */ //onClick={() => deleteNote(spaceId, tabId, "Text-snippet")}
                        ,
                    onClick: function onClick(e) { showListFunc(e); },
                    _active: { transform: 'scale(0.84)' },
                    _focus: { boxShadow: '' },
                    outline: "none",
                    color: iconDarkerColor[colorMode],
                    minWidth: "28px",
                    height: "28px",
                    bg: iconBG[colorMode],
                    returnFocusOnClose: false
                })))))));
            }; /* harmony default export */
            var combinedTabs = (Object(react["memo"])(combinedTabs_CombinedTabs));
            // CONCATENATED MODULE: ./src/Components/sitesNotesList.js
            /* global chrome */
            var sitesNotesList_tabsZu = function tabsZu(state) { return state.tabs; };
            var sitesNotesList_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var sitesNotesList_addNoteZu = function addNoteZu(state) { return state.addNote; };
            var sitesNotesList_isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var deleteOrCloseZu = function deleteOrCloseZu(state) { return state.deleteOrClose; };
            var setDeletedDataZu = function setDeletedDataZu(state) { return state.setDeletedData; }; //DndStore
            var toggleSelectionZu = function toggleSelectionZu(state) { return state.toggleSelection; };
            var toggleSelectionInGroupZu = function toggleSelectionInGroupZu(state) { return state.toggleSelectionInGroup; };
            var selectedItemsZu = function selectedItemsZu(state) { return state.selectedItems; };
            var draggingItemIdZu = function draggingItemIdZu(state) { return state.draggingItemId; };
            var multiSelectToZu = function multiSelectToZu(state) { return state.multiSelectTo; };
            var activeTabSelectionZu = function activeTabSelectionZu(state) { return state.activeTabSelection; };
            var setKeepSelectionZu = function setKeepSelectionZu(state) { return state.setKeepSelection; };
            var sitesNotesList_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var sitesNotesList_SitesNotesList = function SitesNotesList(_ref) {
                var item = _ref.item,
                    id = _ref.id,
                    editableFocus = _ref.editableFocus,
                    isDraggingLocal = _ref.isDraggingLocal,
                    hoverList = _ref.hoverList,
                    hoverListOff = _ref.hoverListOff,
                    modalMode = _ref.modalMode,
                    compactView = _ref.compactView;
                var tabs = Object(store["a" /* default */ ])(sitesNotesList_tabsZu);
                var setTabs = Object(store["a" /* default */ ])(sitesNotesList_setTabsZu);
                var addNote = Object(store["a" /* default */ ])(sitesNotesList_addNoteZu);
                var dragIsActiveSomewhere = Object(dndStore["a" /* default */ ])(sitesNotesList_isDraggingZu);
                var setDeletedData = Object(store["a" /* default */ ])(setDeletedDataZu); //Dndstore
                var toggleSelection = Object(dndStore["a" /* default */ ])(toggleSelectionZu);
                var toggleSelectionInGroup = Object(dndStore["a" /* default */ ])(toggleSelectionInGroupZu);
                var selectedItems = Object(dndStore["a" /* default */ ])(selectedItemsZu);
                var draggingItemId = Object(dndStore["a" /* default */ ])(draggingItemIdZu);
                var multiSelectTo = Object(dndStore["a" /* default */ ])(multiSelectToZu);
                var activeTabSelection = Object(dndStore["a" /* default */ ])(activeTabSelectionZu);
                var setKeepSelection = Object(dndStore["a" /* default */ ])(setKeepSelectionZu);
                var deleteOrClose = Object(store["a" /* default */ ])(deleteOrCloseZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(sitesNotesList_unselectAllZu);
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    noteStatus = _useState2[0],
                    setNoteStatus = _useState2[1]; //MultiDrag stuff
                var keyCodes = { enter: 13, escape: 27, arrowDown: 40, arrowUp: 38, tab: 9 };
                var _onKeyDown = function onKeyDown(event, provided, snapshot, itemId) {
                    /* if (provided.dragHandleProps) {
                          provided.dragHandleProps.onKeyDown(event);
                        } */
                    if (noteStatus === true) { return; }
                    if (event.keyCode === 8 || event.keyCode === 46) {
                        if (selectedItems.length > 0) { deleteOrClose(activeTabSelection, selectedItems); } setKeepSelection(false);
                        unselectAll();
                    }
                    if (event.defaultPrevented) { return; }
                    if (snapshot.isDragging) { return; }
                    if (event.keyCode !== keyCodes.enter) { return; } // we are using the event for selection
                    event.preventDefault();
                    performAction(event, itemId);
                };
                var _onClick = function onClick(event, itemId) {
                    if (noteStatus === true) { return; }
                    if (event.defaultPrevented) { return; }
                    if (event.button !== 0) { return; } // marking the event as used
                    event.preventDefault();
                    performAction(event, itemId);
                }; // Determines if the platform specific toggle selection in group key was used
                /* const wasToggleInSelectionGroupKeyUsed = (event) => {
                    console.log("navigator.userAgentData: ", navigator.userAgentData);
                    const isUsingWindows =
                      navigator.userAgentData?.platform.indexOf("Win") >= 0;
                    return isUsingWindows ? event.ctrlKey : event.metaKey;
                  }; */ // Determines if the multiSelect key was used
                var wasMultiSelectKeyUsed = function wasMultiSelectKeyUsed(event) { return event.shiftKey; };
                var performAction = function performAction(event, itemId) { if (event.ctrlKey || event.metaKey) { toggleSelectionInGroup(itemId, false); return; } if (wasMultiSelectKeyUsed(event)) { multiSelectTo(tabs, itemId, id, false); return; } toggleSelection(itemId, false); };
                var getSelectedMap = Object(memoize_one_esm["a" /* default */ ])(function(items) { return items.reduce(function(previous, current) { previous[current] = true; return previous; }, {}); }); //Darkmode
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var commentBgColor = { light: 'gray.100', dark: '#35393c' }; //framer motion stuff
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]);
                var toast = Object(Toast["a" /* default */ ])();
                var restoreTabsAfterDeleted = function restoreTabsAfterDeleted(spaceIndex, tabsToRe, restoreStack, tabIndex, tabId) {
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs); //var spaceIndex = newData.findIndex(target => target.id === spaceId)
                    newData[spaceIndex].tabs = tabsToRe;
                    if (restoreStack) { newData[spaceIndex].tabs[tabIndex].stackedItems = restoreStack; } setTabs(newData, 'deleteUpdate');
                    chrome.runtime.sendMessage({ msg: 'deleteDeletedItemsDataById', idsToDelete: [tabId] });
                };
                var turnNoteIntoSite = function turnNoteIntoSite(pastedData, prevValue, spaceId, tabId) {
                    setNoteStatus(false);
                    var spaceIndex = tabs.findIndex(function(target) { return target.id === spaceId; });
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var tabIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === tabId; });
                    newData[spaceIndex].tabs[tabIndex].url = pastedData;
                    newData[spaceIndex].tabs[tabIndex].title = 'No title';
                    newData[spaceIndex].tabs[tabIndex].favIcon = 'chrome://favicon/size/16@3x/' + pastedData;
                    newData[spaceIndex].tabs[tabIndex].note = prevValue.length > 0 ? prevValue : false;
                    newData[spaceIndex].tabs[tabIndex].comment = prevValue.length > 0 ? prevValue : '';
                    setTabs(newData, 'deleteUpdate');
                };
                var deleteNote = function deleteNote(spaceId, tabId, item, isStacked) {
                    setNoteStatus(false);
                    var spaceIndex = tabs.findIndex(function(target) { return target.id === spaceId; });
                    var restoreTabs = tabs[spaceIndex].tabs;
                    var restoreStack;
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var tabIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === tabId; });
                    var deletedItemData;
                    if (isStacked) {
                        var length = newData[spaceIndex].tabs[tabIndex].stackedItems.length;
                        if (length > 1) {
                            restoreStack = newData[spaceIndex].tabs[tabIndex].stackedItems;
                            var deleted = newData[spaceIndex].tabs[tabIndex].stackedItems.filter(function(item) { return item.id !== isStacked; });
                            deletedItemData = newData[spaceIndex].tabs[tabIndex].stackedItems.filter(function(item) { return item.id === isStacked; })[0];
                            newData[spaceIndex].tabs[tabIndex].stackedItems = deleted;
                        } else {
                            var _deleted = newData[spaceIndex].tabs.filter(function(item) { return item.id !== tabId; });
                            deletedItemData = newData[spaceIndex].tabs[tabIndex].stackedItems[0];
                            newData[spaceIndex].tabs = _deleted;
                        }
                    } else {
                        var _deleted2 = newData[spaceIndex].tabs.filter(function(item) { return item.id !== tabId; });
                        deletedItemData = newData[spaceIndex].tabs[tabIndex];
                        newData[spaceIndex].tabs = _deleted2;
                    }
                    setTabs(newData, 'deleteUpdate');
                    var deletedOrDiscarded = 'deleted';
                    if (deletedItemData.title === 'Note' && deletedItemData.comment === '') { deletedOrDiscarded = 'discarded'; } else { setDeletedData([deletedItemData], 'item'); } //let title = item + ' deleted';
                    var resClick = function resClick() { //let restoreOjb = isStacked ? restoreStack : restoreTabs;
                        restoreTabsAfterDeleted(spaceIndex, restoreTabs, restoreStack, tabIndex, tabId);
                    }; //setShowToast(title, "", "restore");
                    toast({ position: 'bottom-right', status: 'success', duration: 5000, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, resClick: resClick, title: item + ' ' + deletedOrDiscarded, type: deletedOrDiscarded === 'deleted' ? 'restore' : 'warning', colorMode: colorMode }); } });
                }; //Add note
                // const [hoverList, setHoverList] = useState(false);
                var sitesInside = item.tabs.length;
                return react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { isCombineEnabled: true, droppableId: id, type: 'tab', style: { outline: 'none', height: '100%' } }, function(provided, snapshot) {
                    return react_default.a.createElement(Box["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, { //h={isDragging ? "98%" : "100%"}
                        h: "98%",
                        minHeight: "240px" //bg={snapshot.isDraggingOver ? "#E8FDEC" : (snapshot.draggingFromThisWith ? "gray.100" : "")}
                            //boxShadow={snapshot.isDraggingOver ? "inset 0px 0px 0px 1px #44E18C" : ""}
                            ,
                        overflowY: "auto",
                        overflowX: "visible" //marginTop={colorMode === "dark" ? "4px" : "0px"}
                            //pb="100px"
                            ,
                        outline: "none",
                        className: colorMode === 'dark' ? hoverList ? 'groupScrollAreaDarkHover' : 'groupScrollAreaDark' : hoverList ? 'groupScrollAreaHover' : 'groupScrollArea'
                    }), item.tabs.map(function(tab, index) {
                        var isSelected = Boolean(getSelectedMap(selectedItems)[tab.id]);
                        var disAppearTask = false;
                        if (isSelected && draggingItemId && tab.id !== draggingItemId) { disAppearTask = true; }
                        return react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], {
                            key: tab.id,
                            draggableId: tab.id.toString(),
                            index: index,
                            style: { overflow: 'visible', outline: 'none' } //isDragDisabled={}
                        }, function(provided, snapshot) {
                            var showSelectionCount = snapshot.isDragging && (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) > 1;
                            return tab.note ? react_default.a.createElement(Box["a" /* default */ ], Object.assign({ py: "2px", outline: "none", ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { onClick: function onClick(e) { return _onClick(e, tab.id); }, onKeyDown: function onKeyDown(event) { return _onKeyDown(event, provided, snapshot, tab.id); }, opacity: disAppearTask ? '0.5' : '1', pos: "relative" }), react_default.a.createElement(spaceNoteInline, { isSelected: isSelected, deleteNote: deleteNote, noteClosed: function noteClosed() { return setNoteStatus(false); }, editableFocus: function editableFocus() { return setNoteStatus(true); }, modalMode: modalMode, combineTargetFor: snapshot.combineTargetFor, isDragging: snapshot.isDragging, title: tab.title, type: tab.type, favIcon: tab.favIcon, url: tab.url, comment: tab.comment, isTodo: tab.todo, commentSavedColor: tab.commentColor, justAdded: tab.justAdded, doneStatus: tab.doneStatus, tabId: tab.id, dateCreated: tab.dateCreated, edited: tab.edited, editor: tab.editor, spaceId: id, wontSave: tab.wontSave, hoverListOff: hoverListOff, compactView: compactView, turnNoteIntoSite: turnNoteIntoSite }), showSelectionCount && react_default.a.createElement(selectionCount, { count: selectedItems.length })) : tab.isStacked ? react_default.a.createElement(Box["a" /* default */ ], Object.assign({ py: "2px", outline: "none", ref: provided.innerRef }, provided.draggableProps, { //{...provided.dragHandleProps}
                                onClick: function onClick(e) { return _onClick(e, tab.id); },
                                onKeyDown: function onKeyDown(event) { return _onKeyDown(event, provided, snapshot, tab.id); },
                                opacity: disAppearTask ? '0.5' : '1',
                                pos: "relative"
                            }), react_default.a.createElement(combinedTabs, { provided: provided, isSelected: isSelected, deleteNote: deleteNote, sitesInside: tab.stackedItems, spaceId: id, combineTargetFor: snapshot.combineTargetFor, isDragging: snapshot.isDragging, modalMode: modalMode, compactView: compactView, dateCreated: tab.dateCreated, currentTitle: tab.title ? tab.title : false, favIcon: tab.favIcon, stackId: tab.id, combinedId: tab.isCombined })) : react_default.a.createElement(Box["a" /* default */ ], Object.assign({ py: "2px", outline: "none", ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { onClick: function onClick(e) { return _onClick(e, tab.id); }, onKeyDown: function onKeyDown(event) { return _onKeyDown(event, provided, snapshot, tab.id); }, opacity: disAppearTask ? '0.5' : '1', pos: "relative" }), react_default.a.createElement(tabItem, { isSelected: isSelected, deleteNote: deleteNote, title: tab.title, favIcon: tab.favIcon, url: tab.url, tabId: tab.id, spaceId: id, combineTargetFor: snapshot.combineTargetFor, isDragging: snapshot.isDragging, modalMode: modalMode, compactView: compactView, dateCreated: tab.dateCreated }), showSelectionCount && react_default.a.createElement(selectionCount, { count: selectedItems.length }));
                        });
                    }), hoverList && !noteStatus && !dragIsActiveSomewhere && !editableFocus ? react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        display: isDraggingLocal ? 'none' : 'block',
                        mt: "8px",
                        mx: "6px",
                        cursor: "text",
                        role: "group",
                        onClick: function onClick() {
                            addNote(id);
                            setNoteStatus(true);
                        }
                    }, react_default.a.createElement(MotionBox, {
                        initial: { scale: 0.5, transformOrigin: sitesInside > 0 ? '100% 100%' : '0% 0%' },
                        animate: { scale: 1, transformOrigin: sitesInside > 0 ? '100% 100%' : '0% 0%' }
                        /* exit={{
                                            scale: 0,
                                            transformOrigin: sitesInside > 0 ? "0% 0%" : "100% 100%",
                                          }} */
                        ,
                        whileHover: { opacity: 1 },
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                        bg: commentBgColor[colorMode],
                        mx: "12px",
                        my: "4px",
                        rounded: "6px",
                        height: compactView ? '30px' : '36px',
                        opacity: "0.65",
                        display: "flex",
                        alignItems: "center"
                    })) : react_default.a.createElement(Box["a" /* default */ ], { height: compactView ? '30px' : '36px', opacity: "0", mt: "10px", mb: "2px", bg: "transparent" }), provided.placeholder);
                });
            }; /* harmony default export */
            var sitesNotesList = (Object(react["memo"])(sitesNotesList_SitesNotesList));
            // CONCATENATED MODULE: ./src/Components/sitesNotesListLocked.js
            /* global chrome */
            var sitesNotesListLocked_tabsZu = function tabsZu(state) { return state.tabs; };
            var sitesNotesListLocked_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var sitesNotesListLocked_setDeletedDataZu = function setDeletedDataZu(state) { return state.setDeletedData; };
            var sitesNotesListLocked_SitesNotesLocked = function SitesNotesLocked(_ref) {
                var item = _ref.item,
                    id = _ref.id,
                    editableFocus = _ref.editableFocus,
                    isDraggingLocal = _ref.isDraggingLocal,
                    hoverList = _ref.hoverList,
                    hoverListOff = _ref.hoverListOff,
                    compactView = _ref.compactView;
                var tabs = Object(store["a" /* default */ ])(sitesNotesListLocked_tabsZu);
                var setTabs = Object(store["a" /* default */ ])(sitesNotesListLocked_setTabsZu);
                var setDeletedData = Object(store["a" /* default */ ])(sitesNotesListLocked_setDeletedDataZu);
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    noteStatus = _useState2[0],
                    setNoteStatus = _useState2[1]; //Darkmode
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var toast = Object(Toast["a" /* default */ ])();
                var restoreTabsAfterDeleted = function restoreTabsAfterDeleted(spaceIndex, tabsToRe, restoreStack, tabIndex, tabId) {
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs); //var spaceIndex = newData.findIndex(target => target.id === spaceId)
                    newData[spaceIndex].tabs = tabsToRe;
                    if (restoreStack) { newData[spaceIndex].tabs[tabIndex].stackedItems = restoreStack; } setTabs(newData, 'deleteUpdate');
                    chrome.runtime.sendMessage({ msg: 'deleteDeletedItemsDataById', idsToDelete: [tabId] });
                };
                var turnNoteIntoSite = function turnNoteIntoSite(pastedData, prevValue, spaceId, tabId) {
                    setNoteStatus(false);
                    var spaceIndex = tabs.findIndex(function(target) { return target.id === spaceId; });
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var tabIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === tabId; });
                    newData[spaceIndex].tabs[tabIndex].url = pastedData;
                    newData[spaceIndex].tabs[tabIndex].title = 'No title';
                    newData[spaceIndex].tabs[tabIndex].favIcon = 'chrome://favicon/size/16@3x/' + pastedData;
                    newData[spaceIndex].tabs[tabIndex].note = prevValue.length > 0 ? prevValue : false;
                    newData[spaceIndex].tabs[tabIndex].comment = prevValue.length > 0 ? prevValue : '';
                    setTabs(newData, 'deleteUpdate');
                };
                var deleteNote = function deleteNote(spaceId, tabId, item, isStacked) {
                    setNoteStatus(false);
                    var spaceIndex = tabs.findIndex(function(target) { return target.id === spaceId; });
                    var restoreTabs = tabs[spaceIndex].tabs;
                    var restoreStack;
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var tabIndex = newData[spaceIndex].tabs.findIndex(function(tab) { return tab.id === tabId; });
                    var deletedItemData;
                    if (isStacked) {
                        var length = newData[spaceIndex].tabs[tabIndex].stackedItems.length;
                        if (length > 1) {
                            restoreStack = newData[spaceIndex].tabs[tabIndex].stackedItems;
                            var deleted = newData[spaceIndex].tabs[tabIndex].stackedItems.filter(function(item) { return item.id !== isStacked; });
                            deletedItemData = newData[spaceIndex].tabs[tabIndex].stackedItems.filter(function(item) { return item.id === isStacked; })[0];
                            newData[spaceIndex].tabs[tabIndex].stackedItems = deleted;
                        } else {
                            var _deleted = newData[spaceIndex].tabs.filter(function(item) { return item.id !== tabId; });
                            deletedItemData = newData[spaceIndex].tabs[tabIndex].stackedItems[0];
                            newData[spaceIndex].tabs = _deleted;
                        }
                    } else {
                        var _deleted2 = newData[spaceIndex].tabs.filter(function(item) { return item.id !== tabId; });
                        deletedItemData = newData[spaceIndex].tabs[tabIndex];
                        newData[spaceIndex].tabs = _deleted2;
                    }
                    setTabs(newData, 'deleteUpdate');
                    var deletedOrDiscarded = 'deleted';
                    if (deletedItemData.title === 'Note' && deletedItemData.comment === '') { deletedOrDiscarded = 'discarded'; } else { setDeletedData([deletedItemData], 'item'); } //let title = item + ' deleted';
                    var resClick = function resClick() { //let restoreOjb = isStacked ? restoreStack : restoreTabs;
                        restoreTabsAfterDeleted(spaceIndex, restoreTabs, restoreStack, tabIndex, tabId);
                    }; //setShowToast(title, "", "restore");
                    toast({ position: 'bottom-right', status: 'success', duration: 5000, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, resClick: resClick, title: item + ' ' + deletedOrDiscarded, type: deletedOrDiscarded === 'deleted' ? 'restore' : 'warning', colorMode: colorMode }); } });
                };
                var modalMode = false; //Add note
                // const [hoverList, setHoverList] = useState(false);
                //const sitesInside = item.tabs.length;
                return react_default.a.createElement(Box["a" /* default */ ], { outline: "none" }, react_default.a.createElement(Box["a" /* default */ ], { h: "98%", minHeight: "240px", overflowY: "auto", overflowX: "visible", outline: "none", className: colorMode === 'dark' ? hoverList ? 'groupScrollAreaDarkHover' : 'groupScrollAreaDark' : hoverList ? 'groupScrollAreaHover' : 'groupScrollArea' }, item.tabs.map(function(tab, index) { return tab.note ? react_default.a.createElement(Box["a" /* default */ ], { py: "2px", outline: "none", pos: "relative", key: tab.id }, react_default.a.createElement(spaceNoteInline, { deleteNote: deleteNote, noteClosed: function noteClosed() { return setNoteStatus(false); }, editableFocus: function editableFocus() { return setNoteStatus(true); }, modalMode: modalMode, title: tab.title, type: tab.type, favIcon: tab.favIcon, url: tab.url, comment: tab.comment, isTodo: tab.todo, commentSavedColor: tab.commentColor, justAdded: tab.justAdded, doneStatus: tab.doneStatus, tabId: tab.id, dateCreated: tab.dateCreated, edited: tab.edited, editor: tab.editor, spaceId: id, wontSave: tab.wontSave, hoverListOff: hoverListOff, compactView: compactView, turnNoteIntoSite: turnNoteIntoSite })) : tab.isStacked ? react_default.a.createElement(Box["a" /* default */ ], { py: "2px", outline: "none", pos: "relative", key: tab.id }, react_default.a.createElement(combinedTabs, { provided: false, deleteNote: deleteNote, sitesInside: tab.stackedItems, spaceId: id, modalMode: modalMode, compactView: compactView, dateCreated: tab.dateCreated, title: tab.title, favIcon: tab.favIcon, stackId: tab.id, combinedId: tab.isCombined })) : react_default.a.createElement(Box["a" /* default */ ], { py: "2px", outline: "none", pos: "relative", key: tab.id }, react_default.a.createElement(tabItem, { deleteNote: deleteNote, title: tab.title, favIcon: tab.favIcon, url: tab.url, tabId: tab.id, spaceId: id, modalMode: modalMode, compactView: compactView, dateCreated: tab.dateCreated })); })));
            }; /* harmony default export */
            var sitesNotesListLocked = (Object(react["memo"])(sitesNotesListLocked_SitesNotesLocked));
            // CONCATENATED MODULE: ./src/Components/spaceList.js
            //const SpaceModal = React.lazy(() => import("./spaceModal"));
            //zuStore
            //dndStore
            var sideReCalcZu = function sideReCalcZu(state) { return state.sideReCalc; };
            var spaceList_isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var spaceList_SpaceList = function SpaceList(_ref) {
                var item = _ref.item,
                    id = _ref.id,
                    index = _ref.index,
                    isDraggingLocal = _ref.isDraggingLocal,
                    editableFocus = _ref.editableFocus,
                    compactView = _ref.compactView,
                    locked = _ref.locked; //zuState
                var sideReCalc = Object(dndStore["a" /* default */ ])(sideReCalcZu);
                var dragIsActiveSomewhere = Object(dndStore["a" /* default */ ])(spaceList_isDraggingZu); //Darkmode
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode;
                var listBG = { light: '', dark: '#1e2123' }; //Add note
                // const [hoverList, setHoverList] = useState(false);
                var _useBoolean = useBoolean_useBoolean(false),
                    hoverList = _useBoolean.value,
                    hoverListOn = _useBoolean.on,
                    hoverListOff = _useBoolean.off;
                return react_default.a.createElement(PseudoBox["a" /* default */ ], { onMouseEnter: hoverListOn, onMouseOver: hoverListOn, onMouseLeave: hoverListOff, bg: listBG[colorMode], paddingTop: "96px", roundedBottom: "16px", height: "100%", paddingBottom: "16px", position: "relative", width: "100%", px: "8px", overflowY: "hidden", transform: sideReCalc ? 'translateX(-148px)' : 'none', transition: "transform 0.0s" }, locked ? react_default.a.createElement(sitesNotesListLocked, { modalMode: false, item: item, id: id, dragIsActiveSomewhere: dragIsActiveSomewhere, editableFocus: editableFocus, isDraggingLocal: isDraggingLocal, hoverList: hoverList, hoverListOff: hoverListOff, compactView: compactView }) : react_default.a.createElement(sitesNotesList, { modalMode: false, item: item, id: id, dragIsActiveSomewhere: dragIsActiveSomewhere, editableFocus: editableFocus, isDraggingLocal: isDraggingLocal, hoverList: hoverList, hoverListOff: hoverListOff, compactView: compactView }));
            }; /* harmony default export */
            var spaceList = (Object(react["memo"])(spaceList_SpaceList));
            // CONCATENATED MODULE: ./src/Utils/useStateCallback.js
            function useStateCallback(initialState) {
                var _useState = Object(react["useState"])(initialState),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    state = _useState2[0],
                    setState = _useState2[1];
                var cbRef = Object(react["useRef"])(null); // mutable ref to store current callback
                var setStateCallback = function setStateCallback(state, cb) {
                    cbRef.current = cb; // store passed callback to ref
                    setState(state);
                };
                Object(react["useEffect"])(function() { // cb.current is `null` on initial render, so we only execute cb on state *updates*
                    if (cbRef.current) {
                        cbRef.current(state);
                        cbRef.current = null; // reset callback after execution
                    }
                }, [state]);
                return [state, setStateCallback];
            } /* harmony default export */
            var Utils_useStateCallback = (useStateCallback);
            // EXTERNAL MODULE: ./node_modules/re-resizable/lib/index.js + 1 modules
            var lib = __webpack_require__(164);

            // CONCATENATED MODULE: ./src/Components/spaces.js
            //import styled from "styled-components";
            //Custom style for drop animation, not used
            /* function getStyle(style, snapshot) {
              if (!snapshot.isDropAnimating) {
                return style;
              }
              const { moveTo, curve, duration } = snapshot.dropAnimation;
              // move to the right spot and scale
              const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
              const scale = 'scale(0.9875)';

              // patching the existing style
              return {
                ...style,
                transform: `${translate} ${scale}`,
                // slowing down the drop because we can
                transition: `all ${curve} ${duration}s`,
              };
            } */ //const tabsZu = (state) => state.tabs;
            var spacesToShowZu = function spacesToShowZu(state) { return state.spacesToShow; };
            var isLoadingGroupZu = function isLoadingGroupZu(state) { return state.isLoadingGroup; };
            var setIsLoadingGroupZu = function setIsLoadingGroupZu(state) { return state.setIsLoadingGroup; };
            var changeSpaceWidthZu = function changeSpaceWidthZu(state) { return state.changeSpaceWidth; }; //dndStore
            //const isDraggingZu = (state) => state.isDragging;
            var spaceDraggedOverZu = function spaceDraggedOverZu(state) { return state.spaceDraggedOver; };
            var spaces_InnerSpace = function InnerSpace(_ref) {
                var provided = _ref.provided,
                    snapshot = _ref.snapshot,
                    item = _ref.item,
                    index = _ref.index,
                    reSizeMaxWidth = _ref.reSizeMaxWidth;
                var changeSpaceWidth = Object(store["a" /* default */ ])(changeSpaceWidthZu);
                var isLoadingGroup = Object(store["a" /* default */ ])(isLoadingGroupZu);
                var setIsLoadingGroup = Object(store["a" /* default */ ])(setIsLoadingGroupZu);
                var spaceDraggedOver = Object(dndStore["a" /* default */ ])(spaceDraggedOverZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode; //const spaceBG = { light: "#FFF", dark: "#262A2D" };
                var spaceBG = { light: '#FFF', dark: '#1d1e21' };
                var spaceShadow = { light: '0 32px 36px -30px rgba(165,182,185,0.36), 0 8px 16px -4px rgba(171,174,181,0.18)', dark: '0 32px 36px -30px rgba(0,0,0,0.50), 0 8px 16px -4px rgba(0,0,0,0.30)' };
                var spaceShadowDragging = { light: '0 30px 45px -20px rgba(165,182,185,0.46), 0 4px 24px -4px rgba(171,174,181,0.28)', dark: '0 30px 45px -20px rgba(0,0,0,0.60), 0 4px 24px -4px rgba(0,0,0,0.40)' };

                function timeout(delay) { return new Promise(function(res) { return setTimeout(res, delay); }); } Object(react["useEffect"])(function() { if (isLoadingGroup === item.id) { setLoadingList(); } }, [isLoadingGroup]);
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    loadingList = _useState2[0],
                    setLoadingListState = _useState2[1];
                var setLoadingList = /*#__PURE__*/ function() {
                    var _ref2 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee() {
                        return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        setLoadingListState(true);
                                        _context.next = 3;
                                        return timeout(25);
                                    case 3:
                                        setLoadingListState(false);
                                        setIsLoadingGroup(false);
                                    case 5:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    }));
                    return function setLoadingList() { return _ref2.apply(this, arguments); };
                }();
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    editableFocus = _useState4[0],
                    setFocus = _useState4[1];
                var reSizeW = item.customWidth ? item.customWidth : 367;
                var _useStateCallback = Utils_useStateCallback(reSizeW),
                    _useStateCallback2 = Object(slicedToArray["a" /* default */ ])(_useStateCallback, 2),
                    width = _useStateCallback2[0],
                    setWidth = _useStateCallback2[1];
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    shiftKeyActive = _useState6[0],
                    setShiftKeyActive = _useState6[1];
                var isDraggedOver = index === spaceDraggedOver ? true : false;
                var sendToDb = function sendToDb(newWidth) { changeSpaceWidth(item.id, newWidth, shiftKeyActive); };
                return react_default.a.createElement(PseudoBox["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, { // Custom drop animation, se toppen av filen
                    //style={getStyle(provided.draggableProps.style, snapshot)}
                    //style={{scrollSnapAlign: "start"}}
                    //height="100%"
                    //position="relative"
                    display: "block",
                    overflow: "hidden",
                    textAlign: "left" //bg={spaceBG[colorMode]}
                        ,
                    marginRight: ['2vw', '2vw', '2vw', '1.15vw'] //width="21.850vw"
                        //resize="horizontal"
                        //overflow=auto;
                        ,
                    border: snapshot.isDragging ? '2px solid #41E18B' : 'none',
                    borderRadius: "18px",
                    boxShadow: snapshot.isDragging ? spaceShadowDragging[colorMode] : isDraggedOver ? '0px 0px 0px 1px #44E18C, 0 4px 26px -8px #00E58380' : spaceShadow[colorMode] //transition={isDragging ? "0.2s cubic-bezier(.374,.019,.035,1.861)" : "none"}
                    // _hover={{ boxShadow: "2px 10px 24px 0 rgba(152,169,185,0.28)" }}
                }), react_default.a.createElement(lib["a" /* Resizable */ ] //size={{ width, height }}
                    , {
                        defaultSize: { width: width, height: '100%' },
                        style: { position: 'relative', background: spaceBG[colorMode] },
                        minWidth: '240px',
                        maxWidth: reSizeMaxWidth,
                        enable: { top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false },
                        onResizeStop: function onResizeStop(e, direction, ref, d) {
                            var newWidth = width + d.width;
                            setWidth(newWidth, function(newWidth) { return sendToDb(newWidth); }); //setWidth(width + d.width);
                        }
                        /* onResizeStart={(e) => {
                                  if (e.shiftKey === true) {
                                    setShiftKeyActive(true);
                                  } else {
                                    setShiftKeyActive(false);
                                  }
                                }} */
                    }, react_default.a.createElement(spaceHeader, { provided: provided, currentEmoji: item.emoji, item: item, id: item.id, titleData: item.title, index: index, isDraggingLocal: snapshot.isDragging, setFocus: setFocus, setLoadingList: setLoadingList }), loadingList ? react_default.a.createElement(Flex["a" /* default */ ], { m: "auto", h: "100%", w: "100%", alignItems: "center" }) : react_default.a.createElement(spaceList, { item: item, id: item.id, index: index, isDraggingLocal: snapshot.isDragging, editableFocus: editableFocus, compactView: item.compact, locked: item.locked })));
            };
            var spaces_Spaces = function Spaces(_ref3) {
                var hoverSide = _ref3.hoverSide,
                    reSizeMaxWidth = _ref3.reSizeMaxWidth;
                var spacesToShow = Object(store["a" /* default */ ])(spacesToShowZu); //const categoryID = item.categoryID;
                //const showSpace = categories.findIndex(target => target.id === categoryID);
                return react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { droppableId: "items", type: "space", direction: "horizontal" }, function(provided, snapshot) {
                    return react_default.a.createElement(Box["a" /* default */ ], Object.assign({
                            display: "flex",
                            flexWrap: "no-wrap",
                            minWidth: "0px",
                            height: "100%" //bg={snapshot.isDraggingOver ? "green.50" : "none"}
                                ,
                            borderRadius: "18px",
                            ref: provided.innerRef
                        }, provided.droppableProps), //tabs.filter(data => data.category === category)
                        spacesToShow === null || spacesToShow === void 0 ? void 0 : spacesToShow.map(function(item, index) { return react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], { draggableId: item.id, key: item.id, index: index }, function(provided, snapshot) { return react_default.a.createElement(spaces_InnerSpace, { provided: provided, snapshot: snapshot, item: item, index: index, reSizeMaxWidth: reSizeMaxWidth }); }); }), provided.placeholder);
                });
            }; /* harmony default export */
            var spaces = (spaces_Spaces);
            // EXTERNAL MODULE: ./src/Components/dropTabNewSpace.js
            var dropTabNewSpace = __webpack_require__(137);

            // EXTERNAL MODULE: ./node_modules/use-long-press/dist/index.umd.js
            var index_umd = __webpack_require__(101);

            // CONCATENATED MODULE: ./src/Components/categoryTabs.js
            //import useEventListener from "../Utils/keyEventListener.js"
            var categoryTabs_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var categoryTabs_categoryZu = function categoryZu(state) { return state.category; };
            var categoryTabs_categoriesZu = function categoriesZu(state) { return state.categories; };
            var categoryTabs_setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
            var setCategoryModalOpenZu = function setCategoryModalOpenZu(state) { return state.setCategoryModalOpen; };
            var categoryTabs_Tab = function Tab(_ref) {
                var name = _ref.name,
                    index = _ref.index,
                    shared = _ref.shared; //zustate
                var category = Object(store["a" /* default */ ])(categoryTabs_categoryZu);
                var setCategorySelected = Object(store["a" /* default */ ])(categoryTabs_setCategoryZu);
                var setCategoryModalOpen = Object(store["a" /* default */ ])(setCategoryModalOpenZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(categoryTabs_unselectAllZu);
                var _useState = Object(react["useState"])(shared),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    showSharedSymbol = _useState2[0],
                    setShared = _useState2[1];
                Object(react["useEffect"])(function() { setShared(shared); }, [shared]);
                var callback = react_default.a.useCallback(function() { setCategoryModalOpen(true); }, []);
                var changeCategory = function changeCategory() {
                    setCategorySelected(index);
                    unselectAll();
                };
                var bind = Object(index_umd["useLongPress"])(callback, { //onStart: () => console.log("Press started"),
                    //onFinish: () => console.log("Long press finished"),
                    onCancel: function onCancel() { return changeCategory(); },
                    threshold: 400,
                    captureEvent: true,
                    detect: index_umd["LongPressDetectEvents"].BOTH
                });
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode;
                var titleColor = { light: 'gray.700', dark: '#63656C' };
                var bgColor = { light: 'gray.200', dark: '#262A2D' };
                var selectedShadow = {
                    light: '0 12px 18px -10px rgba(49, 144, 255,0.54)', //dark: "0 12px 18px -10px rgba(0,0,0,0.60)",
                    dark: '0 8px 8px -4px rgba(3,4,5,0.40), inset 1px 1px 2px 0 rgba(154,160,164,0.40), inset -1px -1px 2px 0 #2A2F34'
                }; //Grayish rgba(17,22,31,0.30)
                var selectedBG = { light: 'linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)', dark: 'linear-gradient(178deg, #52595D 0%, #40484F 100%)' }; //Grayish linear-gradient(178deg, #788397 0%, #4A5568 100%)
                var hoverBg = { light: 'linear-gradient(145deg, #5DABFE 0%, #0A7BFF 100%)', dark: 'linear-gradient(178deg, #464C4F 0%, #363C42 100%)' };
                var selected = category === index ? true : false; //const [selected, setSelected] = useState(selectedInitial);
                return react_default.a.createElement(MotionBox, Object.assign({
                    _first: { roundedLeft: '8px', ml: '0px' },
                    _last: { roundedRight: '8px' },
                    py: "4px",
                    borderRadius: "8px",
                    whileTap: { scale: 0.9525, borderRadius: '6px' },
                    whileHover: { backgroundImage: selected ? hoverBg[colorMode] : '', transition: { duration: 0 } },
                    transition: { type: 'spring', stiffness: 300 },
                    outline: "none",
                    fontWeight: "600",
                    border: "none",
                    height: "32px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontSize: "16px",
                    zIndex: selected ? '2' : '1',
                    backgroundImage: selected ? selectedBG[colorMode] : '',
                    px: ['24px', '24px', '24px', '42px'],
                    bg: bgColor[colorMode],
                    color: selected ? '#FFF' : titleColor[colorMode],
                    boxShadow: selected ? selectedShadow[colorMode] : '' //onClick={() => setCategory(index)}
                }, bind, { ml: "-10px", userSelect: "none" }), showSharedSymbol && react_default.a.createElement(Icon["a" /* default */ ], { name: "globeIcon", mr: "6px", mt: "-1px", size: "14px" }), name.length > 0 ? name : 'Untitled');
            };
            var categoryTabs_CategoryTabs = function CategoryTabs(_ref2) {
                var windowSize = _ref2.windowSize; //colorstuff
                //zustate
                var categories = Object(store["a" /* default */ ])(categoryTabs_categoriesZu);
                var setCategorySelected = Object(store["a" /* default */ ])(categoryTabs_setCategoryZu);
                var _useState3 = Object(react["useState"])(),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    catLength = _useState4[0],
                    setCatLength = _useState4[1];
                var unselectAll = Object(dndStore["a" /* default */ ])(categoryTabs_unselectAllZu);
                var _useColorMode2 = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode2.colorMode,
                    toggleColorMode = _useColorMode2.toggleColorMode;
                var containerWidthRef = Object(react["useRef"])(null);
                var contentWidthRef = Object(react["useRef"])(null);
                var _useState5 = Object(react["useState"])(false),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    scrollbarVisible = _useState6[0],
                    setSctrollbarVisible = _useState6[1];
                Object(react["useEffect"])(function() { if (containerWidthRef !== null && contentWidthRef !== null) { var containerWidth = containerWidthRef.current.getBoundingClientRect().width; var contentWidth = contentWidthRef.current.getBoundingClientRect().width; if (contentWidth > containerWidth) { setSctrollbarVisible(true); } else { setSctrollbarVisible(false); } } }, [categories, windowSize]);
                Object(react["useEffect"])(function() { var categoriesLength = categories.length; if (categoriesLength > 0) { setCatLength(categoriesLength); } }, [categories]);
                var setCategoryFromKeyboard = function setCategoryFromKeyboard(num) {
                    if (num >= catLength) { return; } else {
                        setCategorySelected(num);
                        unselectAll();
                    }
                };
                Object(dist_web["a" /* useHotkeys */ ])('1', function() { return setCategoryFromKeyboard(0); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('2', function() { return setCategoryFromKeyboard(1); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('3', function() { return setCategoryFromKeyboard(2); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('4', function() { return setCategoryFromKeyboard(3); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('5', function() { return setCategoryFromKeyboard(4); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('6', function() { return setCategoryFromKeyboard(5); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('7', function() { return setCategoryFromKeyboard(6); }, {}, [catLength]);
                Object(dist_web["a" /* useHotkeys */ ])('8', function() { return setCategoryFromKeyboard(7); }, {}, [catLength]);
                return react_default.a.createElement(Flex["a" /* default */ ], { ref: containerWidthRef, zIndex: 75000, px: "8px", w: "100%", overflow: "auto", pb: scrollbarVisible ? "8px" : "24px", mt: "16px", className: colorMode === 'dark' ? 'groupScrollAreaDarkHover' : 'groupScrollAreaHover' }, react_default.a.createElement(Flex["a" /* default */ ], { ref: contentWidthRef }, categories.map(function(item, index) { return react_default.a.createElement(categoryTabs_Tab, { key: item.id, name: item.name, index: index, shared: item.shared }); })));
            }; /* harmony default export */
            var categoryTabs = (categoryTabs_CategoryTabs);
            // EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v1.js + 2 modules
            var v1 = __webpack_require__(221);

            // CONCATENATED MODULE: ./src/Components/limitModal.js
            /* global chrome */
            var limitModal_userStateZu = function userStateZu(state) { return state.userState; };
            var limitModal_setAuthOpenZu = function setAuthOpenZu(state) { return state.setAuthOpen; };
            var setLimitDialogOpenZu = function setLimitDialogOpenZu(state) { return state.setLimitDialogOpen; };
            var setRemovedModalZu = function setRemovedModalZu(state) { return state.setRemovedModal; };
            var limitDialogOpenZu = function limitDialogOpenZu(state) { return state.limitDialogOpen; };
            var removedFromWSZu = function removedFromWSZu(state) { return state.removedFromWS; };
            var setIsLoadingCategoriesZu = function setIsLoadingCategoriesZu(state) { return state.setIsLoadingCategories; };
            var setIsLoadingSpacesToShowZu = function setIsLoadingSpacesToShowZu(state) { return state.setIsLoadingSpacesToShow; };
            var limitModal_currentWSidZu = function currentWSidZu(state) { return state.currentWSid; };
            var limitModal_LimitModal = function LimitModal() {
                var userState = Object(store["a" /* default */ ])(limitModal_userStateZu);
                var setAuthOpen = Object(store["a" /* default */ ])(limitModal_setAuthOpenZu);
                var setLimitDialogOpen = Object(store["a" /* default */ ])(setLimitDialogOpenZu);
                var setRemovedModal = Object(store["a" /* default */ ])(setRemovedModalZu);
                var limitDialogOpen = Object(store["a" /* default */ ])(limitDialogOpenZu);
                var removedFromWS = Object(store["a" /* default */ ])(removedFromWSZu);
                var currentWSid = Object(store["a" /* default */ ])(limitModal_currentWSidZu);
                var setIsLoadingCategories = Object(store["a" /* default */ ])(setIsLoadingCategoriesZu);
                var setIsLoadingSpacesToShow = Object(store["a" /* default */ ])(setIsLoadingSpacesToShowZu); //localState
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    isLoadingWSChange = _useState2[0],
                    setIsLoadingWSChange = _useState2[1]; //Colorstuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var icon = { light: 'gray.500', dark: '#A1A2A4' };
                var text = { light: '#1A202C', dark: '#FFF' }; //const { isOpen, onOpen, onClose } = useDisclosure();
                var ctaRef = react_default.a.useRef();
                var userAnon = (userState === null || userState === void 0 ? void 0 : userState.email.length) < 0 ? true : false;
                var pausedPlan = userState.userPlan === 'paused';
                var newUser = userState.extended === false ? true : false;
                var closeLimitDialog = function closeLimitDialog() { setLimitDialogOpen(); };
                var closeRemoveDialog = function closeRemoveDialog() {
                    setRemovedModal(false);
                    /* let workspaces = userState.workspaces;
                        let firstIndexedWS = workspaces[0].id;
                        setIsLoadingWSChange(true);
                        setIsLoadingCategories(true);
                        setIsLoadingSpacesToShow(true);
                        chrome.runtime.sendMessage(
                          {
                            msg: "changeWorkspace",
                            newWSid: firstIndexedWS,
                            currentWSid: currentWSid,
                            isOwner: true,
                          },
                          (response) => {}
                        ); */
                };
                var MotionContent = framer_motion_es["c" /* motion */ ].custom(AlertDialog["b" /* AlertDialogContent */ ]);
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(framer_motion_es["a" /* AnimatePresence */ ], null, limitDialogOpen && react_default.a.createElement(AlertDialog["a" /* AlertDialog */ ], { leastDestructiveRef: ctaRef, onClose: closeLimitDialog, isOpen: true, size: "md", isCentered: true }, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], { style: { backdropFilter: 'blur(1px)' } }), react_default.a.createElement(MotionContent, { initial: { opacity: 0, scale: 0.8, y: 30, transformOrigin: '50% 100%' }, animate: { opacity: 1, scale: 1, y: 0, transformOrigin: '50% 0%' }, exit: { opacity: 0, scale: 0.8, y: 30, transformOrigin: '50% 100%' }, transition: { duration: 0.2 }, rounded: "8px", bg: color[colorMode], mt: "-30vh" }, react_default.a.createElement(Modal["f" /* ModalHeader */ ], { pt: "2.5rem", color: text[colorMode], fontSize: "24px", fontWeight: "700", pb: "0px", display: "flex" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "warningShield", size: "32px", mr: "8px", mt: "2px", color: "orange.300" }), pausedPlan ? 'Payment incomplete' : 'Account limit reached'), react_default.a.createElement(Modal["c" /* ModalCloseButton */ ], { top: "1.25rem", right: "1.5rem", color: icon[colorMode], transition: "0s" }), react_default.a.createElement(Modal["b" /* ModalBody */ ], null, pausedPlan ? react_default.a.createElement(Text["a" /* default */ ], { fontSize: "16px", mt: "8px", color: text[colorMode] }, "It seems you have paused, canceled or have a incomplete payment. To continue saving items please upgrade your plan or contact support", ' ', react_default.a.createElement("u", null, react_default.a.createElement("a", { href: "mailto:support@tabextend.com" }, "here"))) : react_default.a.createElement(Text["a" /* default */ ], { fontSize: "16px", mt: "8px", color: text[colorMode] }, "You have reached the limit of database saves on the trial plan", ' ', newUser ? '(30/30)' : '(50/50)', ". Please", ' ', userState.userAnon ? 'create an account and ' : '', "upgrade your plan to get unlimited items to save and create."), react_default.a.createElement(Text["a" /* default */ ], { mt: "16px", letterSpacing: "0.58px", color: text[colorMode] }, "Be aware that notes you create from now on are not going to get saved.")), react_default.a.createElement(Modal["e" /* ModalFooter */ ], null, react_default.a.createElement(Button["a" /* default */ ], { onClick: closeLimitDialog, transition: "all 0s cubic-bezier(.374,.019,.035,1.861)", color: text[colorMode] }, "Do it later"), userAnon ? react_default.a.createElement(Button["a" /* default */ ], {
                    ref: ctaRef,
                    onClick: function onClick() {
                        setAuthOpen(false);
                        closeLimitDialog();
                    },
                    ml: 3,
                    fontSize: "16px",
                    minWidth: "40%",
                    color: "#FFF",
                    backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",
                    _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 8px 16px -8px rgba(49, 144, 255,0.4)' },
                    boxShadow: "0 12px 18x -10px rgba(49, 144, 255,0.35)",
                    transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)"
                }, "Create account") : react_default.a.createElement(Button["a" /* default */ ], {
                    ref: ctaRef,
                    onClick: function onClick(e) {
                        e.preventDefault();
                        window.location.href = 'https://www.tabextend.com/pricing';
                    },
                    ml: 3,
                    fontSize: "14px",
                    minWidth: "30%",
                    color: "#FFF",
                    backgroundImage: "linear-gradient(145deg, #5DABFE 0%, #3391FF 100%)",
                    _hover: { backgroundImage: 'linear-gradient(145deg, #3592FE 0%, #2E7EDB 100%)', boxShadow: '0 8px 16px -8px rgba(49, 144, 255,0.4)' },
                    boxShadow: "0 12px 18x -10px rgba(49, 144, 255,0.35)",
                    transition: "all 0.12s cubic-bezier(.374,.019,.035,1.861)"
                }, react_default.a.createElement(Icon["a" /* default */ ], { name: "creditCard", mr: "8px", size: "20px" }), "Upgrade plan"))))), removedFromWS && react_default.a.createElement(AlertDialog["a" /* AlertDialog */ ], { onClose: closeRemoveDialog, isOpen: true, isCentered: true }, react_default.a.createElement(Modal["g" /* ModalOverlay */ ], null), react_default.a.createElement(AlertDialog["b" /* AlertDialogContent */ ], { rounded: "8px", bg: color[colorMode] }, react_default.a.createElement(Modal["f" /* ModalHeader */ ], { fontWeight: "bold", mt: "8px", color: text[colorMode], fontSize: "20px" }, "Removed from workspace"), react_default.a.createElement(Modal["b" /* ModalBody */ ], { mt: "-12px", color: text[colorMode], fontSize: "14px", fontWeight: "500" }, "You have been removed from the current workspace by the owner."), react_default.a.createElement(Modal["e" /* ModalFooter */ ], null, react_default.a.createElement(Button["a" /* default */ ], { onClick: closeRemoveDialog, ml: 3, isLoading: isLoadingWSChange, color: text[colorMode] }, "Close")))));
            }; /* harmony default export */
            var limitModal = (limitModal_LimitModal);
            // CONCATENATED MODULE: ./src/Components/skeletonSpaces.js
            /* global chrome */
            var skeletonSpaces_SkeletonSpaces = function SkeletonSpaces() {
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var bgColor = { light: 'gray.200', dark: '#262A2D' };
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]);
                return react_default.a.createElement(MotionBox, { display: "flex", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.12, duration: 0.25, ease: 'easeInOut' } }, react_default.a.createElement(MotionBox, {
                    animate: { opacity: [0.5, 1, 0.5, 1, 0.5] },
                    transition: {
                        duration: 2.75,
                        ease: 'easeInOut', //times: [0, 0.3, 0.5, 0.8, 1],
                        repeat: 8
                    },
                    height: "100%",
                    textAlign: "left",
                    marginRight: ['2vw', '2vw', '2vw', '1.15vw'],
                    width: "21.750vw",
                    minWidth: "240px",
                    borderRadius: "18px",
                    minHeight: "calc(80vh - 164px)",
                    bg: bgColor[colorMode]
                }), react_default.a.createElement(MotionBox, {
                    animate: { opacity: [0.4, 0.85, 0.4, 0.85, 0.4] },
                    transition: {
                        duration: 2.75,
                        ease: 'easeInOut', //times: [0, 0.3, 0.5, 0.8, 1],
                        repeat: 8,
                        delay: 0.3
                    },
                    height: "100%",
                    textAlign: "left",
                    marginRight: ['2vw', '2vw', '2vw', '1.15vw'],
                    width: "21.750vw",
                    minWidth: "240px",
                    borderRadius: "18px",
                    minHeight: "calc(80vh - 164px)",
                    bg: bgColor[colorMode] //opacity="0.6"
                }), react_default.a.createElement(MotionBox, {
                    animate: { opacity: [0.3, 0.7, 0.3, 0.7, 0.3] },
                    transition: {
                        duration: 2.75,
                        ease: 'easeInOut', //times: [0, 0.3, 0.5, 0.8, 1],
                        repeat: 8,
                        delay: 0.6
                    },
                    height: "100%",
                    textAlign: "left",
                    marginRight: ['2vw', '2vw', '2vw', '1.15vw'],
                    width: "21.750vw",
                    minWidth: "240px",
                    borderRadius: "18px",
                    minHeight: "calc(80vh - 164px)",
                    bg: bgColor[colorMode] //opacity="0.3"
                }), react_default.a.createElement(MotionBox, {
                    animate: { opacity: [0.2, 0.55, 0.2, 0.55, 0.2] },
                    transition: {
                        duration: 2.75,
                        ease: 'easeInOut', //times: [0, 0.3, 0.5, 0.8, 1],
                        repeat: 8,
                        delay: 0.9
                    },
                    height: "100%",
                    textAlign: "left",
                    marginRight: ['2vw', '2vw', '2vw', '1.15vw'],
                    width: "21.750vw",
                    minWidth: "240px",
                    borderRadius: "18px",
                    minHeight: "calc(80vh - 164px)",
                    bg: bgColor[colorMode] //opacity="0.1"
                }));
            }; /* harmony default export */
            var skeletonSpaces = (skeletonSpaces_SkeletonSpaces);
            // EXTERNAL MODULE: ./src/Images/AddToNewSpace.png
            var AddToNewSpace = __webpack_require__(154);
            var AddToNewSpace_default = /*#__PURE__*/ __webpack_require__.n(AddToNewSpace);

            // EXTERNAL MODULE: ./src/Images/MoveToSpace.png
            var MoveToSpace = __webpack_require__(155);
            var MoveToSpace_default = /*#__PURE__*/ __webpack_require__.n(MoveToSpace);

            // EXTERNAL MODULE: ./src/Images/ClearAllTabs.png
            var ClearAllTabs = __webpack_require__(156);
            var ClearAllTabs_default = /*#__PURE__*/ __webpack_require__.n(ClearAllTabs);

            // EXTERNAL MODULE: ./src/Images/AddToNewSpaceDark.png
            var AddToNewSpaceDark = __webpack_require__(157);
            var AddToNewSpaceDark_default = /*#__PURE__*/ __webpack_require__.n(AddToNewSpaceDark);

            // EXTERNAL MODULE: ./src/Images/MoveToSpaceDark.png
            var MoveToSpaceDark = __webpack_require__(158);
            var MoveToSpaceDark_default = /*#__PURE__*/ __webpack_require__.n(MoveToSpaceDark);

            // EXTERNAL MODULE: ./src/Images/ClearAllTabsDark.png
            var ClearAllTabsDark = __webpack_require__(159);
            var ClearAllTabsDark_default = /*#__PURE__*/ __webpack_require__.n(ClearAllTabsDark);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/Badge/index.js + 1 modules
            var Badge = __webpack_require__(234);

            // CONCATENATED MODULE: ./src/Components/activeTabsMenu.js
            /* global chrome */
            var activeTabsMenu_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var setActiveTabsZu = function setActiveTabsZu(state) { return state.setActiveTabs; };
            var activeTabsMenu_tabsZu = function tabsZu(state) { return state.tabs; };
            var activeTabsMenu_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var activeTabsMenu_categoryZu = function categoryZu(state) { return state.category; };
            var activeTabsMenu_categoriesZu = function categoriesZu(state) { return state.categories; };
            var activeTabsMenu_userStateZu = function userStateZu(state) { return state.userState; };
            var userItemsZu = function userItemsZu(state) { return state.userItems; };
            var setUserItemsZu = function setUserItemsZu(state) { return state.setUserItems; };
            var activeTabsMenu_ActiveTabsMenu = function ActiveTabsMenu(_ref) {
                var setHoverSide = _ref.setHoverSide,
                    hoverSideOn = _ref.hoverSideOn,
                    hoverSideOff = _ref.hoverSideOff,
                    hoverSide = _ref.hoverSide,
                    spaceLimitNotReached = _ref.spaceLimitNotReached; //zustate
                var activeTabs = Object(store["a" /* default */ ])(activeTabsMenu_activeTabsZu);
                var setActiveTabs = Object(store["a" /* default */ ])(setActiveTabsZu);
                var tabs = Object(store["a" /* default */ ])(activeTabsMenu_tabsZu);
                var setTabs = Object(store["a" /* default */ ])(activeTabsMenu_setTabsZu);
                var category = Object(store["a" /* default */ ])(activeTabsMenu_categoryZu);
                var categories = Object(store["a" /* default */ ])(activeTabsMenu_categoriesZu);
                var userState = Object(store["a" /* default */ ])(activeTabsMenu_userStateZu);
                var userItems = Object(store["a" /* default */ ])(userItemsZu);
                var setUserItems = Object(store["a" /* default */ ])(setUserItemsZu);
                var _useState = Object(react["useState"])(0),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    activeTabsNotPinned = _useState2[0],
                    setActiveTabsNotPinned = _useState2[1]; //Colorstuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var bg = { light: 'gray.50', dark: '#1D2024' };
                var buttonBg = { light: 'gray.50', dark: '#41484F' };
                var buttonBgActive = { light: 'gray.300', dark: '#41484F' };
                var iconColor = { light: 'gray.700', dark: '#B3BAC6' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                var linkShadow = { light: '0 1px 3px 0 rgba(178,186,197,0.30), 0 12px 23px -6px rgba(178,186,197,0.50), 0 12px 52px 0 rgba(128,138,152,0.50)', dark: '2px 5px 32px 0 rgba(0,0,0,0.70)' };
                var hoverMainButton = { light: '#FFF', dark: '#32363A' };
                var hoverButton = { light: 'gray.50', dark: '#32363A' };
                var title = { light: '#1A202C', dark: '#FFF' };
                var subTitle = { light: 'gray.500', dark: 'gray.400' };
                var iconShadow = { light: 'drop-shadow(0px 2px 2px rgba(131,137,149,0.50))', dark: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.50))' };
                var mainButtonShadow = { light: '0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 2px 0 rgba(154,160,164,0.40), inset -1px -1px 2px 0 #2A2F34' };
                var mainButtonShadowOpen = { light: '', dark: '' };
                var iconHoverShadow = { light: 'brightness(1.035) drop-shadow(0px 4px 8px rgb(34, 46, 69, 0.3))', dark: 'brightness(1.025) drop-shadow(0px 2px 6px rgb(0, 0, 0, 0.4))' };
                var noTabs = activeTabs !== undefined ? activeTabs.length > 0 ? false : true : true;
                var howManyTabs = activeTabs !== undefined && activeTabs.length > 0 ? activeTabs.filter(function(tabs) { return tabs.pinned === false; }).length : 0;
                /* const menuClosed = () => {
                   //  setHoverSide(false);
                    //setMenuIsOpen(false)
                  };*/
                var toast = Object(Toast["a" /* default */ ])();
                var userPlan = userState === null || userState === void 0 ? void 0 : userState.userPlan;
                var disableButtons = noTabs === true || userPlan === 'trialLimitReached' || userPlan === 'paused' || !spaceLimitNotReached;
                var userPlanBlocked = userPlan === 'trialLimitReached' || userPlan === 'paused';
                var menuCubic = '0s';
                var iconCubic = '0.36s cubic-bezier(0.22,0.61,0.36,1)';
                var closeTabs = function closeTabs(itemsToClose) {
                    var activeTabsId = itemsToClose.map(function(a) { return a.browserId; });
                    chrome.tabs.remove(activeTabsId, function() { setActiveTabs([]); });
                };
                var addNewSpaceWtabs = function addNewSpaceWtabs() { chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(windowInfo) { saveAndClose(windowInfo); }); };
                var saveAndClose = /*#__PURE__*/ function() {
                    var _ref2 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee(windowInfo) {
                        var newId, userId, len, randomEmoji, currentSlug, itemToAdd, urlsToAdd, dateobj, dateCreated, sessionTime, itemArray, oldTabs, newTabs, promise, result, tabsClosed, titleString;
                        return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        newId = Object(v1["a" /* default */ ])();
                                        userId = userState.userId;
                                        len = defaultEmojis["a" /* default */ ].length;
                                        randomEmoji = defaultEmojis["a" /* default */ ][Math.floor(Math.random() * len)].emoji; //Date obj stuff
                                        currentSlug = categories[category].slug && { slug: categories[category].slug };
                                        itemToAdd = activeTabs.filter(function(tabs) { return tabs.pinned === false; }); //TODO Save to url
                                        urlsToAdd = itemToAdd.map(function(tab) { return tab.url; });
                                        dateobj = new Date().toString();
                                        dateCreated = dateobj;
                                        sessionTime = dateobj.slice(0, 11);
                                        itemArray = itemToAdd.map(function(x) { x.dateCreated = dateCreated; return x; });
                                        setUserItems(userItems + 1);
                                        oldTabs = Object(toConsumableArray["a" /* default */ ])(tabs);
                                        newTabs = [Object(objectSpread2["a" /* default */ ])({ id: newId, title: sessionTime, createdBy: userId, emoji: randomEmoji, lastPosition: { height: windowInfo === null || windowInfo === void 0 ? void 0 : windowInfo.height, width: windowInfo === null || windowInfo === void 0 ? void 0 : windowInfo.width, top: windowInfo === null || windowInfo === void 0 ? void 0 : windowInfo.top, left: windowInfo === null || windowInfo === void 0 ? void 0 : windowInfo.left }, comments: 0, categoryID: categories[category].id, lastAdded: dateCreated, focus: true, tabs: itemArray }, currentSlug)].concat(Object(toConsumableArray["a" /* default */ ])(oldTabs));
                                        promise = new Promise(function(res, rej) { res(setTabs(newTabs, 'fullUpdate', urlsToAdd)); });
                                        _context.next = 17;
                                        return promise;
                                    case 17:
                                        result = _context.sent;
                                        closeTabs(itemToAdd);
                                        tabsClosed = itemToAdd.length;
                                        titleString = tabsClosed === 1 ? ' tab saved to new group' : ' tabs saved to new group';
                                        toast({ position: 'bottom-right', status: 'success', duration: 3500, isClosable: true, render: function render(_ref3) { var onClose = _ref3.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: tabsClosed + titleString, subtitle: 'Give it a name and a symbol', type: 'success', colorMode: colorMode }); } });
                                    case 22:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    }));
                    return function saveAndClose(_x) { return _ref2.apply(this, arguments); };
                }();
                var moveToSpace = function moveToSpace(spaceId, categoryId, title) { chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT, function(windowInfo) { saveToSpaceAndClose(spaceId, categoryId, title, windowInfo); }); };
                var saveToSpaceAndClose = /*#__PURE__*/ function() {
                    var _ref4 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee2(spaceId, categoryId, title, windowInfo) {
                        var newData, itemToAdd, dateobj, dateCreated, itemArray, length, titleString, subString, spaceIndex, newTabs, promise, result;
                        return regenerator_default.a.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        newData = Object(toConsumableArray["a" /* default */ ])(tabs); //Date obj stuff
                                        itemToAdd = activeTabs.filter(function(tabs) { return tabs.pinned === false; }); //TODO Add to urls (array)
                                        dateobj = new Date().toString();
                                        dateCreated = dateobj;
                                        itemArray = itemToAdd.map(function(x) { x.dateCreated = dateCreated; return x; });
                                        length = itemToAdd.length;
                                        titleString = length + (length === 1 ? ' tab' : ' tabs') + ' saved';
                                        subString = 'In: ' + title;
                                        spaceIndex = newData.findIndex(function(target) { return target.id === spaceId; });
                                        newTabs = [].concat(Object(toConsumableArray["a" /* default */ ])(newData[spaceIndex].tabs), Object(toConsumableArray["a" /* default */ ])(itemArray));
                                        newData[spaceIndex].tabs = newTabs;
                                        setUserItems(userItems + 1);
                                        promise = new Promise(function(res, rej) { res(setTabs(newData, 'fullUpdate')); });
                                        _context2.next = 15;
                                        return promise;
                                    case 15:
                                        result = _context2.sent;
                                        closeTabs(itemToAdd);
                                        toast({ position: 'bottom-right', status: 'success', duration: 3500, isClosable: true, render: function render(_ref5) { var onClose = _ref5.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: titleString, subtitle: subString, type: 'success', colorMode: colorMode }); } });
                                    case 18:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2);
                    }));
                    return function saveToSpaceAndClose(_x2, _x3, _x4, _x5) { return _ref4.apply(this, arguments); };
                }();
                var closeAllTabs = function closeAllTabs() {
                    var length = activeTabs.length;
                    if (length > 0) {
                        var restore = activeTabs;
                        var itemToClose = activeTabs.filter(function(tabs) { return tabs.pinned === false; });
                        var activeTabsId = itemToClose.map(function(a) { return a.browserId; });
                        chrome.tabs.remove(activeTabsId);
                        setActiveTabs([]);
                        var resClick = function resClick() {
                            setActiveTabs(restore);
                            var filterTabsUrls = restore.map(function(tab) { return tab.url; });
                            var allTabsUrls = filterTabsUrls.filter(function(url) { return url !== ''; });
                            allTabsUrls.forEach(function(element) { chrome.tabs.create({ url: element, active: false }); });
                        };
                        toast({ position: 'bottom-right', status: 'success', duration: 5000, isClosable: true, render: function render(_ref6) { var onClose = _ref6.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, resClick: resClick, title: itemToClose.length + ' tabs closed!', type: 'restore', colorMode: colorMode }); } });
                    } else return;
                };
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Popover["a" /* Popover */ ], {
                    _focus: { outline: '0' } //onOpen={menuOpen}
                    ,
                    onClose: hoverSideOff,
                    zIndex: "2000",
                    autoSelect: "false",
                    usePortal: true
                }, function(_ref7) {
                    var isOpen = _ref7.isOpen,
                        onClose = _ref7.onClose;
                    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Popover["h" /* PopoverTrigger */ ], null, react_default.a.createElement(Button["a" /* default */ ], {
                        zIndex: "3" //isActive={isOpen}
                            /* onClick={() => setMenuIsOpen(true)} */
                            ,
                        rounded: "7px",
                        height: "32px",
                        minWidth: "32px",
                        px: "0px",
                        bg: isOpen ? buttonBgActive[colorMode] : buttonBg[colorMode],
                        boxShadow: isOpen ? mainButtonShadowOpen[colorMode] : mainButtonShadow[colorMode],
                        _hover: { bg: isOpen ? buttonBgActive[colorMode] : hoverMainButton[colorMode] },
                        _active: { transform: 'scale(0.925)' },
                        outline: "none",
                        transition: "transform 0.10s"
                    }, react_default.a.createElement(Icon["a" /* default */ ], { name: "chevronDown", m: "auto", fontSize: "24px", color: iconColor[colorMode], transform: isOpen ? 'scale(0.925)' : '', transition: "transform 0.16s cubic-bezier(0.68,-0.55,0.27,1.55)" }))), react_default.a.createElement(Popover["e" /* PopoverContent */ ], { zIndex: 4, maxWidth: "440px", py: "20px", rounded: "10px", ml: "8px", _focus: { outline: '0' }, bg: color[colorMode], border: colorMode === 'dark' ? 'none' : '', boxShadow: linkShadow[colorMode] }, userPlanBlocked && react_default.a.createElement(Badge["a" /* default */ ], { variantColor: "orange", mx: "20px" }, userState.userPlan === 'trialLimitReached' ? 'Trial limit reached' : 'Plan is paused', ", saves are disabled"), react_default.a.createElement(Popover["b" /* PopoverArrow */ ], { ml: "0px", borderColor: "transparent" }), react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        role: "group",
                        w: "100%",
                        px: "20px",
                        py: "4px",
                        opacity: disableButtons ? '0.4' : '1',
                        cursor: disableButtons ? 'not-allowed' : 'pointer' //pointerEvents={disableButtons ? "none" : "auto"}
                            ,
                        onClick: function onClick() {
                            if (!disableButtons) {
                                addNewSpaceWtabs();
                                onClose();
                            }
                        },
                        _hover: { bg: hoverButton[colorMode] },
                        transition: menuCubic
                    }, react_default.a.createElement(Flex["a" /* default */ ], { h: "80px", alignItems: "center" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { _groupHover: { filter: iconHoverShadow[colorMode] }, filter: disableButtons ? 'grayscale(1)' : '', transition: iconCubic }, react_default.a.createElement(Image["a" /* default */ ], { w: "74px", src: colorMode === 'light' ? AddToNewSpace_default.a : AddToNewSpaceDark_default.a })), react_default.a.createElement(Box["a" /* default */ ], { ml: "24px", maxWidth: "264px" }, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "16px", fontWeight: "600", color: title[colorMode] }, "Save ", howManyTabs, ' ', howManyTabs === 1 ? 'tab' : 'tabs', ' ', "to new group"), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "12px", color: subTitle[colorMode] }, "Create a new untitled group,", ' ', react_default.a.createElement("u", null, "save and close"), " all tabs in this window to it")))), react_default.a.createElement(Accordion["a" /* Accordion */ ], { allowMultiple: true, maxWidth: "100%" }, react_default.a.createElement(Accordion["d" /* AccordionItem */ ], { borderBottomColor: "transparent", borderTopWidth: "0px", isDisabled: disableButtons }, react_default.a.createElement(Accordion["b" /* AccordionHeader */ ], { px: "20px", py: "4px", _focus: { outline: '0' }, _hover: { bg: hoverButton[colorMode] }, _expanded: { backgroundColor: hoverButton[colorMode] }, role: "group", transition: menuCubic }, react_default.a.createElement(Flex["a" /* default */ ], { h: "80px", alignItems: "center" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { _groupHover: { filter: iconHoverShadow[colorMode] }, transition: iconCubic }, react_default.a.createElement(Image["a" /* default */ ], { w: "74px", src: colorMode === 'light' ? MoveToSpace_default.a : MoveToSpaceDark_default.a })), react_default.a.createElement(Box["a" /* default */ ], { ml: "24px", textAlign: "left", maxWidth: "264px" }, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "16px", fontWeight: "600", color: title[colorMode] }, "Move ", howManyTabs, ' ', howManyTabs === 1 ? 'tab' : 'tabs', ' ', "to group"), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "12px", color: subTitle[colorMode] }, react_default.a.createElement("u", null, "Move and close"), " all tabs in this window to a existing group", ' '))), react_default.a.createElement(Accordion["c" /* AccordionIcon */ ], { color: iconSmall[colorMode], marginLeft: "auto", size: "20px" })), react_default.a.createElement(Accordion["e" /* AccordionPanel */ ], { maxWidth: "440px", p: "0px", m: "0px", mt: "4px", maxHeight: "38vh", overflowY: "auto" }, react_default.a.createElement(Box["a" /* default */ ], { px: "0px", m: "0px", height: "100%", width: "100%" }, (tabs === null || tabs === void 0 ? void 0 : tabs.length) > 0 ? tabs.filter(function(group) { return group.slug === undefined; }).map(function(item, index) { return react_default.a.createElement(menuRowMoveTo["a" /* default */ ], { key: index, moveToCategory: moveToSpace, spaceIndex: activeTabs, spaceId: item.id, title: item.title, onClose: onClose, emoji: item.emoji, extraPadding: true }); }) : react_default.a.createElement(Button["a" /* default */ ], { fontSize: "sm", justifyContent: "left", variant: "ghost", rounded: "0px", isDisabled: true, w: "100%" }, "No groups available"))))), react_default.a.createElement(PseudoBox["a" /* default */ ], {
                        role: "group",
                        px: "20px",
                        py: "4px",
                        onClick: function onClick() {
                            closeAllTabs();
                            onClose();
                        },
                        opacity: noTabs ? '0.4' : '1',
                        cursor: noTabs ? 'not-allowed' : 'pointer',
                        _hover: { bg: hoverButton[colorMode] },
                        transition: menuCubic
                    }, react_default.a.createElement(Flex["a" /* default */ ], { h: "80px", alignItems: "center" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { _groupHover: { filter: iconHoverShadow[colorMode] }, transition: iconCubic }, react_default.a.createElement(Image["a" /* default */ ], { w: "74px", src: colorMode === 'light' ? ClearAllTabs_default.a : ClearAllTabsDark_default.a })), react_default.a.createElement(Box["a" /* default */ ], { ml: "24px", maxWidth: "264px" }, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "16px", fontWeight: "600", color: title[colorMode] }, "Clear ", howManyTabs, ' ', howManyTabs === 1 ? 'tab' : 'tabs'), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "12px", color: subTitle[colorMode] }, "Close all current tabs in this window", ' '))))));
                }));
            }; /* harmony default export */
            var activeTabsMenu = (activeTabsMenu_ActiveTabsMenu);
            // EXTERNAL MODULE: ./node_modules/zustand/index.js
            var zustand = __webpack_require__(64);

            // CONCATENATED MODULE: ./src/stores/thumbnailStore.js
            /* global chrome */
            function getFromLocal(_x) { return _getFromLocal.apply(this, arguments); }

            function _getFromLocal() {
                _getFromLocal = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee2(key) {
                    return regenerator_default.a.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", new Promise(function(resolve, reject) { try { chrome.storage.local.get(key, function(value) { resolve(value); }); } catch (ex) { reject(ex); } }));
                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                }));
                return _getFromLocal.apply(this, arguments);
            }
            var useThumbnail = Object(zustand["a" /* default */ ])(function(set, get) {
                return {
                    thumbnailsEnabled: false,
                    setThumbnailsEnabled: function setThumbnailsEnabled(value) { return set(function(state) { return { thumbnailsEnabled: value }; }); },
                    fetchUri: function() {
                        var _fetchUri = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee(url) {
                            return regenerator_default.a.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return getFromLocal(url);
                                        case 2:
                                            return _context.abrupt("return", _context.sent);
                                        case 3:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            }, _callee);
                        }));

                        function fetchUri(_x2) { return _fetchUri.apply(this, arguments); }
                        return fetchUri;
                    }()
                };
            }); /* harmony default export */
            var thumbnailStore = (useThumbnail);
            // CONCATENATED MODULE: ./src/Components/activeTab.js
            /* global chrome */
            var activeTab_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var activeTab_setActiveTabsZu = function setActiveTabsZu(state) { return state.setActiveTabs; };
            var activeTab_tabsZu = function tabsZu(state) { return state.tabs; };
            var activeTab_categoriesZu = function categoriesZu(state) { return state.categories; };
            var fetchUriZu = function fetchUriZu(state) { return state.fetchUri; };
            var clearThumbnailByKeyZu = function clearThumbnailByKeyZu(state) { return state.clearThumbnailByKey; };
            var activeTab_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var activeTab_ActiveTab = function ActiveTab(_ref) {
                var _tabIsSaved$emoji;
                var usePortal = _ref.usePortal,
                    title = _ref.title,
                    isDragging = _ref.isDragging,
                    favIcon = _ref.favIcon,
                    url = _ref.url,
                    browserId = _ref.browserId,
                    hoverSide = _ref.hoverSide,
                    isSelected = _ref.isSelected,
                    pinned = _ref.pinned; //zustate
                var activeTabs = Object(store["a" /* default */ ])(activeTab_activeTabsZu);
                var setActiveTabs = Object(store["a" /* default */ ])(activeTab_setActiveTabsZu);
                var tabs = Object(store["a" /* default */ ])(activeTab_tabsZu);
                var categories = Object(store["a" /* default */ ])(activeTab_categoriesZu);
                var fetchUri = thumbnailStore(fetchUriZu);
                var clearThumbnailByKey = Object(store["a" /* default */ ])(clearThumbnailByKeyZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(activeTab_unselectAllZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var bgColorHover = { light: '#FFF', dark: '#262A2D' };
                var hoverShadow = { light: '0 2px 8px 0 rgba(152,169,185,0.55)', dark: '0 4px 10px 0 rgba(0,0,0,0.80)' };
                var draggingShadow = { light: '0px 0px 0px 2px #44E18C, 0 6px 28px 0 rgba(152,169,185,0.60)', dark: '0px 0px 0px 2px #44E18C, 0 8px 30px 0 rgba(0,0,0,0.85)' };
                var favIconBg = { light: '#FFF', dark: '#3c4042' }; /* alt för darkmode: ##FBFBFB */
                var text = { light: '#1A202C', dark: '#FFF' };
                var weight = { light: '500', dark: '500' };
                var subTitle = { light: 'gray.200', dark: 'gray.700' };
                var tabIsSaved = tabs === null || tabs === void 0 ? void 0 : tabs.find(function(tab) { return tab.tabs.some(function(item) { return item.url === url; }); });
                var tabInCategorie = tabIsSaved ? categories.find(function(cat) { return cat.id === tabIsSaved.categoryID; }) : false;
                var isGitHub = url.startsWith('https://github');
                var gitHubFavIcon = colorMode === 'light' ? 'https://github.githubassets.com/favicons/favicon.svg' : 'https://github.githubassets.com/favicons/favicon-dark.svg'; // Fallback image stuff
                var onLoadSuccess = function onLoadSuccess(e) { if (e.target.naturalHeight + e.target.naturalWidth === 0) { setFallbackActive(true); } };
                var closeTab = function closeTab(e, browserId) {
                    e.preventDefault();
                    chrome.tabs.remove(browserId);
                    var newData = activeTabs.filter(function(item) { return item.browserId !== browserId; });
                    setActiveTabs(newData);
                    unselectAll(); //clearThumbnailByKey(favIcon, tabIsSaved, url);
                };
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    fallbackActive = _useState2[0],
                    setFallbackActive = _useState2[1];
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    loading = _useState4[0],
                    setLoadingState = _useState4[1];
                var fallbackSrc = colorMode === 'light' ? fallBackSvg_default.a : fallBackSvgDark_default.a;
                var favIconSrc = favIcon ? isGitHub ? gitHubFavIcon : favIcon : fallbackSrc;
                var _useState5 = Object(react["useState"])(null),
                    _useState6 = Object(slicedToArray["a" /* default */ ])(_useState5, 2),
                    uri = _useState6[0],
                    setUri = _useState6[1];
                /*   async function getFromLocal(key) {
                    return new Promise((resolve, reject) => {
                      try {
                        chrome.storage.local.get(key, function (value) {
                          resolve(value);
                        });
                      } catch (ex) {
                        reject(ex);
                      }
                    });
                  } */
                var getThumbnailUri = /*#__PURE__*/ function() {
                    var _ref2 = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee() {
                        var data, thumbnailUri;
                        return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return fetchUri(url);
                                    case 2:
                                        data = _context.sent;
                                        thumbnailUri = data[url];
                                        setUri(thumbnailUri);
                                    case 5:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    }));
                    return function getThumbnailUri() { return _ref2.apply(this, arguments); };
                }(); //screenshot stuff
                // checka om thumbnails är aktiverad (global state on/off)
                //state loaded = false
                //onOpen -> getLocal(url) -> loaded = true / error -> not found
                return react_default.a.createElement(Tooltip["a" /* default */ ], { onOpen: function onOpen() { return getThumbnailUri(); }, hasArrow: true, rounded: "6px", px: "12px", py: "6px", placement: "auto-end", label: react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Box["a" /* default */ ], { maxWidth: "248px" }, uri && react_default.a.createElement(Image["a" /* default */ ], { src: uri, w: "100%", mb: "8px", mt: "4px" }), react_default.a.createElement(Text["a" /* default */ ], { fontSize: "md", fontWeight: "bold", maxWidth: "248px", isTruncated: true, letterSpacing: "0.64px" }, title), react_default.a.createElement(Text["a" /* default */ ], { opacity: "0.8", mt: "0px", fontSize: "xs", wordBreak: "break-all", maxWidth: "248px", isTruncated: true, pb: uri && !tabInCategorie ? '8px' : '' }, url.replace(/(^\w+:|^)\/\//, '')), pinned && react_default.a.createElement(Text["a" /* default */ ], { mt: "0px", fontWeight: "700" }, react_default.a.createElement(Icon["a" /* default */ ], { name: "flagIcon", mr: "4px", mt: "-2px" }), "Pinned"), tabInCategorie && react_default.a.createElement(Text["a" /* default */ ], { mt: "4px", fontWeight: "500", color: subTitle[colorMode], pb: "8px" }, tabIsSaved ? (tabIsSaved.type === 'textCopied' ? 'Textselection saved in' : 'Saved in ') + tabIsSaved.emoji + ' ' + tabIsSaved.title + '(' + tabInCategorie.name + ')' : ''))), zIndex: "100" }, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    userSelect: "none",
                    mt: "10px",
                    ml: "-4px",
                    borderRadius: "6px",
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    textAlign: "left",
                    bg: usePortal || isSelected && hoverSide ? bgColorHover[colorMode] : '',
                    boxShadow: isSelected && hoverSide ? '0px 0px 0px 1px #44E18C, 0 0px 3px 2px #00E58380' : usePortal ? draggingShadow[colorMode] : '' //border={usePortal ? "1px solid #41E18B" : "none"}
                        //cursor={"grab"}
                        ,
                    _active: { cursor: 'grabbing' } //bg={snapshot.isDragging ? "blue.100" : "transparent"}
                    //Fix: Byt denna till framer motion(?)
                    ,
                    _hover: { transform: isSelected ? '' : !isDragging ? 'translateY(-1px)' : '', boxShadow: isSelected ? '' : !isDragging ? hoverShadow[colorMode] : '', cursor: 'grab', bg: !isDragging ? bgColorHover[colorMode] : '' },
                    transition: "all 0.16s cubic-bezier(.374,.019,.035,1.861), ",
                    role: "group",
                    zIndex: "2"
                }, isSelected && !hoverSide && !usePortal && react_default.a.createElement(Box["a" /* default */ ], { pos: "absolute", top: "0px", left: "0px", bg: "red", height: "44px", width: "40px", borderRadius: "6px", boxShadow: "0px 0px 0px 1px #44E18C, 0 0px 3px 2px #00E58380" }), react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", position: "relative", ml: "4px" }, react_default.a.createElement(PseudoBox["a" /* default */ ], { opacity: pinned ? 0.6 : 1, transition: "all 0.15s cubic-bezier(.374,.019,.035,1.861)", display: "flex", alignItems: "center", rounded: "8px", minWidth: "32px", minHeight: "32px", bg: favIconBg[colorMode], boxShadow: usePortal || isSelected ? '0 0px 0px 0px rgba(78,80,81,0.0)' : '0 1px 6px -1px rgba(78,80,81,0.30)', _groupHover: { boxShadow: '0 0px 0px 0px rgba(78,80,81,0.0)', bg: favIconBg[colorMode] }, mr: "16px", my: "6px" }, react_default.a.createElement("img", { src: fallbackActive ? fallbackSrc : favIconSrc, alt: "Fav icon", height: "24px", width: "24px", onError: function onError() { return setFallbackActive(true); }, onLoad: function onLoad(e) { return onLoadSuccess(e); }, style: { margin: 'auto', borderRadius: '2px', transform: loading ? 'scale(0.5)' : '', transition: loading ? '0.2s linear' : '', fontSize: '8px', textAlign: 'center', fontWeight: '500', maxWidth: '24px', maxHeight: '24px' } })), react_default.a.createElement(Flex["a" /* default */ ], { mr: "16px", flexDirection: "column" }, react_default.a.createElement(Text["a" /* default */ ], {
                    width: "128px" //onClick={(e) => e.stopPropagation()}
                        ,
                    my: "auto",
                    opacity: hoverSide || usePortal ? '1' : '0',
                    transition: "opacity 0.45s cubic-bezier(.374,.019,.035,1.861)",
                    letterSpacing: "0.30px",
                    color: text[colorMode],
                    fontWeight: weight[colorMode],
                    fontSize: "14px",
                    isTruncated: true
                }, title))), tabIsSaved ? react_default.a.createElement(PseudoBox["a" /* default */ ], { _groupHover: { transform: !isDragging ? 'scale(0.5) translateY(2px)' : 'scale(1) translateY(0px)', opacity: !isDragging ? '0' : '1' }, borderRadius: "50%", position: "absolute", right: "6px", display: "flex", alignItems: "center", transition: "0.25s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Text["a" /* default */ ], { fontSize: "18px" }, ((_tabIsSaved$emoji = tabIsSaved.emoji) === null || _tabIsSaved$emoji === void 0 ? void 0 : _tabIsSaved$emoji.length) > 10 ? react_default.a.createElement(Image["a" /* default */ ], { src: tabIsSaved.emoji, minW: "22px", minH: "22px", maxW: "22px", maxH: "22px", overflow: "hidden", rounded: "2px" }) : tabIsSaved.emoji)) : '', react_default.a.createElement(PseudoBox["a" /* default */ ], { as: "button", onClick: function onClick(e) { return closeTab(e, browserId); }, outline: "none", _groupHover: { opacity: !isDragging || usePortal ? '1' : '' }, transform: "scale(0.9)", _active: { transform: 'scale(0.8)', bg: 'gray.300' }, opacity: "0", position: "absolute", right: "8px", p: "2px", rounded: "50%", bg: "gray.100", display: "flex", alignItems: "center", cursor: "pointer", _hover: { bg: 'gray.200', transform: 'scale(1)', filter: 'brightness(0.9)' }, transition: "0.22s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", fontSize: "1.125rem", color: "gray.700", name: "small-close" }))));
            }; /* harmony default export */
            var activeTab = (Object(react["memo"])(activeTab_ActiveTab));
            // EXTERNAL MODULE: ./src/Images/EmptyState_Tabs.png
            var EmptyState_Tabs = __webpack_require__(160);
            var EmptyState_Tabs_default = /*#__PURE__*/ __webpack_require__.n(EmptyState_Tabs);

            // EXTERNAL MODULE: ./src/Images/EmptyState_TabsDark.png
            var EmptyState_TabsDark = __webpack_require__(161);
            var EmptyState_TabsDark_default = /*#__PURE__*/ __webpack_require__.n(EmptyState_TabsDark);

            // CONCATENATED MODULE: ./src/Components/activeTabsList.js
            /* global chrome */
            var activeTabsList_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; }; //DndStore
            var activeTabsList_toggleSelectionZu = function toggleSelectionZu(state) { return state.toggleSelection; };
            var activeTabsList_toggleSelectionInGroupZu = function toggleSelectionInGroupZu(state) { return state.toggleSelectionInGroup; };
            var activeTabsList_selectedItemsZu = function selectedItemsZu(state) { return state.selectedItems; };
            var activeTabsList_draggingItemIdZu = function draggingItemIdZu(state) { return state.draggingItemId; };
            var activeTabsList_multiSelectToZu = function multiSelectToZu(state) { return state.multiSelectTo; };
            var blockNewNoteZu = function blockNewNoteZu(state) { return state.blockNewNote; };
            var activeTabsList_PortalAwareItem = function PortalAwareItem(_ref) {
                var provided = _ref.provided,
                    snapshot = _ref.snapshot,
                    title = _ref.title,
                    hoverSide = _ref.hoverSide,
                    url = _ref.url,
                    favIcon = _ref.favIcon,
                    browserId = _ref.browserId,
                    _onClick = _ref.onClick,
                    _onKeyDown = _ref.onKeyDown,
                    showSelectionCount = _ref.showSelectionCount,
                    tabId = _ref.tabId,
                    disAppearTask = _ref.disAppearTask,
                    isSelected = _ref.isSelected,
                    count = _ref.count,
                    pinned = _ref.pinned;
                var usePortal = snapshot.isDragging;
                var child = react_default.a.createElement(Box["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, provided.dragHandleProps, { onClick: function onClick(e) { return _onClick(e, tabId); }, onKeyDown: function onKeyDown(event) { return _onKeyDown(event, provided, snapshot, tabId); }, opacity: disAppearTask ? '0.5' : '1', outline: "none" }), react_default.a.createElement(activeTab, { usePortal: usePortal, title: title, hoverSide: hoverSide, isDragging: usePortal, url: url, favIcon: favIcon, browserId: browserId, isSelected: isSelected, pinned: pinned }), showSelectionCount && react_default.a.createElement(selectionCount, { count: count })); // if dragging - put the item in a portal
                if (!usePortal) { return child; } else { return react_default.a.createElement(portal["a" /* Portal */ ], null, child); }
            };
            var activeTabsList_ActiveTabsList = function ActiveTabsList(_ref2) {
                var setHoverSide = _ref2.setHoverSide,
                    hoverSide = _ref2.hoverSide,
                    hoverSideOn = _ref2.hoverSideOn; //Zustate
                var activeTabs = Object(store["a" /* default */ ])(activeTabsList_activeTabsZu); //Dndstore
                var toggleSelection = Object(dndStore["a" /* default */ ])(activeTabsList_toggleSelectionZu);
                var toggleSelectionInGroup = Object(dndStore["a" /* default */ ])(activeTabsList_toggleSelectionInGroupZu);
                var selectedItems = Object(dndStore["a" /* default */ ])(activeTabsList_selectedItemsZu);
                var draggingItemId = Object(dndStore["a" /* default */ ])(activeTabsList_draggingItemIdZu);
                var multiSelectTo = Object(dndStore["a" /* default */ ])(activeTabsList_multiSelectToZu);
                var blockNewNote = Object(dndStore["a" /* default */ ])(blockNewNoteZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var isDraggedOverBg = { light: 'rgb(130, 139, 154, 0.1)', dark: 'rgb(255, 255, 255, 0.05)' }; //Only reason is that when activeTabMenu is closed and user is still hovering list it should be open
                var hoverCheck = function hoverCheck() {
                    if (hoverSide === false) { // setHoverSide(true);
                        hoverSideOn();
                    }
                }; //MultiDrag stuff
                var keyCodes = { enter: 13, escape: 27, arrowDown: 40, arrowUp: 38, tab: 9 };
                var onKeyDown = function onKeyDown(event, provided, snapshot, itemId) {
                    /* if (provided.dragHandleProps) {
                          provided.dragHandleProps.onKeyDown(event);
                        } */
                    /* if (noteStatus === true) {
                         return;
                       } */
                    if (event.defaultPrevented) { return; }
                    if (snapshot.isDragging) { return; }
                    if (event.keyCode !== keyCodes.enter) { return; } // we are using the event for selection
                    event.preventDefault();
                    performAction(event, itemId);
                };
                var onClick = function onClick(event, itemId) {
                    /* if (noteStatus === true) {
                          return;
                        } */
                    if (event.defaultPrevented) { return; }
                    if (event.button !== 0) { return; } // marking the event as used
                    event.preventDefault();
                    performAction(event, itemId);
                }; // Determines if the platform specific toggle selection in group key was used
                /*   const wasToggleInSelectionGroupKeyUsed = (event) => {
                    const isUsingWindows =
                      navigator.userAgentData?.platform.indexOf("Win") >= 0;
                    return isUsingWindows ? event.ctrlKey : event.metaKey;
                  }; */ // Determines if the multiSelect key was used
                var wasMultiSelectKeyUsed = function wasMultiSelectKeyUsed(event) { return event.shiftKey; };
                var performAction = function performAction(event, itemId) { if (event.ctrlKey || event.metaKey) { toggleSelectionInGroup(itemId, true); return; } if (wasMultiSelectKeyUsed(event)) { multiSelectTo(activeTabs, itemId, 0, true); return; } toggleSelection(itemId, true); };
                var getSelectedMap = Object(memoize_one_esm["a" /* default */ ])(function(items) { return items.reduce(function(previous, current) { previous[current] = true; return previous; }, {}); });
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { droppableId: "activeList", type: "tab", isDropDisabled: !hoverSide }, function(provided, snapshot) {
                    return react_default.a.createElement(PseudoBox["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, {
                        outline: "none",
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '12px',
                            overflow: 'visible',
                            paddingBottom: '16px',
                            paddingRight: '30px',
                            paddingLeft: '24px'
                            /* backgroundColor: snapshot.isDraggingOver
                                            ? "rgb(65, 225, 139, 0.1)"
                                            : "transparent", */
                        }
                    }), react_default.a.createElement(Box["a" /* default */ ], {
                        backgroundColor: snapshot.isDraggingOver ? isDraggedOverBg[colorMode] : 'transparent' //bg="rgb(65, 225, 139, 0.1)"
                            ,
                        transition: "background-color 1s ease",
                        h: "100%",
                        w: "264px",
                        position: "fixed",
                        zIndex: "1",
                        top: "0",
                        left: "0",
                        outline: "none"
                    }), activeTabs.length > 0 ? activeTabs.map(function(tab, index) { var isSelected = Boolean(getSelectedMap(selectedItems)[tab.id]); var disAppearTask = false; if (isSelected && draggingItemId && tab.id !== draggingItemId) { disAppearTask = true; } return react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], { draggableId: tab.id.toString(), index: index, key: tab.id, style: { overflow: 'visible', outline: 'none' }, onMouseEnter: function onMouseEnter() { return hoverCheck(); } }, function(provided, snapshot) { var showSelectionCount = snapshot.isDragging && (selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) > 1; return react_default.a.createElement(activeTabsList_PortalAwareItem, { tabId: tab.id, title: tab.title, pinned: tab.pinned ? true : false, hoverSide: hoverSide, url: tab.url, favIcon: tab.favIcon, browserId: tab.browserId, provided: provided, snapshot: snapshot, onClick: onClick, onKeyDown: onKeyDown, showSelectionCount: showSelectionCount, disAppearTask: disAppearTask, isSelected: isSelected, count: selectedItems.length }); }); }) : react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column", m: "auto", alignItems: "center", pb: "84px", opacity: hoverSide ? '1' : '0', transition: "opacity 0.35s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement(Image["a" /* default */ ], { mt: "4px", src: colorMode === 'light' ? EmptyState_Tabs_default.a : EmptyState_TabsDark_default.a, size: "132px" }), react_default.a.createElement(Text["a" /* default */ ], { color: "gray.500", mt: "14px", opacity: "0.8", fontSize: "16px", fontWeight: "medium", textAlign: "left" }, "No open tabs, neat!")), provided.placeholder);
                }));
            }; /* harmony default export */
            var activeTabsList = (Object(react["memo"])(activeTabsList_ActiveTabsList));
            // CONCATENATED MODULE: ./src/Utils/usePageVisibility.js
            function getBrowserVisibilityProp() {
                if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
                    return "visibilitychange";
                } else if (typeof document.msHidden !== "undefined") { return "msvisibilitychange"; } else if (typeof document.webkitHidden !== "undefined") { return "webkitvisibilitychange"; }
            }

            function getBrowserDocumentHiddenProp() { if (typeof document.hidden !== "undefined") { return "hidden"; } else if (typeof document.msHidden !== "undefined") { return "msHidden"; } else if (typeof document.webkitHidden !== "undefined") { return "webkitHidden"; } }

            function getIsDocumentHidden() { return !document[getBrowserDocumentHiddenProp()]; }

            function usePageVisibility() {
                var _useState = Object(react["useState"])(getIsDocumentHidden()),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    isVisible = _useState2[0],
                    setIsVisible = _useState2[1];
                var onVisibilityChange = function onVisibilityChange() { return setIsVisible(getIsDocumentHidden()); };
                Object(react["useEffect"])(function() {
                    var visibilityChange = getBrowserVisibilityProp();
                    document.addEventListener(visibilityChange, onVisibilityChange, false);
                    return function() { document.removeEventListener(visibilityChange, onVisibilityChange); };
                });
                return isVisible;
            } /* harmony default export */
            var Utils_usePageVisibility = (usePageVisibility);
            // CONCATENATED MODULE: ./src/Components/activeTabsContainer.js
            /* global chrome */
            var activeTabsContainer_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var activeTabsContainer_setActiveTabsZu = function setActiveTabsZu(state) { return state.setActiveTabs; };
            var clearUnusedThumbnailZu = function clearUnusedThumbnailZu(state) { return state.clearUnusedThumbnail; };
            var updateActiveTabsZu = function updateActiveTabsZu(state) { return state.updateActiveTabs; };
            var activeTabsContainer_ActiveTabsContainer = function ActiveTabsContainer(_ref) {
                var setHoverSide = _ref.setHoverSide,
                    hoverSideOn = _ref.hoverSideOn,
                    hoverSideOff = _ref.hoverSideOff,
                    hoverSide = _ref.hoverSide,
                    spaceLimitNotReached = _ref.spaceLimitNotReached; //ZuState
                var activeTabs = Object(store["a" /* default */ ])(activeTabsContainer_activeTabsZu);
                var setActiveTabs = Object(store["a" /* default */ ])(activeTabsContainer_setActiveTabsZu);
                var clearUnusedThumbnail = Object(store["a" /* default */ ])(clearUnusedThumbnailZu);
                var updateActiveTabs = Object(store["a" /* default */ ])(updateActiveTabsZu); //Colorstuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var activeTabsHeading = { light: 'gray.600', dark: 'gray.300' };
                var fadeActiveTop = { light: 'linear-gradient(180deg, #F0F1F2 0%, rgba(240,241,242,0.00) 100%)', dark: 'linear-gradient(0deg, rgba(252,253,254,0.00) 0%, #0e1013 100%)' }; //State
                var _useState = Object(react["useState"])(true),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    isLoadingActive = _useState2[0],
                    setIsLoadingActive = _useState2[1];
                var isVisible = Utils_usePageVisibility(); //runs once, on initial load
                Utils_useMountEffect(function() {
                    updateActiveTabsInner();
                    setIsLoadingActive(false);
                });
                var updateActiveTabsInner = function updateActiveTabsInner() { if (isVisible === true) { updateActiveTabs(); } }; //  Handler for changes to activeTabs(current open tabs in window)
                var onUpdatedHandler = function onUpdatedHandler(id, tabInfo, tab) { if (tab.url !== undefined && tab.url !== 'chrome://newtab/' && !tab.url.includes('chrome://') && tab.url !== 'edge://newtab/' && tabInfo.status === 'complete') { updateActiveTabsInner(); } };
                var onUpdatedHandlerRef = Object(react["useRef"])();
                Object(react["useEffect"])(function() { if (onUpdatedHandlerRef.current) { chrome.tabs.onUpdated.removeListener(onUpdatedHandlerRef.current); } chrome.tabs.onUpdated.addListener(onUpdatedHandler); }, []);
                Object(react["useEffect"])(function() { onUpdatedHandlerRef.current = onUpdatedHandler; }, []);
                var onAttachedHandler = function onAttachedHandler(id, tabInfo, tab) { updateActiveTabsInner(); };
                var onAttachedRef = Object(react["useRef"])();
                Object(react["useEffect"])(function() {
                    if (onAttachedRef.current) {
                        chrome.tabs.onDetached.removeListener(onAttachedRef.current);
                        chrome.tabs.onAttached.removeListener(onAttachedRef.current);
                        chrome.tabs.onMoved.removeListener(onAttachedRef.current);
                        chrome.tabs.onRemoved.removeListener(onAttachedRef.current);
                    }
                    chrome.tabs.onDetached.addListener(onAttachedHandler);
                    chrome.tabs.onAttached.addListener(onAttachedHandler);
                    chrome.tabs.onMoved.addListener(onAttachedHandler);
                    chrome.tabs.onRemoved.addListener(onAttachedHandler);
                }, []);
                Object(react["useEffect"])(function() { onAttachedRef.current = onAttachedHandler; }, []);
                var howManyTabs = activeTabs !== undefined && activeTabs.length > 0 ? activeTabs.filter(function(tabs) { return tabs.pinned === false; }).length : 0;
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Flex["a" /* default */ ], { height: "58px", pb: "10px", alignItems: "center", pl: "24px", pr: "18px", mt: "24px" }, react_default.a.createElement(activeTabsMenu, { setHoverSide: setHoverSide, hoverSideOn: hoverSideOn, hoverSideOff: hoverSideOff, hoverSide: hoverSide, spaceLimitNotReached: spaceLimitNotReached }), react_default.a.createElement(Text["a" /* default */ ], { zIndex: "3", ml: "14px", letterSpacing: "0.9px", color: activeTabsHeading[colorMode], fontSize: "14px", opacity: hoverSide ? '1' : '0', transition: "opacity 0.45s cubic-bezier(.374,.019,.035,1.861)" }, react_default.a.createElement("b", { color: "gray.900" }, howManyTabs), " ACTIVE TABS")), react_default.a.createElement(Box["a" /* default */ ] /* pl="24px" pr="18px" pb="64px" */ , { maxHeight: "calc(100vh - 82px)", overflow: "auto", className: colorMode === 'dark' ? 'groupScrollAreaDarkHover' : 'groupScrollAreaHover' }, !isLoadingActive ? react_default.a.createElement(activeTabsList, { setHoverSide: setHoverSide, hoverSideOn: hoverSideOn, hoverSideOff: hoverSideOff, hoverSide: hoverSide }) : ''), react_default.a.createElement(Box["a" /* default */ ], { position: "absolute", top: "82px", h: "8px", w: "90%", backgroundImage: fadeActiveTop[colorMode] }));
            }; /* harmony default export */
            var activeTabsContainer = (activeTabsContainer_ActiveTabsContainer);
            // CONCATENATED MODULE: ./src/hooks/useWindowSize.js
            // Hook
            function useWindowSize() { // Initialize state with undefined width/height so server and client renders match
                // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
                var _useState = Object(react["useState"])({ width: undefined, height: undefined }),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    windowSize = _useState2[0],
                    setWindowSize = _useState2[1];
                Object(react["useEffect"])(function() { // Handler to call on window resize
                    function handleResize() { // Set window width/height to state
                        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
                    } // Add event listener
                    window.addEventListener("resize", handleResize); // Call handler right away so state gets updated with initial window size
                    handleResize(); // Remove event listener on cleanup
                    return function() { return window.removeEventListener("resize", handleResize); };
                }, []); // Empty array ensures that effect is only run on mount
                return windowSize;
            } /* harmony default export */
            var hooks_useWindowSize = (useWindowSize);
            // EXTERNAL MODULE: ./src/fx/popFx.mp3
            var popFx = __webpack_require__(162);
            var popFx_default = /*#__PURE__*/ __webpack_require__.n(popFx);

            // CONCATENATED MODULE: ./src/Components/sitesToolbar.js
            /* global chrome */ //const setDoneStatusZu = (state) => state.setDoneStatus;
            //sttorexw
            var sitesToolbar_tabsZu = function tabsZu(state) { return state.tabs; };
            var sitesToolbar_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var sitesToolbar_categoriesZu = function categoriesZu(state) { return state.categories; };
            var sitesToolbar_moveTabToSpaceZu = function moveTabToSpaceZu(state) { return state.moveTabToSpace; };
            var moveSelectionToSpaceZu = function moveSelectionToSpaceZu(state) { return state.moveSelectionToSpace; };
            var sitesToolbar_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var sitesToolbar_setActiveTabsZu = function setActiveTabsZu(state) { return state.setActiveTabs; };
            var addOneSaveZu = function addOneSaveZu(state) { return state.addOneSave; };
            var sitesToolbar_deleteOrCloseZu = function deleteOrCloseZu(state) { return state.deleteOrClose; };
            var sitesToolbar_sharedHydratedZu = function sharedHydratedZu(state) { return state.sharedHydrated; };
            var sitesToolbar_fetchPublichInMenuZu = function fetchPublichInMenuZu(state) { return state.fetchPublichInMenu; };
            var sitesToolbar_setLoadingMenuCatsZu = function setLoadingMenuCatsZu(state) { return state.setLoadingMenuCats; };
            var sitesToolbar_isLoadingMenuCatsZu = function isLoadingMenuCatsZu(state) { return state.isLoadingMenuCats; }; //Dndstore
            var sitesToolbar_selectedItemsZu = function selectedItemsZu(state) { return state.selectedItems; };
            var sitesToolbar_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var sitesToolbar_activeTabSelectionZu = function activeTabSelectionZu(state) { return state.activeTabSelection; };
            var sitesToolbar_setKeepSelectionZu = function setKeepSelectionZu(state) { return state.setKeepSelection; };
            var sitesToolbar_SitesToolbar = function SitesToolbar() {
                var categorySelected = +localStorage.getItem('categorySelected');
                var tabs = Object(store["a" /* default */ ])(sitesToolbar_tabsZu);
                var categories = Object(store["a" /* default */ ])(sitesToolbar_categoriesZu);
                var moveTabToSpace = Object(store["a" /* default */ ])(sitesToolbar_moveTabToSpaceZu);
                var moveSelectionToSpace = Object(store["a" /* default */ ])(moveSelectionToSpaceZu);
                var activeTabs = Object(store["a" /* default */ ])(sitesToolbar_activeTabsZu);
                var setActiveTabs = Object(store["a" /* default */ ])(sitesToolbar_setActiveTabsZu);
                var addOneSave = Object(store["a" /* default */ ])(addOneSaveZu);
                var deleteOrClose = Object(store["a" /* default */ ])(sitesToolbar_deleteOrCloseZu);
                var sharedHydrated = Object(store["a" /* default */ ])(sitesToolbar_sharedHydratedZu);
                var fetchPublichInMenu = Object(store["a" /* default */ ])(sitesToolbar_fetchPublichInMenuZu);
                var setLoadingMenuCats = Object(store["a" /* default */ ])(sitesToolbar_setLoadingMenuCatsZu);
                var isLoadingMenuCats = Object(store["a" /* default */ ])(sitesToolbar_isLoadingMenuCatsZu);
                var setTabs = Object(store["a" /* default */ ])(sitesToolbar_setTabsZu);
                var selectedItems = Object(dndStore["a" /* default */ ])(sitesToolbar_selectedItemsZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(sitesToolbar_unselectAllZu);
                var activeTabSelection = Object(dndStore["a" /* default */ ])(sitesToolbar_activeTabSelectionZu);
                var setKeepSelection = Object(dndStore["a" /* default */ ])(sitesToolbar_setKeepSelectionZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var color = { light: '#FFF', dark: '#262A2D' };
                var border = { light: 'gray.200', dark: '#3F454D' };
                var picker = { light: '#FFF', dark: '#3F454D' };
                var text = { light: 'gray.700', dark: '#FFFFFF' };
                var iconDarkerColor = { light: 'gray.600', dark: '#A1A2A4' };
                var toolBarShadow = { light: '0 20px 20px -18px rgba(152,169,185,0.85), 0 0px 10px -4px rgba(152,169,185,0.75)', dark: '0 20px 20px -18px rgba(0,0,0,0.9), 0 0px 10px -4px rgba(0,0,0,0.85)' };
                var linkShadow = { light: '2px 5px 35px 0 rgba(0,0,0,0.30)', dark: '2px 5px 34px 0 rgba(0,0,0,0.80)' };
                var hoverButton = { light: 'gray.100', dark: '#32363A' };
                var iconSmall = { light: 'gray.700', dark: '#FFF' };
                /* const ref = useRef();
                  useOutsideClick(ref, () => {
                  });
                 */ //framer motion stuff
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]); //`${commentBgColor[colorMode]}`
                var toast = Object(Toast["a" /* default */ ])();
                /* const resClick = (itemToRes) => {
                        let restoreTabs = [...tabs];
                        //[1: y,2: y,3: y] [1: x ,2: _,3: x]
                        restoreTabs.forEach((space, index) => {
                            if (itemToRes[index] !== null) {
                                restoreTabs[index].tabs = itemToRes[index];
                            }
                        });
                        setTabs(restoreTabs, 'deleteUpdate');
                    }; */
                var deleteAction = function deleteAction() {
                    deleteOrClose(activeTabSelection, selectedItems);
                    setKeepSelection(false);
                    unselectAll();
                };
                var moveToSpace = function moveToSpace(toSpace, fromSpace, title, toCategory) {
                    if (activeTabSelection) { moveActiveTabsToSpace(toSpace, title); } else {
                        var selectionLength = selectedItems.length;
                        if (selectionLength === 1) { //Move one item
                            var tabId = selectedItems[0];
                            var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === tabId; }); }).id;
                            moveTabToSpace(toSpace, spaceId, tabId);
                        } else { //move multiple items
                            moveSelectionToSpace(toSpace, selectedItems);
                        }
                        unselectAll();
                        var toastTitle = selectionLength === 1 ? selectionLength + ' item moved' : selectionLength + ' items moved';
                        var toastSubtitle = 'into ' + title;
                        toast({ position: 'bottom-right', status: 'success', duration: 4200, isClosable: true, render: function render(_ref) { var onClose = _ref.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: toastTitle, subtitle: toastSubtitle, type: 'success', colorMode: colorMode }); } });
                    }
                }; //duplicate of stores
                var saveToPublicData = function saveToPublicData(newData, slug) {
                    var filteredData = newData.filter(function(group) { return group.slug === slug; });
                    chrome.runtime.sendMessage({ msg: 'updatePublicData', slug: slug, sharedData: { tabData: filteredData }, allTabData: { tabData: newData }, wsData: { categories: categories } });
                };
                var moveActiveTabsToSpace = function moveActiveTabsToSpace(toSpace, title) {
                    var selectionLength = selectedItems.length;
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var newActiveTabs = Object(toConsumableArray["a" /* default */ ])(activeTabs);
                    var toSpaceIndex = newData.findIndex(function(space) { return space.id === toSpace; });
                    var toGroup = newData.filter(function(gr) { return gr.id === toSpace; })[0];
                    var isPublicCat = toGroup.slug ? true : false;
                    if (selectionLength === 1) { //Move one item
                        var tabId = selectedItems[0];
                        var activeTabIndex = newActiveTabs.findIndex(function(tab) { return tab.id === tabId; });
                        var payload = newActiveTabs[activeTabIndex];
                        var newId = Object(v1["a" /* default */ ])();
                        payload.id = newId;
                        var dateCreated = new Date().toString();
                        payload.dateCreated = dateCreated;
                        newActiveTabs.splice(activeTabIndex, 1);
                        newData[toSpaceIndex].tabs.push(payload);
                        var browserId = payload.browserId;
                        chrome.tabs.remove(browserId);
                        addOneSave();
                        setActiveTabs(newActiveTabs);
                        if (!isPublicCat) { setTabs(newData, 'fullUpdate'); } else if (isPublicCat) { saveToPublicData(newData, toGroup.slug); }
                    } else {
                        var _newData$toSpaceIndex;
                        var multiPayload = [];
                        var browserIdsToClose = [];
                        selectedItems.forEach(function(id) {
                            var activeTabIndex = newActiveTabs.findIndex(function(tab) { return tab.id === id; });
                            var payload = newActiveTabs[activeTabIndex];
                            var newId = Object(v1["a" /* default */ ])();
                            payload.id = newId;
                            var dateCreated = new Date().toString();
                            payload.dateCreated = dateCreated;
                            newActiveTabs.splice(activeTabIndex, 1);
                            var browserId = payload.browserId;
                            browserIdsToClose.push(browserId);
                            multiPayload.push(payload);
                        });
                        chrome.tabs.remove(browserIdsToClose);
                        (_newData$toSpaceIndex = newData[toSpaceIndex].tabs).push.apply(_newData$toSpaceIndex, multiPayload);
                        addOneSave();
                        if (!isPublicCat) { setTabs(newData, 'fullUpdate'); } else if (isPublicCat) { saveToPublicData(newData, toGroup.slug); } setActiveTabs(newActiveTabs);
                    }
                    unselectAll();
                    var toastTitle = selectionLength === 1 ? selectionLength + ' tab saved' : selectionLength + ' tabs saved';
                    var toastSubtitle = 'into ' + title;
                    toast({ position: 'bottom-right', status: 'success', duration: 4200, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: toastTitle, subtitle: toastSubtitle, type: 'success', colorMode: colorMode }); } });
                };
                var mergeToStack = function mergeToStack() {
                    var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                    var multiPayload = [];
                    var firstTabIndex;
                    selectedItems.forEach(function(id, index) {
                        var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                        var spaceIdIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                        var tabPayload = newData[spaceIdIndex].tabs.filter(function(tab) { return tab.id === id; })[0];
                        if (tabPayload.isStacked || tabPayload.note) { return; } delete tabPayload.groupId;
                        delete tabPayload.pinned;
                        delete tabPayload.saved;
                        delete tabPayload.browserId;
                        delete tabPayload.active;
                        multiPayload.push(tabPayload);
                        var tabIndex = tabs[spaceIdIndex].tabs.findIndex(function(item) { return item.id === id; });
                        if (index === 0) { firstTabIndex = { spaceIndex: spaceIdIndex, tabIndex: tabIndex }; } else if (!firstTabIndex) { return; } newData[spaceIdIndex].tabs.splice(tabIndex, 1);
                    });
                    if (!firstTabIndex) { return; }
                    var newDate = new Date().toString();
                    var stackItem = { id: Object(v1["a" /* default */ ])(), dateCreated: newDate, isStacked: true, stackedItems: multiPayload };
                    newData[firstTabIndex.spaceIndex].tabs.splice([firstTabIndex.tabIndex], 0, stackItem);
                    setTabs(newData, 'deleteUpdate');
                    var title = multiPayload.length + ' Items stacked';
                    toast({
                        position: 'bottom-right',
                        status: 'success',
                        duration: 4200,
                        isClosable: true,
                        render: function render(_ref3) {
                            var onClose = _ref3.onClose;
                            return react_default.a.createElement(toastPopper["a" /* default */ ], {
                                title: title //subtitle={toastSubtitle}
                                    ,
                                type: 'success',
                                colorMode: colorMode
                            });
                        }
                    });
                    unselectAll();
                };
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    moveToBoxOpen = _useState2[0],
                    setMoveToBoxOpen = _useState2[1]; //const [heightOfCategories, setHeightOfCategories] = useState(null);
                var moveToBoxClick = function moveToBoxClick() {
                    setMoveToBoxOpen(!moveToBoxOpen); //setblockNewNote(!moveToBoxOpen);
                };
                var _useState3 = Object(react["useState"])(false),
                    _useState4 = Object(slicedToArray["a" /* default */ ])(_useState3, 2),
                    catsLoading = _useState4[0],
                    setCatsLoading = _useState4[1];
                var headerClick = function headerClick(category, catIndex) {
                    if (category.slug) {
                        setLoadingMenuCats(true); //check if its fetched
                        var slug = category.slug;
                        if (!sharedHydrated.includes(slug)) { fetchPublichInMenu(slug); } else { setLoadingMenuCats(false); }
                    } else { return; }
                };
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(PseudoBox["a" /* default */ ], {
                    onMouseEnter: function onMouseEnter() { return setKeepSelection(true); },
                    onMouseLeave: function onMouseLeave() { return setKeepSelection(false); },
                    zIndex: "1000",
                    position: "fixed" //pt="4px"
                        ,
                    bottom: "24px",
                    left: "50%",
                    ml: "-155px",
                    w: "310px",
                    height: "52px",
                    rounded: "10px",
                    cursor: "default",
                    transform: moveToBoxOpen ? '1' : 'scale(0.9475)',
                    _hover: { transform: 'scale(1)' },
                    transition: "transform 0.24s cubic-bezier(.374,.019,.035,1.861)",
                    willChange: "transform"
                }, react_default.a.createElement(Flex["a" /* default */ ], { pl: "16px", pr: "8px", w: "100%", h: "100%", bg: color[colorMode], rounded: "8px", boxShadow: toolBarShadow[colorMode] }, react_default.a.createElement(Flex["a" /* default */ ], { alignItems: "center", w: "100%", position: "relative" }, react_default.a.createElement(Tooltip["a" /* default */ ], { label: "Items selected", showDelay: "160", zIndex: "2000", placement: "auto-start" }, react_default.a.createElement(MotionBox, { initial: { scale: 0.6 }, animate: { scale: 1 }, border: "2px solid #44E18C", p: "2px", mr: "16px", rounded: "6px" }, react_default.a.createElement(Text["a" /* default */ ], { color: text[colorMode], w: "30px", fontSize: "18px", fontWeight: "600", textAlign: "center", userSelect: "none" }, selectedItems.length))), react_default.a.createElement(Box["a" /* default */ ], { width: "1px", height: "100%", opacity: "0.8", bg: border[colorMode], zIndex: "1" }), react_default.a.createElement(Button["a" /* default */ ], { onClick: function onClick() { return moveToBoxClick(); }, rightIcon: "chevron-up", color: text[colorMode], ml: "12px", width: "148px", height: "34px", transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)" }, "Move to"), moveToBoxOpen && react_default.a.createElement(PseudoBox["a" /* default */ ] //mt={heightOfCategories === null ? "-8px" : heightOfCategories}
                    //mt={heightOfCategories === null ? "-8px" : heightOfCategories}
                    , { position: "absolute", bottom: "58px", left: "0px", zIndex: "1001", w: "240px", py: "12px", rounded: "6px", bg: color[colorMode], border: colorMode === 'dark' ? 'none' : '', boxShadow: linkShadow[colorMode], fontSize: "sm", color: text[colorMode], transition: "0.2s" }, react_default.a.createElement(Accordion["a" /* Accordion */ ], { allowMultiple: true }, categories.map(function(category, catIndex) { return react_default.a.createElement(Accordion["d" /* AccordionItem */ ], { borderBottomColor: "transparent", borderTopWidth: "0px", key: category.id, isOpen: false, isDisabled: catIndex === categorySelected ? true : false }, react_default.a.createElement(Accordion["b" /* AccordionHeader */ ], { onClick: function onClick() { return headerClick(category, catIndex); }, height: "40px", py: "0px", pl: "0px", pr: "8px", fontSize: "sm", fontWeight: "600", _focus: { outline: '0' }, _hover: { bg: hoverButton[colorMode] } }, react_default.a.createElement(Box["a" /* default */ ], { flex: "1", textAlign: "left", ml: "16px", color: text[colorMode] }, category.name.length > 0 ? category.name : 'Untitled'), react_default.a.createElement(Accordion["c" /* AccordionIcon */ ], { color: iconSmall[colorMode] })), react_default.a.createElement(Accordion["e" /* AccordionPanel */ ], { p: "0px", m: "0px", mt: "4px" }, react_default.a.createElement(Box["a" /* default */ ], { p: "0px", m: "0px", height: "100%", width: "100%" }, isLoadingMenuCats ? react_default.a.createElement(Flex["a" /* default */ ], null, react_default.a.createElement(Spinner["a" /* default */ ], { size: "sm", ml: "16px" })) : tabs.filter(function(tab) { return tab.categoryID === category.id; }).length > 0 ? tabs.filter(function(tab) { return tab.categoryID === category.id; }).map(function(item, index) { return react_default.a.createElement(menuRowMoveTo["a" /* default */ ], { key: index, moveToCategory: moveToSpace, toCategory: catIndex, spaceId: item.id, title: item.title, onClose: function onClose() { return console.log('Close move menu'); }, emoji: item.emoji, extraSmall: true }); }) : react_default.a.createElement(Text["a" /* default */ ], { fontWeight: "500", ml: "16px", color: "gray.500", cursor: "not-allowed" }, "No groups")))); }))), react_default.a.createElement(Tooltip["a" /* default */ ], { label: 'Merge ' + selectedItems.length + ' item' + (selectedItems.length > 1 ? 's' : ''), showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: "folderIcon",
                    isDisabled: activeTabSelection,
                    fontSize: "20px",
                    onClick: function onClick() { mergeToStack(); },
                    minWidth: "36px",
                    height: "34px",
                    rounded: "5px",
                    ml: "10px",
                    color: iconDarkerColor[colorMode] //bg="transparent"
                        ,
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)', bg: border[colorMode] },
                    _active: { transform: 'scale(0.96)' }
                })), react_default.a.createElement(Tooltip["a" /* default */ ], { label: (activeTabSelection ? 'Close ' : 'Delete ') + selectedItems.length + (activeTabSelection ? ' site' : ' item') + (selectedItems.length > 1 ? 's' : ''), showDelay: "160", zIndex: "2000" }, react_default.a.createElement(IconButton["a" /* default */ ], {
                    icon: activeTabSelection ? 'small-close' : 'trash',
                    fontSize: activeTabSelection ? '20px' : '20px',
                    onClick: function onClick() { deleteAction(); },
                    minWidth: "36px",
                    height: "34px",
                    rounded: "5px",
                    mr: "4px",
                    ml: "10px",
                    color: iconDarkerColor[colorMode] //bg="transparent"
                        ,
                    transform: "scale(1)",
                    transition: "transform 0.15s cubic-bezier(.374,.019,.035,1.861)",
                    _hover: { transform: 'scale(1.1)', bg: border[colorMode] },
                    _active: { transform: 'scale(0.96)' }
                }))))));
            }; /* harmony default export */
            var sitesToolbar = (Object(react["memo"])(sitesToolbar_SitesToolbar));
            // CONCATENATED MODULE: ./src/Components/trashZone.js
            var trashZone_isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var trashZone_TrashZone = function TrashZone(_ref) {
                var numberOfSpaces = _ref.numberOfSpaces;
                var isDragging = Object(dndStore["a" /* default */ ])(trashZone_isDraggingZu); //Colorstuff
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode;
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(PseudoBox["a" /* default */ ]);
                var container = {
                    hiddenTrash: { scale: 0.9, opacity: 0, originY: 0, transition: { type: 'spring', duration: 0.15 } },
                    showTrash: { scale: 1, opacity: 0.5, originY: 0.5, transition: { type: 'spring', duration: 0.15 } },
                    exitTrash: { scale: 0, opacity: 0, originY: 0, transition: { delay: 0.12, duration: 0 } },
                    hoverTrash: { //background: "rgb(65, 225, 139, 0.2)",
                        //border:"2px solid #41E18B",
                        opacity: 1,
                        scale: 1.05,
                        transition: { ease: 'linear', duration: 0.25 }
                    }
                };
                var icon = { restTrash: { scale: 0.85, opacity: 0 }, hoverTrash: { scale: 1.25, opacity: 1, transition: { type: 'spring', duration: 0.15 } } };
                return react_default.a.createElement(Box["a" /* default */ ], {
                    pointerEvents: isDragging ? '' : 'none',
                    position: "relative" //width="21.850vw"
                        //w={isDragging ? '367px' : '2px'}
                        //minWidth={isDragging ? '240px' : '2px'}
                        //minHeight="calc(80vh - 164px)"
                        ,
                    h: "64px",
                    w: "244px" //bg="transparent"
                        ,
                    rounded: "12px",
                    pos: "absolute",
                    bottom: numberOfSpaces > 2 ? '8px' : '24px' //ml={numberOfSpaces > 2 ? 'auto' : '-122px'}
                        ,
                    ml: "auto",
                    mr: numberOfSpaces > 2 ? 'auto' : '0px',
                    left: numberOfSpaces > 2 ? '-62px' : '0px',
                    right: numberOfSpaces > 2 ? '0px' : '24px' //transform={sideReCalc ? 'translateX(-184px)' : 'none'}
                        ,
                    transition: "transform 0.0s"
                }, react_default.a.createElement(Box["a" /* default */ ], { pos: "relative", h: "100%", w: "100%" }, react_default.a.createElement(react_beautiful_dnd_esm["c" /* Droppable */ ], { droppableId: "trashDrop", type: "tab" }, function(provided, snapshot) { return react_default.a.createElement(Box["a" /* default */ ], Object.assign({ ref: provided.innerRef }, provided.droppableProps, { bg: "transparent", h: "64px", w: "244px", rounded: "12px", zIndex: "2" }), react_default.a.createElement(react_beautiful_dnd_esm["b" /* Draggable */ ], { draggableId: 'TRASHDROP', index: 2, key: 1001 }, function(provided, snapshot) { return react_default.a.createElement(Box["a" /* default */ ], Object.assign({ bg: "transparent", ref: provided.innerRef }, provided.droppableProps, provided.draggableProps, provided.dragHandleProps)); }), provided.placeholder); }), react_default.a.createElement(framer_motion_es["a" /* AnimatePresence */ ], null, isDragging ? react_default.a.createElement(MotionBox, { zIndex: "3", position: "absolute", bg: "rgba(240,96,96,0.20)", top: "0", left: "0", h: "64px", w: "244px", border: "2px solid #F14C4C", rounded: "12px", initial: "hiddenTrash", animate: "showTrash", exit: "exitTrash", whileHover: "hoverTrash", display: "flex", cursor: "pointer", variants: container }, react_default.a.createElement(MotionBox, { variants: icon, m: "auto", display: "flex", alignItems: "center" }, react_default.a.createElement(Icon["a" /* default */ ], { m: "auto", name: "trash", fontSize: "24px", color: "#FF4C4C" }))) : '')));
            }; /* harmony default export */
            var trashZone = (trashZone_TrashZone);
            // CONCATENATED MODULE: ./src/Components/DndArea.js
            /* global chrome */
            var DndArea_SearchModal = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 0).then(__webpack_require__.bind(null, 263)); });
            var EmptyStateContainer = react_default.a.lazy(function() { return __webpack_require__.e( /* import() */ 9).then(__webpack_require__.bind(null, 260)); }); //zuStore
            var DndArea_tabsZu = function tabsZu(state) { return state.tabs; };
            var DndArea_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var DndArea_spacesToShowZu = function spacesToShowZu(state) { return state.spacesToShow; };
            var setSpacesToShowZu = function setSpacesToShowZu(state) { return state.setSpacesToShow; };
            var DndArea_categoryZu = function categoryZu(state) { return state.category; };
            var DndArea_categoriesZu = function categoriesZu(state) { return state.categories; };
            var DndArea_userStateZu = function userStateZu(state) { return state.userState; };
            var setUserStateZu = function setUserStateZu(state) { return state.setUserState; };
            var DndArea_userItemsZu = function userItemsZu(state) { return state.userItems; };
            var DndArea_setUserItemsZu = function setUserItemsZu(state) { return state.setUserItems; };
            var isLoadingCatsZu = function isLoadingCatsZu(state) { return state.isLoadingCats; };
            var setIsLoadingCatsZu = function setIsLoadingCatsZu(state) { return state.setIsLoadingCats; };
            var isLoadingSpacesToShowZu = function isLoadingSpacesToShowZu(state) { return state.isLoadingSpacesToShow; };
            var DndArea_setIsLoadingSpacesToShowZu = function setIsLoadingSpacesToShowZu(state) { return state.setIsLoadingSpacesToShow; };
            var DndArea_activeTabsZu = function activeTabsZu(state) { return state.activeTabs; };
            var DndArea_setActiveTabsZu = function setActiveTabsZu(state) { return state.setActiveTabs; };
            var DndArea_setShowToastZu = function setShowToastZu(state) { return state.setShowToast; };
            var DndArea_deleteOrCloseZu = function deleteOrCloseZu(state) { return state.deleteOrClose; }; //const setAuthOpenZu = (state) => state.setAuthOpen;
            //persistStore
            var DndArea_fxStateZu = function fxStateZu(state) { return state.fxState; };
            var showTrashZoneZu = function showTrashZoneZu(state) { return state.showTrashZone; }; //dndStore
            var DndArea_isDraggingZu = function isDraggingZu(state) { return state.isDragging; };
            var setIsDraggingZu = function setIsDraggingZu(state) { return state.setIsDragging; };
            var setIsDraggingSpaceZu = function setIsDraggingSpaceZu(state) { return state.setIsDraggingSpace; };
            var blockHoverSideZu = function blockHoverSideZu(state) { return state.blockHoverSide; };
            var setBlockHoverSideZu = function setBlockHoverSideZu(state) { return state.setBlockHoverSide; };
            var setSpaceDraggedOverZu = function setSpaceDraggedOverZu(state) { return state.setSpaceDraggedOver; };
            var setDragIsActiveInModalZu = function setDragIsActiveInModalZu(state) { return state.setDragIsActiveInModal; };
            var setSideReCalcZu = function setSideReCalcZu(state) { return state.setSideReCalc; };
            var setBeforeDragStartZu = function setBeforeDragStartZu(state) { return state.setBeforeDragStart; };
            var DndArea_setLimitDialogOpenZu = function setLimitDialogOpenZu(state) { return state.setLimitDialogOpen; };
            var isLoadingCategoriesZu = function isLoadingCategoriesZu(state) { return state.isLoadingCategories; };
            var DndArea_selectedItemsZu = function selectedItemsZu(state) { return state.selectedItems; };
            var setSelectedItemsZu = function setSelectedItemsZu(state) { return state.setSelectedItems; };
            var setDraggingIdZu = function setDraggingIdZu(state) { return state.setDraggingId; };
            var DndArea_unselectAllZu = function unselectAllZu(state) { return state.unselectAll; };
            var keepSelectionZu = function keepSelectionZu(state) { return state.keepSelection; };
            var unselectAllActionZu = function unselectAllActionZu(state) { return state.unselectAllAction; }; //Searchstore
            var searchModalOpenZu = function searchModalOpenZu(state) { return state.searchModalOpen; };
            var DndArea_DndArea = function DndArea() { //Zustate
                var tabs = Object(store["a" /* default */ ])(DndArea_tabsZu);
                var setTabs = Object(store["a" /* default */ ])(DndArea_setTabsZu);
                var spacesToShow = Object(store["a" /* default */ ])(DndArea_spacesToShowZu);
                var setSpacesToShow = Object(store["a" /* default */ ])(setSpacesToShowZu);
                var category = Object(store["a" /* default */ ])(DndArea_categoryZu);
                var categories = Object(store["a" /* default */ ])(DndArea_categoriesZu);
                var userState = Object(store["a" /* default */ ])(DndArea_userStateZu);
                var setUserState = Object(store["a" /* default */ ])(setUserStateZu);
                var userItems = Object(store["a" /* default */ ])(DndArea_userItemsZu);
                var setUserItems = Object(store["a" /* default */ ])(DndArea_setUserItemsZu);
                var setLimitDialogOpen = Object(store["a" /* default */ ])(DndArea_setLimitDialogOpenZu);
                var isLoadingCats = Object(store["a" /* default */ ])(isLoadingCatsZu);
                var setIsLoadingCats = Object(store["a" /* default */ ])(setIsLoadingCatsZu);
                var isLoadingSpacesToShow = Object(store["a" /* default */ ])(isLoadingSpacesToShowZu);
                var setIsLoadingSpacesToShow = Object(store["a" /* default */ ])(DndArea_setIsLoadingSpacesToShowZu);
                var isLoadingCategories = Object(store["a" /* default */ ])(isLoadingCategoriesZu);
                var activeTabs = Object(store["a" /* default */ ])(DndArea_activeTabsZu);
                var setActiveTabs = Object(store["a" /* default */ ])(DndArea_setActiveTabsZu);
                var setShowToast = Object(store["a" /* default */ ])(DndArea_setShowToastZu);
                var deleteOrClose = Object(store["a" /* default */ ])(DndArea_deleteOrCloseZu); //persistStore
                var fxState = Object(persistStore["a" /* default */ ])(DndArea_fxStateZu);
                var showTrashZone = Object(persistStore["a" /* default */ ])(showTrashZoneZu); //const setAuthOpen = useStore(setAuthOpenZu);
                //Dndstore
                var isDragging = Object(dndStore["a" /* default */ ])(DndArea_isDraggingZu);
                var setIsDragging = Object(dndStore["a" /* default */ ])(setIsDraggingZu);
                var setIsDraggingSpace = Object(dndStore["a" /* default */ ])(setIsDraggingSpaceZu);
                var blockHoverSide = Object(dndStore["a" /* default */ ])(blockHoverSideZu);
                var setBlockHoverSide = Object(dndStore["a" /* default */ ])(setBlockHoverSideZu);
                var setSpaceDraggedOver = Object(dndStore["a" /* default */ ])(setSpaceDraggedOverZu);
                var setDragIsActiveInModal = Object(dndStore["a" /* default */ ])(setDragIsActiveInModalZu);
                var setSideReCalc = Object(dndStore["a" /* default */ ])(setSideReCalcZu);
                var setBeforeDragStart = Object(dndStore["a" /* default */ ])(setBeforeDragStartZu);
                var selectedItems = Object(dndStore["a" /* default */ ])(DndArea_selectedItemsZu);
                var setSelectedItems = Object(dndStore["a" /* default */ ])(setSelectedItemsZu);
                var setDraggingId = Object(dndStore["a" /* default */ ])(setDraggingIdZu);
                var unselectAll = Object(dndStore["a" /* default */ ])(DndArea_unselectAllZu);
                var keepSelection = Object(dndStore["a" /* default */ ])(keepSelectionZu);
                var unselectAllAction = Object(dndStore["a" /* default */ ])(unselectAllActionZu);
                /* const numberOfSpaces =
                        tabs?.length > 0 && categories?.length > 0
                            ? tabs.filter(
                                  (tabs) => tabs.categoryID === categories[category]?.id
                              ).length
                            : 0; */
                var numberOfSpaces = spacesToShow ? spacesToShow.length : 0;
                var spaceLimitNotReached = numberOfSpaces < 16 ? true : false;
                Object(react["useEffect"])(function() { //const currentCategoryID = (category.length > 0 && categories.length > 0) ? categories[category].id : "1";
                    if (isLoadingSpacesToShow === false) { setSpacesToShow(); } else return;
                }, [category, isLoadingSpacesToShow, tabs, categories]);
                Object(react["useEffect"])(function() {
                    var newUser = userState.extended === false ? true : false;
                    var setUserPlan = function setUserPlan(planStatus) {
                        var newUserState = Object(objectSpread2["a" /* default */ ])({}, userState);
                        newUserState.userPlan = planStatus;
                        setUserState(newUserState);
                        chrome.runtime.sendMessage({ msg: 'newUserData', data: newUserState });
                    };
                    if (userState.stripeSubscriptionStatus) { if (userState.stripeSubscriptionStatus === 'active' && userState.userPlan !== 'active') { setUserPlan('active'); return; } if (userState.stripeSubscriptionStatus !== 'active' && userState.userPlan === 'active') { setUserPlan('paused'); return; } if (userState.stripeSubscriptionStatus === 'active' && userState.userPlan === 'active') { return; } } else if (newUser === false) {
                        if (userItems > 0) {
                            if (userState.userPlan === 'trialLimitReached') {
                                setLimitDialogOpen(false);
                                setUserPlan('active');
                            }
                        }
                    } else if (newUser === true) {
                        if (userItems > 0) {
                            if (userState.userPlan === 'trialLimitReached') {
                                setLimitDialogOpen(false);
                                setUserPlan('active');
                            }
                        }
                    }
                }, [userItems, userState]); //MultiDrag osv
                var _useState = Object(react["useState"])(false),
                    _useState2 = Object(slicedToArray["a" /* default */ ])(_useState, 2),
                    showSitesToolbar = _useState2[0],
                    setShowSitesToolbar = _useState2[1];
                Object(react["useEffect"])(function() { if (selectedItems.length > 0) { setShowSitesToolbar(true); } else { setShowSitesToolbar(false); } }, [selectedItems]); //const [keepSelection, setKeepSelection] = useState(false);
                var onWindowClick = function onWindowClick(e) { if (e.defaultPrevented) { return; } if (keepSelection === true) { return; } unselectAll(); };
                var onWindowKeyDown = function onWindowKeyDown(e) { if (e.defaultPrevented) { return; } if (e.key === 'Escape') { unselectAll(); } };
                Utils_useDeselectEvents('click', onWindowClick);
                Utils_useDeselectEvents('keydown', onWindowKeyDown); // ! UI
                //Sound
                var _useSound = Object(use_sound_esm["a" /* default */ ])(popFx_default.a),
                    _useSound2 = Object(slicedToArray["a" /* default */ ])(_useSound, 1),
                    playPopFx = _useSound2[0];
                var _useSound3 = Object(use_sound_esm["a" /* default */ ])(addFx_default.a),
                    _useSound4 = Object(slicedToArray["a" /* default */ ])(_useSound3, 1),
                    playAddFx = _useSound4[0];
                var _useBoolean = useBoolean_useBoolean(false),
                    hoverSide = _useBoolean.value,
                    hoverSideOn = _useBoolean.on,
                    hoverSideOff = _useBoolean.off;
                /*   useEffect(() => {
                    //Add check if its active tabslists ->
                    hoverSide === false && unselectAll();
                  }, [hoverSide]); */
                var MotionBox = framer_motion_es["c" /* motion */ ].custom(Box["a" /* default */ ]);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var spacesBG = { light: 'gray.50', dark: '#15171B' };
                var bgShadow = { light: '-4px 0 18px 0 rgba(166,166,167,0.30)', dark: '-4px 0 18px 0 rgba(19,20,24,0.95)' };
                var fadeOutBg = { light: 'linear-gradient(90deg, rgba(240,241,242,0.00) 0%, #F0F1F2 100%)', dark: ' linear-gradient(90deg, rgba(21,23,27,0.00) 0%, #15171B 100%)' };
                var skeletonBG = { light: 'linear-gradient(270deg, #EEF1F4 0%, #E6EAEF 100%)', dark: 'linear-gradient(270deg, #1D2024  0%, #262A2D 100%)' };
                var listBG = { light: 'gray.100', dark: '#0e1013' };
                var iconColor = { light: 'gray.700', dark: '#B3BAC6' };
                var buttonBgActive = { light: 'gray.50', dark: '#41484F' };
                var mainButtonShadow = { light: '0 2px 6px 0 rgba(142,149,173,0.50), inset 1px 1px 1px 0 rgba(255,255,255,0.81), inset -1px -1px 1px 0 #E2E4E9', dark: '0 2px 6px 0 rgba(3,4,5,0.40), inset 1px 1px 2px 0 rgba(154,160,164,0.40), inset -1px -1px 2px 0 #2A2F34' }; //old 111318
                //Helpers
                function timeout(delay) { return new Promise(function(res) { return setTimeout(res, delay); }); }
                var cleanTabFromProps = function cleanTabFromProps(tab, fullWipe) {
                    delete tab.groupId;
                    delete tab.pinned;
                    delete tab.saved;
                    delete tab.browserId;
                    delete tab.active;
                    delete tab.note;
                    if (fullWipe) {
                        delete tab.title;
                        delete tab.url;
                        delete tab.favIcon;
                    }
                    return tab;
                };
                var onDragStart = function onDragStart(info) {
                    var spaceId = info.source.droppableId;
                    var spaceIndex = spacesToShow.findIndex(function(space) { return space.id === spaceId; });
                    setSpaceDraggedOver(spaceIndex);
                    var draggableId = info.draggableId;
                    var selected = selectedItems.find(function(taskId) { return taskId === draggableId; }); //add to selected
                    if (!selected) { unselectAll(); } setDraggingId(draggableId);
                };
                var onDragUpdate = /*#__PURE__*/ function() {
                    var _ref = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee(info) {
                        var spaceId, spaceIndex;
                        return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!info.combine) { _context.next = 4; break; } _context.next = 3;
                                        return timeout(1000);
                                    case 3:
                                        setSpaceDraggedOver(null);
                                    case 4:
                                        if (info.destination) { _context.next = 6; break; }
                                        return _context.abrupt("return");
                                    case 6:
                                        spaceId = info.destination.droppableId;
                                        spaceIndex = spacesToShow.findIndex(function(space) { return space.id === spaceId; });
                                        setSpaceDraggedOver(spaceIndex);
                                        if (spaceIndex > 0) { hoverSideOff(); }
                                    case 10:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    }));
                    return function onDragUpdate(_x) { return _ref.apply(this, arguments); };
                }();
                var onBeforeCapture = function onBeforeCapture(info) { setBeforeDragStart(true); if (hoverSide) { setSideReCalc(true); } };
                var onBeforeDragStart = function onBeforeDragStart(info) { setSideReCalc(false); if (info.type === 'modal') { setDragIsActiveInModal(true); return; } if (info.type !== 'space') { setIsDragging(true); } if (info.type === 'space') { setIsDraggingSpace(true); } if (info.source.droppableId !== 'activeList') { setBlockHoverSide(true); } };
                var onDragEnd = function onDragEnd(result) {
                    setBeforeDragStart(false);
                    setBlockHoverSide(false);
                    setSpaceDraggedOver(null);
                    setIsDragging(false);
                    setDragIsActiveInModal(false);
                    setIsDraggingSpace(false);
                    setDraggingId(null);
                    var isMultiDragPayload = selectedItems.length > 1;
                    if (userState.userPlan === 'trialLimitReached' || userState.userPlan === 'paused') {
                        if (result.type !== 'space') {
                            var subtitle = userState.userPlan === 'trialLimitReached' ? 'Trial limit reached, Please upgrade your plan to continue' : 'Your plan seem to be paused, see account for more details';
                            setShowToast('Item returned', subtitle, 'warning');
                            return;
                        }
                    }
                    if (result.combine) {
                        var fromSpaceId = result.source.droppableId;
                        var toSpaceId = result.combine.droppableId;
                        var toId = result.combine.draggableId;
                        var payloadId = result.draggableId;
                        var fromIndex = result.source.index;
                        var newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                        var toSpaceIndex = newData.findIndex(function(space) { return space.id === toSpaceId; });
                        var toItemIndex = newData[toSpaceIndex].tabs.findIndex(function(tab) { return tab.id === toId; }); //From activelist
                        if (result.source.droppableId === 'activeList') {
                            var newActiveTabs = Object(toConsumableArray["a" /* default */ ])(activeTabs);
                            var cleanPayload;
                            var multiPayload = [];
                            if (isMultiDragPayload === false) {
                                var payload = newActiveTabs[fromIndex];
                                var movedId = payload.browserId;
                                chrome.tabs.remove(movedId);
                                var newId = Object(v1["a" /* default */ ])();
                                payload.id = newId;
                                cleanPayload = cleanTabFromProps(payload, false);
                                newActiveTabs.splice(fromIndex, 1);
                            } else if (isMultiDragPayload === true) {
                                var browserIdsToClose = [];
                                selectedItems.forEach(function(id) {
                                    var tabIndex = newActiveTabs.findIndex(function(item) { return item.id === id; });
                                    var tab = newActiveTabs[tabIndex];
                                    var browserId = tab.browserId;
                                    browserIdsToClose.push(browserId);
                                    var newId = Object(v1["a" /* default */ ])();
                                    tab.id = newId;
                                    cleanPayload = cleanTabFromProps(tab, false);
                                    multiPayload.push(cleanPayload);
                                    newActiveTabs.splice(tabIndex, 1);
                                });
                                chrome.tabs.remove(browserIdsToClose);
                            }
                            var isNewStack = newData[toSpaceIndex].tabs[toItemIndex].isStacked ? false : true;
                            if (isNewStack) {
                                var payloadDroppedOn = { url: newData[toSpaceIndex].tabs[toItemIndex].url, title: newData[toSpaceIndex].tabs[toItemIndex].title, favIcon: newData[toSpaceIndex].tabs[toItemIndex].favIcon, id: Object(v1["a" /* default */ ])(), dateCreated: newData[toSpaceIndex].tabs[toItemIndex].dateCreated };
                                var cleanedTab = cleanTabFromProps(newData[toSpaceIndex].tabs[toItemIndex], true);
                                newData[toSpaceIndex].tabs[toItemIndex] = cleanedTab;
                                newData[toSpaceIndex].tabs[toItemIndex].isStacked = true;
                                if (isMultiDragPayload) { newData[toSpaceIndex].tabs[toItemIndex].stackedItems = [payloadDroppedOn].concat(multiPayload); } else { newData[toSpaceIndex].tabs[toItemIndex].stackedItems = [payloadDroppedOn, cleanPayload]; }
                            } else {
                                if (isMultiDragPayload) {
                                    var curStack = newData[toSpaceIndex].tabs[toItemIndex].stackedItems;
                                    var mergeStack = [].concat(curStack, multiPayload);
                                    newData[toSpaceIndex].tabs[toItemIndex].stackedItems = mergeStack;
                                    unselectAll();
                                } else { newData[toSpaceIndex].tabs[toItemIndex].stackedItems.push(cleanPayload); }
                            }
                            setUserItems(userItems + 1);
                            setTabs(newData, 'fullUpdate');
                            var title = isMultiDragPayload ? 'Items stacked' : 'Item stacked';
                            var _subtitle = isMultiDragPayload ? 'Sites saved and combined' : 'Site saved and combined';
                            setShowToast(title, _subtitle, 'success');
                            setActiveTabs(newActiveTabs);
                            return;
                        } else {
                            var _payload$comment, _newData$toSpaceIndex; //Not from active list
                            var fromSpaceIndex = newData.findIndex(function(space) { return space.id === fromSpaceId; });
                            var _payload = newData[fromSpaceIndex].tabs.filter(function(tab) { return tab.id === payloadId; })[0];
                            var typeOfPayload = ((_payload$comment = _payload.comment) === null || _payload$comment === void 0 ? void 0 : _payload$comment.length) > 0 ? 'comment' : 'site';
                            var payloadValue = typeOfPayload === 'comment' ? _payload.comment : _payload.url;
                            var payloadTitle = _payload.title;
                            var payloadColor = _payload.commentColor;
                            var payloadFavIcon = _payload.favIcon; //add value of payload to target and set to proper type
                            if (typeOfPayload === 'site' && ((_newData$toSpaceIndex = newData[toSpaceIndex].tabs[toItemIndex].url) === null || _newData$toSpaceIndex === void 0 ? void 0 : _newData$toSpaceIndex.length) > 0 || _payload.isStacked || newData[toSpaceIndex].tabs[toItemIndex].isStacked) {
                                if (_payload.note || newData[toSpaceIndex].tabs[toItemIndex].note) { //Is stacked already? ->
                                    //Add note to stack || Create stack + note
                                    return;
                                }
                                var _isNewStack = newData[toSpaceIndex].tabs[toItemIndex].isStacked || _payload.isStacked ? false : true;
                                if (_isNewStack) {
                                    var _payloadDroppedOn = { url: newData[toSpaceIndex].tabs[toItemIndex].url, title: newData[toSpaceIndex].tabs[toItemIndex].title, favIcon: newData[toSpaceIndex].tabs[toItemIndex].favIcon, id: Object(v1["a" /* default */ ])(), dateCreated: newData[toSpaceIndex].tabs[toItemIndex].dateCreated };
                                    var _cleanedTab = cleanTabFromProps(newData[toSpaceIndex].tabs[toItemIndex], true);
                                    newData[toSpaceIndex].tabs[toItemIndex] = _cleanedTab;
                                    newData[toSpaceIndex].tabs[toItemIndex].isStacked = true;
                                    if (isMultiDragPayload) {
                                        var _multiPayload = [];
                                        selectedItems.forEach(function(id) {
                                            var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                                            var spaceIdIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                                            var tabPayload = newData[spaceIdIndex].tabs.filter(function(tab) { return tab.id === id; })[0];
                                            if (tabPayload.isStacked || tabPayload.note) { return; }
                                            var cleanPayload = cleanTabFromProps(tabPayload, false);
                                            _multiPayload.push(cleanPayload);
                                            var tabIndex = tabs[spaceIdIndex].tabs.findIndex(function(item) { return item.id === id; });
                                            newData[spaceIdIndex].tabs.splice(tabIndex, 1);
                                        });
                                        var _mergeStack = [_payloadDroppedOn].concat(_multiPayload);
                                        var toUpdatedItemIndex = newData[toSpaceIndex].tabs.findIndex(function(tab) { return tab.id === toId; });
                                        newData[toSpaceIndex].tabs[toUpdatedItemIndex].stackedItems = _mergeStack;
                                    } else {
                                        var _cleanPayload = cleanTabFromProps(_payload, false);
                                        newData[toSpaceIndex].tabs[toItemIndex].stackedItems = [_payloadDroppedOn, _cleanPayload];
                                    }
                                } else {
                                    if (_payload.isStacked && !isMultiDragPayload) {
                                        var payloadStackedItems = _payload.stackedItems;
                                        if (newData[toSpaceIndex].tabs[toItemIndex].isStacked) {
                                            var newStackedArr = newData[toSpaceIndex].tabs[toItemIndex].stackedItems.concat(payloadStackedItems);
                                            newData[toSpaceIndex].tabs[toItemIndex].stackedItems = newStackedArr;
                                        } else {
                                            var _payloadDroppedOn2 = { url: newData[toSpaceIndex].tabs[toItemIndex].url, title: newData[toSpaceIndex].tabs[toItemIndex].title, favIcon: newData[toSpaceIndex].tabs[toItemIndex].favIcon, id: Object(v1["a" /* default */ ])(), dateCreated: newData[toSpaceIndex].tabs[toItemIndex].dateCreated };
                                            var _cleanedTab2 = cleanTabFromProps(newData[toSpaceIndex].tabs[toItemIndex], true);
                                            newData[toSpaceIndex].tabs[toItemIndex] = _cleanedTab2;
                                            newData[toSpaceIndex].tabs[toItemIndex].isStacked = true;
                                            newData[toSpaceIndex].tabs[toItemIndex].stackedItems = [_payloadDroppedOn2].concat(Object(toConsumableArray["a" /* default */ ])(payloadStackedItems));
                                        }
                                    } else {
                                        if (isMultiDragPayload) { //Drop multiselect on current stack, loop and merge
                                            var _multiPayload2 = [];
                                            selectedItems.forEach(function(id) {
                                                var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                                                var spaceIdIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                                                var tabPayload = newData[spaceIdIndex].tabs.filter(function(tab) { return tab.id === id; })[0];
                                                if (tabPayload.isStacked || tabPayload.note) { return; }
                                                var cleanPayload = cleanTabFromProps(tabPayload, false);
                                                _multiPayload2.push(cleanPayload);
                                                var tabIndex = tabs[spaceIdIndex].tabs.findIndex(function(item) { return item.id === id; });
                                                newData[spaceIdIndex].tabs.splice(tabIndex, 1);
                                            });
                                            var _curStack = newData[toSpaceIndex].tabs[toItemIndex].stackedItems;
                                            var _mergeStack2 = [].concat(_curStack, _multiPayload2);
                                            newData[toSpaceIndex].tabs[toItemIndex].stackedItems = _mergeStack2;
                                        } else {
                                            var _cleanPayload2 = cleanTabFromProps(_payload, false);
                                            newData[toSpaceIndex].tabs[toItemIndex].stackedItems.push(_cleanPayload2);
                                        }
                                    }
                                }!isMultiDragPayload && newData[fromSpaceIndex].tabs.splice(fromIndex, 1); //let indexAfterStack = toItemIndex + 1;
                                //newData[toSpaceIndex].tabs.splice(indexAfterStack, 0, payload);
                                unselectAll();
                                fxState && playPopFx();
                                var _title = isMultiDragPayload ? 'Items stacked' : 'Item stacked';
                                setShowToast(_title, '', 'success');
                                setTabs(newData, 'deleteUpdate');
                                return; //kolla om det finns en comment -> varna att noten kommer försvinna
                                //annars ta payload + target
                            } else if (!_payload.isStacked || !newData[toSpaceIndex].tabs[toItemIndex].isStacked) {
                                newData[toSpaceIndex].tabs[toItemIndex].note = true;
                                newData[toSpaceIndex].tabs[toItemIndex].id = Object(v1["a" /* default */ ])();
                                if (typeOfPayload === 'comment') {
                                    var _newData$toSpaceIndex2;
                                    var isEmptyComment = ((_newData$toSpaceIndex2 = newData[toSpaceIndex].tabs[toItemIndex].comment) === null || _newData$toSpaceIndex2 === void 0 ? void 0 : _newData$toSpaceIndex2.length) > 0 ? false : true;
                                    newData[toSpaceIndex].tabs[toItemIndex].comment += isEmptyComment ? payloadValue : '\n' + payloadValue;
                                    if (!newData[toSpaceIndex].tabs[toItemIndex].commentColor || newData[toSpaceIndex].tabs[toItemIndex].commentColor === false) { newData[toSpaceIndex].tabs[toItemIndex].commentColor = payloadColor; }
                                } else if (typeOfPayload === 'site') {
                                    newData[toSpaceIndex].tabs[toItemIndex].title = payloadTitle;
                                    newData[toSpaceIndex].tabs[toItemIndex].url = payloadValue;
                                    newData[toSpaceIndex].tabs[toItemIndex].favIcon = payloadFavIcon;
                                }
                                newData[fromSpaceIndex].tabs.splice(fromIndex, 1); //setTabs(newData, (newData) => sendUpdateToDB(newData));
                                fxState && playPopFx();
                                setTabs(newData, 'deleteUpdate');
                            }
                        }
                    }
                    if (result.reason === 'DROP') {
                        if (!result.destination) { return; }
                        if (result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index) { return; }
                        if (result.destination.droppableId === 'trashDrop') {
                            var _payloadId = result.draggableId;
                            var itemsToDelete = selectedItems.length > 0 ? selectedItems : [_payloadId];
                            deleteOrClose(false, itemsToDelete);
                            unselectAll();
                            return;
                        }
                        if (result.destination.droppableId === 'newList') { // ? Tab drop to create new space
                            var fromId = result.source.droppableId;
                            var _toId = result.destination.droppableId;
                            var _fromIndex = result.source.index;
                            var toIndex = result.destination.index;
                            var _payloadId2 = result.draggableId;
                            var _newId = Object(v1["a" /* default */ ])();
                            var len = defaultEmojis["a" /* default */ ].length;
                            var randomEmoji = defaultEmojis["a" /* default */ ][Math.floor(Math.random() * len)].emoji; //Date obj stuff
                            var dateCreated = new Date().toString();
                            var currentSlug = categories[category].slug && { slug: categories[category].slug };
                            var itemToAdd; // Check if tab comes from activelist or another space
                            if (result.source.droppableId === 'activeList') {
                                var newTabId = Object(v1["a" /* default */ ])();
                                var userId = userState.userId;
                                var _newActiveTabs = Object(toConsumableArray["a" /* default */ ])(activeTabs);
                                if (isMultiDragPayload === false) {
                                    itemToAdd = activeTabs[_fromIndex];
                                    itemToAdd.dateCreated = dateCreated;
                                    var _movedId = itemToAdd.browserId;
                                    chrome.tabs.remove(_movedId);
                                    itemToAdd.id = newTabId;
                                    _newActiveTabs.splice(_fromIndex, 1);
                                    setActiveTabs(_newActiveTabs);
                                    var oldTabs = Object(toConsumableArray["a" /* default */ ])(tabs);
                                    var newTabs = [].concat(Object(toConsumableArray["a" /* default */ ])(oldTabs), [Object(objectSpread2["a" /* default */ ])({ id: _newId, title: 'Untitled', createdBy: userId, emoji: randomEmoji, categoryID: categories[category].id, lastAdded: dateCreated, focus: true, tabs: [itemToAdd] }, currentSlug)]);
                                    setUserItems(userItems + 1);
                                    setTabs(newTabs, 'fullUpdate');
                                    fxState && playAddFx();
                                    return;
                                } else if (isMultiDragPayload === true) {
                                    var _multiPayload3 = [];
                                    var _browserIdsToClose = [];
                                    selectedItems.forEach(function(id) {
                                        var tabIndex = _newActiveTabs.findIndex(function(item) { return item.id === id; });
                                        var tab = _newActiveTabs[tabIndex];
                                        var browserId = tab.browserId;
                                        _browserIdsToClose.push(browserId);
                                        var newId = Object(v1["a" /* default */ ])();
                                        tab.id = newId;
                                        tab.dateCreated = dateCreated;
                                        _multiPayload3.push(tab); //remove tab from list
                                        _newActiveTabs.splice(tabIndex, 1);
                                    });
                                    chrome.tabs.remove(_browserIdsToClose);
                                    setActiveTabs(_newActiveTabs);
                                    var _oldTabs = Object(toConsumableArray["a" /* default */ ])(tabs);
                                    var _newTabs = [].concat(Object(toConsumableArray["a" /* default */ ])(_oldTabs), [Object(objectSpread2["a" /* default */ ])({ id: _newId, title: 'Untitled', createdBy: userId, emoji: randomEmoji, categoryID: categories[category].id, lastAdded: dateCreated, focus: true, tabs: [].concat(_multiPayload3) }, currentSlug)]);
                                    unselectAll();
                                    setUserItems(userItems + 1);
                                    setTabs(_newTabs, 'fullUpdate');
                                    fxState && playAddFx();
                                    return;
                                }
                            } else {
                                var _newData = Object(toConsumableArray["a" /* default */ ])(tabs);
                                var _userId = userState.userId;
                                if (isMultiDragPayload === false) {
                                    var _fromSpaceIndex = tabs.findIndex(function(space) { return space.id === fromId; });
                                    itemToAdd = tabs[_fromSpaceIndex].tabs.filter(function(tab) { return tab.id === _payloadId2; })[0];
                                    itemToAdd.dateCreated = dateCreated;
                                    _newData[_fromSpaceIndex].tabs.splice(_fromIndex, 1);
                                    var _newTabs2 = [].concat(Object(toConsumableArray["a" /* default */ ])(_newData), [Object(objectSpread2["a" /* default */ ])({ id: _newId, title: 'Untitled', createdBy: _userId, emoji: randomEmoji, categoryID: categories[category].id, lastAdded: dateCreated, focus: true, tabs: [itemToAdd] }, currentSlug)]);
                                    setTabs(_newTabs2, 'deleteUpdate');
                                    fxState && playAddFx();
                                    return;
                                } else if (isMultiDragPayload === true) {
                                    var _multiPayload4 = [];
                                    selectedItems.forEach(function(id) {
                                        var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                                        var spaceIdIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                                        var payload = _newData[spaceIdIndex].tabs.filter(function(tab) { return tab.id === id; })[0];
                                        _multiPayload4.dateCreated = dateCreated;
                                        _multiPayload4.push(payload);
                                        var tabIndex = tabs[spaceIdIndex].tabs.findIndex(function(item) { return item.id === id; });
                                        _newData[spaceIdIndex].tabs.splice(tabIndex, 1);
                                    });
                                    var _newTabs3 = [].concat(Object(toConsumableArray["a" /* default */ ])(_newData), [{ id: _newId, title: 'Untitled', createdBy: _userId, emoji: randomEmoji, comments: 0, categoryID: categories[category].id, lastAdded: dateCreated, focus: true, tabs: [].concat(_multiPayload4) }]);
                                    setTabs(_newTabs3, 'deleteUpdate');
                                    fxState && playAddFx();
                                    return;
                                }
                            }
                        }
                        if (result.type === 'tab' && result.source.droppableId === 'activeList') { //shortnames
                            var _toId2 = result.destination.droppableId;
                            var _fromIndex2 = result.source.index;
                            var _toIndex = result.destination.index; //clone state
                            if (_toId2 !== 'activeList') {
                                hoverSideOff(); //tab moved out of activeList
                                var _newData2 = Object(toConsumableArray["a" /* default */ ])(tabs);
                                var _newActiveTabs2 = Object(toConsumableArray["a" /* default */ ])(activeTabs); //get index of space to move to
                                var _toSpaceIndex = _newData2.findIndex(function(space) { return space.id === _toId2; }); //get item(payload) to be moved
                                if (isMultiDragPayload === false) {
                                    var _payload2 = _newActiveTabs2[_fromIndex2];
                                    var _movedId2 = _payload2.browserId;
                                    chrome.tabs.remove(_movedId2); //change id for payload to UUIDV1 format
                                    var _newId2 = Object(v1["a" /* default */ ])();
                                    _payload2.id = _newId2;
                                    var _cleanPayload3 = cleanTabFromProps(_payload2, false); //remove tab from list
                                    _newActiveTabs2.splice(_fromIndex2, 1); //add tab to given space.tabs
                                    _newData2[_toSpaceIndex].tabs.splice([_toIndex], 0, _cleanPayload3); //set new states
                                    setUserItems(userItems + 1);
                                    setTabs(_newData2, 'fullUpdate');
                                    setActiveTabs(_newActiveTabs2);
                                    return;
                                } else if (isMultiDragPayload === true) {
                                    var _newData2$_toSpaceInd;
                                    var _multiPayload5 = [];
                                    var _browserIdsToClose2 = [];
                                    selectedItems.forEach(function(id) {
                                        var tabIndex = _newActiveTabs2.findIndex(function(item) { return item.id === id; });
                                        var tab = _newActiveTabs2[tabIndex];
                                        var browserId = tab.browserId;
                                        var newId = Object(v1["a" /* default */ ])();
                                        tab.id = newId;
                                        var cleanPayload = cleanTabFromProps(tab, false);
                                        _multiPayload5.push(cleanPayload);
                                        _browserIdsToClose2.push(browserId); //remove tab from list
                                        _newActiveTabs2.splice(tabIndex, 1);
                                    });
                                    chrome.tabs.remove(_browserIdsToClose2);
                                    (_newData2$_toSpaceInd = _newData2[_toSpaceIndex].tabs).splice.apply(_newData2$_toSpaceInd, [
                                        [_toIndex], 0
                                    ].concat(_multiPayload5)); //set new states
                                    unselectAll();
                                    setUserItems(userItems + 1);
                                    setTabs(_newData2, 'fullUpdate');
                                    setActiveTabs(_newActiveTabs2);
                                    return;
                                }
                            } else if (_toId2 === 'activeList') { //tab moved in activeList
                                var _newActiveTabs3 = Object(toConsumableArray["a" /* default */ ])(activeTabs);
                                var _payload3 = _newActiveTabs3[_fromIndex2];
                                var removedId = _payload3.browserId;
                                var _toId3 = _newActiveTabs3[_toIndex].browserId; //id of fromIndex ->
                                //id of toindex
                                chrome.tabs.query({ currentWindow: true }, function(tabs) {
                                    var allActiveTabs = Object.values(tabs);
                                    var moveToIndex = allActiveTabs.findIndex(function(tab) { return tab.id === _toId3; });
                                    chrome.tabs.move(removedId, { index: moveToIndex });
                                });
                                _newActiveTabs3.splice(_fromIndex2, 1);
                                _newActiveTabs3.splice(_toIndex, 0, _payload3);
                                setActiveTabs(_newActiveTabs3);
                            }
                        }
                        if (result.type === 'space') {
                            setIsLoadingCats(true);
                            var _payloadId3 = result.draggableId; //let toId = result.destination.droppableId;
                            //let fromIndex = result.source.index;
                            var toShownIndex = result.destination.index;
                            var _newData3 = Object(toConsumableArray["a" /* default */ ])(tabs); //finds indexof payload in tabs array
                            var _fromIndex3 = _newData3.findIndex(function(space) { return space.id === _payloadId3; }); //find drop target index
                            var _toId4 = spacesToShow[toShownIndex].id;
                            var _toIndex2 = _newData3.findIndex(function(space) { return space.id === _toId4; }); //splices the new tabs array togehter
                            var element = _newData3[_fromIndex3];
                            _newData3.splice(_fromIndex3, 1);
                            _newData3.splice(_toIndex2, 0, element); //update state and db.
                            setTabs(_newData3, 'deleteUpdate');
                            setSpacesToShow();
                            return;
                        }
                        if (result.type === 'tab' && result.source.droppableId !== 'activeList') { //Regular tab move ->
                            hoverSideOff();
                            var _payloadId4 = result.draggableId;
                            var _fromId = result.source.droppableId;
                            var _toId5 = result.destination.droppableId;
                            var _fromIndex4 = result.source.index;
                            var _toIndex3 = result.destination.index;
                            var _newData4 = Object(toConsumableArray["a" /* default */ ])(tabs);
                            var _fromSpaceIndex2 = _newData4.findIndex(function(space) { return space.id === _fromId; });
                            var _toSpaceIndex2 = _newData4.findIndex(function(space) { return space.id === _toId5; }); //Check to see if payload is more than one item
                            if (isMultiDragPayload === false) {
                                var _payload4 = _newData4[_fromSpaceIndex2].tabs.filter(function(tab) { return tab.id === _payloadId4; })[0];
                                _newData4[_fromSpaceIndex2].tabs.splice(_fromIndex4, 1);
                                _newData4[_toSpaceIndex2].tabs.splice([_toIndex3], 0, _payload4);
                                setTabs(_newData4, 'deleteUpdate');
                                return;
                            } else if (isMultiDragPayload === true) {
                                var _newData4$_toSpaceInd; //if true, loop over ids, find indexes and splice remove+add
                                var _multiPayload6 = [];
                                selectedItems.forEach(function(id) {
                                    var spaceId = tabs.find(function(product) { return product.tabs.some(function(item) { return item.id === id; }); }).id;
                                    var spaceIdIndex = tabs.findIndex(function(item) { return item.id === spaceId; });
                                    var payload = _newData4[spaceIdIndex].tabs.filter(function(tab) { return tab.id === id; })[0];
                                    _multiPayload6.push(payload);
                                    var tabIndex = tabs[spaceIdIndex].tabs.findIndex(function(item) { return item.id === id; });
                                    _newData4[spaceIdIndex].tabs.splice(tabIndex, 1);
                                });
                                (_newData4$_toSpaceInd = _newData4[_toSpaceIndex2].tabs).splice.apply(_newData4$_toSpaceInd, [
                                    [_toIndex3], 0
                                ].concat(_multiPayload6));
                                setTabs(_newData4, 'deleteUpdate');
                                return;
                            }
                        }
                    }
                };
                var size = hooks_useWindowSize();
                var reSizeMaxWidth = size.width - 157; //let windowW = size.width;
                //const spaceWidth = Math.round(windowW * 0.2185);
                //const mainScrollRef = useRef(null);
                /* useEffect(() => {
                        const el = mainScrollRef.current;
                        if (el) {
                            const onWheel = (e) => {
                                if (e.deltaY === 0) return;
                                e.preventDefault();
                                el.scrollTo({
                                    left: el.scrollLeft + e.deltaY * 0.4
                                    //behavior: 'smooth'
                                });
                            };
                            el.addEventListener('wheel', onWheel);
                            return () => el.removeEventListener('wheel', onWheel);
                        }
                    }, []); */
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_beautiful_dnd_esm["a" /* DragDropContext */ ], { onDragEnd: onDragEnd, onBeforeCapture: onBeforeCapture, onBeforeDragStart: onBeforeDragStart, onDragStart: onDragStart, onDragUpdate: onDragUpdate }, react_default.a.createElement(PseudoBox["a" /* default */ ], { display: "flex", position: "relative", className: "App", w: "100%", bg: listBG[colorMode] }, react_default.a.createElement(Box["a" /* default */ ], { zIndex: 1, position: "absolute", left: "0", width: "264px", h: "100%", bg: listBG[colorMode], onMouseEnter: hoverSideOn, onMouseOver: hoverSideOn, onMouseLeave: hoverSideOff }, react_default.a.createElement(Box["a" /* default */ ], { zIndex: "1" }, react_default.a.createElement(Flex["a" /* default */ ], { flexDir: "column", height: "100%", width: "264px", bg: listBG[colorMode], position: "fixed" }, react_default.a.createElement(Box["a" /* default */ ], { position: "relative" }, react_default.a.createElement(activeTabsContainer, { hoverSideOn: hoverSideOn, hoverSideOff: hoverSideOff, hoverSide: hoverSide, spaceLimitNotReached: spaceLimitNotReached }))))), blockHoverSide && react_default.a.createElement(PseudoBox["a" /* default */ ], { zIndex: 2, h: "100vh", position: "absolute", left: "0", w: "6vw", opacity: "0", _hover: { opacity: '0.8' }, transition: "opacity 0.25s cubic-bezier(.374,.019,.035,1.861)", style: { backdropFilter: 'blur(2px)' }, display: "flex", alignItems: "center" }), react_default.a.createElement(PseudoBox["a" /* default */ ], { zIndex: 3, display: "flex", overflow: "hidden", flexDir: "column", roundedLeft: "18px", width: "100%", ml: "80px", h: "100%", bg: spacesBG[colorMode], transform: hoverSide ? 'translateX(184px)' : 'none', transition: "transform 0.14s cubic-bezier(0.77,0,0.18,1)", boxShadow: bgShadow[colorMode], scrollSnapType: "x mandatory", scrollPadding: "5%", pos: "relative" }, react_default.a.createElement(Flex["a" /* default */ ], {
                    display: "flex",
                    overflow: "visible",
                    mt: "28px",
                    alignItems: "center",
                    height: "48px" //ml={["5vw", "4vw", "3vw", "2vw"]}
                        ,
                    ml: "36px",
                    mr: "168px"
                }, react_default.a.createElement(react["Suspense"], { fallback: react_default.a.createElement(IconButton["a" /* default */ ], { rounded: "7px", height: "32px", minWidth: "32px", icon: "collection", fontSize: "20px", color: iconColor[colorMode], px: "0px", mr: "12px", mb: "24px", mt: "16px", outline: "none", bg: buttonBgActive[colorMode], boxShadow: mainButtonShadow[colorMode] }) }, react_default.a.createElement(DndArea_SearchModal, null)), !isLoadingCategories ? react_default.a.createElement(categoryTabs, { windowSize: size }) : react_default.a.createElement(MotionBox, {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.2, duration: 0.25, ease: 'easeInOut' } //mx={["5vw", "4vw", "3vw", "2vw"]}
                    ,
                    h: "32px",
                    width: "384px",
                    rounded: "8px",
                    mt: "-6px",
                    pb: "24px",
                    backgroundImage: skeletonBG[colorMode]
                })), react_default.a.createElement(Flex["a" /* default */ ], {
                    height: "100%",
                    pt: "22px",
                    pb: "28px" //px={["5vw", "4vw", "3vw", "36"]}
                        ,
                    px: "36px",
                    width: "100%",
                    overflowY: "hidden",
                    overflowX: isDragging ? 'hidden' : 'auto' //ref={mainScrollRef}
                        ,
                    className: colorMode === 'dark' ? 'groupScrollAreaDarkHover' : 'groupScrollAreaHover'
                }, numberOfSpaces > 0 || isLoadingSpacesToShow || isLoadingCats ? '' : react_default.a.createElement(react["Suspense"], { fallback: react_default.a.createElement(react_default.a.Fragment, null) }, react_default.a.createElement(EmptyStateContainer, { hoverSide: hoverSide })), react_default.a.createElement(Flex["a" /* default */ ], { width: "fit-content", transform: hoverSide ? 'scale(0.96)' : '', transition: "transform 0.14s cubic-bezier(0.73,-0.21,0.27,1.55)", transformOrigin: "center left" }, isLoadingSpacesToShow || isLoadingCats ? react_default.a.createElement(skeletonSpaces, null) : react_default.a.createElement(spaces, { hoverSide: hoverSide, reSizeMaxWidth: reSizeMaxWidth }), numberOfSpaces > 0 && numberOfSpaces < 4 && spaceLimitNotReached ? react_default.a.createElement(dropTabNewSpace["a" /* default */ ], null) : '', numberOfSpaces > 4 ? react_default.a.createElement(Box["a" /* default */ ], { h: "100%", w: "48px", filter: "blur", pointerEvents: "none", right: "0px", position: "fixed", opacity: "0.5", backgroundImage: fadeOutBg[colorMode], mb: "24px" }) : ''), showTrashZone && react_default.a.createElement(trashZone, { numberOfSpaces: numberOfSpaces }))))), showSitesToolbar && !isDragging && react_default.a.createElement(sitesToolbar, null), react_default.a.createElement(limitModal, null));
            }; /* harmony default export */
            var Components_DndArea = (DndArea_DndArea);
            // CONCATENATED MODULE: ./src/App.js
            /* global chrome */ //define zuState outside the render function to obtain a fixed reference without useCallback.
            var App_setTabsZu = function setTabsZu(state) { return state.setTabs; };
            var setUrlsZu = function setUrlsZu(state) { return state.setUrls; };
            var setPrevTabsZu = function setPrevTabsZu(state) { return state.setPrevTabs; };
            var App_setCategoryZu = function setCategoryZu(state) { return state.setCategorySelected; };
            var setCategoriesStateZu = function setCategoriesStateZu(state) { return state.setCategoriesState; };
            var App_setUserStateZu = function setUserStateZu(state) { return state.setUserState; };
            var App_setUserItemsZu = function setUserItemsZu(state) { return state.setUserItems; };
            var setVersionZu = function setVersionZu(state) { return state.setVersion; };
            var setCurrentWSidZu = function setCurrentWSidZu(state) { return state.setCurrentWSid; };
            var App_setIsLoadingUserZu = function setIsLoadingUserZu(state) { return state.setIsLoadingUser; };
            var setIsLoadingInviteZu = function setIsLoadingInviteZu(state) { return state.setIsLoadingInvite; };
            var App_setIsLoadingSpacesToShowZu = function setIsLoadingSpacesToShowZu(state) { return state.setIsLoadingSpacesToShow; };
            var App_setIsLoadingCategoriesZu = function setIsLoadingCategoriesZu(state) { return state.setIsLoadingCategories; };
            var setRolesDataZu = function setRolesDataZu(state) { return state.setRolesData; };
            var App_setLastSavedUserZu = function setLastSavedUserZu(state) { return state.setLastSavedUser; };
            var App_setRemovedModalZu = function setRemovedModalZu(state) { return state.setRemovedModal; };
            var removeWsFromUserStateZu = function removeWsFromUserStateZu(state) { return state.removeWsFromUserState; };
            var App_setShowInitLoginZu = function setShowInitLoginZu(state) { return state.setShowInitLogin; };
            var setOpenGroupsGlobalDataZu = function setOpenGroupsGlobalDataZu(state) { return state.setOpenGroupsGlobalData; };
            var App_setShowBootFailModalZu = function setShowBootFailModalZu(state) { return state.setShowBootFailModal; };
            var useDefaultNewTabValueZu = function useDefaultNewTabValueZu(state) { return state.useDefaultNewTabValue; };

            function App_App() { //zuState
                var setTabs = Object(store["a" /* default */ ])(App_setTabsZu);
                var setUrls = Object(store["a" /* default */ ])(setUrlsZu);
                var setPrevTabs = Object(store["a" /* default */ ])(setPrevTabsZu);
                var setCategory = Object(store["a" /* default */ ])(App_setCategoryZu);
                var setCategoriesState = Object(store["a" /* default */ ])(setCategoriesStateZu);
                var setUserState = Object(store["a" /* default */ ])(App_setUserStateZu);
                var setUserItems = Object(store["a" /* default */ ])(App_setUserItemsZu);
                var setVersion = Object(store["a" /* default */ ])(setVersionZu);
                var setCurrentWSid = Object(store["a" /* default */ ])(setCurrentWSidZu);
                var setIsLoadingUser = Object(store["a" /* default */ ])(App_setIsLoadingUserZu);
                var setIsLoadingInvite = Object(store["a" /* default */ ])(setIsLoadingInviteZu);
                var setIsLoadingSpacesToShow = Object(store["a" /* default */ ])(App_setIsLoadingSpacesToShowZu);
                var setIsLoadingCategories = Object(store["a" /* default */ ])(App_setIsLoadingCategoriesZu);
                var setRolesData = Object(store["a" /* default */ ])(setRolesDataZu);
                var setLastSavedUser = Object(store["a" /* default */ ])(App_setLastSavedUserZu);
                var setRemovedModal = Object(store["a" /* default */ ])(App_setRemovedModalZu);
                var removeWsFromUserState = Object(store["a" /* default */ ])(removeWsFromUserStateZu);
                var setShowInitLogin = Object(store["a" /* default */ ])(App_setShowInitLoginZu);
                var setOpenGroupsGlobalData = Object(store["a" /* default */ ])(setOpenGroupsGlobalDataZu);
                var setShowBootFailModal = Object(store["a" /* default */ ])(App_setShowBootFailModalZu);
                var useDefaultNewTabValue = Object(persistStore["a" /* default */ ])(useDefaultNewTabValueZu);
                var _useColorMode = Object(ColorModeProvider["b" /* useColorMode */ ])(),
                    colorMode = _useColorMode.colorMode,
                    toggleColorMode = _useColorMode.toggleColorMode;
                var toast = Object(Toast["a" /* default */ ])();
                var getChromeVersion = function getChromeVersion() { var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./); return raw ? parseInt(raw[2], 10) : false; };
                var autoUpdateColorMode = function autoUpdateColorMode() { var themeState = localStorage.getItem('themeState'); if (themeState === 'light' || themeState === 'dark') { return; } if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { if (colorMode === 'light') { toggleColorMode(); } else return; } else { if (colorMode === 'dark') { toggleColorMode(); } else return; } }; //Runs onLoad, once - setting initial data
                Utils_useMountEffect(function() {
                    getWakeUpData();
                    var categorySelected = localStorage.getItem('categorySelected');
                    if (categorySelected !== undefined || categorySelected !== null) {
                        setCategory(+categorySelected);
                        setIsLoadingCategories(false);
                    } else {
                        setCategory(0);
                        setIsLoadingCategories(false);
                    }
                    var ver = getChromeVersion();
                    setVersion(ver);
                    var openGroupsData = JSON.parse(localStorage.getItem('openGroupsData'));
                    setOpenGroupsGlobalData(openGroupsData);
                    autoUpdateColorMode();
                });
                /* useEffect(() => {
                        if (useDefaultNewTabValue === true) {
                            chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
                                if (tab[0].url === 'chrome://newtab/') {
                                    chrome.tabs.update({ url: 'chrome://new-tab-page/' });
                                }
                            });
                        }
                    }, [useDefaultNewTabValue]); */
                var disconnectCountRef = Object(react["useRef"])(0);
                var setDisconnectCount = function setDisconnectCount(value) { disconnectCountRef.current = value; };
                var currentWSidRef = Object(react["useRef"])('loading');
                var setCurrentWSidRef = function setCurrentWSidRef(value) { currentWSidRef.current = value; };
                var add = function add() { setDisconnectCount(disconnectCountRef.current + 1); };
                var getWakeUpData = function getWakeUpData() {
                    var port = chrome.runtime.connect({ name: 'clcl' }); //console.log("Sending wake up signal");
                    port.postMessage({ initial: 'wake up' });
                    /* port.onMessage.addListener(function (msg) {
                          if (msg.status === "ready") {
                            setCargoLoaded(true);
                            port.postMessage({ answer: "getServerData" });
                            port.disconnect();
                          }
                        }); */
                    port.onDisconnect.addListener(function(event) {
                        console.log('Disconnect event:', event);
                        add(); //setDisconnectCount(disconnectCount + 1);
                        if (disconnectCountRef.current < 28) { setTimeout(function() { getWakeUpData(); }, 250); } else { //Show button -> reload -> open new tab?
                            setShowBootFailModal(true);
                        }
                    });
                };
                var setTabsMiddleware = function setTabsMiddleware(WSid, data) { if (WSid === currentWSidRef.current) { setTabs(data, 'noDbUpdate'); } };
                var onMessage = /*#__PURE__*/ function() {
                    var _ref = Object(asyncToGenerator["a" /* default */ ])( /*#__PURE__*/ regenerator_default.a.mark(function _callee(request, sender, sendResponse) {
                        var wsData, _wsData$userInfo, newItemsSaved, data, _data, _data2, errorText, errorCode, successMessage;
                        return regenerator_default.a.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        if (!(request.msg === 'initialDataCargo')) { _context.next = 8; break; } //console.log("initial data loaded", request, "cargoSet: ", cargoSet);
                                        wsData = request.currentTabData;
                                        if (!(wsData.shareLinkDoc === true)) { _context.next = 4; break; }
                                        return _context.abrupt("return");
                                    case 4:
                                        if ( /* cargoSet === false  &&*/ Object.keys(wsData).length > 0) {
                                            setTabs(wsData.tabData, 'noDbUpdate');
                                            setPrevTabs(wsData.tabData);
                                            setCategoriesState(wsData.categories);
                                            if (wsData.WSid) {
                                                setCurrentWSidRef(wsData.WSid);
                                                setCurrentWSid(wsData.WSid);
                                            }
                                            if (wsData.roles) { setRolesData(wsData.roles); } else { setRolesData([]); }
                                            if (wsData.lastUser && request.timeUpdated) { setLastSavedUser({ moveArrow: true, userId: wsData.lastUser, lastSaved: request.timeUpdated, dateSaved: request.dateUpdated, owner: wsData.owner }); } setIsLoadingSpacesToShow(false);
                                            setIsLoadingCategories(false);
                                            newItemsSaved = (_wsData$userInfo = wsData.userInfo) === null || _wsData$userInfo === void 0 ? void 0 : _wsData$userInfo.itemsSaved;
                                            chrome.runtime.sendMessage({ msg: 'getInitialUserData' }, function(response) {
                                                console.info('id: ', response.userData.userId);
                                                if (response.userData !== false) {
                                                    setUserState(response.userData);
                                                    setUserItems(newItemsSaved);
                                                    setIsLoadingUser(false);
                                                } else return;
                                            });
                                        }
                                        sendResponse({});
                                        _context.next = 9;
                                        break;
                                    case 8:
                                        if (request.msg === 'newCatData') { setCategoriesState(request.currentTabData.categories); } else if (request.msg === 'noUserSignedIn') {
                                            setIsLoadingUser(false);
                                            setShowInitLogin(true);
                                            setCategory(0);
                                        } else if (request.msg === 'newTabData') {
                                            setTabs(request.data, 'noDbUpdate');
                                            sendResponse({});
                                        } else if (request.msg === 'newTabsWithWSId') {
                                            setTabsMiddleware(request.WSid, request.data);
                                            sendResponse({});
                                        } else if (request.msg === 'dataSavedTimeOnly') {
                                            data = request.data;
                                            if (data.roles !== undefined) { setRolesData(data.roles); } setLastSavedUser({ moveArrow: false, userId: data.lastUser, lastSaved: data.timeUpdated, dateSaved: data.dateUpdated, owner: data.owner });
                                            sendResponse({});
                                        } else if (request.msg === 'newRoles') { // This happens when text-snippet is saved
                                            setRolesData(request.data);
                                            setIsLoadingInvite(false);
                                            sendResponse({});
                                        } else if (request.msg === 'newUserLogin') {
                                            setCategory(0);
                                            setShowInitLogin(false);
                                            getWakeUpData();
                                            sendResponse({});
                                        } else if (request.msg === 'newWSdataLoaded') {
                                            _data = request.currentTabData; //console.log("newWSdataLoaded: ", data);
                                            //let userIdFromBg = request.userId;
                                            setCategory(0); //console.log("newWSdataLoaded", data);
                                            setTabs(_data.tabData, 'noDbUpdate');
                                            if (_data.roles) {
                                                setRolesData(_data.roles);
                                                setIsLoadingInvite(false);
                                            } else if (!_data.roles) {
                                                setRolesData([]);
                                                setIsLoadingInvite(false);
                                            }
                                            if (_data.lastUser && request.timeUpdated) { setLastSavedUser({ moveArrow: true, userId: request.currentTabData.lastUser, lastSaved: request.timeUpdated, dateSaved: request.dateUpdated, owner: request.currentTabData.owner }); } setPrevTabs(_data.tabData);
                                            setCategoriesState(_data.categories);
                                            if (_data.WSid) { setCurrentWSid(_data.WSid); } setIsLoadingSpacesToShow(false);
                                            setIsLoadingCategories(false);
                                            sendResponse({});
                                        } else if (request.msg === 'userLoggedOut') {
                                            setIsLoadingSpacesToShow(true);
                                            setIsLoadingCategories(true);
                                            setCategory(0);
                                            setUserState({ email: '', name: '' });
                                            setRolesData([]);
                                            setTabs([], 'noDbUpdate');
                                            setUserItems();
                                            getWakeUpData();
                                            sendResponse({});
                                        } else if (request.msg === 'isRemovedFromCurrentWS') {
                                            setRemovedModal(true);
                                            setIsLoadingSpacesToShow(true);
                                            setIsLoadingCategories(true); //changeWorkspace("first");
                                            removeWsFromUserState(request.data);
                                            sendResponse({});
                                        } else if (request.msg === 'updateDataOnFront') {
                                            _data2 = request.data;
                                            setTabs(_data2, 'noDbUpdate');
                                            if (_data2.WSid) { setCurrentWSid(_data2.WSid); } sendResponse({});
                                        } else if (request.msg === 'newUserData') {
                                            setUserState(request.userData);
                                            setIsLoadingUser(false);
                                            sendResponse({ resp: 'userData framme på front' });
                                        } else if (request.msg === 'errorMessage') {
                                            errorText = request.text;
                                            errorCode = request.code;
                                            console.info('errorCode: ', errorCode); //console.log("Error from background: ", errorText, errorCode);
                                            //if (errorText === "Attempting to use a disconnected port object") {
                                            //visa disconneted state }
                                            toast({ position: 'bottom-right', status: 'success', duration: 3500, isClosable: true, render: function render(_ref2) { var onClose = _ref2.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: '看这看这看这', subtitle: '你还要再拖动他，快点', type: 'error', colorMode: colorMode }); } });
                                            setIsLoadingUser(false);
                                            setIsLoadingSpacesToShow(false);
                                            setIsLoadingCategories(false);
                                            sendResponse({});
                                        } else if (request.msg === 'successMessage') {
                                            successMessage = request.text;
                                            toast({ position: 'bottom-right', status: 'success', duration: 3500, isClosable: true, render: function render(_ref3) { var onClose = _ref3.onClose; return react_default.a.createElement(toastPopper["a" /* default */ ], { onClose: onClose, title: 'Awesome!', subtitle: successMessage, type: 'success', colorMode: colorMode }); } });
                                            sendResponse({});
                                        }
                                    case 9:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    }));
                    return function onMessage(_x, _x2, _x3) { return _ref.apply(this, arguments); };
                }();
                var handlerRef = Object(react["useRef"])();
                Object(react["useEffect"])(function() { if (handlerRef.current) { chrome.runtime.onMessage.removeListener(handlerRef.current); } chrome.runtime.onMessage.addListener(onMessage); }, []);
                Object(react["useEffect"])(function() { handlerRef.current = onMessage; }, []);
                return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(Components_DndArea, null), react_default.a.createElement(settingsMenu, null));
            } /* harmony default export */
            var src_App = (App_App);
            // CONCATENATED MODULE: ./src/serviceWorker.js
            // This optional code is used to register a service worker.
            // register() is not called by default.
            // This lets the app load faster on subsequent visits in production, and gives
            // it offline capabilities. However, it also means that developers (and users)
            // will only see deployed updates on subsequent visits to a page, after all the
            // existing tabs open on the page have been closed, since previously cached
            // resources are updated in the background.
            // To learn more about the benefits of this model and instructions on how to
            // opt-in, read https://bit.ly/CRA-PWA
            var isLocalhost = Boolean(window.location.hostname === 'localhost' || // [::1] is the IPv6 localhost address.
                window.location.hostname === '[::1]' || // 127.0.0.0/8 are considered localhost for IPv4.
                window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

            function register(config) {
                if (true && 'serviceWorker' in navigator) { // The URL constructor is available in all browsers that support SW.
                    var publicUrl = new URL("", window.location.href);
                    if (publicUrl.origin !== window.location.origin) { // Our service worker won't work if PUBLIC_URL is on a different origin
                        // from what our page is served on. This might happen if a CDN is used to
                        // serve assets; see https://github.com/facebook/create-react-app/issues/2374
                        return;
                    }
                    window.addEventListener('load', function() {
                        var swUrl = "".concat("", "/service-worker.js");
                        if (isLocalhost) { // This is running on localhost. Let's check if a service worker still exists or not.
                            checkValidServiceWorker(swUrl, config); // Add some additional logging to localhost, pointing developers to the
                            // service worker/PWA documentation.
                            navigator.serviceWorker.ready.then(function() { console.log('This web app is being served cache-first by a service ' + 'worker. To learn more, visit https://bit.ly/CRA-PWA'); });
                        } else { // Is not localhost. Just register service worker
                            registerValidSW(swUrl, config);
                        }
                    });
                }
            }

            function registerValidSW(swUrl, config) {
                navigator.serviceWorker.register(swUrl).then(function(registration) {
                    registration.onupdatefound = function() {
                        var installingWorker = registration.installing;
                        if (installingWorker == null) { return; } installingWorker.onstatechange = function() {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) { // At this point, the updated precached content has been fetched,
                                    // but the previous service worker will still serve the older
                                    // content until all client tabs are closed.
                                    console.log('New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'); // Execute callback
                                    if (config && config.onUpdate) { config.onUpdate(registration); }
                                } else { // At this point, everything has been precached.
                                    // It's the perfect time to display a
                                    // "Content is cached for offline use." message.
                                    console.log('Content is cached for offline use.'); // Execute callback
                                    if (config && config.onSuccess) { config.onSuccess(registration); }
                                }
                            }
                        };
                    };
                }).catch(function(error) { console.error('Error during service worker registration:', error); });
            }

            function checkValidServiceWorker(swUrl, config) { // Check if the service worker can be found. If it can't reload the page.
                fetch(swUrl, { headers: { 'Service-Worker': 'script' } }).then(function(response) { // Ensure service worker exists, and that we really are getting a JS file.
                    var contentType = response.headers.get('content-type');
                    if (response.status === 404 || contentType != null && contentType.indexOf('javascript') === -1) { // No service worker found. Probably a different app. Reload the page.
                        navigator.serviceWorker.ready.then(function(registration) { registration.unregister().then(function() { window.location.reload(); }); });
                    } else { // Service worker found. Proceed as normal.
                        registerValidSW(swUrl, config);
                    }
                }).catch(function() { console.log('No internet connection found. App is running in offline mode.'); });
            }

            function unregister() { if ('serviceWorker' in navigator) { navigator.serviceWorker.ready.then(function(registration) { registration.unregister(); }).catch(function(error) { console.error(error.message); }); } }
            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/theme/theme.js + 4 modules
            var theme = __webpack_require__(230);

            // CONCATENATED MODULE: ./src/Utils/customTheme.js
            var customIcons = { dotdotdot: { path: react_default.a.createElement("path", { d: "M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4z", fill: "currentColor" }), viewBox: '0 0 20 20' }, settingsCog: { path: react_default.a.createElement("g", { fill: "currentColor" }, ' ', react_default.a.createElement("path", { stroke: "#4A5568", fill: "#FFF", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), react_default.a.createElement("path", { fill: "#FFF", stroke: "#4A5568", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })), viewBox: '0 0 24 24' }, settingsCogFilled: { path: react_default.a.createElement("path", { d: "M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z", fill: "currentColor", fillRule: "evenodd" }), viewBox: '0 0 20 20' }, editFilled: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z" }), react_default.a.createElement("path", { d: "M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, addSpace: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 2C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V7.41421C16 6.88378 15.7893 6.37507 15.4142 6L12 2.58579C11.6249 2.21071 11.1162 2 10.5858 2H6ZM11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14L11 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H11V8Z" })), viewBox: '0 0 20 20' }, trash: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, switch: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M8 5C7.44772 5 7 5.44771 7 6C7 6.55228 7.44772 7 8 7L13.5858 7L12.2929 8.29289C11.9024 8.68342 11.9024 9.31658 12.2929 9.70711C12.6834 10.0976 13.3166 10.0976 13.7071 9.70711L16.7071 6.70711C16.8946 6.51957 17 6.26522 17 6C17 5.73478 16.8946 5.48043 16.7071 5.29289L13.7071 2.29289C13.3166 1.90237 12.6834 1.90237 12.2929 2.29289C11.9024 2.68342 11.9024 3.31658 12.2929 3.70711L13.5858 5L8 5Z" }), react_default.a.createElement("path", { d: "M12 15C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13L6.41421 13L7.70711 11.7071C8.09763 11.3166 8.09763 10.6834 7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929L3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14C3 14.2652 3.10536 14.5196 3.29289 14.7071L6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071C8.09763 17.3166 8.09763 16.6834 7.70711 16.2929L6.41421 15L12 15Z" })), viewBox: '0 0 20 20' }, comment: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M18 13V5C18 3.89543 17.1046 3 16 3H4C2.89543 3 2 3.89543 2 5V13C2 14.1046 2.89543 15 4 15H7L10 18L13 15H16C17.1046 15 18 14.1046 18 13ZM5 7C5 6.44772 5.44772 6 6 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H6C5.44772 8 5 7.55228 5 7ZM6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12H9C9.55229 12 10 11.5523 10 11C10 10.4477 9.55229 10 9 10H6Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, lightBulb: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M11 3C11 2.44772 10.5523 2 10 2C9.44771 2 9 2.44772 9 3V4C9 4.55228 9.44771 5 10 5C10.5523 5 11 4.55228 11 4V3Z" }), react_default.a.createElement("path", { d: "M15.6568 5.75731C16.0473 5.36678 16.0473 4.73362 15.6568 4.34309C15.2663 3.95257 14.6331 3.95257 14.2426 4.34309L13.5355 5.0502C13.145 5.44072 13.145 6.07389 13.5355 6.46441C13.926 6.85494 14.5592 6.85494 14.9497 6.46441L15.6568 5.75731Z" }), react_default.a.createElement("path", { d: "M18 10C18 10.5523 17.5523 11 17 11H16C15.4477 11 15 10.5523 15 10C15 9.44771 15.4477 9 16 9H17C17.5523 9 18 9.44771 18 10Z" }), react_default.a.createElement("path", { d: "M5.05019 6.46443C5.44071 6.85496 6.07388 6.85496 6.4644 6.46443C6.85493 6.07391 6.85493 5.44074 6.4644 5.05022L5.7573 4.34311C5.36677 3.95259 4.73361 3.95259 4.34308 4.34311C3.95256 4.73363 3.95256 5.3668 4.34308 5.75732L5.05019 6.46443Z" }), react_default.a.createElement("path", { d: "M5 10C5 10.5523 4.55228 11 4 11H3C2.44772 11 2 10.5523 2 10C2 9.44771 2.44772 9 3 9H4C4.55228 9 5 9.44771 5 10Z" }), react_default.a.createElement("path", { d: "M8 16V15H12V16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16Z" }), react_default.a.createElement("path", { d: "M12.0009 14C12.0155 13.6597 12.2076 13.3537 12.4768 13.1411C13.4046 12.4086 14 11.2738 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 11.2738 6.59545 12.4086 7.52319 13.1411C7.79241 13.3537 7.98451 13.6597 7.99911 14H12.0009Z" })), viewBox: '0 0 20 20' }, arrowCircleRight: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 9.29289L10.7071 6.29289C10.3166 5.90237 9.68342 5.90237 9.29289 6.29289C8.90237 6.68342 8.90237 7.31658 9.29289 7.70711L10.5858 9L7 9C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H10.5858L9.29289 12.2929C8.90237 12.6834 8.90237 13.3166 9.29289 13.7071C9.68342 14.0976 10.3166 14.0976 10.7071 13.7071L13.7071 10.7071C14.0976 10.3166 14.0976 9.68342 13.7071 9.29289Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, editPen: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" }), react_default.a.createElement("path", { d: "M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" })), viewBox: '0 0 20 20' }, arrowDown: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90237 4.31658 9.90237 4.70711 10.2929L9 14.5858L9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3L11 14.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, checkDone: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, checkCircle: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, safe: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M5 9V7C5 4.23858 7.23858 2 10 2C12.7614 2 15 4.23858 15 7V9C16.1046 9 17 9.89543 17 11V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V11C3 9.89543 3.89543 9 5 9ZM13 7V9H7V7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, unsafe: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M10 2C7.23858 2 5 4.23858 5 7V9C3.89543 9 3 9.89543 3 11V16C3 17.1046 3.89543 18 5 18H15C16.1046 18 17 17.1046 17 16V11C17 9.89543 16.1046 9 15 9H7V7C7 5.34315 8.34315 4 10 4C11.3965 4 12.5725 4.95512 12.9055 6.24926C13.0432 6.78411 13.5884 7.1061 14.1232 6.96844C14.6581 6.83078 14.9801 6.28559 14.8424 5.75074C14.2874 3.59442 12.3312 2 10 2Z" })), viewBox: '0 0 20 20' }, externalLink: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" }), react_default.a.createElement("path", { d: "M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" })), viewBox: '0 0 20 20' }, linkFilled: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M12.5858 4.58579C13.3668 3.80474 14.6331 3.80474 15.4142 4.58579C16.1952 5.36683 16.1952 6.63316 15.4142 7.41421L12.4142 10.4142C11.6331 11.1953 10.3668 11.1953 9.58577 10.4142C9.19524 10.0237 8.56208 10.0237 8.17156 10.4142C7.78103 10.8047 7.78103 11.4379 8.17156 11.8284C9.73365 13.3905 12.2663 13.3905 13.8284 11.8284L16.8284 8.82843C18.3905 7.26633 18.3905 4.73367 16.8284 3.17157C15.2663 1.60948 12.7337 1.60948 11.1716 3.17157L9.67156 4.67157C9.28103 5.0621 9.28103 5.69526 9.67156 6.08579C10.0621 6.47631 10.6952 6.47631 11.0858 6.08579L12.5858 4.58579ZM7.58579 9.58579C8.36683 8.80474 9.63316 8.80474 10.4142 9.58579C10.8047 9.97631 11.4379 9.97631 11.8284 9.58579C12.219 9.19526 12.219 8.5621 11.8284 8.17157C10.2663 6.60948 7.73367 6.60948 6.17157 8.17157L3.17157 11.1716C1.60948 12.7337 1.60948 15.2663 3.17157 16.8284C4.73367 18.3905 7.26633 18.3905 8.82843 16.8284L10.3284 15.3284C10.719 14.9379 10.719 14.3047 10.3284 13.9142C9.9379 13.5237 9.30474 13.5237 8.91421 13.9142L7.41421 15.4142C6.63316 16.1953 5.36684 16.1953 4.58579 15.4142C3.80474 14.6332 3.80474 13.3668 4.58579 12.5858L7.58579 9.58579Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, circleAdd: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, arrowCircleDown: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 6.44772 10.5523 6 10 6C9.44771 6 9 6.44772 9 7L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L9.29289 13.7071C9.68342 14.0976 10.3166 14.0976 10.7071 13.7071L13.7071 10.7071C14.0976 10.3166 14.0976 9.68342 13.7071 9.29289C13.3166 8.90237 12.6834 8.90237 12.2929 9.29289L11 10.5858V7Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, dropDocument: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M6 2C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V7.41421C16 6.88378 15.7893 6.37507 15.4142 6L12 2.58579C11.6249 2.21071 11.1162 2 10.5858 2H6ZM11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8V11.5858L7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929C5.90237 10.6834 5.90237 11.3166 6.29289 11.7071L9.29289 14.7071C9.68342 15.0976 10.3166 15.0976 10.7071 14.7071L13.7071 11.7071C14.0976 11.3166 14.0976 10.6834 13.7071 10.2929C13.3166 9.90237 12.6834 9.90237 12.2929 10.2929L11 11.5858V8Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, addDocument: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M6 2C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V7.41421C16 6.88378 15.7893 6.37507 15.4142 6L12 2.58579C11.6249 2.21071 11.1162 2 10.5858 2H6ZM11 8C11 7.44772 10.5523 7 10 7C9.44772 7 9 7.44772 9 8V10H7C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H9V14C9 14.5523 9.44771 15 10 15C10.5523 15 11 14.5523 11 14L11 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H11V8Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, archive: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M4 3C2.89543 3 2 3.89543 2 5C2 6.10457 2.89543 7 4 7H16C17.1046 7 18 6.10457 18 5C18 3.89543 17.1046 3 16 3H4Z" }), react_default.a.createElement("path", { d: "M3 8H17V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V8ZM8 11C8 10.4477 8.44772 10 9 10H11C11.5523 10 12 10.4477 12 11C12 11.5523 11.5523 12 11 12H9C8.44772 12 8 11.5523 8 11Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, chevronDown: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, chevronUp: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, searchIcon: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, book: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M9 4.80423C7.9428 4.28906 6.75516 4 5.5 4C4.24484 4 3.0572 4.28906 2 4.80423V14.8042C3.0572 14.2891 4.24484 14 5.5 14C7.1686 14 8.71789 14.5108 10 15.3847C11.2821 14.5108 12.8314 14 14.5 14C15.7552 14 16.9428 14.2891 18 14.8042V4.80423C16.9428 4.28906 15.7552 4 14.5 4C13.2448 4 12.0572 4.28906 11 4.80423V12C11 12.5523 10.5523 13 10 13C9.44772 13 9 12.5523 9 12V4.80423Z" })), viewBox: '0 0 20 20' }, emojiPicker: { path: react_default.a.createElement("g", { fill: "transparent" }, react_default.a.createElement("path", { d: "M14.8284 14.8284C13.2663 16.3905 10.7337 16.3905 9.17157 14.8284M9 10H9.01M15 10H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "2" })), viewBox: '0 0 24 24' }, incognito: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, fullscreen: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z", clipRule: "evenodd" })), viewBox: '0 0 20 20' }, copyToClipboard: { path: react_default.a.createElement("g", { fill: "currentColor" }, react_default.a.createElement("path", { d: "M8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4H10C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2H8Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M3 5C3 3.89543 3.89543 3 5 3C5 4.65685 6.34315 6 8 6H10C11.6569 6 13 4.65685 13 3C14.1046 3 15 3.89543 15 5V11H10.4142L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H15V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V5Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M15 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H15V11Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, signUp: { path: react_default.a.createElement("g", { fill: "none", fillRule: "evenodd" }, react_default.a.createElement("path", { fill: "currentColor", d: "M14 0c7.732 0 14 6.268 14 14 0 .31-.01.616-.03.92A8.961 8.961 0 0024 14a8.97 8.97 0 00-6.297 2.57A8.715 8.715 0 0014 15.75a8.752 8.752 0 00-7.956 5.102 10.476 10.476 0 009.071 3.59 8.933 8.933 0 001.27 3.356A14.11 14.11 0 0114 28C6.268 28 0 21.732 0 14S6.268 0 14 0zm0 5.25a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" }), react_default.a.createElement("circle", { cx: "24", cy: "23", r: "7", fill: "currentColor" }), react_default.a.createElement("path", { stroke: "#FFF", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M23.885 20L23.885 25.769" }), react_default.a.createElement("path", { stroke: "#FFF", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M21 22.885L26.769 22.885" })), viewBox: '0 0 31 30' }, emailIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M2.00333 5.88355L9.99995 9.88186L17.9967 5.8835C17.9363 4.83315 17.0655 4 16 4H4C2.93452 4 2.06363 4.83318 2.00333 5.88355Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M18 8.1179L9.99995 12.1179L2 8.11796V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V8.1179Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, creditCard: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, downloadIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, warningShield: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M10 1.94446C7.91528 3.81033 5.17437 4.95809 2.16611 4.99891C2.05686 5.64968 2 6.31821 2 7.00003C2 12.2249 5.33923 16.6698 10 18.3172C14.6608 16.6698 18 12.2249 18 7.00003C18 6.31821 17.9431 5.64968 17.8339 4.99891C14.8256 4.95809 12.0847 3.81033 10 1.94446ZM11 14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14C9 13.4477 9.44771 13 10 13C10.5523 13 11 13.4477 11 14ZM11 7C11 6.44772 10.5523 6 10 6C9.44771 6 9 6.44772 9 7V10C9 10.5523 9.44771 11 10 11C10.5523 11 11 10.5523 11 10V7Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, signOut: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { fillRule: "evenodd", d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z", fill: "currentColor", clipRule: "evenodd" })), viewBox: '0 0 20 20' }, moonIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M17.2929 13.2929C16.2886 13.7471 15.1738 13.9999 14 13.9999C9.58172 13.9999 6 10.4182 6 5.9999C6 4.82593 6.25287 3.71102 6.70712 2.70667C3.93137 3.96191 2 6.75526 2 9.9997C2 14.418 5.58172 17.9997 10 17.9997C13.2443 17.9997 16.0376 16.0685 17.2929 13.2929Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, sunIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M10 2C10.5523 2 11 2.44772 11 3V4C11 4.55228 10.5523 5 10 5C9.44772 5 9 4.55228 9 4V3C9 2.44772 9.44772 2 10 2ZM14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM13.5356 14.9497L14.2427 15.6568C14.6332 16.0473 15.2664 16.0473 15.6569 15.6568C16.0474 15.2663 16.0474 14.6331 15.6569 14.2426L14.9498 13.5355C14.5593 13.145 13.9261 13.145 13.5356 13.5355C13.1451 13.926 13.1451 14.5592 13.5356 14.9497ZM15.6568 4.34309C16.0473 4.73362 16.0473 5.36678 15.6568 5.75731L14.9497 6.46441C14.5592 6.85494 13.926 6.85494 13.5355 6.46441C13.145 6.07389 13.145 5.44072 13.5355 5.0502L14.2426 4.34309C14.6331 3.95257 15.2663 3.95257 15.6568 4.34309ZM17 11C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9H16C15.4477 9 15 9.44772 15 10C15 10.5523 15.4477 11 16 11H17ZM10 15C10.5523 15 11 15.4477 11 16V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V16C9 15.4477 9.44772 15 10 15ZM5.05031 6.46443C5.44083 6.85496 6.074 6.85496 6.46452 6.46443C6.85505 6.07391 6.85505 5.44074 6.46452 5.05022L5.75742 4.34311C5.36689 3.95259 4.73373 3.95259 4.3432 4.34311C3.95268 4.73363 3.95268 5.3668 4.3432 5.75732L5.05031 6.46443ZM6.46443 14.9497L5.75732 15.6568C5.3668 16.0473 4.73363 16.0473 4.34311 15.6568C3.95259 15.2663 3.95259 14.6331 4.34311 14.2426L5.05022 13.5355C5.44074 13.145 6.07391 13.145 6.46443 13.5355C6.85496 13.926 6.85496 14.5592 6.46443 14.9497ZM4 11C4.55228 11 5 10.5523 5 10C5 9.44772 4.55228 9 4 9H3C2.44772 9 2 9.44772 2 10C2 10.5523 2.44772 11 3 11H4Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, cloudUpload: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M2 10C2 12.2091 3.79086 14 6 14H9V17C9 17.5523 9.44772 18 10 18C10.5523 18 11 17.5523 11 17V14H14C16.2091 14 18 12.2091 18 10C18 7.79086 16.2091 6 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C3.79086 6 2 7.79086 2 10ZM11 14H9L9 9.41421L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289L13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071C13.3166 11.0976 12.6834 11.0976 12.2929 10.7071L11 9.41421V14Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, thumbnail: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM16 15H4L8 7L11 13L13 9L16 15Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, document: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M2 6C2 4.89543 2.89543 4 4 4H9L11 6H16C17.1046 6 18 6.89543 18 8V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V6Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, soundOn: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M9.38268 3.07615C9.75636 3.23093 10 3.59557 10 4.00003V16C10 16.4045 9.75636 16.7691 9.38268 16.9239C9.00901 17.0787 8.57889 16.9931 8.29289 16.7071L4.58579 13H2C1.44772 13 1 12.5523 1 12V8.00003C1 7.44774 1.44772 7.00003 2 7.00003H4.58579L8.29289 3.29292C8.57889 3.00692 9.00901 2.92137 9.38268 3.07615Z", fill: "currentColor", fillRule: "evenodd" }), react_default.a.createElement("path", { d: "M14.6568 2.92888C15.0474 2.53836 15.6805 2.53836 16.0711 2.92888C17.8796 4.73743 19 7.2388 19 9.99995C19 12.7611 17.8796 15.2625 16.0711 17.071C15.6805 17.4615 15.0474 17.4615 14.6568 17.071C14.2663 16.6805 14.2663 16.0473 14.6568 15.6568C16.1057 14.208 17 12.2094 17 9.99995C17 7.79053 16.1057 5.7919 14.6568 4.34309C14.2663 3.95257 14.2663 3.3194 14.6568 2.92888ZM11.8284 5.75731C12.2189 5.36678 12.8521 5.36678 13.2426 5.75731C13.7685 6.28319 14.1976 6.90687 14.5003 7.59958C14.822 8.33592 15 9.14847 15 9.99995C15 11.6565 14.3273 13.1579 13.2426 14.2426C12.8521 14.6331 12.2189 14.6331 11.8284 14.2426C11.4379 13.8521 11.4379 13.2189 11.8284 12.8284C12.5534 12.1034 13 11.1048 13 9.99995C13 9.42922 12.8811 8.8889 12.6676 8.40032C12.4663 7.93958 12.1802 7.52327 11.8284 7.17152C11.4379 6.781 11.4379 6.14783 11.8284 5.75731Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, soundOff: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M9.38268 3.07615C9.75636 3.23093 10 3.59557 10 4.00003V16C10 16.4045 9.75636 16.7691 9.38268 16.9239C9.00901 17.0787 8.57889 16.9931 8.29289 16.7071L4.58579 13H2C1.44772 13 1 12.5523 1 12V8.00003C1 7.44774 1.44772 7.00003 2 7.00003H4.58579L8.29289 3.29292C8.57889 3.00692 9.00901 2.92137 9.38268 3.07615Z", fill: "currentColor", fillRule: "evenodd" }), react_default.a.createElement("path", { d: "M12.2929 7.29289C12.6834 6.90237 13.3166 6.90237 13.7071 7.29289L15 8.58579L16.2929 7.29289C16.6834 6.90237 17.3166 6.90237 17.7071 7.29289C18.0976 7.68342 18.0976 8.31658 17.7071 8.70711L16.4142 10L17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071C17.3166 13.0976 16.6834 13.0976 16.2929 12.7071L15 11.4142L13.7071 12.7071C13.3166 13.0976 12.6834 13.0976 12.2929 12.7071C11.9024 12.3166 11.9024 11.6834 12.2929 11.2929L13.5858 10L12.2929 8.70711C11.9024 8.31658 11.9024 7.68342 12.2929 7.29289Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, chevronRight: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, plusCircle: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7V9H7C6.44772 9 6 9.44771 6 10C6 10.5523 6.44772 11 7 11H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H11V7Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, linkIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M12.5858 4.58579C13.3668 3.80474 14.6331 3.80474 15.4142 4.58579C16.1952 5.36683 16.1952 6.63316 15.4142 7.41421L12.4142 10.4142C11.6331 11.1953 10.3668 11.1953 9.58577 10.4142C9.19524 10.0237 8.56208 10.0237 8.17156 10.4142C7.78103 10.8047 7.78103 11.4379 8.17156 11.8284C9.73365 13.3905 12.2663 13.3905 13.8284 11.8284L16.8284 8.82843C18.3905 7.26633 18.3905 4.73367 16.8284 3.17157C15.2663 1.60948 12.7337 1.60948 11.1716 3.17157L9.67156 4.67157C9.28103 5.0621 9.28103 5.69526 9.67156 6.08579C10.0621 6.47631 10.6952 6.47631 11.0858 6.08579L12.5858 4.58579ZM7.58579 9.58579C8.36683 8.80474 9.63316 8.80474 10.4142 9.58579C10.8047 9.97631 11.4379 9.97631 11.8284 9.58579C12.219 9.19526 12.219 8.5621 11.8284 8.17157C10.2663 6.60948 7.73367 6.60948 6.17157 8.17157L3.17157 11.1716C1.60948 12.7337 1.60948 15.2663 3.17157 16.8284C4.73367 18.3905 7.26633 18.3905 8.82843 16.8284L10.3284 15.3284C10.719 14.9379 10.719 14.3047 10.3284 13.9142C9.9379 13.5237 9.30474 13.5237 8.91421 13.9142L7.41421 15.4142C6.63316 16.1953 5.36684 16.1953 4.58579 15.4142C3.80474 14.6332 3.80474 13.3668 4.58579 12.5858L7.58579 9.58579Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, SaveIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M7.70711 10.2929C7.31658 9.90237 6.68342 9.90237 6.29289 10.2929C5.90237 10.6834 5.90237 11.3166 6.29289 11.7071L9.29289 14.7071C9.68342 15.0976 10.3166 15.0976 10.7071 14.7071L13.7071 11.7071C14.0976 11.3166 14.0976 10.6834 13.7071 10.2929C13.3166 9.90237 12.6834 9.90237 12.2929 10.2929L11 11.5858L11 6H16C17.1046 6 18 6.89543 18 8V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V8C2 6.89543 2.89543 6 4 6H9L9 11.5858L7.70711 10.2929Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M9 4C9 3.44772 9.44772 3 10 3C10.5523 3 11 3.44772 11 4L11 6H9L9 4Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, ThemeIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M4 2C2.89543 2 2 2.89543 2 4V15C2 16.6569 3.34315 18 5 18C6.65685 18 8 16.6569 8 15V4C8 2.89543 7.10457 2 6 2H4ZM5 16C5.55228 16 6 15.5523 6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16ZM10 14.2426L14.8995 9.34308C15.6805 8.56203 15.6805 7.2957 14.8995 6.51465L13.4853 5.10044C12.7042 4.31939 11.4379 4.31939 10.6568 5.10044L10 5.75728V14.2426ZM16 18H9.07104L15.071 12H16C17.1046 12 18 12.8954 18 14V16C18 17.1046 17.1046 18 16 18Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, compactView: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4C17 4.55228 16.5523 5 16 5H4C3.44772 5 3 4.55228 3 4ZM3 8C3 7.44772 3.44772 7 4 7H16C16.5523 7 17 7.44772 17 8C17 8.55228 16.5523 9 16 9H4C3.44772 9 3 8.55228 3 8ZM3 12C3 11.4477 3.44772 11 4 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H4C3.44772 13 3 12.5523 3 12ZM3 16C3 15.4477 3.44772 15 4 15H16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, sortByIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H14C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3H3Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H8C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7H3Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H3Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M13 16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16L15 10.4142L16.2929 11.7071C16.6834 12.0976 17.3166 12.0976 17.7071 11.7071C18.0976 11.3166 18.0976 10.6834 17.7071 10.2929L14.7071 7.29289C14.5196 7.10536 14.2652 7 14 7C13.7348 7 13.4804 7.10536 13.2929 7.29289L10.2929 10.2929C9.90237 10.6834 9.90237 11.3166 10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071L13 10.4142L13 16Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, collection: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, addUser: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M8 9C9.65685 9 11 7.65685 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M8 11C11.3137 11 14 13.6863 14 17H2C2 13.6863 4.68629 11 8 11Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M16 7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7V8H13C12.4477 8 12 8.44771 12 9C12 9.55228 12.4477 10 13 10H14V11C14 11.5523 14.4477 12 15 12C15.5523 12 16 11.5523 16 11V10H17C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8H16V7Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, sharedIcon: { path: react_default.a.createElement("g", { fill: "none" }, react_default.a.createElement("path", { d: "M15 8C16.6569 8 18 6.65685 18 5C18 3.34315 16.6569 2 15 2C13.3431 2 12 3.34315 12 5C12 5.12548 12.0077 5.24917 12.0227 5.37061L7.08259 7.84064C6.54303 7.32015 5.8089 7 5 7C3.34315 7 2 8.34315 2 10C2 11.6569 3.34315 13 5 13C5.80892 13 6.54306 12.6798 7.08263 12.1593L12.0227 14.6293C12.0077 14.7508 12 14.8745 12 15C12 16.6569 13.3431 18 15 18C16.6569 18 18 16.6569 18 15C18 13.3431 16.6569 12 15 12C14.1911 12 13.457 12.3201 12.9174 12.8406L7.97733 10.3706C7.9923 10.2492 8 10.1255 8 10C8 9.8745 7.99229 9.7508 7.97733 9.62934L12.9174 7.15932C13.4569 7.67984 14.1911 8 15 8Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, userAccount: { path: react_default.a.createElement("g", null, react_default.a.createElement("circle", { id: "Oval", cx: "10", cy: "5", r: "5", fill: "currentColor" }), react_default.a.createElement("path", { d: "M9.70820393,13 L10,13 L10,13 L10.2917961,13 C14.4030266,13 18.1614018,15.3228036 20,19 L20,19 L20,19 C18.7505107,20.8742339 16.6469976,22 14.3944487,22 L5.60555128,22 C3.35300242,22 1.24948929,20.8742339 0,19 L0,19 L0,19 C1.83859819,15.3228036 5.59697339,13 9.70820393,13 Z", id: "Rectangle", fill: "currentColor" })), viewBox: '0 0 20 22' }, colorSwatch: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M4 2C2.89543 2 2 2.89543 2 4V15C2 16.6569 3.34315 18 5 18C6.65685 18 8 16.6569 8 15V4C8 2.89543 7.10457 2 6 2H4ZM5 16C5.55228 16 6 15.5523 6 15C6 14.4477 5.55228 14 5 14C4.44772 14 4 14.4477 4 15C4 15.5523 4.44772 16 5 16ZM10 14.2426L14.8995 9.34308C15.6805 8.56203 15.6805 7.2957 14.8995 6.51465L13.4853 5.10044C12.7042 4.31939 11.4379 4.31939 10.6568 5.10044L10 5.75728V14.2426ZM16 18H9.07104L15.071 12H16C17.1046 12 18 12.8954 18 14V16C18 17.1046 17.1046 18 16 18Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, refreshIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M4 2C4.55228 2 5 2.44772 5 3V5.10125C6.27009 3.80489 8.04052 3 10 3C13.0494 3 15.641 4.94932 16.6014 7.66675C16.7855 8.18747 16.5126 8.75879 15.9918 8.94284C15.4711 9.12689 14.8998 8.85396 14.7157 8.33325C14.0289 6.38991 12.1755 5 10 5C8.36507 5 6.91204 5.78502 5.99935 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4C3.44772 9 3 8.55228 3 8V3C3 2.44772 3.44772 2 4 2ZM4.00817 11.0572C4.52888 10.8731 5.1002 11.146 5.28425 11.6668C5.97112 13.6101 7.82453 15 10 15C11.6349 15 13.088 14.215 14.0006 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12V17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17V14.8987C13.7299 16.1951 11.9595 17 10 17C6.95059 17 4.35905 15.0507 3.39857 12.3332C3.21452 11.8125 3.48745 11.2412 4.00817 11.0572Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, globeIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3", stroke: "currentColor", fill: "transparent", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" })), viewBox: '0 0 24 24' }, flagIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, folderIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M2 6C2 4.89543 2.89543 4 4 4H9L11 6H16C17.1046 6 18 6.89543 18 8V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V6Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, minusCircle: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H7Z", fill: "currentColor", fillRule: "evenodd" })), viewBox: '0 0 20 20' }, duplicateIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M7 9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17H9C7.89543 17 7 16.1046 7 15V9Z", fill: "currentColor" }), react_default.a.createElement("path", { d: "M5 3C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13L5 5H13C13 3.89543 12.1046 3 11 3H5Z", fill: "currentColor" })), viewBox: '0 0 20 20' }, lockIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("svg", { height: "20", width: "20", fill: "none", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" }, react_default.a.createElement("path", { d: "M5 9V7C5 4.23858 7.23858 2 10 2C12.7614 2 15 4.23858 15 7V9C16.1046 9 17 9.89543 17 11V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V11C3 9.89543 3.89543 9 5 9ZM13 7V9H7V7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z", fill: "currentColor", fillRule: "evenodd" }))), viewBox: '0 0 20 20' }, unlockIcon: { path: react_default.a.createElement("g", null, react_default.a.createElement("path", { d: "M10 2C7.23858 2 5 4.23858 5 7V9C3.89543 9 3 9.89543 3 11V16C3 17.1046 3.89543 18 5 18H15C16.1046 18 17 17.1046 17 16V11C17 9.89543 16.1046 9 15 9H7V7C7 5.34315 8.34315 4 10 4C11.3965 4 12.5725 4.95512 12.9055 6.24926C13.0432 6.78411 13.5884 7.1061 14.1232 6.96844C14.6581 6.83078 14.9801 6.28559 14.8424 5.75074C14.2874 3.59442 12.3312 2 10 2Z", fill: "currentColor" })), viewBox: '0 0 20 20' } };
            var customColors = { gray: { 50: '#F4F5F7', 100: '#EDF0F4', 200: '#E6EAEF', 300: '#D4D8DD', 400: '#B0B7C1', 500: '#828B9A', 600: '#555D6C', 700: '#353C49', 800: '#1F242E', 900: '#1A1B23' }, blueish: { 50: '#778bff', 100: '#6b81fe', 200: '#5f76fc', 300: '#536cfa', 400: '#4d67f9', 500: '#4a64f9', 600: '#4661f8', 700: '#465cd6', 800: '#4657b3', 900: '#454c6e' } };
            var sizes = Object(objectSpread2["a" /* default */ ])({}, theme["a" /* default */ ].space, { full: '100%', '3xs': '14rem', '2xs': '16rem', xs: '20rem', sm: '24rem', md: '28rem', lg: '32rem', xl: '42rem', '2xl': '42rem', '3xl': '48rem', '4xl': '56rem', '5xl': '64rem', '6xl': '72rem' });
            var customTheme = Object(objectSpread2["a" /* default */ ])({}, theme["a" /* default */ ], { colors: Object(objectSpread2["a" /* default */ ])({}, theme["a" /* default */ ].colors, {}, customColors), icons: Object(objectSpread2["a" /* default */ ])({}, theme["a" /* default */ ].icons, {}, customIcons), sizes: Object(objectSpread2["a" /* default */ ])({}, theme["a" /* default */ ].sizes, {}, sizes) }); /* harmony default export */
            var Utils_customTheme = (customTheme);
            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/ThemeProvider/index.js + 1 modules
            var ThemeProvider = __webpack_require__(40);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/core/dist/es/CSSReset/index.js + 1 modules
            var CSSReset = __webpack_require__(235);

            // EXTERNAL MODULE: ./node_modules/@chakra-ui/portal/dist/esm/portal-manager.js + 1 modules
            var portal_manager = __webpack_require__(163);

            // CONCATENATED MODULE: ./src/index.js
            var src_ThemedApp = function ThemedApp() { return react_default.a.createElement(ThemeProvider["a" /* default */ ], { theme: Utils_customTheme }, react_default.a.createElement(CSSReset["a" /* default */ ], null), react_default.a.createElement(ColorModeProvider["a" /* default */ ], null, react_default.a.createElement(portal_manager["a" /* PortalManager */ ], null, react_default.a.createElement(src_App, null)))); };
            react_dom_default.a.render(react_default.a.createElement(src_ThemedApp, null), document.getElementById('root')); // If you want your app to work offline and load faster, you can change
            // unregister() to register() below. Note this comes with some pitfalls.
            // Learn more about service workers: https://bit.ly/CRA-PWA
            unregister();

            /***/
        })
    ],
    [
        [178, 3, 4]
    ]
]);