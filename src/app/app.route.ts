import { Routes } from '@angular/router'
import { Page0101Component } from './course/module1/page-01-01/page-01-01.component'
import { Page0102Component } from './course/module1/page-01-02/page-01-02.component'
import { Page0103Component } from './course/module1/page-01-03/page-01-03.component'
import { Page0104Component } from './course/module1/page-01-04/page-01-04.component'
import { Page0105Component } from './course/module1/page-01-05/page-01-05.component'
import { Page0106Component } from './course/module1/page-01-06/page-01-06.component'
import { Page0107Component } from './course/module1/page-01-07/page-01-07.component'
import { Page0108Component } from './course/module1/page-01-08/page-01-08.component'
import { Page0109Component } from './course/module1/page-01-09/page-01-09.component'

export const routes:Routes = [
    {path: 'page_1_1', component: Page0101Component},
    {path: 'page_1_2', component: Page0102Component},
    {path: 'page_1_3', component: Page0103Component},
    {path: 'page_1_4', component: Page0104Component},
    {path: 'page_1_5', component: Page0105Component},
    {path: 'page_1_6', component: Page0106Component},
    {path: 'page_1_7', component: Page0107Component},
    {path: 'page_1_8', component: Page0108Component},
    {path: 'page_1_9', component: Page0109Component}
]