# **PLC**  

## 💡 `Siemens` 

--- 
### [TIA Portal S7 1200 PLC] 

<br>

- 객치제향 프로그램 방식 <br>
    - 리니어 프로그램 <br>
    - 구조적 프로그램 <br>

    ```
    클래스를 가지고 있다.
    (fuction & fuction block)
    ```

    <img src="img/system.png" width="1000" height="600"> <br>

<br>

- 과거 '프로피버스(PROFI BUS)'에서 '`프로피넷(PROFI NET)`'으로 사용한다. <br>
    - '`프로피넷(PROFI NET)`'은 표준 **이더넷 프로토콜** 사용 <br>
    (프로피넷 케이블 : 녹색의 두꺼운 선) <br> 

<br>

- **메모리 구조**가 다르다. <br>

    <img src="img/memory.png" width="550" height="450"> <br>
    - 가로 0 ~ 7 → 8진수의 구조 <br>
    ▶ 0번이 제일 위에 있다. (제일 큰 번호가 밑에 있다.) <br>
    ▶ 상위 비트와 하위 비트를 바꿔서 전송해 주어야 한다. <br>
    ```
    M  : bit    
    MB : byte
    MW : word
    MD : double word
    ```
    - MD0 → 상위 세로 0 ~ 3까지 32bit 사용 <br>
        ```
        MD0과 M0.3 사용하면 중복 사용
        ```
        ```
        MW50, MD100 이런식으로 사용하여 중복 사용 벗어나기
        (구역을 나눠서 사용하기)
        ```

    <br>

    <img src="img/data_memory.png" width="400" height="350"> <br>
    ```
    sint : short int
    int  : int
    Dint : double int
    ```

<br>

<img src="img/design.png" width="500" height="450"> <br>
```
L1(N상) : 220v
L+ : 240v

──────────────────────────────────────────────────────────
중성선(N상 : Neutral conductor 또는 neutral wire)

중성선(N상 : Neutral conductor) : 단상3선식의 경우나 3상 교류 
계통에서 변압기를 Y결선 하는 경우에 그 중성점에 접속되는 
전선(인출한 선)을 말함.
```
```
PLC 출력

P타입(L)  : 24v
com(M) : 0v → 1M : 마이너스를 연결해주면 된다.
```
```
디지털 입력 DI : 14점 (0.0 ~ 1.5까지)
```
```
아날로그 입력 : 2개  (2M 옆 → 0, 1)
```
```
아날로그 출력 : 1개 (ex: SB1232 AQ)
```
```
디지털 출력 DQ : 10개
```

---

### TIA Portal

- Project view <br>
프로젝트 트리 <br>
- Portal view <br>
스텝 단위로 작업 <br>


#### Create new project1 <br>

<img src="img/new_project1_1.png" width="750" height="450"> <br>
<img src="img/new_project1_2.png" width="750" height="600"> <br>
<img src="img/new_project1_3.png" width="750" height="450"> <br>
→ 디바이스가 하나도 없다. <br>
<img src="img/new_project1_4.png" width="750" height="450"> <br>
→ 새로운 디바이스 추가 가능 <br>

그러나, `Project view` 방식을 많이 쓴다. <br>


<img src="img/new_project1_5_add_new_device.png" width="1000" height="780"> <br>
→ 새로운 디바이스 추가 <br>

```
ET 200 (CPU) : 컴팩트 타입

(컴팩트 타입 : 샤프트나 회전축, 지주등의 축에 고정 하여 사용 하는 부품)
(샤프트 : 자동차의 변속기에서 구동륜까지 연결하는 동력전달장치)
(회전축 : 회전 운동의 축이 되는 부품)
(지주 :  대상물을 지지, 정해진 위치에 고정시키기 위한 기둥 역할의 부품)
```

```
S7-300 : 중형
S7-400 : 대형
S7-1500 : 중형 + 대형
S7-1200 : ET 200의 발전
```

<img src="img/design.png" width="500" height="450"> <br>
```
버전 : 214-1BG40-0XB0
기종 : CPU 1214C
       AC/DC/RLY [AC/DC : 전원 방식, RLY : 릴레이]
```

