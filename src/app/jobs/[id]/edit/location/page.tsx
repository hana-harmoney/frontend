'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useKakaoLoader from '@/components/use-kakao-loader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Button } from '@/components/ui/button';
import DaumPostcodeEmbed from 'react-daum-postcode';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Header from '@/components/common/header';
import { useJobEditStore } from '@/stores/useJobEditStore';

const JobsEditLocationPage = () => {
  useKakaoLoader();
  const params = useParams() as { id?: string; jobId?: string };
  const jobId = params.jobId ?? params.id ?? '';
  // console.log('route params : ', params, ' / jobId: ', jobId);
  console.log('jobId: ', jobId);
  const router = useRouter();
  const { data: registerData, setData } = useJobEditStore();
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showPostcode, setShowPostcode] = useState(false);
  const handleAddressSelect = (data: { address: string }) => {
    const { address } = data;
    setSelectedAddress(address);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        const lng = parseFloat(x);
        const lat = parseFloat(y);
        setSelectedPosition({ lat, lng });
      }
    });

    setShowPostcode(false);
  };

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
    lat: registerData?.latitude || 37.5448361732145,
    lng: registerData?.longitude || 127.056563379345,
  };

  const handleComplete = () => {
    if (!selectedAddress || !selectedPosition) return;
    setData({
      address: selectedAddress,
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
    });
    router.push(`/jobs/${jobId}/edit`);
  };

  useEffect(() => {
    if (registerData.address) {
      setSelectedAddress(registerData.address);
    }
    if (registerData.latitude && registerData.longitude) {
      setSelectedPosition({
        lat: registerData.latitude,
        lng: registerData.longitude,
      });
    }
  }, [registerData]);

  return (
    <>
      <Header
        title={'장소 선택하기'}
        showBackButton={true}
        centerTitle={false}
      />

      <div className="flex w-full flex-col gap-3 px-6 py-3 font-light">
        <div className="mb-2">
          <h2 className="text-hanagreen-normal text-xl font-semibold">
            원하는 장소를 선택해주세요
          </h2>
          <p className="mt-1 text-base text-gray-600">
            {selectedAddress ? (
              <>
                <span className="font-medium text-black">선택된 주소:</span>{' '}
                {selectedAddress}
              </>
            ) : (
              '지도를 클릭하거나 주소 검색 버튼을 눌러 선택하세요.'
            )}
          </p>
        </div>

        <Dialog open={showPostcode} onOpenChange={setShowPostcode}>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-6 py-5 text-lg">
              주소 검색
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] p-0">
            <DialogTitle asChild>
              <VisuallyHidden>주소 검색</VisuallyHidden>
            </DialogTitle>
            <DaumPostcodeEmbed onComplete={handleAddressSelect} autoClose />
          </DialogContent>
        </Dialog>

        <Map
          id="map"
          center={selectedPosition ?? defaultCenter}
          style={{ width: '100%', height: '450px' }}
          level={3}
          onClick={handleMapClick}
        >
          <MapMarker position={selectedPosition ?? defaultCenter} />
        </Map>
        <Button className="w-full !py-6 text-xl" onClick={handleComplete}>
          선택 완료
        </Button>
      </div>
    </>
  );
};

export default JobsEditLocationPage;
