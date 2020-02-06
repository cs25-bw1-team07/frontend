//importing fontawesome library
import {library} from '@fortawesome/fontawesome-svg-core'


//import specific icons to make library
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

//creating library that can be imported to all components
library.add(
    faReply,
    faArrowAltCircleUp,
    faArrowAltCircleDown,
    faArrowAltCircleRight,
    faArrowAltCircleLeft 
)