사용하는 기기의 `버전` 선택 <br>

<img src="img/new_project1_6_version_select.png" width="550" height="500"> <br>


<img src="img/new_project1_7_create_project.png" width="1000" height="800"> <br>

<img src="img/new_project1_8_signal_boards_add.png" width="900" height="650"> <br>
→ 드레그하여 추가 <br>
→ 보드를 2, 3, 4… 확장하여 사용 가능 <br>




<img src="img/new_project1_9_preferences.png" width="1000" height="450"> <br>
→ 환경 설정 <br>
```
PROFINET interface[X1] : 표준 인터넷 방식 사용
```

<img src="img/new_project1_10_preferences_ip.png" width="1000" height="450"> <br>
→ IP protocol 설정 가능 <br>

```
DI가 14개
DQ가 10개
AI(아날로그) 2개
AQ1 Signal board(아날로그 출력) 1개
```

<img src="img/new_project1_11_preferences_password.png" width="1000" height="450"> <br>
→ Password 설정 가능 <br>
```
HMI, Read, Write 각각 설정 가능
```


<img src="img/new_project1_12_ethernet_addresses.png" width="1000" height="700"> <br>
→ Ethernet addresses 설정 가능 <br>
```
이미지에 나와있는 '포트' 더블클릭해서 바로 설정 가능
```
```
[default value]

192.168.0.1
255.255.255.0
```

<img src="img/new_project1_13_io_tag_preferences.png" width="800" height="700"> <br>
→ I/O tag 설정 가능 <br>
```
여기서 Q는 OUTPUT을 나타낸다.
```


<img src="img/new_project1_14_io_tree.png" width="280" height="650"> <br>
```
Device configuration : 환경 설정
Program blocks : 실제 작업할 때 사용
PLC tags : I/O tag 설정 → 좀 더 디테일하게 설정할 수 있다.
```

<img src="img/new_project1_15_programing.png" width="700" height="520"> <br>
→ 프로그램 작성 <br>
```
☆ 'Main [OB1]'에서 프로그램 작성

위에 회로 버튼 드레그하여 추가 가능

입력 시 %I0.0 / %Q0.0 또는 "INPUT_0" / "OUTPUT_0" 하나만 써주면 자동으로 완성 된다.
```

<img src="img/new_project1_16_connect.png" width="700" height="520"> <br>
→ 장비와 연결 (GoOnline) <br>

```
장비와 랜포트로 연결 안 한 경우는 'Start search' 및 연결 진행 불가
```

<img src="img/new_project1_17_compile.png" width="520" height="400"> <br>
→ 컴파일 완료 및 연결 완료 (다운로드 바로 왼쪽 옆 버튼이 컴파일 버튼) <br>

<img src="img/new_project1_18_download.png" width="600" height="400"> <br>
→ download 진행 <br>
```
다운로드는 내 컴퓨터로 다운로드 하는 것이 아닌
디바이스(프로그램)에 다운로드를 진행하는 것!


cf) 
우리나라는 업로드라고 하지만, 
유럽에서는 사고 방식이 다르기 때문에 다운로드
```

<img src="img/new_project1_19_synchronization.png" width="600" height="400"> <br>
→ Continue without synchronization : 처음 진행할 때는 동기화 없이 진행 <br>


<img src="img/new_project1_20_load.png" width="600" height="400"> <br>
→ Stop modules를 `stop all`로 진행 <br>

<img src="img/new_project1_21_finish.png" width="600" height="400"> <br>
→ 완료(finish) <br>

```
PC 및 프로그램 연결 완료
```

<img src="img/new_project1_22_monitoring.png" width="600" height="450"> <br>
→ (안경 모양) 모니터링 가능 <br>
→ 다시 누르면 모니터링 해제 <br>

```
모니터링 : 시뮬레이션 진행
```

```
프로그램 작성 및 모니터링 후 별 다른 문제 없으면 
'다운로드'하여 디바이스로 전송
```

---