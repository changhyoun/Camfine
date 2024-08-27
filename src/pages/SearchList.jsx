import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SearchList_main_statistics_lt_back, SearchList_main_statistics_rt_back, no_list_man, no_list_caution, LoadingList } from '../components/Images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SearchList.css';
import { Link } from 'react-router-dom';

const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function SearchList() {
    const [campList, setCampList] = useState([]);
    const [filteredCampList, setFilteredCampList] = useState([]);
    const [displayedCampList, setDisplayedCampList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const itemsPerPage = 10;
    const location = useLocation();

    useEffect(() => {
        const query = location.state?.searchQuery || '';
        setSearchTerm(query);
        fetchAllCampingData(query);
    }, [location.state]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCampList(campList);
            setDisplayedCampList(campList.slice(0, itemsPerPage));
            setHasMore(campList.length > itemsPerPage);
            setNoResults(campList.length === 0);
        } else {
            handleSearch();
        }
    }, [campList, searchTerm]);

    const fetchAllCampingData = async (query = '') => {
        let allCamps = [];
        let page = 1;
        let moreData = true;

        try {
            while (moreData) {
                const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/basedList', {
                    params: {
                        ServiceKey: CAMPING_API_KEY,
                        MobileOS: 'ETC',
                        MobileApp: 'AppTest',
                        _type: 'json',
                        numOfRows: 10,
                        pageNo: page
                    }
                });

                if (response.data && response.data.response && response.data.response.body && response.data.response.body.items && response.data.response.body.items.item) {
                    const newCamps = response.data.response.body.items.item;
                    allCamps = [...allCamps, ...newCamps];

                    if (newCamps.length < 1000) {
                        moreData = false;
                    } else {
                        page += 1;
                    }
                } else {
                    moreData = false;
                }
            }

            const uniqueCamps = [...new Map(allCamps.map(camp => [camp.contentId, camp])).values()];
            setCampList(uniqueCamps);

            if (query) {
                handleSearch();
            } else {
                setFilteredCampList(uniqueCamps);
                setDisplayedCampList(uniqueCamps.slice(0, itemsPerPage));
                setHasMore(uniqueCamps.length > itemsPerPage);
                setNoResults(uniqueCamps.length === 0);
            }
        } catch (error) {
            console.error('데이터 가져오기 오류:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading) {
            console.log('로딩 중입니다...');
        } else {
            console.log('로딩 완료입니다...');
        }
    }, [loading]);

    const handleSearch = () => {
        setLoading(true);

        const petFriendlyKeywords = ['애견', '애견 동반', '애견동반', '애견 동', '동반'];
        const isPetFriendlySearch = petFriendlyKeywords.some(keyword => searchTerm.includes(keyword));

        const filteredList = campList.filter(camp => {
            const fieldsToSearch = [
                'facltNm', 'addr1', 'addr2', 'intro', 'featureNm',
                'doNm', 'sbrsCl', 'lineIntro', 'homepage', 'operDeCl',
                'operPdCl', 'posblFcltyCl', 'posblFcltyEtc', 'facltDivNm', 'induty',
                'lctCl', 'sigunguNm', 'themaEnvrnCl'
            ];
            const matchesSearchTerm = fieldsToSearch.some(field => camp[field] && camp[field].includes(searchTerm));
            if (isPetFriendlySearch) {
                return matchesSearchTerm && camp.animalCmgCl === '가능';
            }
            return matchesSearchTerm;
        });

        setFilteredCampList(filteredList);
        setDisplayedCampList(filteredList.slice(0, itemsPerPage));
        setNoResults(filteredList.length === 0);
        setHasMore(filteredList.length > itemsPerPage);
        setLoading(false);
    };

    const loadMoreData = () => {
        if (loading || !hasMore) return;

        const nextItems = filteredCampList.slice(displayedCampList.length, displayedCampList.length + itemsPerPage);
        setDisplayedCampList(prevDisplayedCampList => [...prevDisplayedCampList, ...nextItems]);

        if (displayedCampList.length + nextItems.length >= filteredCampList.length) {
            setHasMore(false);
        }
    };

    const lastCampElementRef = useRef();
    const observer = useRef();

    useEffect(() => {
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                loadMoreData();
            }
        });

        if (lastCampElementRef.current) {
            observer.current.observe(lastCampElementRef.current);
        }

        return () => {
            if (lastCampElementRef.current) {
                observer.current.unobserve(lastCampElementRef.current);
            }
        };
    }, [displayedCampList, hasMore, loading]);

    const handleSlideClick = (keyword) => {
        setSearchTerm(keyword);
    };

    const reloadPage = () => {
        window.location.href = '/SearchList';
    };

    return (
        <div id="SearchList">
            <Header />
            <div className="SearchList_main">
                <div className="SearchList_main_warp">
                    <div className="SearchList_main_search">
                        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                            <input 
                                type="text" 
                                placeholder='캠핑장을 검색해보세요 ( 예 : 글램핑 )' 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                            />
                            <span className="material-symbols-rounded" onClick={handleSearch}>
                                search
                            </span>
                        </form>
                    </div>
                    <div className="SearchList_main_statistics">
                        <div className="SearchList_main_statistics_lt">
                            <p>검색된 캠핑장</p>
                            <h3>{filteredCampList.length}개</h3>
                            <img src={SearchList_main_statistics_lt_back} alt="SearchList_main_statistics_lt_back" />
                        </div>
                        <div className="SearchList_main_statistics_rt">
                            <p>핫 키워드</p>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                loop={true}
                                direction='vertical'
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                modules={[Autoplay]}
                            >
                                <SwiperSlide onClick={() => handleSlideClick('글램핑')}>
                                    <h3>글램핑</h3>
                                </SwiperSlide>
                                <SwiperSlide onClick={() => handleSlideClick('카라반')}>
                                    <h3>카라반</h3>
                                </SwiperSlide>
                                <SwiperSlide onClick={() => handleSlideClick('야영장')}>
                                    <h3>오토캠핑</h3>
                                </SwiperSlide>
                            </Swiper>
                            <img src={SearchList_main_statistics_rt_back} alt="SearchList_main_statistics_rt_back" />
                        </div>
                    </div>
                    <div className="camp_search_list">
                        <div className="camp_search_list_warp">
                            {loading ? (
                                <div className="loading-message">
                                    <img src={LoadingList} alt="LoadingList" />
                                </div>
                            ) : noResults ? (
                                <div className="no_results">
                                    <div className="no_results_img_warp">
                                        <img src={no_list_man} alt="검색 결과 없음 이미지" />
                                        <img src={no_list_caution} alt="주의 이미지" />
                                    </div>
                                    <h3>검색결과가 없거나 로딩중이예요.</h3>
                                    <button onClick={reloadPage} className="retry_button">
                                        다시 찾아보기
                                    </button>
                                </div>
                            ) : (
                                displayedCampList.map((camp, index) => {
                                    const isDefaultImage = !camp.firstImageUrl;
                                    return (
                                        <Link
                                            to={{
                                                pathname: `/camp/${camp.contentId}`,
                                            }}
                                            state={{ campList }}  // campList를 state로 전달
                                            key={index}
                                            className={`camp_list_box ${hoveredIndex === index ? 'hovered' : ''}`}
                                            ref={index === displayedCampList.length - 1 ? lastCampElementRef : null}
                                        >
                                            <img
                                                src={isDefaultImage ? defaultImageUrl : camp.firstImageUrl}
                                                alt="캠핑장 이미지"
                                            />
                                            <div className="camp_list_box_warp">
                                                {isDefaultImage && (
                                                    <p className="none">대체 이미지</p>
                                                )}
                                                <div className="camp_info">
                                                    <h3>{camp.facltNm}</h3>
                                                    <p>{camp.addr1}</p>
                                                    <div className="camp_info_ck">
                                                        클릭시 상세 페이지로 이동됩니다.
                                                    </div>
                                                </div>
                                            </div>
                                            <div 
                                                className="camp_info_briefly"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                정보 간략히 보기
                                                <span className="material-symbols-rounded">
                                                    keyboard_double_arrow_down
                                                </span>
                                                <div className="camp_info_details">
                                                    <b>ㆍ 편의 시설</b>
                                                    <ul>
                                                        {camp.sbrsCl ? camp.sbrsCl.split(',').map((item, idx) => (
                                                            <li className="info_item" key={idx}>{item.trim()}</li>
                                                        )) : <li className="info_item">제공된 정보가 없습니다.</li>}
                                                    </ul>
                                                    <b>ㆍ 업종 정보</b>
                                                    <ul>
                                                        {camp.induty ? camp.induty.split(',').map((item, idx) => (
                                                            <li className="info_item" key={idx}>{item.trim()}</li>
                                                        )) : <li className="info_item">제공된 정보가 없습니다.</li>}
                                                    </ul>
                                                    <b>ㆍ 애견 동반 여부</b>
                                                    <ul>
                                                        <li>{camp.animalCmgCl === '가능' ? '가능' : '불가능'}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default SearchList;
