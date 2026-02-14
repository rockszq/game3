// 游戏状态
let gameState = {
    girlName: '',
    manName: '',
    memoryLevel: 100,        // 男主对女主的记忆完整度
    suspicion: 0,            // 林婉对女主的警惕程度
    corruptionLevel: 0,      // 巫术对男主的侵蚀程度（新增）
    
    cluesFound: [],          // 发现的线索
    currentScene: 'prologue',
    daysLeft: 21,            // 从7天改为21天
    currentPhase: 1,         // 当前阶段（1-3）
    antidoteProgress: 0,     // 解药进度
    triggeredEvents: [],     // 记录已触发的事件
    
    // 新增：关键道具
    inventory: [],           // 物品栏
    
    // 新增：关系状态
    relationshipStatus: 'normal',  // normal, confused, distant, hostile
    
    // 新增：林婉状态
    witchMood: 'confident',  // confident, wary, desperate, defeated
    
    // 新增：男主挣扎度
    struggleLevel: 50        // 男主内心挣扎程度（0-100）
};

// 场景数据 - 优化后的21天剧情
const scenes = {
    // ==================== 序章 ====================
    prologue: {
        title: "序章：蝴蝶效应",
        text: `三年前，大一的那个秋天，你第一次遇见了{manName}。

一切始于偶然的相遇。在网上学习圈内知识时，认识了一个科普博主，他沉稳，睿智，风趣都深深吸引着你。你们从相识到熟悉，建立关系……第一次实践的时候，他用低沉而不容置疑的声音说出"跪下"时，你感觉灵魂深处有什么东西被唤醒了。

羞耻感让你的脸颊发烫，但身体却先一步服从了大脑的指令。你跪在他面前，戴上他为你准备的尾巴，听着他的命令，全心全意地侍奉自己的主人。在那一刻，疼痛变成了归属，羞辱变成了救赎。

从那时起，你就知道他是你唯一的Daddy Dom。

他在城郊的别墅成了你们的秘密花园——那里有他亲手种下的玫瑰，有吊在橡树下的秋千，有你们一起看过的无数部电影。每个周末和假期，你都会去那里，看他做饭，被他推着玩秋千，一起在浴缸里泡澡，一起在影音室里看电影。

你们最爱看的是《蝴蝶效应》。{manName}总说，如果能回到过去，他会在更早的时候找到你，保护你，让你永远不需要经历那些伤痛。你会笑着靠在他怀里，说现在就是最好的时刻。

三周前，{manName}说要去外地出差十四天。你像往常一样帮他收拾行李，在玄关处被他拉进怀里，得到一个漫长的吻。

"乖，等我回来。"他揉了揉你的头发。

你目送他的车消失在夜色中，满心期待着重逢。就像之前的每一次分别一样，你以为一切都会和往常一样。

但两周过去了，他没有联系你。没有短信，没有电话，就像人间蒸发了一样。`,
        choices: [
            { text: "主动打电话给他", next: 'phone_call', effect: () => {} },
            { text: "直接去别墅找他", next: 'go_to_villa', effect: () => { gameState.suspicion += 5; } }
        ]
    },

    // ==================== 第一阶段：潜伏期（第1-7天） ====================
    phone_call: {
        title: "陌生的声音",
        text: `电话响了很久才被接起。

"喂，哪位？"

他的声音依旧低沉磁性，但那种熟悉的宠溺荡然无存，只剩下客套的疏离。你的心脏猛地一沉。

"Daddy...是我，{girlName}..."

电话那头沉默了很久。"{girlName}...？"他重复着这个名字，像是在品味一个陌生的词汇，"对不起，我认识你吗？"

你的血液仿佛瞬间凝固。

"等等，"他的语气突然变得困惑，"为什么我觉得你的声音很耳熟？我们是不是在哪里见过？"

你听到背景里传来一个轻柔的女声："{manName}，是谁呀？"

"不知道，说是我的...等等，我有什么事情想不起来了..."

电话那头传来一阵杂音，然后是那个女声贴近话筒："不好意思，他最近身体不太舒服，需要休息。你是他同事吗？"

你认出了那个声音。是林婉，你的同班同学，那个总是笑得清纯无害的女孩。

电话被挂断了。你站在原地，手机从手中滑落。

发生了什么？为什么Daddy不记得你了？为什么林婉会在他身边？

你看了眼日历——距离他回来已经过去十天了。`,
        choices: [
            { text: "立刻打车去别墅", next: 'arrival_phase1', effect: () => { gameState.suspicion += 5; gameState.daysLeft -= 1; } },
            { text: "先冷静下来，联系共同朋友打听情况", next: 'investigate_phase1', effect: () => { gameState.suspicion += 10; gameState.daysLeft -= 1; } }
        ]
    },

    go_to_villa: {
        title: "空荡的归处",
        text: `你等不及了，直接打车去了别墅。

院子里，玫瑰因为十四天无人照料而显得有些萎靡，秋千在秋风中孤独地摇晃。你输入密码——你的生日，门开了。

屋内整洁得反常，像是有人刻意打扫过。{manName}的行李箱放在玄关，但人却不在。

你走进客厅，发现茶几上放着一个陌生的女式包包。不是你的。

心跳加速，你走上楼梯，听到主卧传来水声。有人刚洗过澡。

门开了。林婉穿着你的睡衣——那件{manName}买给你的粉色睡衣——从房间里走出来。她看到你，脸上闪过一丝惊讶，随即露出甜美的笑容。

"呀，{girlName}，你怎么来了？"她歪着头，像是在看一个迷路的孩子，"{manName}在休息，他最近...记性不太好。"

"你为什么会在这里？为什么穿我的衣服？"你的声音在颤抖。

她眨了眨眼睛，一脸无辜："你的衣服？这是{manName}给我买的呀。他说我穿着很可爱，就像...就像以前的你一样。"

那一刻，你意识到有什么极其恐怖的事情发生了。

你看了眼日历——距离他回来已经过去十天了。`,
        choices: [
            { text: "质问她到底做了什么", next: 'confront_witch_phase1', effect: () => { gameState.suspicion += 15; gameState.daysLeft -= 1; gameState.memoryLevel -= 3; }, type: 'danger' },
            { text: "要求见{manName}，当面确认", next: 'demand_meeting_phase1', effect: () => { gameState.daysLeft -= 1; } }
        ]
    },

    investigate_phase1: {
        title: "隐秘的线索",
        text: `你强忍着心痛，开始联系你们共同的朋友。

从一位与{manName}有生意往来的叔叔那里，你得知{manName}十天前就回来了，但他推掉了所有应酬，说身体不适需要静养。有人看见林婉进出他的别墅，说是"照顾病人"。

你翻遍网络，在一个隐秘的玄学论坛发现了惊人的线索：林婉的家族来自西南边陲，世代研习某种古老的巫蛊术，能够操控记忆与情感。而林婉，据说是个中高手。

你想起一个月前的聚餐。那是{manName}第一次见你大学同学，他礼貌地请所有人吃饭。当时林婉坐在{manName}旁边，眼神中的崇拜几乎要溢出来。她"不小心"打翻了酒杯，{manName}脱下外套给她披上...

那顿饭之后，林婉开始频繁出现在你身边，"偶遇"的次数越来越多。她总问你关于{manName}的喜好，问你们的相处细节，问那些只有你们两个人知道的秘密。

你当时只当是闺蜜间的分享。现在回想起来，那分明是情报收集。

这不是巧合。她在偷走你的Daddy，用一种超自然的方式。

你看了眼日历——距离他回来已经过去十天了。`,
        choices: [
            { text: "带着证据去别墅对质", next: 'arrival_confront_phase1', effect: () => { gameState.daysLeft -= 1; } },
            { text: "悄悄潜入别墅，寻找破解之法", next: 'sneak_in_phase1', effect: () => { gameState.suspicion += 10; gameState.daysLeft -= 1; } }
        ]
    },

    arrival_phase1: {
        title: "破碎的重逢",
        text: `别墅的大门依然为你敞开，密码还是你的生日。这个细节让你心中燃起一丝希望。

院子里，玫瑰开得正艳，秋千在微风中轻轻摇晃。一切都那么熟悉，却又那么陌生。

{manName}站在客厅中央，西装笔挺，眉头微蹙。他看着你，像是在看一个闯入的陌生人。

"你是...？"

他的眼神迷茫，努力搜寻着记忆，却一无所获。更刺痛你的是，林婉从他身后走出，自然地挽住他的手臂。

"这是{girlName}，我的大学同学，"林婉柔声介绍，然后看向你，眼中闪过一丝警告，"{girlName}，你怎么突然来了？也不提前说一声。"

她刻意强调的"同学"二字，像刀子一样扎进你心里。你们曾经是最亲密的恋人，现在却被定义为"同学"。

{manName}礼貌地点点头："你好，抱歉我最近记性不太好。我们...以前很熟吗？"

你注意到，他说"很熟"的时候，眼神有一瞬间的恍惚，像是在努力抓住什么即将消散的碎片。`,
        choices: [
            { text: "冲上去抱住他，试图唤醒他的记忆", next: 'hug_attempt_phase1', effect: () => { gameState.memoryLevel += 5; }, type: 'safe' },
            { text: "冷静地观察林婉，寻找破绽", next: 'observe_phase1', effect: () => { gameState.suspicion += 10; } },
            { text: "温和地提醒他我们的关系", next: 'gentle_reminder_phase1', effect: () => { gameState.memoryLevel += 3; gameState.corruptionLevel += 5; } }
        ]
    },

    arrival_confront_phase1: {
        title: "正面对峙",
        text: `你径直走向林婉，目光如炬。

"我知道你在做什么。巫蛊术，记忆操控，对吧？林家的秘术，专门用来偷别人的爱人。"

林婉的表情瞬间僵硬，但很快恢复那副无辜的模样："你在说什么呀？{girlName}，你是不是压力太大了？要不要我帮你叫医生？"

{manName}困惑地看着你们："什么巫术？{girlName}，你最近是不是看了太多奇幻小说？"

你注意到{manName}的眼神有一瞬间的清明，像是在深水中挣扎。但林婉轻轻拉了拉他的衣袖，那清明立刻消散了。

"亲爱的，你先去休息，我来和{girlName}聊聊。"林婉柔声说，那个称呼让你血液凝固。

{manName}点点头，茫然地走向屋内。他最后看了你一眼，那眼神中有困惑，有陌生，还有一丝...连他自己都不理解的痛楚。

林婉转向你，笑容依旧甜美，但眼底已经结冰："聪明的女孩。但太晚了，巫术已经开始生效。再过几天，他就会彻底忘记你，而我，会成为他唯一的记忆。"

"你为什么要这样做？"你质问。

林婉的眼神闪烁了一下："因为...因为他本该是我的。你只是先遇到了他而已。"

她的声音里有一丝不易察觉的颤抖。`,
        choices: [
            { text: "威胁要报警并公开她的秘密", next: 'threaten_phase1', effect: () => { gameState.suspicion += 20; }, type: 'danger' },
            { text: "假装示弱，暗中寻找机会", next: 'feign_weakness_phase1', effect: () => { gameState.suspicion += 5; gameState.daysLeft -= 2; } },
            { text: "试图理解她的动机", next: 'understand_motivation_phase1', effect: () => { gameState.suspicion -= 5; gameState.corruptionLevel += 3; } }
        ]
    },

    demand_meeting_phase1: {
        title: "咫尺天涯",
        text: `"我要见他。现在。"你一字一句地说。

林婉似乎想拒绝，但卧室的门开了。{manName}走了出来，头发微湿，显然是刚洗过澡。他看到你，停下脚步。

"你是...？"

简单的两个字，却让你心如刀绞。曾经，他会在清晨用这两个字配合一个吻，慵懒而宠溺。现在，只剩下纯粹的疑惑。

"我是{girlName}，"你努力控制着颤抖的声音，"你的...朋友。我们认识三年了。"

"三年？"他皱眉，努力回想，"对不起，我完全不记得...等等，为什么我觉得你的声音很熟悉？你的样子，都很熟悉，就像...就像经常出现在梦里的影子..."

林婉急忙插话："{manName}，你最近太累了，记忆有些混乱。{girlName}只是普通朋友，你们不熟的。"

但{manName}没有移开视线。他看着你湿润的眼眶，下意识伸出手，似乎想擦去你的眼泪，却在半空中停住。

"我...我以前会帮你擦眼泪吗？"他问，声音里有一丝不确定的温柔。

林婉的脸色微微变了。`,
        choices: [
            { text: "握住他的手，讲述你们的过去", next: 'memory_lane_phase1', effect: () => { gameState.memoryLevel += 10; }, type: 'safe' },
            { text: "温和地提醒他我们的特殊关系", next: 'remind_relationship_phase1', effect: () => { gameState.memoryLevel += 5; gameState.corruptionLevel += 5; } }
        ]
    },

    confront_witch_phase1: {
        title: "撕破脸皮",
        text: `"不对劲！"你盯着林婉，声音因困惑和愤怒而颤抖，"你到底是谁？为什么要冒充我的身份？{manName}为什么会不记得我？还有你手上那个奇怪的手链..."

林婉的脸色瞬间阴沉下来。她看了看四周，确认没有被注意，才冷笑道："既然你都知道了，那我也不必装了。是的，我施了术，那又怎样？"

她抬起手腕，那条诡异的手链泛着微光："你以为时间还很多？告诉你，巫术已经开始生效。我每天都在给他喝安神茶，每天给他讲'我们的故事'，每天巩固巫术的效力..."

"你为什么要这样做？"你质问。

林婉的声音颤抖着，眼中既有渴望又有痛苦："第一次见到他时，我就知道他是我的真命天子。而你，你凭什么拥有他？就因为你先认识他？这不公平！

你知道吗？我从小就能感知别人的情绪，看到他们内心最深的渴望。我能感觉到他对你的爱有多深，那让我嫉妒得发狂。

但我也有我的苦衷...我家世代传承巫术，这是我们生存的方式。我母亲临终前告诉我，如果找不到真爱，就要用巫术为自己创造幸福。"

她的眼眶红了："我以为只要让他爱上我，我就能获得真正的幸福..."

你突然意识到，她也是一个可怜人。`,
        choices: [
            { text: "同情她，但坚持要救回Daddy", next: 'empathy_but_firm_phase1', effect: () => { gameState.suspicion -= 5; gameState.memoryLevel += 3; } },
            { text: "警告她这是错误的", next: 'warn_her_phase1', effect: () => { gameState.suspicion += 10; gameState.corruptionLevel += 5; }, type: 'danger' },
            { text: "试图说服她放弃", next: 'persuade_her_phase1', effect: () => { gameState.suspicion -= 10; gameState.corruptionLevel += 8; } }
        ]
    },

    hug_attempt_phase1: {
        title: "熟悉的温度",
        text: `你无视林婉的存在，径直扑进{manName}的怀里，紧紧抱住他的腰。

"Daddy，求求你，记得我...记得那个秋千，记得你教我做饭时被烫到的手指，记得我们在影音室看《蝴蝶效应》时你说过的话——你说如果能回到过去，你会在更早的时候找到我..."

你的身体在颤抖，眼泪浸湿了他的衬衫。你感觉到他的身体僵硬了，像是被电流击中。

"这些...这些画面..."他的声音沙哑，手悬在半空，然后缓缓落在你的背上，"《蝴蝶效应》...我记得那部电影...为什么我记得电影的情节，却不记得和你一起看？为什么我记得台词，却记不得你的脸？"

你抬起头，看见林婉站在一旁，脸色难看。她急忙插话："{manName}，别听她胡说，你最近只是太累了，记忆混乱..."

但{manName}没有推开你。他的心跳很快，那节奏你如此熟悉——那是你的Daddy在面对他的Little时，特有的宠溺与保护欲。他的手不自觉地抚摸着你的头发，就像过去无数次那样。

"别哭，"他低声说，声音里带着连他自己都惊讶的温柔，"告诉我，我是谁？我对你...意味着什么？"

林婉的手链微微发光，但{manName}似乎并没有完全被控制。`,
        choices: [
            { text: "讲述你们的美好回忆", next: 'memory_lane_phase1', effect: () => { gameState.memoryLevel += 15; }, type: 'safe' },
            { text: "展示你们之间的亲密证据", next: 'show_evidence_phase1', effect: () => { gameState.memoryLevel += 10; gameState.suspicion += 5; } }
        ]
    },

    observe_phase1: {
        title: "暗流涌动",
        text: `你压下情绪，仔细观察。

林婉的左手腕上戴着一个奇怪的手链，上面串着细小的骨头和符咒，在灯光下泛着诡异的光泽。那是巫蛊师的标志。

她靠近{manName}时，手链会发出微弱的红光。而{manName}的眼神也会随之变得更加迷茫，像是被抽走了灵魂。

你注意到厨房的桌子上放着一个茶杯，里面的茶水呈现出不自然的淡紫色，散发着淡淡的异香。那是给{manName}喝的"安神茶"——实则是巩固巫术的药剂。

必须想办法换掉那杯茶，或者找到解药。你也注意到，每当{manName}表现出困惑或试图回忆时，林婉就会紧张地摸一摸那个手链。

那个手链，可能是关键。

你还注意到，林婉虽然表现得很亲密，但{manName}偶尔会不自觉地拉开一点距离——他的本能还在抵抗。`,
        choices: [
            { text: "假装帮忙，趁机倒掉毒茶", next: 'poison_tea_phase1', effect: () => { gameState.antidoteProgress += 30; gameState.suspicion += 10; } },
            { text: "寻找机会夺取手链", next: 'snatch_bracelet_phase1', effect: () => { gameState.suspicion += 20; gameState.memoryLevel += 10; }, type: 'danger' },
            { text: "继续观察，收集更多信息", next: 'continue_observe_phase1', effect: () => { gameState.suspicion += 5; gameState.cluesFound.push('手链'); } }
        ]
    },

    gentle_reminder_phase1: {
        title: "模糊的记忆",
        text: `你深吸一口气，努力保持冷静。

"{manName}，我们是...很亲密的关系。"你说，"我是你的Little，你是我的Daddy。我们这样相处已经三年了。"

{manName}的眼睛睁大了。"Daddy？Little？"他重复着这些词汇，像是在品味它们的含义。

"等等..."他按住太阳穴，"这些词...我觉得很熟悉...就像...就像是我生命的一部分..."

林婉急忙打断："{manName}，别听她乱说。她只是你的普通朋友，你们没有任何特殊关系。"

但{manName}看着你的眼神变了。那种迷茫中多了一丝...渴望？

"不，"他缓缓说，"我觉得...我觉得她说的是真的。虽然我不记得，但我的心告诉我..."

他看向你，眼中有一丝挣扎："告诉我更多。告诉我，我们是怎么认识的。"

林婉的脸色变得很难看，她的手链开始发出更强烈的光芒。`,
        choices: [
            { text: "讲述你们相识的故事", next: 'memory_lane_phase1', effect: () => { gameState.memoryLevel += 12; }, type: 'safe' },
            { text: "带他去影音室，重温《蝴蝶效应》", next: 'movie_night_phase1', effect: () => { gameState.memoryLevel += 15; gameState.corruptionLevel += 3; } }
        ]
    },

    memory_lane_phase1: {
        title: "记忆的碎片",
        text: `你拉着{manName}的手，带他走进院子，来到秋千旁。

"记得吗？这个秋千是你亲手为我做的。你说，无论我长多大，在这里永远可以是你的宝宝。第一次坐上去的时候，我吓得尖叫，你就在后面推我，说'别怕，Daddy接着你'..."

你们坐在秋千上，你靠在他怀里，就像过去无数次那样。

"还有影音室，"你继续说，"你为我建了一个小小的影院，因为我说喜欢老电影的氛围感。我们最爱看《蝴蝶效应》，你说如果能回到过去，你会在更早的时候找到我，保护我，让我永远不需要经历那些伤痛..."

{manName}闭上眼睛，记忆的碎片在重组。他看见碎片般的画面——你蜷缩在他怀里看电影，你怕黑时他握着你手，你叫他Daddy时脸上幸福的表情...

"我记得..."他的声音颤抖，"紫色的油漆，因为你最喜欢薰衣草...我记得你怕打雷，每次雷雨夜都要开着小夜灯...我记得..."

他突然抱住头，痛苦地呻吟："为什么这些记忆这么清晰，却又这么遥远？像是被锁在玻璃后面，我能看见，却摸不着..."

林婉站在窗口，手中捏着符咒，眼神怨毒。你感到一阵轻微的头痛——她在对你施法，但效果还很弱。`,
        choices: [
            { text: "强忍头痛，继续唤醒Daddy", next: 'resist_pain_phase1', effect: () => { gameState.memoryLevel += 15; gameState.suspicion += 5; }, type: 'safe' },
            { text: "先躲避巫术攻击，改日再来", next: 'retreat_phase1', effect: () => { gameState.daysLeft -= 1; gameState.suspicion += 3; } }
        ]
    },

    show_evidence_phase1: {
        title: "证据",
        text: `你拉起袖子，露出手腕上的手链——那是{manName}在你生日时送给你的，上面刻着你们的名字缩写和相遇日期。

"这是你送给我的，"你说，"你说这是锁链，也是承诺。你说我是你的，你也是我的。"

你又从包里拿出一张照片——你们在小花园的合影，你坐在秋千上，他在你身后推，两个人都笑得像个孩子。

"这是上个月拍的，就在你出差前。你说，等玫瑰花开的时候，我们要一起修剪枝叶..."

{manName}接过照片，手指轻轻抚过画面。他的眼眶红了。

"我记得...我记得这个瞬间..."他的声音哽咽，"我记得我按下快门时，觉得自己是世界上最幸运的人...为什么...为什么会忘记？"

林婉在一旁焦急地说："{manName}，那些都是她编造的。不要相信她。"

但{manName}看着照片上的笑容，眼神逐渐清明："不...这不是编造的。我记得...我记得那天阳光很好，记得她的笑声，记得我说..."

他看向你，眼中有一丝泪光："我记得我说，我爱你。"`,
        choices: [
            { text: "告诉他这是巫术造成的", next: 'explain_magic_phase1', effect: () => { gameState.suspicion += 15; } },
            { text: "让他自己回忆", next: 'self_recall_phase1', effect: () => { gameState.memoryLevel += 15; } }
        ]
    },

    understand_motivation_phase1: {
        title: "理解",
        text: `你看着林婉，突然感到一丝同情。

"你母亲...她也是因为巫术去世的吗？"你轻声问。

林婉的身体僵住了。她的眼眶瞬间红了，但很快强装镇定："不关你的事。"

"我知道渴望被爱的感觉，"你说，"但用巫术得到的爱，不是真正的爱。"

林婉冷笑："你懂什么？你有他，你当然可以说风凉话。"

"但我是通过自己的努力赢得他的心的，"你说，"而不是通过操控他的记忆。"

林婉沉默了。你看到她眼中的挣扎——她知道你说得对，但她已经走得太远，无法回头。

"给我时间，"她最终说，"让我...让我考虑一下。"

这是一个小小的突破。你知道她不会轻易放弃，但至少，你让她开始思考了。`,
        choices: [
            { text: "给她时间，但要求见Daddy", next: 'negotiate_phase1', effect: () => { gameState.suspicion -= 10; gameState.daysLeft -= 2; gameState.cluesFound.push('理解'); gameState.witchMood = 'wary'; } },
            { text: "趁机要求她解除巫术", next: 'demand_release_phase1', effect: () => { gameState.suspicion += 5; gameState.corruptionLevel += 5; } }
        ]
    },

    // 第一阶段更多场景...
    threaten_phase1: {
        title: "危险的博弈",
        text: `"我知道你的秘密，"你压低声音，"林家祖传的巫蛊术，操控记忆，窃取情感。如果我把这些告诉{manName}，告诉警方，告诉所有人，你会有什么下场？"

林婉的笑容消失了。她的眼睛变得冰冷，像是蛇盯着猎物。

"你以为你很聪明？"她轻声说，"太晚了。巫术已经开始生效，再过几周，他就会彻底忘记你，而我，会成为他唯一的记忆。"

她抬起手，你感到一阵天旋地转。当你恢复意识时，你发现自己站在别墅外，大门紧锁。

你的口袋里多了一张纸条："三天后再来，我们好好谈谈。一个人来，否则他就永远醒不过来。"

你意识到，你低估了她的疯狂。但你也知道，她给你留了机会——这说明她还有顾虑。`,
        choices: [
            { text: "三天后独自赴约", next: 'negotiate_meeting_phase1', effect: () => { gameState.suspicion = 40; gameState.daysLeft -= 3; } },
            { text: "寻求外援，找懂行的人帮忙", next: 'seek_help_phase1', effect: () => { gameState.suspicion += 15; gameState.daysLeft -= 1; } }
        ]
    },

    feign_weakness_phase1: {
        title: "示弱",
        text: `你假装被吓到了，低下头："我...我明白了。我退出。祝你们幸福。"

你转身离开，但林婉没有看到你眼中的坚定。

接下来的几天，你表面上消失，实际上在暗中调查。你发现林婉每天傍晚都会给{manName}喝那种紫色的茶，而每次喝茶后，{manName}的眼神都会变得更加迷茫。

你还发现，林婉的巫术需要持续施法来维持。如果她离开{manName}超过一天，效果就会减弱。

这是一个重要的发现。你知道，只要能让林婉离开，就有机会唤醒{manName}。

你也注意到，{manName}偶尔会在林婉不在的时候，看着你们曾经的照片发呆——他的内心深处，还有你的影子。`,
        choices: [
            { text: "设法引开林婉", next: 'distract_witch_phase1', effect: () => { gameState.suspicion += 10; gameState.daysLeft -= 2; } },
            { text: "继续观察，等待机会", next: 'wait_opportunity_phase1', effect: () => { gameState.daysLeft -= 3; gameState.memoryLevel -= 5; } }
        ]
    },

    // 过渡到第二阶段的场景
    resist_pain_phase1: {
        title: "意志的对抗",
        text: `头痛欲裂，像是有人用锤子轻轻敲击你的太阳穴。

你看见林婉在窗口念咒，她的嘴唇快速蠕动，每一个音节都像针一样扎进你的大脑。她在试图让你忘记，让你放弃，让你离开。

但你不能。三年了，一千多个日夜的相守，那些温柔的管教，那些深夜的拥抱，那些"Good girl"的赞许——这些构成了你的整个世界。

"Daddy，"你咬紧牙关，声音颤抖但坚定，"看着我。不要看别的地方，只看着我。"

{manName}转过身，看到你苍白的脸色和额头的冷汗，他的本能压过了巫术的控制。那种保护欲，那种想要守护你的冲动，是刻在他灵魂深处的印记，比任何巫术都更强大。

"你怎么了？你在痛...为什么我会知道你在痛？为什么看到你痛，我的心会更痛？"

他伸出手，擦去你额头的汗水。那一瞬间，手链的红光剧烈闪烁，然后——变弱了。

"我想起来了，"他轻声说，眼神逐渐清明，"{girlName}...我的宝宝...我怎么会差点忘记你？"

林婉在屋内发出一声低呼——巫术被暂时打断了。

但这只是暂时的胜利。你知道，林婉会加强巫术，而你需要找到彻底破解的方法。`,
        choices: [
            { text: "告诉他真相", next: 'explain_magic_phase1', effect: () => { gameState.memoryLevel += 10; gameState.suspicion += 15; } },
            { text: "先让他休息，慢慢唤醒记忆", next: 'gentle_approach_phase1', effect: () => { gameState.memoryLevel += 5; gameState.daysLeft -= 1; } }
        ]
    },

    // 第一阶段结束，进入第二阶段
    explain_magic_phase1: {
        title: "不可思议的真相",
        text: `你将一切和盘托出——林婉的巫蛊术，记忆操控，以及你们真正的关系。

{manName}听着，表情从怀疑到震惊，再到某种奇怪的释然。

"所以...这就是为什么我总觉得忘掉了什么重要的人，"他低声说，"为什么我看到你哭，心会这么痛...为什么我觉得那个秋千，那个影音室，都缺了一个人..."

他抱住头："那些画面...紫色的油漆，小夜灯，蝴蝶效应...它们是真的？我们...我们是..."

"Daddy和Little，"你轻声提醒，"你是我的Daddy，我是你的宝宝。三年了。"

他看着你，眼神逐渐清明："我想...我想我记得。至少，我记得那种感觉。那种想要保护你，照顾你，管教你的感觉..."

林婉站在门口，脸色苍白。她的手链还在发光，但光芒已经不如之前强烈。

"你们..."她的声音颤抖，"你们真的这么相爱吗？"

你转向她："这不是爱不爱的问题。这是关于尊重，关于选择。你没有给他选择的权利。"

林婉的眼眶红了。她转身跑出了房间。

这是一个重要的突破。但你知道，这只是开始。林婉不会轻易放弃，而巫术的影响还需要时间来消除。`,
        choices: [
            { text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 10); } }
        ]
    },

    // 其他第一阶段场景的简化处理...
    self_recall_phase1: {
        title: "自发的记忆",
        text: `你握住他的手，没有说话，只是静静地看着他。

{manName}闭上眼睛，努力搜寻记忆的碎片。渐渐地，更多的画面浮现——你第一次叫他Daddy时的羞涩，你们在小厨房里做蛋糕时的面粉大战，你在他怀里看《蝴蝶效应》时睡着的侧脸...

"我想起来了，"他睁开眼睛，看着你，眼神完全清明，"全部都想起来了。{girlName}，我的宝宝...我怎么会...我怎么会差点忘记你？"

林婉在门外偷听，见势不妙想要逃跑。但{manName}已经恢复了理智，他拦住了她。

"林婉，"他的声音冷峻，"我不知道你对我做了什么，但我知道这是错的。请你离开。"

林婉看着你们紧握的双手，眼中闪过一丝复杂的情绪，然后转身离去。

但这只是暂时的胜利。你知道，林婉还会回来，而你需要找到彻底破解巫术的方法。`,
        choices: [
            { text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 15); } }
        ]
    },

    // 简化的第一阶段场景映射
    poison_tea_phase1: { title: "破釜沉舟", text: "你成功倒掉了毒茶，{manName}的眼神清明了一些。但这只是暂时的，你需要找到彻底破解的方法。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.antidoteProgress += 30; } }] },
    snatch_bracelet_phase1: { title: "夺取", text: "你试图夺取手链，但林婉反应很快。虽然没有成功，但你让她知道你不会轻易放弃。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.suspicion += 15; } }] },
    continue_observe_phase1: { title: "观察", text: "你收集了更多信息，发现林婉的巫术需要持续施法来维持。这是一个重要的发现。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.cluesFound.push('持续施法'); } }] },
    movie_night_phase1: { title: "蝴蝶效应", text: "你们一起看了《蝴蝶效应》，{manName}的记忆有所恢复，但林婉的巫术影响还在。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel += 10; } }] },
    retreat_phase1: { title: "撤退", text: "你决定暂时撤退，保存实力。但这给了林婉更多时间加强巫术。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel -= 5; gameState.corruptionLevel += 10; } }] },
    negotiate_phase1: { title: "谈判", text: "林婉同意让你见{manName}，但条件是你不能刺激他。你获得了宝贵的机会。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 2; gameState.suspicion -= 5; } }] },
    demand_release_phase1: { title: "要求", text: "林婉拒绝了你的要求，但你的坚持让她有所动摇。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.suspicion += 5; } }] },
    warn_her_phase1: { title: "警告", text: "你的警告让林婉更加警惕，但也让她知道你不会坐视不管。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.suspicion += 10; } }] },
    persuade_her_phase1: { title: "说服", text: "你的话语触动了林婉，她开始怀疑自己的行为。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.suspicion -= 5; gameState.corruptionLevel -= 5; } }] },
    empathy_but_firm_phase1: { title: "坚定", text: "你表达了对她的同情，但坚持要救回Daddy。这种态度让林婉有些意外。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel += 5; } }] },
    remind_relationship_phase1: { title: "提醒", text: "你提醒了{manName}你们的关系，他的记忆有所恢复，但林婉的巫术影响还在。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel += 8; } }] },
    sneak_in_phase1: { title: "潜入", text: "你潜入别墅，发现了一些关于巫术的重要线索。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.cluesFound.push('巫术笔记'); gameState.suspicion += 10; } }] },
    negotiate_meeting_phase1: { title: "谈判", text: "三天后，你再次来到别墅。林婉看起来比上次疲惫，巫术的反噬开始影响她了。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 3; gameState.witchMood = 'wary'; } }] },
    seek_help_phase1: { title: "外援", text: "你联系了玄学论坛上的老山道人，他给了你一些重要的建议。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.cluesFound.push('老山道人'); } }] },
    distract_witch_phase1: { title: "调虎离山", text: "你设法引开了林婉，获得了和{manName}独处的机会。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 2; gameState.memoryLevel += 10; } }] },
    wait_opportunity_phase1: { title: "等待", text: "你选择了等待，但这给了林婉更多时间加强巫术。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 3; gameState.memoryLevel -= 5; gameState.corruptionLevel += 10; } }] },
    gentle_approach_phase1: { title: "温柔", text: "你选择了温柔的方式，让{manName}慢慢恢复。这是一个漫长的过程。", choices: [{ text: "进入第二阶段", next: 'phase2_start', effect: () => { gameState.currentPhase = 2; gameState.daysLeft -= 1; gameState.memoryLevel += 8; } }] },

    // ==================== 第二阶段：侵蚀期（第8-14天） ====================
    phase2_start: {
        title: "第二阶段：记忆侵蚀",
        text: `一周过去了。

林婉的巫术比想象中更加顽固。虽然你成功阻止了最坏的情况，但{manName}的记忆仍在被缓慢侵蚀。

你注意到，他开始把一些事情记混——比如把你们一起看的电影记成和林婉看的，把你们一起去过的地方记成和林婉去的。

更让你担心的是，他开始对林婉产生莫名的关心。当林婉"不小心"切到手指时，他会紧张地帮她包扎；当林婉说冷时，他会脱下外套给她披上。

这些都是他曾经只对你做的事情。

林婉也变得更加大胆。她开始穿着你的衣服，用你最喜欢的香水，甚至学着你的说话方式。

她在试图取代你，不是通过暴力，而是通过一点一滴地替换你的存在。

今天是第{21 - gameState.daysLeft}天，你还有{gameState.daysLeft}天时间来阻止这一切。`,
        choices: [
            { text: "继续每天去别墅，争取和Daddy独处的时间", next: 'daily_visit_phase2', effect: () => { gameState.daysLeft -= 1; } },
            { text: "寻找破解巫术的方法", next: 'seek_cure_phase2', effect: () => { gameState.daysLeft -= 1; gameState.antidoteProgress += 20; } }
        ]
    },

    daily_visit_phase2: {
        title: "日常探望",
        text: `你每天都会去别墅，争取和{manName}独处的时间。

今天，你带了他最喜欢的提拉米苏——那是你们第一次约会时他为你买的甜点。

"这是...？"他看着蛋糕，眼神迷茫。

"你最喜欢的提拉米苏，"你说，"记得吗？我们第一次约会的时候，你说这个味道让你想起了童年。"

他接过蛋糕，尝了一口。他的眼睛亮了一下，但很快又暗淡下去。

"很好吃..."他说，"但我记得...我记得第一次吃这个，是林婉买给我的..."

你的心一沉。记忆嫁接已经开始生效——他正在把你们的回忆与林婉混淆。

"不，"你坚定地说，"是我们。三年前，在市中心的那家意大利餐厅。你穿着深蓝色衬衫，我穿着白色连衣裙。你说我笑起来像阳光。"

{manName}皱起眉头，努力回想。"我...我不确定...我的记忆很混乱..."

林婉从厨房走出来，手里端着两杯茶。"{manName}，该喝安神茶了。"

那杯茶呈现出不自然的淡紫色。`,
        choices: [
            { text: "设法阻止他喝那杯茶", next: 'stop_tea_phase2', effect: () => { gameState.antidoteProgress += 15; gameState.suspicion += 10; } },
            { text: "观察他的反应，寻找其他机会", next: 'observe_reaction_phase2', effect: () => { gameState.corruptionLevel += 5; gameState.suspicion += 5; } },
            { text: "带他去影音室，用《蝴蝶效应》唤醒记忆", next: 'movie_trigger_phase2', effect: () => { gameState.memoryLevel += 10; } }
        ]
    },

    seek_cure_phase2: {
        title: "寻找解药",
        text: `你联系了老山道人，他告诉你破解巫蛊术需要三样东西：

1. 施术者的血——用于破解咒语的核心
2. 受术者的泪——代表真实的情感
3. 一个记忆锚点——能够唤醒真实记忆的物品

"最重要的是，"老山道人说，"你必须让受术者自己意识到记忆被篡改。外力只能辅助，真正的破解必须来自内心。"

你回想起你们之间的点点滴滴——《蝴蝶效应》DVD、秋千、薰衣草香水、刻字手链...这些都是你们的记忆锚点。

你决定收集这些物品，同时寻找机会获取林婉的血和{manName}的泪。

这不是一件容易的事，但你有信心。毕竟，你们的爱是真实的，而巫术制造的虚假记忆，终究无法替代真正的感情。`,
        choices: [
            { text: "收集记忆锚点", next: 'collect_anchors_phase2', effect: () => { gameState.inventory.push('DVD'); gameState.inventory.push('照片'); gameState.daysLeft -= 1; } },
            { text: "设法获取林婉的血", next: 'get_blood_phase2', effect: () => { gameState.suspicion += 20; gameState.daysLeft -= 1; }, type: 'danger' },
            { text: "让Daddy流泪", next: 'get_tears_phase2', effect: () => { gameState.memoryLevel += 10; gameState.daysLeft -= 1; } }
        ]
    },

    stop_tea_phase2: {
        title: "阻止",
        text: `你"不小心"撞到了林婉，那杯紫色的茶水洒在了地毯上。

"啊，对不起！"你假装惊慌，"我太不小心了。"

林婉的眼神变得冰冷，但她不能在{manName}面前发作。"没关系，我再去倒一杯。"

当她离开后，你注意到{manName}的眼神似乎清明了一些。他看着你，眼中有一丝困惑。

"{girlName}..."他轻声说，"我觉得...我觉得有些事情不对劲。"

"什么事情？"你问。

"我...我不确定。但我觉得，我应该记得你。我应该记得我们之间的...一些事情。"

他抱住头："为什么我的记忆这么混乱？为什么有些事情，我记得是和她做的，但心里却觉得...应该是和你？"

这是一个重要的突破。巫术的效果在减弱。`,
        choices: [
            { text: "告诉他真相", next: 'reveal_truth_phase2', effect: () => { gameState.memoryLevel += 15; gameState.suspicion += 15; } },
            { text: "让他自己思考", next: 'let_him_think_phase2', effect: () => { gameState.memoryLevel += 10; gameState.struggleLevel += 10; } }
        ]
    },

    movie_trigger_phase2: {
        title: "蝴蝶效应",
        text: `你拉着{manName}去了影音室，播放了《蝴蝶效应》。

当电影播放到埃文试图通过日记回到过去的片段时，你感觉到{manName}的身体僵硬了。

"我记得..."他低声说，"我记得我们看过这部电影。很多次。"

"是的，"你说，"你每次都会说，如果能回到过去，你会在更早的时候找到我。"

他转向你，眼中有一丝泪光："我想起来了。我记得你的眼泪，记得你说那个结局太残忍...记得我抱着你，说永远不会让那种事情发生..."

他的手颤抖着抚摸你的脸："{girlName}...我的宝宝...我怎么会差点忘记你？"

林婉突然冲了进来，脸色苍白："{manName}，不要听她的！她在骗你！"

但{manName}看着林婉，眼神变得冷峻："不。她没有骗我。我记起来了。全部。"

林婉的手链剧烈发光，但这一次，{manName}没有被影响。`,
        choices: [
            { text: "保护Daddy，面对林婉", next: 'confront_witch_phase2', effect: () => { gameState.memoryLevel += 20; gameState.suspicion += 20; }, type: 'safe' },
            { text: "带Daddy离开这里", next: 'escape_phase2', effect: () => { gameState.daysLeft -= 2; gameState.memoryLevel += 10; } }
        ]
    },

    // 第二阶段更多场景...
    observe_reaction_phase2: {
        title: "观察",
        text: `你选择了观察。{manName}喝下了那杯茶，眼神变得更加迷茫。

"{girlName}..."他说，"我觉得...我觉得我们应该保持距离。林婉说...她说你对我有不好的影响。"

你的心一沉。林婉的巫术正在加深。

但你注意到，当他说这些话的时候，他的眼神有一丝挣扎——他并不完全相信。

这说明，他的内心深处还有抵抗。你需要找到方法，加强这种抵抗。`,
        choices: [
            { text: "继续寻找破解方法", next: 'seek_cure_phase2', effect: () => { gameState.daysLeft -= 1; gameState.antidoteProgress += 20; } },
            { text: "暂时撤退，等待机会", next: 'retreat_phase2', effect: () => { gameState.daysLeft -= 2; gameState.corruptionLevel += 10; } }
        ]
    },

    collect_anchors_phase2: {
        title: "收集锚点",
        text: `你收集了《蝴蝶效应》DVD、你们的合影、薰衣草香水，还有他送你的手链。

这些物品承载着你们共同的回忆，是唤醒真实记忆的关键。

老山道人告诉你："当受术者接触到这些锚点时，真实的记忆会被激活。但前提是，他的内心还有抵抗的意志。"

你看着这些物品，心中充满了希望。你们的爱是真实的，这些物品就是证明。`,
        choices: [
            { text: "用这些锚点唤醒Daddy", next: 'use_anchors_phase2', effect: () => { gameState.memoryLevel += 20; gameState.daysLeft -= 1; } },
            { text: "继续寻找其他方法", next: 'daily_visit_phase2', effect: () => { gameState.daysLeft -= 1; } }
        ]
    },

    get_blood_phase2: {
        title: "冒险",
        text: `你设法让林婉受了点小伤，获取了她的一滴血。

但这让她变得更加警惕。"你在做什么？"她盯着你的眼睛，"你知道了什么？"

你意识到，你的行动已经引起了她的怀疑。接下来必须更加小心。`,
        choices: [
            { text: "继续收集其他材料", next: 'collect_anchors_phase2', effect: () => { gameState.daysLeft -= 1; gameState.antidoteProgress += 20; } },
            { text: "加快行动", next: 'accelerate_phase2', effect: () => { gameState.daysLeft -= 2; gameState.suspicion += 15; }, type: 'danger' }
        ]
    },

    get_tears_phase2: {
        title: "泪水",
        text: `你讲述了一些你们之间的往事，讲到动情处，你自己先流下了眼泪。

{manName}看着你，眼中也闪过一丝泪光。

"为什么..."他低声说，"为什么看到你哭，我的心会这么痛？"

他伸出手，轻轻擦去你的眼泪。那一瞬间，你感觉到他的内心在挣扎——巫术的控制和真实的情感在交战。

"{girlName}..."他轻声说，"我觉得...我觉得我应该保护你。但我不知道为什么..."

这是一个重要的突破。真实的情感正在苏醒。`,
        choices: [
            { text: "继续唤醒他的记忆", next: 'use_anchors_phase2', effect: () => { gameState.memoryLevel += 15; gameState.daysLeft -= 1; } },
            { text: "让他自己思考", next: 'let_him_think_phase2', effect: () => { gameState.struggleLevel += 15; gameState.daysLeft -= 1; } }
        ]
    },

    reveal_truth_phase2: {
        title: "真相",
        text: `你将一切都告诉了{manName}——林婉的巫术，记忆操控，以及你们真正的关系。

他听着，表情从怀疑到震惊，再到某种奇怪的释然。

"所以...这就是为什么我总觉得忘掉了什么重要的人，"他低声说，"为什么我看到你哭，心会这么痛..."

他抱住头："那些画面...紫色的油漆，小夜灯，蝴蝶效应...它们是真的？"

"是的，"你说，"全部是真的。我们是真的。"

他看着你，眼神逐渐清明："我想...我想我记得。至少，我记得那种感觉。"

林婉冲了进来，但这一次，{manName}没有被她影响。`,
        choices: [
            { text: "面对林婉", next: 'confront_witch_phase2', effect: () => { gameState.memoryLevel += 15; gameState.suspicion += 20; } },
            { text: "带Daddy离开", next: 'escape_phase2', effect: () => { gameState.daysLeft -= 2; gameState.memoryLevel += 10; } }
        ]
    },

    let_him_think_phase2: {
        title: "思考",
        text: `你让{manName}自己思考。他坐在秋千上，看着远方，陷入了沉思。

几个小时后，他找到了你。

"{girlName}，"他说，"我想了很多。我的记忆很混乱，有些事情我记得是和她做的，但心里却觉得应该是和你。"

他看着你，眼神坚定："我不知道发生了什么，但我知道一件事——看到你难过，我的心会痛。这种感觉...不可能是假的。"

你哭了。这是真实的情感，比任何巫术都强大。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 1; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 15); } }
        ]
    },

    confront_witch_phase2: {
        title: "对峙",
        text: `{manName}转向林婉，眼神冷峻："我想起来了。全部。你对我做了什么，你对她做了什么...你好大的胆子。"

林婉的脸色瞬间惨白。她看着你们紧握的双手，眼中闪过一丝复杂的情绪。

"你们...你们真的这么相爱吗？"她的声音带着颤抖，"即使经历了这么多痛苦，你们还是要在一起？"

她突然哭了："为什么...为什么你们可以这么相爱，而我却..."

这一刻，她不再是可怕的反派，而是一个迷失的女孩。

但巫术还没有解除。你知道，最后的对决还在后面。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 1; gameState.witchMood = 'desperate'; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 10); } }
        ]
    },

    escape_phase2: {
        title: "逃离",
        text: `你带着{manName}离开了别墅。

虽然他的记忆还没有完全恢复，但他选择相信你。这是最重要的。

你们去了你们第一次约会的地方，重温了那些美好的回忆。每到一个地方，他的记忆就恢复一些。

"我想起来了，"他最后说，"全部都想起来了。{girlName}，我的宝宝...对不起，我差点失去你。"

但你知道，林婉不会就此罢休。最后的对决还在后面。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 2; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 15); } }
        ]
    },

    use_anchors_phase2: {
        title: "锚点",
        text: `你用收集到的记忆锚点唤醒了{manName}的真实记忆。

《蝴蝶效应》DVD让他想起了你们的电影之夜，薰衣草香水让他想起了你的味道，手链让他想起了他的承诺。

"我想起来了，"他说，眼神完全清明，"全部都想起来了。"

林婉的巫术开始崩溃。但她还没有放弃。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 1; gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 20); } }
        ]
    },

    retreat_phase2: {
        title: "撤退",
        text: `你选择了暂时撤退，但这给了林婉更多时间加强巫术。

当你再次来到别墅时，{manName}看你的眼神更加陌生了。

"{girlName}，"他说，"我觉得...我觉得我们应该保持距离。"

你知道，情况变得更加严峻了。但你不会放弃。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 2; gameState.memoryLevel -= 10; gameState.corruptionLevel += 15; } }
        ]
    },

    accelerate_phase2: {
        title: "加速",
        text: `你加快了行动，但这也引起了林婉的警觉。

她开始加强对{manName}的控制，你们之间的对抗变得更加激烈。

但你不后悔。时间紧迫，你必须采取行动。`,
        choices: [
            { text: "进入第三阶段", next: 'phase3_start', effect: () => { gameState.currentPhase = 3; gameState.daysLeft -= 2; gameState.suspicion += 20; gameState.memoryLevel += 5; } }
        ]
    },

    // ==================== 第三阶段：危机期（第15-21天） ====================
    phase3_start: {
        title: "第三阶段：最终对决",
        text: `最后一周了。

林婉的巫术已经到了最后阶段。她开始更加频繁地施法，手链几乎一直发着红光。

{manName}的状态起伏不定——有时候他能清楚地记得你，有时候又会把你当成陌生人。林婉正在加紧最后的控制。

今天，你发现林婉开始收拾行李。她计划带{manName}离开这里，去一个你永远找不到的地方。

"你们赢了，"她对你冷笑道，"但没关系。只要离开这里，我有的是时间让他彻底忘记你。"

你必须阻止她。这是最后的机会。

今天是第{21 - gameState.daysLeft}天，你还有{gameState.daysLeft}天时间。`,
        choices: [
            { text: "正面阻止她", next: 'final_confrontation', effect: () => { gameState.suspicion += 20; } },
            { text: "寻找最后的机会唤醒Daddy", next: 'final_awakening', effect: () => { gameState.memoryLevel += 10; } },
            { text: "使用解药", next: 'use_antidote', effect: () => { gameState.antidoteProgress >= 80 ? gameState.memoryLevel += 30 : gameState.antidoteProgress += 20; } }
        ]
    },

    final_confrontation: {
        title: "最终对峙",
        text: `你挡在门口，阻止林婉离开。

"你不能带他走，"你说，"这不是爱，这是控制。"

林婉的眼神变得疯狂："你懂什么？我为他付出了这么多，我每天都在施法，每天都在承受反噬的痛苦..."

她抬起手腕，手链发出刺目的红光："既然你不让开，那就别怪我不客气！"

她开始念诵咒语，你感到一阵剧烈的头痛。但这一次，{manName}站了出来。

"够了，"他说，声音坚定，"林婉，停下。"

林婉愣住了："{manName}...？"

"我不知道你对我做了什么，"他说，"但我知道，我的心告诉我，我应该保护她。"

他走到你身边，握住你的手："{girlName}，我的宝宝...我想起来了。全部。"

林婉的手链突然断裂，巫术开始崩溃。`,
        choices: [
            { text: "迎接结局", next: 'show_ending', effect: () => { gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 20); } }
        ]
    },

    final_awakening: {
        title: "最终觉醒",
        text: `你拉着{manName}来到秋千旁，就像你们第一次见面时那样。

"Daddy，"你说，"你还记得吗？这个秋千。你说，无论我长多大，在这里永远可以是你的宝宝。"

他看着秋千，眼神迷茫。然后，一滴眼泪从他眼角滑落。

"我记得..."他低声说，"我记得我第一次推你荡秋千的时候，你笑得那么开心...我记得你说，这是你最幸福的时刻..."

他转向你，眼中满是泪水："{girlName}...我的宝宝...我怎么会差点忘记你？"

你们紧紧拥抱在一起。真实的情感冲破了巫术的束缚。

林婉站在一旁，看着这一幕，手中的手链渐渐失去了光芒。`,
        choices: [
            { text: "迎接结局", next: 'show_ending', effect: () => { gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 15); } }
        ]
    },

    use_antidote: {
        title: "解药",
        text: () => gameState.antidoteProgress >= 80 ? 
        `你拿出准备好的解药，滴入{manName}的口中。

片刻后，他的眼神变得清明。他看着你，眼中满是爱意。

"{girlName}..."他说，"我想起来了。全部。"

林婉看着这一幕，知道自己已经输了。她的巫术被彻底破解。

"为什么..."她喃喃自语，"为什么你们的爱这么强大？"

你转向她："因为这是真实的。而你的巫术，只能制造虚假的记忆。"

林婉跌坐在地上，手链碎裂成粉末。` :
        `你还没有准备好解药。你需要更多时间来收集材料。

林婉冷笑着看着你："太晚了。"

她带着{manName}离开了。你追了出去，但他们已经消失在夜色中。

你知道，你必须尽快找到他们，否则一切都将太迟。`,
        choices: () => gameState.antidoteProgress >= 80 ? 
        [{ text: "迎接结局", next: 'show_ending', effect: () => { gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 20); } }] :
        [{ text: "追赶他们", next: 'chase_them', effect: () => { gameState.daysLeft -= 1; gameState.suspicion += 20; }, type: 'danger' }]
    },

    chase_them: {
        title: "追赶",
        text: `你追赶着林婉和{manName}。

最终，你们在别墅外的花园中相遇。林婉已经筋疲力尽——连续施法让她付出了巨大的代价。

"为什么..."她喘着气说，"为什么你就是不肯放弃？"

"因为我爱他，"你说，"真正的爱，是不会放弃的。"

{manName}看着你们，眼神挣扎。巫术的影响和真实的情感在他内心交战。

"Daddy，"你轻声说，"看着我。告诉我，你的心属于谁？"

他看着你，眼中的迷茫渐渐消散。

"属于你，"他说，"永远属于你。"

林婉的手链彻底碎裂。`,
        choices: [
            { text: "迎接结局", next: 'show_ending', effect: () => { gameState.memoryLevel = Math.min(100, gameState.memoryLevel + 15); } }
        ]
    },


    // ==================== 结局场景 ====================
    time_ran_out: {
        title: "结局：时光尽头",
        text: `最后期限的午夜钟声响起时，你知道一切都结束了。

林婉站在你面前，脸上带着胜利的微笑。她手中握着那条闪闪发光的手链，那是控制{manName}记忆的法器。

"时间到了，"她轻声说道，"现在，让我来告诉你真相。"

她开始念诵古老的咒语，每一个音节都像刀子一样割裂着你的意识。你感到记忆如潮水般退去——第一次见面时的紧张，他说"跪下"时的羞耻，秋千上的欢笑，影音室里的温馨...

一切都消失了。

当晨光透过窗帘洒进房间时，你睁开眼睛。床边站着一个陌生的男人，他温柔地看着你。

"早上好，亲爱的，"他说，"昨晚睡得好吗？"

你点点头，觉得这个名字很熟悉，但怎么也想不起来。

在城市的另一端，真正的你坐在宿舍里，泪水无声地滑落。你记得一切，但没人相信你的话。手机里还保存着那条未发送的消息：

"Daddy，我找到你了..."

但那又有什么意义呢？

时间是最残酷的巫术，它能抹去一切，包括爱。`,
        choices: [
            { text: "游戏结束", next: 'end', effect: () => {}, ending: 'time_ran_out' }
        ]
    },

    bad_ending_memory: {
        title: "结局：空白",
        text: `你醒来时，躺在宿舍的床上。

室友说你昏睡了三天。你感到头痛，像是失去了什么重要的东西，但想不起来是什么。

偶尔，你会在梦中听见一个温柔的声音叫你"宝宝"，会闻到薰衣草和旧书的味道，会感到一种被拥抱的安全感。但醒来时，只有泪湿的枕头和空虚的心。

你再也没有去过城郊的那栋别墅，虽然每次经过那条路，心都会莫名其妙地痛。

林婉和{manName}从此消失在你的生活中。你总觉得，那本该是你的幸福，但你已经想不起来为什么。

有些爱，一旦被遗忘，就再也找不回来了。

就像《蝴蝶效应》的某个结局，埃文选择从未出生，为了所有人的幸福。只是这一次，没有人记得曾经的爱。`,
        choices: [
            { text: "游戏结束", next: 'end', effect: () => {}, ending: 'bad_ending_memory' }
        ]
    },

    good_ending: {
        title: "结局：永恒",
        text: `三个月后，林婉因使用违禁药物和精神控制手段被判刑。她家族的巫术秘密也被曝光，再也不能害人。

{manName}的别墅重新成为了你们的避风港。他在秋千旁种满了薰衣草，在影音室新增了你们最爱的电影收藏——当然，《蝴蝶效应》放在了最显眼的位置。

每个周末，你们依然会一起做饭，一起看电影，一起在浴缸里泡澡直到水变凉。但现在，你们更加珍惜彼此。

"Daddy，"某个夜晚，你靠在他怀里问，"如果当时我没有坚持，我们真的会被分开吗？"

他吻了吻你的额头："不会的。因为即使记忆消失，灵魂也会记得。看，我最后还是回到了你身边，不是吗？而且，这次经历让我明白了一件事——"

"什么？"

"我永远不会再让你离开我的视线。无论去哪里，你都要跟着我。这是命令，宝宝。"

你笑着缩进他怀里："Yes, Daddy."

月光透过窗户洒进来，像是为你们的爱情加冕。有些羁绊，超越记忆，超越时间，超越一切世俗的诅咒。

那是属于Daddy和Little的，永恒的约定。`,
        choices: [
            { text: "完美结局", next: 'end', effect: () => {}, ending: 'good_ending' }
        ]
    },

    neutral_ending: {
        title: "结局：重建",
        text: `你成功阻止了林婉，但{manName}的记忆并没有完全恢复。那些美好的细节——你最喜欢的颜色，你们之间的私密玩笑，他为你做过的每一件小事——都变成了模糊的轮廓。

但你们决定重新开始。

这一次，{manName}会重新认识你，重新爱上你。虽然过程缓慢，但每一天都有新的惊喜。他会在清晨醒来时看着你，说"我好像以前也这样爱过你，而且这种爱，正在变得比以前更深。"

林婉消失了，据说去了一个偏远的小镇，巫术的反噬让她失去了施术的能力——这或许是她应得的惩罚。

偶尔你会收到匿名寄来的道歉信，看来她还记得自己做过错事。爱情可以重建，记忆可以创造新的。

在影音室里，你们重新看了一遍《蝴蝶效应》。这一次，你们选择了相信——即使改变过去会带来痛苦，但只要有爱，就有勇气面对一切。

这不是结束，而是新的开始。`,
        choices: [
            { text: "普通结局", next: 'end', effect: () => {}, ending: 'neutral_ending' }
        ]
    },

    true_love_ending: {
        title: "结局：真爱无敌",
        text: `林婉看着你们相拥的样子，终于崩溃了。

"为什么..."她跪在地上，泪水横流，"为什么你们的爱这么强大？为什么我用了这么多巫术，还是无法分开你们？"

你走向她，伸出手："因为真正的爱，不是占有，不是控制。真正的爱，是尊重，是信任，是即使忘记了一切，灵魂也会记得。"

林婉抬起头，看着你。她的眼中，疯狂渐渐消散，取而代之的是一种深深的疲惫和...解脱？

"我...我明白了，"她低声说，"我一直以为，只要让他爱上我，我就能得到幸福。但我错了。"

她摘下手链，将它交给你："这是解咒的方法。用你们的爱，可以彻底消除巫术的影响。"

她站起身，走向门外："我要离开了。去寻找...去寻找真正的爱。"

{manName}看着你，眼中满是爱意："{girlName}，我的宝宝...谢谢你，没有放弃我。"

你笑了："我永远不会放弃你，Daddy。"

一年后，林婉从远方寄来一封信。她说她找到了自己的幸福——一个普通人，用真心打动了她。她学会了，爱不是巫术，而是两颗心的相遇。

你们的故事，成为了传说——关于真爱如何战胜一切诅咒的传说。`,
        choices: [
            { text: "隐藏结局", next: 'end', effect: () => {}, ending: 'true_love_ending' }
        ]
    },

    sacrifice_ending: {
        title: "结局：牺牲",
        text: `按照老山道人的指导，你割破手指，将血滴入{manName}的眉心，然后亲吻他，将你们最美好的那段回忆——第一次实践的那个夜晚——作为祭品献上。

你感到那段记忆在消逝，那种初遇的悸动，那种第一次完全交付自己的信任与羞耻...都在消散。

但{manName}醒了。他看着你，眼神完全清明。

"{girlName}...我的宝宝..."他抚摸你的脸，"我记得一切，除了...我们第一次见面时的细节？"

你哭着笑了："没关系，我们可以创造新的回忆。"

林婉在咒术反噬中昏迷，手链碎裂。你们报警，她将被送往专门处理超自然案件的机构。

这不是完美的胜利，但你们保住了彼此。

有时候，爱意味着牺牲。但只要有彼此，失去的记忆也可以重新创造。`,
        choices: [
            { text: "牺牲结局", next: 'end', effect: () => {}, ending: 'sacrifice_ending' }
        ]
    },

    redemption_ending: {
        title: "结局：救赎",
        text: `你没有选择对抗，而是选择了理解。

你走向林婉，轻轻抱住她。她僵住了，然后在你怀里颤抖起来。

"我知道你的痛苦，"你说，"我知道渴望被爱却得不到的感觉。但用巫术得到的爱，不会让你幸福。"

林婉哭了，像个孩子："我...我不知道该怎么办...我已经走得太远了..."

"还不晚，"你说，"你可以选择停止。选择相信，真正的爱会来的，只是需要时间和耐心。"

{manName}也走了过来："林婉，我不知道你经历了什么，但我知道，伤害别人不会让你的痛苦消失。"

林婉看着他们，眼中的疯狂渐渐消散。她摘下手链，将它摔在地上。

"我...我放弃，"她说，"我解除巫术。"

随着手链的碎裂，{manName}的记忆如潮水般涌回。但这一次，没有痛苦，只有解脱。

三个月后，林婉成为了你们的朋友。她正在学习用正常的方式去爱，去被爱。

"谢谢你们，"她说，"谢谢你们让我明白，真正的爱是什么。"

有时候，最大的胜利不是战胜敌人，而是感化敌人。`,
        choices: [
            { text: "救赎结局", next: 'end', effect: () => {}, ending: 'redemption_ending' }
        ]
    },

    end: {
        title: "游戏结束",
        text: `感谢游玩《记忆回廊》。

在这个故事中，你经历了：
- {21 - gameState.daysLeft} 天的挣扎
- 记忆完整度: {gameState.memoryLevel}%
- 收集线索: {gameState.cluesFound.length} 条

真爱可以战胜一切，包括巫术。`,
        choices: []
    }
};

// 结局判定函数
function getEndingSceneId() {
    // 隐藏结局：感化林婉（需要特定条件）
    if (gameState.memoryLevel >= 80 && gameState.witchMood === 'desperate' && gameState.suspicion < 30) {
        return 'true_love_ending';
    }
    
    // 救赎结局：选择理解林婉
    if (gameState.memoryLevel >= 70 && gameState.cluesFound.includes('理解')) {
        return 'redemption_ending';
    }
    
    // 牺牲结局：通过老山道人线索，且记忆恢复不充分
    if (gameState.cluesFound.includes('老山道人') && gameState.antidoteProgress >= 60 && gameState.memoryLevel < 65) {
        return 'sacrifice_ending';
    }
    
    // 好结局：记忆值较高
    if (gameState.memoryLevel >= 80) {
        return 'good_ending';
    }
    
    // 普通结局：记忆值中等
    if (gameState.memoryLevel >= 55) {
        return 'neutral_ending';
    }
    
    // 坏结局：记忆值<50
    return 'bad_ending_memory';
}

// 显示结局
function showEnding(endingId) {
    const endingScenes = {
        'good_ending': scenes.good_ending,
        'neutral_ending': scenes.neutral_ending,
        'bad_ending_memory': scenes.bad_ending_memory,
        'time_ran_out': scenes.time_ran_out,
        'true_love_ending': scenes.true_love_ending,
        'sacrifice_ending': scenes.sacrifice_ending,
        'redemption_ending': scenes.redemption_ending
    };
    
    const ending = endingScenes[endingId] || scenes.neutral_ending;
    
    // 隐藏游戏界面，显示结局界面
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('endingScreen').classList.add('active');
    
    // 设置结局内容
    document.getElementById('endingTitle').textContent = ending.title;
    
    let text = ending.text.replace(/{girlName}/g, gameState.girlName)
                          .replace(/{manName}/g, gameState.manName)
                          .replace(/{21 - gameState.daysLeft}/g, 21 - gameState.daysLeft)
                          .replace(/{gameState.memoryLevel}/g, gameState.memoryLevel)
                          .replace(/{gameState.cluesFound.length}/g, gameState.cluesFound.length);
    
    document.getElementById('endingText').innerHTML = text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

// 核心函数
function startGame() {
    document.getElementById('introScreen').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('introScreen').style.display = 'none';
        document.getElementById('namingScreen').classList.add('active');
    }, 1000);
}

function confirmNames() {
    const girlName = document.getElementById('girlName').value.trim();
    const manName = document.getElementById('manName').value.trim();

    if (!girlName || !manName) {
        alert('请输入两个角色的名字');
        return;
    }

    gameState.girlName = girlName;
    gameState.manName = manName;

    document.getElementById('namingScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    loadScene('prologue');
}

function loadScene(sceneId) {
    // 时间耗尽优先检查
    if (gameState.daysLeft <= 0 && sceneId !== 'time_ran_out' && sceneId !== 'end') {
        showEnding('time_ran_out');
        return;
    }
    
    // 处理直接显示结局的场景
    if (sceneId === 'show_ending') {
        const endingSceneId = getEndingSceneId();
        showEnding(endingSceneId);
        return;
    }
    
    const scene = scenes[sceneId];
    if (!scene) {
        console.error('场景不存在:', sceneId);
        alert('游戏出现错误，场景丢失: ' + sceneId);
        return;
    }

    gameState.currentScene = sceneId;

    // 更新UI
    document.getElementById('sceneTitle').textContent = scene.title;
    
    // 动态场景支持：允许 text/choices 使用函数按当前状态实时生成
    const rawText = typeof scene.text === 'function' ? scene.text() : scene.text;
    const rawChoices = typeof scene.choices === 'function' ? scene.choices() : scene.choices;

    // 替换文本中的变量
    const dayPassed = 21 - gameState.daysLeft;
    let text = rawText.replace(/{girlName}/g, gameState.girlName)
                        .replace(/{manName}/g, gameState.manName)
                        .replace(/{daysLeft}/g, gameState.daysLeft)
                        .replace(/{memoryLevel}/g, gameState.memoryLevel)
                        .replace(/{suspicion}/g, gameState.suspicion)
                        .replace(/{corruptionLevel}/g, gameState.corruptionLevel)
                        .replace(/{21 - gameState.daysLeft}/g, dayPassed)
                        .replace(/{gameState.memoryLevel}/g, gameState.memoryLevel)
                        .replace(/{gameState.cluesFound.length}/g, gameState.cluesFound.length);
    
    // 逐句呈现效果
    const storyContainer = document.getElementById('storyText');
    storyContainer.innerHTML = text
        .split('\n\n')
        .filter(p => p.trim())
        .map((p, index) => `<p class="story-line" style="--i:${index}">${p.replace(/\n/g, '<br>')}</p>`)
        .join('');

    // 生成选项
    const choicesContainer = document.getElementById('choicesContainer');
    choicesContainer.innerHTML = '';

    if (rawChoices && rawChoices.length > 0) {
        rawChoices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            if (choice.type === 'danger') btn.classList.add('danger');
            if (choice.type === 'safe') btn.classList.add('safe');
            // 替换选项文本中的变量
            let choiceText = choice.text.replace(/{girlName}/g, gameState.girlName)
                                        .replace(/{manName}/g, gameState.manName);
            btn.textContent = choiceText;
            btn.onclick = () => makeChoice(choice);
            choicesContainer.appendChild(btn);
        });
    } else if (sceneId === 'end' || scene.ending) {
        // 游戏结束，显示重新开始按钮
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = '重新开始';
        btn.onclick = () => location.reload();
        choicesContainer.appendChild(btn);
    }

    // 更新状态条
    updateStatusBar();

    // 检查时间相关特殊事件
    checkTimeEvents();

    // 检查特殊效果
    if (sceneId.includes('memory') && gameState.memoryLevel < 50) {
        document.getElementById('memoryFlash').classList.add('active');
        setTimeout(() => {
            document.getElementById('memoryFlash').classList.remove('active');
        }, 1000);
    }

    if (sceneId.includes('witch') || sceneId.includes('magic') || sceneId.includes('ritual') || sceneId.includes('confront')) {
        document.getElementById('magicOverlay').classList.add('active');
    } else {
        document.getElementById('magicOverlay').classList.remove('active');
    }

    // 蝴蝶特效 - 只在游戏界面触发
    if (sceneId === 'movie_night_phase1' || sceneId === 'movie_trigger_phase2' || sceneId === 'final_awakening') {
        createButterfly();
        setTimeout(createButterfly, 1000);
        setTimeout(createButterfly, 2000);
    }
}

function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.style.left = Math.random() * window.innerWidth + 'px';
    butterfly.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(butterfly);
    setTimeout(() => butterfly.remove(), 4000);
}

function makeChoice(choice) {
    // 应用效果
    if (choice.effect) {
        choice.effect();
        
        // 确保数值在合理范围
        gameState.memoryLevel = Math.max(0, Math.min(100, gameState.memoryLevel));
        gameState.suspicion = Math.max(0, Math.min(100, gameState.suspicion));
        gameState.corruptionLevel = Math.max(0, Math.min(100, gameState.corruptionLevel));
        gameState.struggleLevel = Math.max(0, Math.min(100, gameState.struggleLevel));
        gameState.daysLeft = Math.max(0, gameState.daysLeft);
    }

    // 检查是否进入结局
    if (choice.ending) {
        showEnding(choice.ending);
        return;
    }

    // 更新状态栏显示
    updateStatusBar();
    
    // 加载下一个场景
    loadScene(choice.next);
}

function updateStatusBar() {
    // 更新记忆条
    const memoryBar = document.getElementById('memoryBar');
    const memoryPercent = document.getElementById('memoryPercent');
    if (memoryBar && memoryPercent) {
        memoryBar.style.width = gameState.memoryLevel + '%';
        memoryPercent.textContent = gameState.memoryLevel + '%';
        
        // 根据记忆值改变颜色
        if (gameState.memoryLevel >= 70) {
            memoryBar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
        } else if (gameState.memoryLevel >= 40) {
            memoryBar.style.background = 'linear-gradient(90deg, #ffa502, #ffc048)';
        } else {
            memoryBar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
        }
    }
    
    // 更新怀疑度文本
    const suspicionText = document.getElementById('suspicionText');
    if (suspicionText) {
        let suspicionLevel = '微弱';
        if (gameState.suspicion >= 30) suspicionLevel = '轻微';
        if (gameState.suspicion >= 50) suspicionLevel = '明显';
        if (gameState.suspicion >= 70) suspicionLevel = '严重';
        if (gameState.suspicion >= 90) suspicionLevel = '极度危险';
        suspicionText.textContent = `林婉警惕度：${suspicionLevel}`;
    }
    
    // 更新时间显示
    const timeDisplay = document.getElementById('timeDisplay');
    if (timeDisplay) {
        const dayPassed = 21 - gameState.daysLeft;
        const phase = gameState.currentPhase;
        let phaseName = '';
        if (phase === 1) phaseName = '潜伏期';
        if (phase === 2) phaseName = '侵蚀期';
        if (phase === 3) phaseName = '危机期';
        
        timeDisplay.innerHTML = `第${dayPassed}天 · ${phaseName} · 剩余${gameState.daysLeft}天`;
        
        // 根据剩余时间改变颜色
        if (gameState.daysLeft <= 3) {
            timeDisplay.style.color = '#ff4757';
        } else if (gameState.daysLeft <= 7) {
            timeDisplay.style.color = '#ffa502';
        } else {
            timeDisplay.style.color = '#2ed573';
        }
    }
}

function checkTimeEvents() {
    // 关键节点提醒
    const dayPassed = 21 - gameState.daysLeft;
    
    if (dayPassed === 7 && !gameState.triggeredEvents.includes('phase1_end')) {
        showMessage("⚠️ 第一阶段结束！林婉的巫术正在加深，需要更加小心！");
        gameState.triggeredEvents.push('phase1_end');
    }
    
    if (dayPassed === 14 && !gameState.triggeredEvents.includes('phase2_end')) {
        showMessage("⚠️ 第二阶段结束！最后一周，这是最后的机会！");
        gameState.triggeredEvents.push('phase2_end');
    }
    
    if (gameState.daysLeft === 3 && !gameState.triggeredEvents.includes('final_warning')) {
        showMessage("⚠️ 最后三天！必须在时限内打破巫术！");
        gameState.triggeredEvents.push('final_warning');
    }
    
    if (gameState.daysLeft === 1 && !gameState.triggeredEvents.includes('last_day')) {
        showMessage("⚠️ 最后一天！这是最后的机会！");
        gameState.triggeredEvents.push('last_day');
    }
}

function showMessage(message) {
    // 创建消息提示
    const msgDiv = document.createElement('div');
    msgDiv.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 71, 87, 0.9);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-size: 1.1em;
        z-index: 1000;
        animation: fadeInUp 0.5s ease;
        text-align: center;
        max-width: 80%;
    `;
    msgDiv.textContent = message;
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.style.opacity = '0';
        msgDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => msgDiv.remove(), 500);
    }, 3000);
}

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
});
