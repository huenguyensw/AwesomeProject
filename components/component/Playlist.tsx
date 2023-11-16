import React, { useRef, useState, useEffect } from 'react'
import { Image, View, StyleSheet, ScrollView, SafeAreaView, Dimensions, Text, TouchableOpacity, FlatList } from 'react-native';
import Sound from 'react-native-sound';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileAudio, faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Playlist: React.FC<{ genres: any }> = ({ genres }) => {

    const [imgActive, setImgActive] = useState(0);
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSingleMode, setIsSingleMode] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [isLoop, setIsLoop] = useState(false);

    const handleScrollEnd = (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.ceil(contentOffset / WIDTH);

        // Check if the user stands on the last image and scroll to the first image
        if (currentIndex === genres.length - 1  && isLoop) {
            scrollViewRef.current?.scrollTo({ x: 0, animated: true });
            setIsLoop(false);
        } else if (currentIndex === genres.length - 1) {
            setIsLoop(true);
        }
    };
    //Set the category of the sound that is to be played
    Sound.setCategory('Playback');

    const soundRef = useRef<Sound | null>(null);

    const playSound = () => {
        const currentGenre = genres[imgActive];
        if (currentGenre && currentGenre.list[currentSound]) {
            soundRef.current = new Sound(currentGenre.list[currentSound].address, error => {
                if (error) {
                    console.error('Failed to load the sound:', error);
                } else {
                    console.log('Sound loaded successfully');
                    console.log('duration in seconds: ' + soundRef.current?.getDuration() + ' and number of channels: ' + soundRef.current?.getNumberOfChannels());
                    soundRef.current?.play((success) => {
                        if (success) {
                            console.log('successfully finished playing');
                            setCurrentSound(currentSound + 1);
                        }
                        else {
                            console.error('Sound did not play');
                        }
                    })
                }
            });
        }

    }
    const handlePlayingSound = () => {

        setIsPlaying(!isPlaying);
        setIsSingleMode(false); //play button only apply for multiple mode

    }

    useEffect(() => {

        if (isPlaying && !isSingleMode && (currentSound < genres[imgActive].list.length || currentSound == 0)) {
            playSound();
        } else if (isPlaying && !isSingleMode) {
            setCurrentSound(0);
            setIsPlaying(false);
        }
        // Cleanup function
        return () => {
            if (soundRef.current) {
                soundRef.current.release();
            }
        }
    }, [currentSound, isPlaying]);

    const onChange = (nativeEvent: any) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setImgActive(slide);
                setCurrentSound(0);
                setIsPlaying(false);
            };
        }
    }

    const handlePlaySingle = (item: any, index: any) => {
        console.log('item', item)
        if (isPlaying && !isSingleMode) { //stop if playing multiple
            setIsSingleMode(true);
        };
        setCurrentSound(index);
        if (soundRef.current) {
            soundRef.current.release();
        };
        soundRef.current = new Sound(item.address, error => {
            if (error) {
                console.error('Failed to load the sound:', error);
            } else {
                console.log('Sound loaded successfully');
                console.log('duration in seconds: ' + soundRef.current?.getDuration() + ' and number of channels: ' + soundRef.current?.getNumberOfChannels());
                soundRef.current?.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                        setIsPlaying(false);
                        setCurrentSound(0);
                    }
                    else {
                        console.error('Sound did not play');
                    }
                })
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrap}>
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrap}
                    onScrollEndDrag={handleScrollEnd}
                >
                    {genres.map((genre: any, index: any) =>
                        <Image
                            key={index}
                            source={genre.path}
                            style={styles.wrap}
                            resizeMode='stretch'
                        />
                    )}
                </ScrollView>
            </View>
            <Text style={styles.text}> {genres[imgActive].name}</Text>
            <View style={styles.wrapDot}>
                {genres.map((genre: any, index: any) =>
                    <Text
                        key={index}
                        style={imgActive === index ? styles.dotActive : styles.dot}
                    >
                        ⬤
                    </Text>)}
            </View>
            <TouchableOpacity
                onPress={() => handlePlayingSound()}
                style={styles.btn}
            >
                {isPlaying && (isSingleMode || currentSound < genres[imgActive].list.length)
                    ? <FontAwesomeIcon icon={faPauseCircle} color='white' size={40} />
                    : <FontAwesomeIcon icon={faPlayCircle} color='white' size={40} />}
            </TouchableOpacity>
            <FlatList
                style={styles.listView}
                data={genres[imgActive].list}
                renderItem={({ item, index }) => (
                    <View style={styles.itemView}>
                        <FontAwesomeIcon icon={faFileAudio} color='white' size={30} />
                        <TouchableOpacity onPress={() => handlePlaySingle(item, index)}>
                            <Text
                                style={[
                                    styles.text,
                                    index === currentSound && isPlaying
                                        ? styles.textColor
                                        : null
                                ]}
                                numberOfLines={2}
                                ellipsizeMode='tail'
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        <Image style={styles.menu} source={require('../../assets/menu.png')} />
                    </View>
                )}
                keyExtractor={(_, index) => index.toString()}
            />
        </SafeAreaView >
    )
}

export default Playlist


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#282c3d',
        paddingTop: 10,
    },
    wrap: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.3
    },
    wrapDot: {
        position: 'absolute',
        bottom: '52%',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    dotActive: {
        margin: 3,
        color: 'orange'
    },
    dot: {
        margin: 3,
        color: 'white'
    },
    btn: {
        borderWidth: 0,
        backgroundColor: '#282c3d',
        marginTop: '10%',
        marginBottom: 20,
    }, text: {
        color: 'white',
        fontSize: 18,
    },
    textColor: {
        color: '#FF7F50',
    },
    listView: {
        marginBottom: 25,
    },
    menu: {
        marginLeft: 'auto'
    },
    itemView: {
        flexDirection: 'row',
        columnGap: 15,
        flexWrap: 'nowrap',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    }

});