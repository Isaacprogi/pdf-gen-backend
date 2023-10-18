const time = require('../utils/time')

module.exports =  ({htmlContent,crime})=> {

   return `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
           * {
               padding: 0;
               margin: 0;
               box-sizing: border-box;
           }
   
           body {
               font-family: Arial, sans-serif;
           }

           html {
            -webkit-print-color-adjust: exact;
          }
   
           .container {
               max-width: 595px;
               margin: 0 auto;
               min-height: 842px;
               padding: 16px;
               display: -webkit-flex;
               display: flex;
               -webkit-flex-direction: column;
               flex-direction: column;
           }
   
           .header {
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               -webkit-justify-content: space-between;
               justify-content: space-between;
           }
   
           .footer {
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               -webkit-justify-content: space-between;
               justify-content: space-between;
               width: 100%;
           }
   
           .graph-holder {
               -webkit-flex: auto;
               flex: auto;
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               -webkit-justify-content: center;
               justify-content: center;
           }
   
           .date {
               font-size: 9px;
               font-weight: 900;
               color: #1463FF;
           }
   
           .report {
               font-size: 9px;
               font-weight: 900;
               color: #090E24;
           }
   
           .left-over-page {
               color: #626E99;
           }
   
           .street {
               color: #090E24;
               font-size: 9px;
               font-weight: 900;
           }
   
           .chart-container {
               width: 100%;
               height: max-content;
           }
   
           .chart-container-header {
               display: -webkit-flex;
               display: flex;
               gap: .5rem;
               -webkit-align-items: center;
               align-items: center;
               -webkit-justify-content: space-around;
               justify-content: space-around;
               margin-bottom: 10px;
           }
           .left-side{
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               font-weight: 500;
               font-size: 10px;
               color: #090E24;
           }

           .box{
            background:white;
           }
   
           .chart-header-text {
               font-weight: 500;
               font-size: 10px;
               margin-left:.3rem;
           }
   
           .chart-line {
               -webkit-flex: 1;
               flex: 1;
               width: 100%;
               height: 4px;
               background: -webkit-linear-gradient(90deg, #005DFF 0%, #00A3FF 44.27%, #21DDFF 100%);
               background: linear-gradient(90deg, #005DFF 0%, #00A3FF 44.27%, #21DDFF 100%);
               margin-left:.5rem;
           }
   
           .chart-sub-container {
               height: max-content;
               border-radius: 12.3px;
               overflow: hidden;
               width: 100%;
               background: #F2F4F5;
           }
   
           .chart-sub-container-header {
               height: 30px;
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               -webkit-justify-content: start;
               justify-content: start;
               background-color: #E8EEFB;
           }
   
           .chart-sub-container-header-text {
               margin-left: .6rem;
               font-size: 9px;
               color: #1463FF;
               font-weight: 500;
           }
   
           .chart-holder {
               display: -webkit-flex;
               display: flex;
               -webkit-align-items: center;
               align-items: center;
               font-weight: 500;
               padding-top: 14px;
               padding-bottom: 14px;
               padding-right: 21px;
               padding-left: 0px;
               width: 100%;
               height:max-content;
               
           }
   
           .y-text {
               -webkit-transform: rotate(270deg);
               transform: rotate(270deg);
               display: inline-block;
               font-size: 9px;
               font-size: 500;
               color: #1E1E1E;
           }
   
           .chat-box {
               border-radius: 12.344px;
               overflow: hidden;
               background-color: white; 
               padding:1rem;    
           }
       </style>
   </head>
   <body>
   <div class='container'>
       <div class="header">
           <svg xmlns="http://www.w3.org/2000/svg" width="92" height="16" viewBox="0 0 92 16" fill="none">
               <g clip-path="url(#clip0_34_631)">
                   <path d="M28.9626 8.22277C29.3113 7.7302 29.4859 7.14393 29.4859 6.46362C29.4859 6.00481 29.4065 5.58565 29.2481 5.20576C29.0896 4.82618 28.8507 4.51177 28.5316 4.26255C28.2126 4.01339 27.8152 3.85125 27.3395 3.77602C27.2284 3.75623 27.1115 3.74328 26.9887 3.73747C26.8657 3.73142 26.7625 3.72852 26.6794 3.72852H23.2188V12.2718H24.4617V9.20441H26.7353L28.2253 12.2718H29.6465L28.0285 8.96003C28.4171 8.79608 28.7296 8.55158 28.9626 8.22277ZM24.4616 4.89747H26.6318C26.7111 4.89747 26.7993 4.9014 26.8964 4.90933C26.9935 4.91726 27.0858 4.93312 27.1728 4.9566C27.4266 5.01597 27.6308 5.12581 27.7853 5.28601C27.9401 5.44627 28.0509 5.62995 28.1184 5.83772C28.1856 6.04548 28.2194 6.25404 28.2194 6.46362C28.2194 6.6732 28.1856 6.88279 28.1184 7.09243C28.0509 7.30225 27.9401 7.48708 27.7853 7.64728C27.6308 7.80754 27.4266 7.91708 27.1728 7.97645C27.0858 7.99624 26.9935 8.01022 26.8964 8.01815C26.7993 8.02608 26.7112 8.02977 26.6318 8.02977H24.4616V4.89747Z" fill="#090E24" />
                   <path d="M35.1171 6.14006C34.657 5.83752 34.1001 5.68628 33.4461 5.68628C32.8199 5.68628 32.2709 5.82669 31.7992 6.10756C31.3273 6.38844 30.9598 6.7857 30.6963 7.29994C30.4325 7.81418 30.3008 8.42132 30.3008 9.12136C30.3008 9.78183 30.4346 10.3623 30.7021 10.8625C30.9696 11.363 31.3442 11.7524 31.826 12.0314C32.3075 12.3102 32.8673 12.4496 33.5057 12.4496C34.1279 12.4496 34.6927 12.2925 35.2002 11.9779C35.7076 11.6635 36.0862 11.2197 36.3359 10.6461L35.1171 10.2605C34.9583 10.5889 34.7374 10.8409 34.4541 11.0171C34.1704 11.1929 33.8345 11.281 33.4461 11.281C32.8553 11.281 32.4035 11.0881 32.0905 10.7024C31.8316 10.3838 31.6814 9.95449 31.6365 9.41816H36.4192C36.4666 8.65076 36.3763 7.98818 36.1485 7.43066C35.9205 6.87291 35.5768 6.4426 35.1171 6.14006ZM32.0905 7.37123C32.4035 6.97948 32.8715 6.78388 33.4937 6.78388C34.0565 6.78388 34.4758 6.96181 34.7512 7.31767C34.9586 7.58566 35.09 7.96349 35.1458 8.45092H31.6648C31.7306 8.0064 31.8713 7.64521 32.0905 7.37123Z" fill="#090E24" />
                   <path d="M42.3349 6.90849C42.1365 6.48533 41.8246 6.17571 41.3984 5.9798C40.9721 5.7842 40.4716 5.68628 39.897 5.68628C39.1557 5.68628 38.5623 5.84835 38.1163 6.1728C37.6702 6.49725 37.3681 6.93409 37.2096 7.48398L38.3689 7.83984C38.4798 7.48005 38.676 7.22187 38.9575 7.0656C39.239 6.90958 39.5483 6.83145 39.885 6.83145C40.4203 6.83145 40.7978 6.95285 41.0179 7.19627C41.2097 7.40839 41.3148 7.71959 41.3332 8.12901C41.0897 8.1632 40.8472 8.1974 40.6014 8.23159C40.2033 8.28703 39.8236 8.34616 39.4628 8.40952C39.1022 8.47289 38.7791 8.546 38.4937 8.62885C38.1646 8.73579 37.8873 8.87517 37.6614 9.04729C37.4355 9.21941 37.2649 9.42796 37.15 9.67319C37.035 9.91842 36.9775 10.2032 36.9775 10.5274C36.9775 10.8756 37.0598 11.195 37.2243 11.4857C37.3887 11.7763 37.6315 12.0099 37.9527 12.1857C38.2738 12.3618 38.672 12.4497 39.1477 12.4497C39.7464 12.4497 40.2506 12.3301 40.6609 12.0909C40.9681 11.9117 41.2347 11.6621 41.4607 11.3422V12.2718H42.5607V8.32637C42.5607 8.05735 42.5488 7.80631 42.525 7.57295C42.5012 7.33958 42.4378 7.11807 42.3349 6.90849ZM41.1934 10.1654C41.1457 10.3752 41.0447 10.5769 40.8899 10.7707C40.7354 10.9645 40.5312 11.1237 40.2777 11.2482C40.0238 11.3729 39.7206 11.4351 39.3679 11.4351C39.1023 11.4351 38.8843 11.3937 38.7139 11.3105C38.5433 11.2274 38.4166 11.1157 38.3332 10.9753C38.2501 10.8351 38.2083 10.6818 38.2083 10.5155C38.2083 10.3455 38.247 10.2011 38.3245 10.0826C38.4018 9.96375 38.5067 9.86292 38.6396 9.78001C38.7724 9.69686 38.924 9.62556 39.0944 9.56619C39.2965 9.50313 39.5274 9.44872 39.787 9.40309C40.0467 9.3577 40.337 9.31122 40.6581 9.26371C40.864 9.23327 41.0861 9.2001 41.3211 9.16482C41.3187 9.26976 41.3148 9.3885 41.3092 9.5248C41.2991 9.7621 41.2605 9.97561 41.1934 10.1654Z" fill="#090E24" />
                   <path d="M45.1713 3.55054H43.9287V12.2718H45.1713V3.55054Z" fill="#090E24" />
                   <path d="M48.8451 3.72852L46.0625 12.2718H47.3527L47.9792 10.3438H51.4934L52.1272 12.2718H53.4175L50.6348 3.72852H48.8451ZM48.357 9.18093L49.7261 4.96707L51.1112 9.18093H48.357Z" fill="#090E24" />
                   <path d="M58.3646 8.97593C58.0474 8.80805 57.6194 8.65469 57.0802 8.5161C56.5768 8.38967 56.1963 8.28092 55.9387 8.18983C55.681 8.09905 55.5077 8.00397 55.4186 7.90527C55.3292 7.80625 55.2847 7.68564 55.2847 7.54335C55.2847 7.29812 55.4016 7.10512 55.6355 6.96472C55.8694 6.82455 56.1744 6.76221 56.5512 6.77783C56.9435 6.79368 57.2626 6.89058 57.5083 7.06875C57.7541 7.24668 57.8988 7.48979 57.9425 7.79839L59.215 7.5669C59.1674 7.18731 59.0248 6.85602 58.787 6.57327C58.5492 6.29058 58.2378 6.07198 57.8533 5.91753C57.4689 5.76338 57.0308 5.68628 56.5393 5.68628C56.0358 5.68628 55.5969 5.76544 55.2223 5.92358C54.8477 6.08172 54.5572 6.30528 54.3511 6.59409C54.145 6.88259 54.0421 7.22102 54.0421 7.60853C54.0421 7.92106 54.1104 8.18693 54.2472 8.40656C54.3839 8.62588 54.6138 8.81785 54.9369 8.98205C55.2599 9.14624 55.6969 9.29936 56.248 9.44164C56.7512 9.5763 57.1258 9.68899 57.3719 9.78007C57.6174 9.87085 57.779 9.96696 57.8562 10.0678C57.9335 10.1686 57.9722 10.3001 57.9722 10.4622C57.9722 10.7391 57.8624 10.9567 57.6423 11.1147C57.4225 11.2731 57.1179 11.352 56.7295 11.352C56.3015 11.352 55.9438 11.2562 55.6565 11.0643C55.369 10.8726 55.1856 10.6105 55.1065 10.2782L53.834 10.4741C53.9449 11.0992 54.2462 11.5836 54.7377 11.9276C55.2293 12.2718 55.8655 12.4439 56.6465 12.4439C57.459 12.4439 58.0963 12.2639 58.558 11.9041C59.0199 11.544 59.2508 11.0477 59.2508 10.4148C59.2508 10.0866 59.1823 9.80682 59.0455 9.57533C58.9087 9.34408 58.6816 9.14406 58.3646 8.97593Z" fill="#090E24" />
                   <path d="M64.4419 8.97593C64.1247 8.80805 63.6967 8.65469 63.1575 8.5161C62.654 8.38967 62.2736 8.28092 62.0159 8.18983C61.7583 8.09905 61.585 8.00397 61.4958 7.90527C61.4064 7.80625 61.362 7.68564 61.362 7.54335C61.362 7.29812 61.4789 7.10512 61.7128 6.96472C61.9467 6.82455 62.2517 6.76221 62.6284 6.77783C63.0208 6.79368 63.3398 6.89058 63.5856 7.06875C63.8314 7.24668 63.9761 7.48979 64.0198 7.79839L65.2923 7.5669C65.2447 7.18731 65.1021 6.85602 64.8643 6.57327C64.6264 6.29058 64.315 6.07198 63.9306 5.91753C63.5462 5.76338 63.1081 5.68628 62.6165 5.68628C62.1131 5.68628 61.6742 5.76544 61.2996 5.92358C60.925 6.08172 60.6344 6.30528 60.4284 6.59409C60.2223 6.88259 60.1194 7.22102 60.1194 7.60853C60.1194 7.92106 60.1876 8.18693 60.3244 8.40656C60.4611 8.62588 60.691 8.81785 61.0141 8.98205C61.3371 9.14624 61.7741 9.29936 62.3252 9.44164C62.8284 9.5763 63.203 9.68899 63.4491 9.78007C63.6946 9.87085 63.8562 9.96696 63.9335 10.0678C64.0107 10.1686 64.0493 10.3001 64.0493 10.4622C64.0493 10.7391 63.9395 10.9567 63.7194 11.1147C63.4995 11.2731 63.1951 11.352 62.8067 11.352C62.3787 11.352 62.0209 11.2562 61.7337 11.0643C61.4461 10.8726 61.2627 10.6105 61.1837 10.2782L59.9111 10.4741C60.022 11.0992 60.3233 11.5836 60.8149 11.9276C61.3064 12.2718 61.9427 12.4439 62.7237 12.4439C63.5361 12.4439 64.1734 12.2639 64.6351 11.9041C65.097 11.544 65.328 11.0477 65.328 10.4148C65.328 10.0866 65.2595 9.80682 65.1227 9.57533C64.9859 9.34408 64.7589 9.14406 64.4419 8.97593Z" fill="#090E24" />
                   <path d="M67.7055 5.86426H66.4629V12.2717H67.7055V5.86426Z" fill="#090E24" />
                   <path d="M67.7055 3.60986H66.4629V4.8141H67.7055V3.60986Z" fill="#090E24" />
                   <path d="M73.3666 8.97593C73.0494 8.80805 72.6213 8.65469 72.0822 8.5161C71.5787 8.38967 71.1983 8.28092 70.9406 8.18983C70.683 8.09905 70.5097 8.00397 70.4205 7.90527C70.3311 7.80625 70.2867 7.68564 70.2867 7.54335C70.2867 7.29812 70.4036 7.10512 70.6375 6.96472C70.8714 6.82455 71.1764 6.76221 71.5531 6.77783C71.9454 6.79368 72.2645 6.89058 72.5103 7.06875C72.7561 7.24668 72.9008 7.48979 72.9445 7.79839L74.217 7.5669C74.1694 7.18731 74.0268 6.85602 73.7889 6.57327C73.5511 6.29058 73.2397 6.07198 72.8553 5.91753C72.4709 5.76338 72.0328 5.68628 71.5412 5.68628C71.0377 5.68628 70.5988 5.76544 70.2242 5.92358C69.8496 6.08172 69.5592 6.30528 69.3531 6.59409C69.147 6.88259 69.0441 7.22102 69.0441 7.60853C69.0441 7.92106 69.1123 8.18693 69.2491 8.40656C69.3859 8.62588 69.6158 8.81785 69.9388 8.98205C70.2618 9.14624 70.6989 9.29936 71.25 9.44164C71.7531 9.5763 72.1277 9.68899 72.3738 9.78007C72.6193 9.87085 72.781 9.96696 72.8582 10.0678C72.9355 10.1686 72.9741 10.3001 72.9741 10.4622C72.9741 10.7391 72.8643 10.9567 72.6442 11.1147C72.4243 11.2731 72.1199 11.352 71.7315 11.352C71.3035 11.352 70.9457 11.2562 70.6585 11.0643C70.3709 10.8726 70.1875 10.6105 70.1085 10.2782L68.8359 10.4741C68.9468 11.0992 69.2481 11.5836 69.7397 11.9276C70.2312 12.2718 70.8675 12.4439 71.6485 12.4439C72.4609 12.4439 73.0982 12.2639 73.5599 11.9041C74.0218 11.544 74.2528 11.0477 74.2528 10.4148C74.2528 10.0866 74.1842 9.80682 74.0474 9.57533C73.9107 9.34408 73.6836 9.14406 73.3666 8.97593Z" fill="#090E24" />
                   <path d="M77.0353 4.08447H75.7866V5.8642H74.5557V6.86097H75.7866V9.75023C75.7866 10.0984 75.7914 10.4099 75.8014 10.6847C75.8112 10.9598 75.8856 11.2296 76.0245 11.4946C76.1789 11.7913 76.4089 12.0089 76.7142 12.1471C77.0192 12.2855 77.366 12.3607 77.7547 12.3726C78.143 12.3844 78.5396 12.3509 78.9439 12.2718V11.2217C78.5237 11.281 78.1578 11.294 77.8467 11.2602C77.5357 11.2267 77.3086 11.0873 77.166 10.8421C77.0906 10.7114 77.0502 10.5512 77.0441 10.3614C77.0382 10.1716 77.0353 9.94825 77.0353 9.69086V6.86103H78.9439V5.86426H77.0353V4.08447Z" fill="#090E24" />
                   <path d="M81.524 10.9607H80.21V12.2719H81.524V10.9607Z" fill="#090E24" />
                   <path d="M85.2934 3.72852L82.5107 12.2718H83.801L84.4274 10.3438H87.9417L88.5755 12.2718H89.8657L87.0831 3.72852H85.2934ZM84.8052 9.18093L86.1744 4.96707L87.5595 9.18093H84.8052Z" fill="#090E24" />
                   <path d="M92.0004 3.72852H90.7578V12.2718H92.0004V3.72852Z" fill="#090E24" />
                   <path d="M8.46711 1.16181C8.46711 1.80345 7.94579 2.32363 7.30273 2.32363H3.39419C2.86535 2.32363 2.43671 2.75139 2.43671 3.279V8.69844C2.43671 9.36985 1.89125 9.91411 1.21836 9.91411C0.545461 9.91411 0 9.36985 0 8.69844V2.90553C0 1.30083 1.3037 0 2.91193 0H7.30267C7.94572 0 8.46711 0.520174 8.46711 1.16181Z" fill="#1463FF" />
                   <path d="M15.0207 5.92453V15.5702C15.0207 15.8748 14.7117 16.0826 14.4287 15.9683L11.0528 14.6048C10.9274 14.5652 10.7968 14.5451 10.6653 14.5451H6.13365C5.42449 14.5451 4.84961 13.9715 4.84961 13.2639V5.92453C4.84961 5.21692 5.42449 4.64331 6.13365 4.64331H13.7366C14.4458 4.64331 15.0207 5.21692 15.0207 5.92453Z" fill="#1463FF" />
               </g>
               <defs>
                   <clipPath id="clip0_34_631">
                       <rect width="92" height="16" fill="white" />
                   </clipPath>
               </defs>
           </svg>
           <div class='street'>
               123 Main Street,Dover,NH 03820-4667
           </div>
       </div>
   
       <div class='graph-holder'>
   
   
           <div class='chart-container'>
               <div class='chart-container-header'>
                   <div class='left-side'>
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                           <g opacity="0.4">
                               <path d="M3.33366 5.33329C3.33366 8.27881 6.33366 11.3333 8.00033 11.3333C9.66699 11.3333 12.667 8.27881 12.667 5.33329C12.667 2.38777 10.5777 0.666626 8.00033 0.666626C5.423 0.666626 3.33366 2.38777 3.33366 5.33329Z" fill="#1463FF" />
                           </g>
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7418 1.55453C13.4959 1.68007 13.3983 1.98123 13.5238 2.22718C13.9316 3.02612 14.167 3.98061 14.167 5.0832C14.167 5.77204 14.0311 6.47542 13.7891 7.16832C13.6981 7.42902 13.8356 7.71417 14.0963 7.80523C14.357 7.89629 14.6421 7.75877 14.7332 7.49807C15.0056 6.71803 15.167 5.90269 15.167 5.0832C15.167 3.83569 14.8999 2.7235 14.4145 1.77254C14.2889 1.52659 13.9878 1.42898 13.7418 1.55453ZM2.25884 1.55453C2.01289 1.42898 1.71173 1.52659 1.58618 1.77254C1.10076 2.7235 0.833658 3.83569 0.833658 5.0832C0.833658 5.90269 0.99501 6.71803 1.26746 7.49807C1.35852 7.75877 1.64367 7.89629 1.90437 7.80523C2.16507 7.71417 2.30259 7.42902 2.21153 7.16832C1.96951 6.47542 1.83366 5.77204 1.83366 5.0832C1.83366 3.98061 2.06904 3.02612 2.47685 2.22718C2.6024 1.98123 2.50479 1.68007 2.25884 1.55453Z" fill="#1463FF" />
                           <ellipse cx="2" cy="2" rx="2" ry="2" transform="matrix(-1 0 0 1 10 3.33325)" fill="#1463FF" />
                       </svg>
                       <span class='chart-header-text'>Crime</span>
                   </div>
                   <span class='chart-line'></span>
               </div>
   
               <div class='chart-sub-container'>
                   <div class='chart-sub-container-header'>
                       <span class='chart-sub-container-header-text'>
                           ${crime}
                       </span>
                   </div>
                   <div class='chart-holder'>
                       <span class='y-text'>Arrests</span>
   
                           <div class='chat-box'>
                           ${htmlContent}
                           </div>
   
                   </div>
               </div>
   
           </div>
   
   
   
   
   
       </div>
   
       <div class="footer">
           <span class='date'>
              ${time}
           </span>
           <span class='report'>
               RealAssist Property Report|Page 1 <span class='left-over-page'>of 25</span>
           </span>
       </div>
   </div>
   </body>
   </html>
   
   `
}