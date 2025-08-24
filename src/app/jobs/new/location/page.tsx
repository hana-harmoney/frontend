'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJobDraft } from '@/stores/useJobDraft';
import useKakaoLoader from '@/components/use-kakao-loader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button } from '@/components/ui/button';

const JobsLocationPage = () => {
  useKakaoLoader();
  const router = useRouter();
  const { data: registerData, setData } = useJobDraft();
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const handleMapClick = (
    _: unknown,
    mouseEvent: kakao.maps.event.MouseEvent,
  ) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    setSelectedPosition({ lat, lng });

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        setSelectedAddress(result[0].address.address_name);
      }
    });
  };

  const defaultCenter = {
    lat: registerData?.lat || 37.5448361732145,
    lng: registerData?.lng || 127.056563379345,
  };

  const handleComplete = () => {
    if (!selectedAddress || !selectedPosition) return;
    setData({
      address: selectedAddress,
      lat: selectedPosition.lat,
      lng: selectedPosition.lng,
    });
    router.back();
  };

  useEffect(() => {
    if (registerData.address) {
      setSelectedAddress(registerData.address);
    }
    if (registerData.lat && registerData.lng) {
      setSelectedPosition({
        lat: registerData.lat,
        lng: registerData.lng,
      });
    }
  }, [registerData]);

  return (
    <div className="flex w-full flex-col gap-3 px-6 py-3 font-light">
      <span className="text-2xl">원하시는 장소를 선택해주세요.</span>

      <span>
        {selectedAddress
          ? `선택된 주소: ${selectedAddress}`
          : '지도를 움직여서 선택해보세요.'}
      </span>
      <Map
        id="map"
        center={selectedPosition ?? defaultCenter}
        style={{ width: '100%', height: '500px' }}
        level={3}
        onClick={handleMapClick}
      >
        <MapMarker position={selectedPosition ?? defaultCenter} />
      </Map>
      <Button className="w-full !py-6 text-xl" onClick={handleComplete}>
        선택 완료
      </Button>
    </div>
  );
};

export default JobsLocationPage;
