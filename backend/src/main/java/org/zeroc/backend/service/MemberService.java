package org.zeroc.backend.service;


import org.springframework.transaction.annotation.Transactional;
import org.zeroc.backend.dto.MemberDTO;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken);
}
