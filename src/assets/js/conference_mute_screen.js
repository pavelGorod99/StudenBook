var localStream = null,
    screensharingStream = null,
    connectedConversation = null,
    connectedSession = null;

apiRTC.setLogLevel(10);

var connectedConversation = null;
var localStream = null;
var cloudUrl = 'https://cloud.apizee.com';
var connectedSession = null;

var ua = new apiRTC.UserAgent({
    uri: 'apzkey:07f63f45eadeb12b6c172b56f4ed8c1d'
});

ua.register({
    cloudUrl: cloudUrl
}).then(function(session) {
    // Save session
    connectedSession = session;

    //Display joinConference button when registered
    // document.getElementById('create').style.display = 'inline-block';
});

let streamID

function getStreamID() {
    return streamID
}

function joinConf(name) {

    connectedSession
            .on("contactListUpdate", function(updatedContacts) { //display a list of connected users
                console.log("MAIN - contactListUpdate", updatedContacts);
                if (connectedConversation !== null) {
                    let contactList = connectedConversation.getContacts();
                    console.info("contactList  connectedConversation.getContacts() :", contactList);
                }
            });

        //==============================
        // 3/ CREATE CONVERSATION
        //==============================
        connectedConversation = connectedSession.getConversation(name);

        //==========================================================
        // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
        //==========================================================
        connectedConversation.on('streamListChanged', function(streamInfo) {

            console.log("streamListChanged :", streamInfo);

            if (streamInfo.listEventType === 'added') {
                if (streamInfo.isRemote === true) {

                    connectedConversation.subscribeToMedia(streamInfo.streamId)
                        .then(function(stream) {
                            console.log('subscribeToMedia success');
                        }).catch(function(err) {
                            console.error('subscribeToMedia error', err);
                        });
                }
            }
        });
        //=====================================================
        // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
        //=====================================================
        connectedConversation.on('streamAdded', function(stream) {
            streamID = stream.streamId
            document.getElementById('remote-container-outgoing').innerHTML = ''
            stream.addInDiv('remote-container-outgoing', 'remote-media-outgoing-' + stream.streamId, {}, false); // eu vad camera lui
            
            document.getElementById('remote-container-incoming').innerHTML = ''
            stream.addInDiv('remote-container-incoming', 'remote-media-incoming-' + stream.streamId, {}, false); // el imi vede camera mea
        }).on('streamRemoved', function(stream) {
            // stream.removeFromDiv('remote-container-outgoing', 'remote-media-outgoing-' + stream.streamId);
            // stream.removeFromDiv('remote-container-incoming', 'remote-media-incoming-' + stream.streamId);
        });

        //==============================
        // 5/ CREATE LOCAL STREAM
        //==============================
        var createStreamOptions = {};
        createStreamOptions.constraints = {
            audio: true,
            video: true
        };

        ua.createStream(createStreamOptions)
            .then(function(stream) {

                console.log('createStream :', stream);

                // Save local stream
                localStream = stream;

                document.getElementById('local-container-outgoing').innerHTML = ''
                stream.removeFromDiv('local-container-outgoing', 'local-media-outgoing');
                stream.addInDiv('local-container-outgoing', 'local-media-outgoing', {}, true);

                document.getElementById('local-container-incoming').innerHTML = ''
                stream.removeFromDiv('local-container-incoming', 'local-media-incoming');
                stream.addInDiv('local-container-incoming', 'local-media-incoming', {}, true);

                

                //==============================
                // 6/ JOIN CONVERSATION
                //==============================
                connectedConversation.join()
                    .then(function(response) {
                        //==============================
                        // 7/ PUBLISH OWN STREAM
                        //==============================
                        connectedConversation.publish(localStream);
                    }).catch(function(err) {
                        console.error('Conversation join error', err);
                    });

            }).catch(function(err) {
                console.error('create stream error', err);
            });
}

