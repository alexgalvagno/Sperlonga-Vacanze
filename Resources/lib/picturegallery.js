var PictureGallery = {};

(function() {
    PictureGallery.createWindow = function(dictionary) {
        var isUiHidden = false, galleryImageViews = [], originalImages = [], galleryWindow = null, thumbGalleryWindow = null, navigationWrappingWindow = null, navigation = null, thumbnailScrollView = null, numberOfColumn = 0, thumbPadding = 0, thumbSize = 0, dpi = Ti.Platform.displayCaps.dpi / 160, scrollableGalleryView = null, buttonLeft = null, buttonRight = null, buttonSize = {
            width: 25,
            height: 50
        };
        dictionary = "undefined" == typeof dictionary ? {} : dictionary;
        dictionary.images = "undefined" == typeof dictionary.images ? [] : dictionary.images;
        dictionary.thumbGallery = "undefined" == typeof dictionary.thumbGallery ? {} : dictionary.thumbGallery;
        dictionary.scrollableGallery = "undefined" == typeof dictionary.scrollableGallery ? {} : dictionary.scrollableGallery;
        dictionary.thumbGallery.numberOfColumn = "undefined" == typeof dictionary.thumbGallery.numberOfColumn ? 4 : dictionary.thumbGallery.numberOfColumn;
        dictionary.thumbGallery.numberOfColumnPortrait = "undefined" == typeof dictionary.thumbGallery.numberOfColumnPortrait ? dictionary.thumbGallery.numberOfColumn : dictionary.thumbGallery.numberOfColumnPortrait;
        dictionary.thumbGallery.numberOfColumnLandscape = "undefined" == typeof dictionary.thumbGallery.numberOfColumnLandscape ? dictionary.thumbGallery.numberOfColumn : dictionary.thumbGallery.numberOfColumnLandscape;
        dictionary.thumbGallery.forceRealPixelSize = "undefined" == typeof dictionary.thumbGallery.forceRealPixelSize ? false : dictionary.thumbGallery.forceRealPixelSize;
        dictionary.thumbGallery.thumbSize = "undefined" == typeof dictionary.thumbGallery.thumbSize ? 0 : dictionary.thumbGallery.thumbSize;
        dictionary.thumbGallery.thumbPadding = "undefined" == typeof dictionary.thumbGallery.thumbPadding ? 4 : dictionary.thumbGallery.thumbPadding;
        dictionary.thumbGallery.thumbBorderColor = "undefined" == typeof dictionary.thumbGallery.thumbBorderColor ? "#999999" : dictionary.thumbGallery.thumbBorderColor;
        dictionary.thumbGallery.thumbBorderWidth = "undefined" == typeof dictionary.thumbGallery.thumbBorderWidth ? 1 : dictionary.thumbGallery.thumbBorderWidth;
        dictionary.thumbGallery.thumbBorderRadius = "undefined" == typeof dictionary.thumbGallery.thumbBorderRadius ? 0 : dictionary.thumbGallery.thumbBorderRadius;
        dictionary.thumbGallery.thumbBackgroundColor = "undefined" == typeof dictionary.thumbGallery.thumbBackgroundColor ? "#FFFFFF" : dictionary.thumbGallery.thumbBackgroundColor;
        dictionary.thumbGallery.backgroundColor = "undefined" == typeof dictionary.thumbGallery.backgroundColor ? "#EEEEEE" : dictionary.thumbGallery.backgroundColor;
        dictionary.scrollableGallery.labelColor = "undefined" == typeof dictionary.scrollableGallery.labelColor ? "#FFFFFF" : dictionary.scrollableGallery.labelColor;
        dictionary.scrollableGallery.labelFont = "undefined" == typeof dictionary.scrollableGallery.labelFont ? {
            fontSize: 18,
            fontWeight: "bold"
        } : dictionary.scrollableGallery.labelFont;
        dictionary.scrollableGallery.barColor = "undefined" == typeof dictionary.scrollableGallery.barColor ? "#000" : dictionary.scrollableGallery.barColor;
        dictionary.scrollableGallery.displayArrows = "undefined" == typeof dictionary.scrollableGallery.displayArrows ? false : dictionary.scrollableGallery.displayArrows;
        dictionary.scrollableGallery.displayCaption = "undefined" == typeof dictionary.scrollableGallery.displayCaption ? true : dictionary.scrollableGallery.displayCaption;
        dictionary.scrollableGallery.i18nOfKey = "undefined" == typeof dictionary.scrollableGallery.i18nOfKey ? " of " : dictionary.scrollableGallery.i18nOfKey;
        dictionary.title = "undefined" == typeof dictionary.title ? "Gallery" : dictionary.title;
        var isAndroidDevice = function() {
            return false;
        };
        var computeSizesforThumbGallery = function() {
            numberOfColumn = dictionary.thumbGallery.numberOfColumn;
            numberOfColumn = Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? dictionary.thumbGallery.numberOfColumnLandscape : dictionary.thumbGallery.numberOfColumnPortrait;
            if (0 === dictionary.thumbGallery.thumbSize) {
                thumbPadding = dictionary.thumbGallery.thumbPadding;
                thumbSize = (Ti.Platform.displayCaps.platformWidth - (numberOfColumn + 1) * thumbPadding) / numberOfColumn;
            } else {
                var thumbsizeDpi;
                thumbsizeDpi = dictionary.thumbGallery.forceRealPixelSize ? dictionary.thumbGallery.thumbSize : dictionary.thumbGallery.thumbSize * dpi;
                thumbSize = thumbsizeDpi * numberOfColumn > Ti.Platform.displayCaps.platformWidth ? thumbsizeDpi - 1 * numberOfColumn - (thumbsizeDpi * numberOfColumn - Ti.Platform.displayCaps.platformWidth) / numberOfColumn : thumbsizeDpi;
                thumbPadding = (Ti.Platform.displayCaps.platformWidth - numberOfColumn * thumbSize) / (numberOfColumn + 1);
            }
        };
        var reComputeImageSize = function(width, height) {
            var newWidth = width, newHeight = height;
            if (width / Ti.Platform.displayCaps.platformWidth >= height / Ti.Platform.displayCaps.platformHeight) {
                if (width > Ti.Platform.displayCaps.platformWidth) {
                    newHeight = height * Ti.Platform.displayCaps.platformWidth / width;
                    newWidth = Ti.Platform.displayCaps.platformWidth;
                } else if (height > Ti.Platform.displayCaps.platformHeight) {
                    newWidth = width * Ti.Platform.displayCaps.platformHeight / height;
                    newHeight = Ti.Platform.displayCaps.platformHeight;
                }
            } else if (height > Ti.Platform.displayCaps.platformHeight) {
                newWidth = width * Ti.Platform.displayCaps.platformHeight / height;
                newHeight = Ti.Platform.displayCaps.platformHeight;
            } else if (width > Ti.Platform.displayCaps.platformWidth) {
                newHeight = height * Ti.Platform.displayCaps.platformWidth / width;
                newWidth = Ti.Platform.displayCaps.platformWidth;
            }
            return {
                width: newWidth,
                height: newHeight
            };
        };
        var reComputeImageGalleryOnOrientationChange = function() {
            computeSizesforThumbGallery();
            var currentColumn = 0;
            var currentRow = 0;
            var yPosition = thumbPadding;
            var xPosition = thumbPadding;
            for (var i = 0, b = thumbnailScrollView.children.length; b > i; i++) {
                if (0 === currentColumn % numberOfColumn && currentColumn > 0) {
                    xPosition = thumbPadding;
                    yPosition += thumbPadding + thumbSize;
                    currentRow++;
                }
                var currentThumb = thumbnailScrollView.children[i];
                currentThumb.width = thumbSize;
                currentThumb.height = thumbSize;
                currentThumb.left = xPosition;
                currentThumb.top = yPosition;
                var dpifactor = dpi;
                dictionary.thumbGallery.forceRealPixelSize && (dpifactor = 1);
                currentThumb.children[0].width = thumbSize - 6 * dpifactor;
                currentThumb.children[0].height = thumbSize - 6 * dpifactor;
                currentThumb.children[0].top = 3 * dpifactor;
                currentThumb.children[0].left = 3 * dpifactor;
                currentColumn++;
                xPosition += thumbSize + thumbPadding;
            }
        };
        var reComputeImageSizeOnChange = function(index) {
            newSize = reComputeImageSize(dictionary.images[index].width, dictionary.images[index].height);
            scrollableGalleryView.views[index].height = newSize.height;
            scrollableGalleryView.views[index].width = newSize.width;
        };
        var reComputeImagesSizeOnChange = function() {
            for (var i = 0, length = dictionary.images.length; length > i; i++) reComputeImageSizeOnChange(i);
            if (dictionary.scrollableGallery.displayArrows) {
                buttonRight.top = Ti.Platform.displayCaps.platformHeight / 2 - 25 * dpi;
                buttonLeft.top = Ti.Platform.displayCaps.platformHeight / 2 - 25 * dpi;
            }
        };
        var createThumbGallery = function() {
            thumbnailScrollView = Ti.UI.createScrollView({
                top: 0,
                contentWidth: "auto",
                contentHeight: "auto",
                showVerticalScrollIndicator: true,
                showHorizontalScrollIndicator: false,
                backgroundColor: dictionary.thumbGallery.backgroundColor
            });
            computeSizesforThumbGallery();
            var currentColumn = 0;
            var currentRow = 0;
            var yPosition = thumbPadding;
            var xPosition = thumbPadding;
            for (var i = 0, b = dictionary.images.length; b > i; i++) {
                if (0 === currentColumn % numberOfColumn && currentColumn > 0) {
                    xPosition = thumbPadding;
                    yPosition += thumbPadding + thumbSize;
                    currentRow++;
                }
                var thumbImageBorder = Ti.UI.createView({
                    width: thumbSize,
                    height: thumbSize,
                    imageId: i,
                    left: xPosition,
                    top: yPosition,
                    backgroundColor: dictionary.thumbGallery.backgroundColor
                });
                var thumbPath = "undefined" == typeof dictionary.images[i].thumbPath ? dictionary.images[i].path : dictionary.images[i].thumbPath;
                var dpifactor = dpi;
                dictionary.thumbGallery.forceRealPixelSize && (dpifactor = 1);
                var thumbImage = Ti.UI.createImageView({
                    image: thumbPath,
                    imageId: i,
                    width: thumbSize - 6 * dpifactor,
                    height: thumbSize - 6 * dpifactor,
                    top: 3 * dpifactor,
                    left: 3 * dpifactor
                });
                thumbImageBorder.borderColor = dictionary.thumbGallery.thumbBorderColor;
                thumbImageBorder.borderWidth = dictionary.thumbGallery.thumbBorderWidth;
                thumbImageBorder.backgroundColor = dictionary.thumbGallery.thumbBackgroundColor;
                thumbImageBorder.add(thumbImage);
                thumbImageBorder.addEventListener("click", function(e) {
                    galleryWindow = Ti.UI.createWindow({
                        backgroundColor: "#fff",
                        title: e.source.imageId + 1 + L(dictionary.scrollableGallery.i18nOfKey, " of ") + dictionary.images.length,
                        translucent: true
                    });
                    Ti.Gesture.addEventListener("orientationchange", reComputeImagesSizeOnChange);
                    galleryWindow.addEventListener("close", function() {
                        Ti.Gesture.removeEventListener("orientationchange", reComputeImagesSizeOnChange);
                    });
                    "undefined" !== dictionary.scrollableGallery.barColor && (galleryWindow.barColor = dictionary.scrollableGallery.barColor);
                    createGalleryWindow(e.source.imageId);
                    if (isAndroidDevice()) galleryWindow.open({
                        fullscreen: false,
                        navBarHidden: true
                    }); else {
                        Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
                        "undefined" == typeof dictionary.windowGroup ? navigation.open(galleryWindow) : dictionary.windowGroup.open(galleryWindow);
                    }
                });
                thumbnailScrollView.add(thumbImageBorder);
                currentColumn++;
                xPosition += thumbSize + thumbPadding;
            }
            thumbGalleryWindow.add(thumbnailScrollView);
        };
        var createGalleryWindow = function(imageId) {
            galleryWindow.addEventListener("blur", function() {
                isAndroidDevice || (Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT);
            });
            scrollableGalleryView = Ti.UI.createScrollableView({
                top: 0,
                views: [],
                showPagingControl: false,
                maxZoomScale: 2,
                currentPage: imageId
            });
            var descriptionLabel = null;
            descriptionLabel = Ti.UI.createLabel({
                text: dictionary.images[imageId].caption,
                bottom: "15dp",
                height: "auto",
                color: dictionary.scrollableGallery.labelColor,
                font: dictionary.scrollableGallery.labelFont,
                textAlign: "center",
                zIndex: 2
            });
            if (dictionary.scrollableGallery.displayArrows) {
                if (isAndroidDevice) {
                    buttonLeft = Titanium.UI.createButton({
                        image: "images/left_arrow.png",
                        backgroundImage: "images/invisible_hack.png",
                        left: 10,
                        width: buttonSize.width * dpi,
                        height: buttonSize.height * dpi,
                        top: Ti.Platform.displayCaps.platformHeight / 2 - buttonSize.height / 2 * dpi
                    });
                    buttonRight = Titanium.UI.createButton({
                        image: "images/right_arrow.png",
                        backgroundImage: "images/invisible_hack.png",
                        right: 10,
                        width: buttonSize.width * dpi,
                        height: buttonSize.height * dpi,
                        top: Ti.Platform.displayCaps.platformHeight / 2 - buttonSize.height / 2 * dpi
                    });
                } else {
                    buttonLeft = Titanium.UI.createButton({
                        image: "images/left_arrow.png",
                        backgroundImage: "images/invisible_hack.png",
                        left: 10,
                        width: buttonSize.width * dpi,
                        height: buttonSize.height * dpi,
                        top: Ti.Platform.displayCaps.platformHeight / 2 - buttonSize.height / 2 * dpi
                    });
                    buttonRight = Titanium.UI.createButton({
                        image: "images/right_arrow.png",
                        backgroundImage: "images/invisible_hack.png",
                        right: 10,
                        width: buttonSize.width * dpi,
                        height: buttonSize.height * dpi,
                        top: Ti.Platform.displayCaps.platformHeight / 2 - buttonSize.height / 2 * dpi
                    });
                }
                buttonLeft.addEventListener("click", function() {
                    var i = scrollableGalleryView.currentPage;
                    if (0 === i) return;
                    i--;
                    scrollableGalleryView.scrollToView(i);
                });
                buttonRight.addEventListener("click", function() {
                    var i = scrollableGalleryView.currentPage;
                    if (i === scrollableGalleryView.views.length - 1) return;
                    i++;
                    scrollableGalleryView.scrollToView(i);
                });
            }
            var toogleUI = function() {
                if (isUiHidden) {
                    isAndroidDevice() || galleryWindow.showNavBar();
                    var animation = Titanium.UI.createAnimation();
                    animation.duration = 300;
                    animation.opacity = 1;
                    null != descriptionLabel && descriptionLabel.animate(animation);
                    if (dictionary.scrollableGallery.displayArrows) {
                        scrollableGalleryView.currentPage !== scrollableGalleryView.views.length - 1 && buttonRight.animate(animation);
                        0 !== scrollableGalleryView.currentPage && buttonLeft.animate(animation);
                    }
                } else {
                    isAndroidDevice() || galleryWindow.hideNavBar();
                    var animation = Titanium.UI.createAnimation();
                    animation.duration = 300;
                    animation.opacity = 0;
                    null != descriptionLabel && descriptionLabel.animate(animation);
                    if (dictionary.scrollableGallery.displayArrows) {
                        scrollableGalleryView.currentPage !== scrollableGalleryView.views.length - 1 && buttonRight.animate(animation);
                        0 !== scrollableGalleryView.currentPage && buttonLeft.animate(animation);
                    }
                }
                isUiHidden = !isUiHidden;
            };
            if (isAndroidDevice()) {
                for (var i = 0, b = dictionary.images.length; b > i; i++) {
                    tempImg = Ti.UI.createImageView({
                        image: dictionary.images[i].path,
                        width: "100%"
                    });
                    var tempBlob = tempImg.toImage();
                    dictionary.images[i].height = tempBlob.height;
                    dictionary.images[i].width = tempBlob.width;
                    var view = Ti.UI.createImageView({
                        backgroundColor: "#000",
                        image: dictionary.images[i].path
                    });
                    galleryImageViews[i] = view;
                    view.addEventListener("singletap", toogleUI);
                }
                scrollableGalleryView.views = galleryImageViews;
                reComputeImagesSizeOnChange();
                galleryWindow.add(scrollableGalleryView);
            } else {
                for (var i = 0, b = dictionary.images.length; b > i; i++) {
                    var view = Ti.UI.createImageView({
                        backgroundColor: "#000",
                        image: dictionary.images[i].path,
                        height: "auto",
                        width: "auto",
                        index: i,
                        firstLoad: true
                    });
                    view.addEventListener("load", function(e) {
                        var blob = e.source.toBlob();
                        originalImages[e.source.index] = blob;
                        if (blob.height > 0 && blob.width > 0) {
                            dictionary.images[e.source.index].height = blob.height;
                            dictionary.images[e.source.index].width = blob.width;
                            e.source.firstLoad && reComputeImageSizeOnChange(e.source.index);
                            e.source.firstLoad = false;
                        }
                    });
                    dictionary.images[i].height = view.size.height;
                    dictionary.images[i].width = view.size.width;
                    view.addEventListener("singletap", toogleUI);
                    galleryImageViews[i] = view;
                }
                scrollableGalleryView.views = galleryImageViews;
                galleryWindow.add(scrollableGalleryView);
            }
            null !== descriptionLabel && galleryWindow.add(descriptionLabel);
            if (dictionary.scrollableGallery.displayArrows) {
                galleryWindow.add(buttonLeft);
                galleryWindow.add(buttonRight);
                imageId === scrollableGalleryView.views.length - 1 && (buttonRight.visible = false);
                0 === imageId && (buttonLeft.visible = false);
            }
            scrollableGalleryView.addEventListener("scroll", function(e) {
                galleryWindow.title = e.currentPage + 1 + L(dictionary.scrollableGallery.i18nOfKey, " of ") + dictionary.images.length;
                ("undefined" == typeof dictionary.images[e.currentPage].caption || "undefined" == dictionary.images[e.currentPage].caption) && (dictionary.images[e.currentPage].caption = "");
                null != descriptionLabel && (descriptionLabel.text = dictionary.images[e.currentPage].caption);
                if (!isUiHidden) {
                    e.currentPage === scrollableGalleryView.views.length - 1 ? dictionary.scrollableGallery.displayArrows && (buttonRight.visible = false) : dictionary.scrollableGallery.displayArrows && (buttonRight.visible = true);
                    0 === e.currentPage ? dictionary.scrollableGallery.displayArrows && (buttonLeft.visible = false) : dictionary.scrollableGallery.displayArrows && (buttonLeft.visible = true);
                }
            });
        };
        thumbGalleryWindow = Ti.UI.createWindow({
            title: dictionary.title
        });
        thumbGalleryWindow.orientationModes = [ Titanium.UI.PORTRAIT ];
        if (isAndroidDevice()) navigationWrappingWindow = thumbGalleryWindow; else if ("undefined" == typeof dictionary.windowGroup) {
            navigationWrappingWindow = Ti.UI.createWindow({
                title: dictionary.title
            });
            navigation = Ti.UI.iPhone.createNavigationGroup({
                window: thumbGalleryWindow
            });
            navigationWrappingWindow.add(navigation);
            navigationWrappingWindow.orientationModes = [ Titanium.UI.PORTRAIT ];
        } else navigationWrappingWindow = thumbGalleryWindow;
        createThumbGallery();
        Ti.Gesture.addEventListener("orientationchange", reComputeImageGalleryOnOrientationChange);
        thumbGalleryWindow.addEventListener("close", function() {
            Ti.Gesture.removeEventListener("orientationchange", reComputeImageGalleryOnOrientationChange);
        });
        return navigationWrappingWindow;
    };
})();