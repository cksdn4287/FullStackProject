package org.zeroc.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.zeroc.backend.dto.MemberDTO;
import org.zeroc.backend.dto.MemberModifyDTO;
import org.zeroc.backend.service.MemberService;
import org.zeroc.backend.util.JWTUtil;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;

    @GetMapping("/api/member/kakao")
    public Map<String, Object> getMemberFromKakao(@RequestParam(name="accessToken") String accessToken){

        log.info("access Token " );
        log.info(accessToken);

        MemberDTO memberDTO = memberService.getKakaoMember(accessToken);

        Map<String, Object> claims = memberDTO.getClaims();

        String jwtAccessToken = JWTUtil.generateToken(claims , 10);
        String jwtRefreshToken = JWTUtil.generateToken(claims, 60*24);

        claims.put("accessToken", jwtAccessToken);
        claims.put("refresh", jwtRefreshToken);



        return claims;
    }
    
    @PutMapping("/api/member/modify")
    public Map<String, String>  modify(@RequestBody MemberModifyDTO memberModifyDTO){
        log.info("member modify : " + memberModifyDTO);

        memberService.modifyMember(memberModifyDTO);

        return Map.of("result" , "modified");
    }
}