function joinConference(name) {

    // alert(name)

    var cloudUrl = 'https://cloud.apizee.com';

    //==============================
    // 1/ CREATE USER AGENT
    //==============================
    var ua = new apiRTC.UserAgent({
        uri: 'apzkey:07f63f45eadeb12b6c172b56f4ed8c1d'
    });

    var registerInformation = {};
    registerInformation.cloudUrl = cloudUrl;

    

    //==============================
    // 2/ REGISTER
    //==============================
    ua.register(registerInformation).then(function(session) {
        // Save session
        connectedSession = session;

        connectedSession
            .on("contactListUpdate", function(updatedContacts) { //display a list of connected users
                console.log("MAIN - contactListUpdate", updatedContacts);
                if (connectedConversation !== null) {
                    let contactList = connectedConversation.getContacts();
                    console.info("contactList  connectedConversation.getContacts() :", contactList);
                }
            });

        //==============================
        // 3/ CREATE CONVERSATION
        //==============================
        ua.enableMeshRoomMode(true); //Activate Mesh room mode

        connectedConversation = connectedSession.getConversation(name);
        
        //==========================================================
        // 4/ ADD EVENT LISTENER : WHEN NEW STREAM IS AVAILABLE IN CONVERSATION
        //==========================================================
        connectedConversation.on('streamListChanged', function(streamInfo) {

            console.log("streamListChanged :", streamInfo);

            var subscribeOptions = {
                //audioOnly : true,
                //videoOnly : true
            };
            
            if (streamInfo.listEventType === 'added') {
                if (streamInfo.isRemote === true) {

                    connectedConversation.subscribeToMedia(streamInfo.streamId, subscribeOptions)
                        .then(function(stream) {
                            console.log('subscribeToMedia success');
                        }).catch(function(err) {
                            console.error('subscribeToMedia error', err);
                        });
                }
            }
        });
        //=====================================================
        // 4 BIS/ ADD EVENT LISTENER : WHEN STREAM IS ADDED/REMOVED TO/FROM THE CONVERSATION
        //=====================================================
        connectedConversation.on('streamAdded', function(stream) {
            stream.addInDiv('remote-container', 'remote-media-' + stream.streamId, {}, false);
            /*
                            // Subscribed Stream is available for display
                            // Get remote media container
                            var container = document.getElementById('remote-container');
                            // Create media element
                            var mediaElement = document.createElement('video');
                            mediaElement.id = 'remote-media-' + stream.streamId;
                            mediaElement.autoplay = true;
                            mediaElement.muted = false;
                            // Add media element to media container
                            container.appendChild(mediaElement);
                            // Attach stream
                            stream.attachToElement(mediaElement);
            */
        }).on('streamRemoved', function(stream) {
            console.log(2);
            stream.removeFromDiv('remote-container', 'remote-media-' + stream.streamId);
            /*
                            document.getElementById('remote-media-' + stream.streamId).remove();
            */
        });

        connectedConversation.on('error', function(errorInfo) {
            console.error("connectedConversation error streamInfo :", errorInfo.streamInfo);
            console.error("connectedConversation error errorCode :", errorInfo.errorCode);
            console.error("connectedConversation error errorInfo :", errorInfo.errorInfo);
        });

        //==============================
        // 5/ CREATE LOCAL STREAM
        //==============================
        var createStreamOptions = {};
        createStreamOptions.constraints = {
            audio: true,
            video: true
        };

        ua.createStream(createStreamOptions)
            .then(function(stream) {

                console.log('createStream :', stream);

                // Save local stream
                localStream = stream;

                localStream.unmuteAudio()
                localStream.unmuteVideo()

                stream.removeFromDiv('local-container', 'local-media');
                stream.addInDiv('local-container', 'local-media', {}, true);
                /*
                // Get media container
                var container = document.getElementById('local-container');

                // Create media element
                var mediaElement = document.createElement('video');
                mediaElement.id = 'local-media';
                mediaElement.autoplay = true;
                mediaElement.muted = true;
                mediaElement.classList.add('w-75 d-flex')
                mediaElement.style.width = '50px'

                // Add media element to media container
                container.appendChild(mediaElement);

                // Attach stream
                localStream.attachToElement(mediaElement);
                */
                //==============================
                // 6/ JOIN CONVERSATION
                //==============================
                connectedConversation.join()
                    .then(function(response) {
                        console.log(4);
                        // endCall() 
                        //==============================
                        // 7/ PUBLISH OWN STREAM
                        //==============================
                        connectedConversation.publish(localStream);
                    }).catch(function(err) {
                        console.error('Conversation join error', err);
                    });

            }).catch(function(err) {
                console.error('create stream error', err);
            });
    });
}

function endCall() {
    
    // Leave Conversation
    if (connectedConversation !== null) {
        // Leaving actual conversation
        connectedConversation.leave()
            .then(function() {
                console.debug('Conversation leave OK');
                connectedConversation.destroy();
                connectedConversation = null;
            }).catch(function(err) {
                console.error('Conversation leave error', err);
            });
        $('#remote-container').empty();
    }

    //Release localStream
    if (localStream !== null) {
        //Releasing LocalStream
        localStream.release();
    }
}


$(function() {
    'use strict';

    //==============================
    // CREATE CONFERENCE
    //==============================
    $('#create').on('submit', function(e) {
        e.preventDefault();

        // Get conference name
        var conferenceName = document.getElementById('conference-name').value;

        document.getElementById('create').style.display = 'none';
        document.getElementById('conference').style.display = 'inline-block';
        document.getElementById('title').innerHTML = 'You are in conference: ' + conferenceName;
        document.getElementById('callActions').style.display = 'block';
        // Join conference
        joinConference(conferenceName);
    });

    //==============================
    // CALL ACTIONS
    //==============================
    //muteAudio from call
    $('#muteAudio').on('click', function() {
        console.log('MAIN - Click muteAudio');
        localStream.muteAudio();
    });
    //unMuteAudio from call
    $('#unMuteAudio').on('click', function() {
        console.log('MAIN - Click unMuteAudio');
        localStream.unmuteAudio();
    });
    //muteVideo from call
    $('#muteVideo').on('click', function() {
        console.log('MAIN - Click muteVideo');
        localStream.muteVideo();
    });
    //unMuteVideo from call
    $('#unMuteVideo').on('click', function() {
        console.log('MAIN - Click unMuteVideo');
        localStream.unmuteVideo();
    });

    //==============================
    // SCREENSHARING FEATURE
    //==============================
    $('#toggle-screensharing').on('click', function() {
        if (screensharingStream === null) {

            const displayMediaStreamConstraints = {
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            };

            apiRTC.Stream.createDisplayMediaStream(displayMediaStreamConstraints, false)
                .then(function(stream) {

                    stream.on('stopped', function() {
                        //Used to detect when user stop the screenSharing with Chrome DesktopCapture UI
                        console.log("stopped event on stream");
                        var elem = document.getElementById('local-screensharing');
                        if (elem !== null) {
                            elem.remove();
                        }
                        screensharingStream = null;
                    });

                    screensharingStream = stream;
                    connectedConversation.publish(screensharingStream);
                    // Get media container
                    var container = document.getElementById('local-container');

                    // Create media element
                    var mediaElement = document.createElement('video');
                    mediaElement.id = 'local-screensharing';
                    mediaElement.autoplay = true;
                    mediaElement.muted = true;

                    // Add media element to media container
                    container.appendChild(mediaElement);

                    // Attach stream
                    screensharingStream.attachToElement(mediaElement);

                })
                .catch(function(err) {
                    console.error('Could not create screensharing stream :', err);
                });
        } else {
            connectedConversation.unpublish(screensharingStream);
            screensharingStream.release();
            screensharingStream = null;
            var elem = document.getElementById('local-screensharing');
            if (elem !== null) {
                elem.remove();
            }
        }
    });
});