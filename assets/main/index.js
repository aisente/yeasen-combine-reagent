System.register("chunks:///_virtual/BrandVisual.ts", ['cc'], function (exports) {
  var cclegacy, Node, Layers, UITransform, Sprite, resources, SpriteFrame, isValid, Rect, Size, Vec2, Graphics, Color, Label, LabelOutline, TTFFont;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      isValid = module.isValid;
      Rect = module.Rect;
      Size = module.Size;
      Vec2 = module.Vec2;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      LabelOutline = module.LabelOutline;
      TTFFont = module.TTFFont;
    }],
    execute: function () {
      exports({
        addBrandHeader: addBrandHeader,
        addBrandImage: addBrandImage,
        addBrandMotif: addBrandMotif,
        styleGameTitle: styleGameTitle
      });
      cclegacy._RF.push({}, "936cdKgSvZHyq9ncwUETC+7", "BrandVisual", undefined);
      var productCrops = [[.08, .24, .56, .58], [.32, .17, .36, .66], [.36, .035, .28, .93], [.36, .035, .28, .93], [.27, .10, .43, .77], [.16, .035, .68, .93], [.02, .16, .96, .68], [.17, .045, .70, .91], [.11, .10, .78, .73], [0, 0, 1, 1], [0, 0, 1, 1]];
      var productFrames = new Map();

      /** Original company artwork, loaded through Cocos resources for Web and WeChat. */
      function addBrandImage(parent, name, asset, x, y, width, height) {
        var node = new Node(name);
        node.layer = Layers.Enum.UI_2D;
        node.parent = parent;
        node.setPosition(x, y);
        var transform = node.addComponent(UITransform);
        transform.setContentSize(width, height);
        var sprite = node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        resources.load(asset + "/spriteFrame", SpriteFrame, function (error, frame) {
          if (!isValid(node, true)) return;
          if (error) {
            console.warn("Brand image unavailable: " + asset, error);
            return;
          }
          var display = frame;
          var level = /^products\/level-(\d+)$/.exec(asset);
          if (level || asset === 'brand/yeasen-logo') {
            var cached = productFrames.get(asset);
            if (cached) display = cached;else {
              // Logo is unchanged; trim only its surrounding white canvas in the display frame.
              // Cocos already trims the logo's transparent margin; use its complete rect.
              var crop = level ? productCrops[Number(level[1]) - 1] : [0, 0, 1, 1];
              if (crop) {
                var source = frame.rect;
                display = new SpriteFrame();
                // Cropped frames share source textures; retain their original UVs.
                display.packable = false;
                display.texture = frame.texture;
                display.rect = new Rect(source.x + source.width * crop[0], source.y + source.height * crop[1], source.width * crop[2], source.height * crop[3]);
                display.originalSize = new Size(display.rect.width, display.rect.height);
                display.offset = new Vec2(0, 0);
                productFrames.set(asset, display);
              }
            }
          }
          sprite.spriteFrame = display;
          var original = display.originalSize;
          var scale = Math.min(width / original.width, height / original.height);
          transform.setContentSize(original.width * scale, original.height * scale);
        });
        return node;
      }
      function addBrandMotif(parent, x, y, size) {
        return addBrandImage(parent, 'BrandMotif', 'brand/brand-motif', x, y, size, size);
      }

      /** Shared logo and campaign lockup for home and gameplay. */
      function addBrandHeader(parent, y) {
        var header = new Node('BrandHeader');
        header.layer = Layers.Enum.UI_2D;
        header.parent = parent;
        header.setPosition(0, y);
        header.addComponent(UITransform).setContentSize(600, 72);
        var plate = header.addComponent(Graphics);
        plate.fillColor = new Color('#FFFFFF');
        plate.roundRect(-300, -36, 600, 72, 18);
        plate.fill();
        addBrandImage(header, 'YeasenLogo', 'brand/yeasen-logo', -96, 0, 340, 54);
        var badge = new Node('CampaignBadge');
        badge.layer = Layers.Enum.UI_2D;
        badge.parent = header;
        badge.setPosition(207, 0);
        badge.addComponent(UITransform).setContentSize(150, 44);
        var g = badge.addComponent(Graphics);
        g.fillColor = new Color('#FFF0D8');
        g.roundRect(-75, -22, 150, 44, 12);
        g.fill();
        var campaignText = new Node('CampaignText');
        campaignText.layer = Layers.Enum.UI_2D;
        campaignText.parent = badge;
        campaignText.addComponent(UITransform).setContentSize(150, 44);
        var label = campaignText.addComponent(Label);
        label.string = '百日冲刺';
        label.fontSize = 25;
        label.lineHeight = 32;
        label.isBold = true;
        label.color = new Color('#003F75');
        return header;
      }

      /** Five-glyph local font keeps the title consistent on Web and WeChat. */
      function styleGameTitle(label) {
        label.isBold = true;
        label.color = new Color('#003F75');
        var outline = label.node.addComponent(LabelOutline);
        outline.color = new Color('#FCD68C');
        outline.width = 2;
        resources.load('fonts/reagent-title', TTFFont, function (error, font) {
          if (!isValid(label, true)) return;
          if (error) {
            console.warn('Title font unavailable', error);
            return;
          }
          label.font = font;
          label.useSystemFont = false;
          label.isBold = false;
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DropController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, input, Input, UITransform, Vec3, EventMouse, Component, GameConfig;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      EventMouse = module.EventMouse;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "4f370AcG35BTKNSsWqrsYpF", "DropController", undefined);
      var ccclass = _decorator.ccclass;

      /** 只处理输入和投放节奏；物品创建与回收由外部提供。 */
      var DropController = exports('DropController', (_dec = ccclass('DropController'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DropController, _Component);
        function DropController() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.current = null;
          _this.nextLevel = 1;
          _this.createReagent = null;
          _this.onPreview = null;
          _this.cooldown = 0;
          _this.aimX = 0;
          _this.gesture = null;
          _this.suppressMouseUntil = 0;
          _this.running = false;
          return _this;
        }
        var _proto = DropController.prototype;
        _proto.initialize = function initialize(create, onPreview) {
          this.createReagent = create;
          this.onPreview = onPreview;
          this.restart();
        };
        _proto.restart = function restart() {
          this.gesture = null;
          this.cooldown = 0;
          this.current = null;
          this.aimX = 0;
          this.running = true;
          this.nextLevel = this.randomLevel();
          this.spawn();
        };
        _proto.stop = function stop() {
          this.running = false;
          this.current = null;
          this.gesture = null;
          this.cooldown = 0;
        };
        _proto.onEnable = function onEnable() {
          input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.on(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
          input.on(Input.EventType.MOUSE_UP, this.mouseUp, this);
          input.on(Input.EventType.TOUCH_START, this.touchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
          input.on(Input.EventType.TOUCH_END, this.touchEnd, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
        };
        _proto.onDisable = function onDisable() {
          input.off(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          input.off(Input.EventType.MOUSE_DOWN, this.mouseDown, this);
          input.off(Input.EventType.MOUSE_UP, this.mouseUp, this);
          input.off(Input.EventType.TOUCH_START, this.touchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
          input.off(Input.EventType.TOUCH_END, this.touchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.touchCancel, this);
          this.gesture = null;
        };
        _proto.update = function update(dt) {
          if (!this.running || this.current || !this.createReagent) return;
          this.cooldown = Math.max(0, this.cooldown - dt);
          if (this.cooldown === 0) this.spawn();
        };
        _proto.spawn = function spawn() {
          var _this$onPreview;
          if (!this.createReagent) return;
          this.current = this.createReagent(this.nextLevel);
          this.nextLevel = this.randomLevel();
          (_this$onPreview = this.onPreview) == null || _this$onPreview.call(this, this.nextLevel);
          this.aim(this.aimX);
        };
        _proto.release = function release() {
          if (!this.running || !this.current) return;
          this.current.drop();
          this.current = null;
          this.cooldown = GameConfig.dropCooldown;
        };
        _proto.local = function local(point) {
          // 输入的 UI 坐标转为 Canvas 局部坐标，避免分辨率变化后偏移。
          return this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(point.x, point.y));
        };
        _proto.inside = function inside(p) {
          return Math.abs(p.x) <= GameConfig.arenaWidth / 2 && p.y >= GameConfig.floorY && p.y <= GameConfig.wallTop;
        };
        _proto.aim = function aim(x) {
          var _this$current$config$, _this$current, _this$current2;
          var radius = (_this$current$config$ = (_this$current = this.current) == null ? void 0 : _this$current.config.radius) != null ? _this$current$config$ : 0;
          var edge = GameConfig.arenaWidth / 2 - radius - GameConfig.wallMargin;
          this.aimX = Math.max(-edge, Math.min(edge, x));
          (_this$current2 = this.current) == null || _this$current2.node.setPosition(this.aimX, GameConfig.spawnY);
        };
        _proto.mouseMove = function mouseMove(event) {
          if (Date.now() < this.suppressMouseUntil || !this.running) return;
          var p = this.local(event.getUILocation());
          if (this.inside(p) || this.gesture === 'mouse') this.aim(p.x);
        };
        _proto.mouseDown = function mouseDown(event) {
          if (event.getButton() !== EventMouse.BUTTON_LEFT || Date.now() < this.suppressMouseUntil) return;
          var p = this.local(event.getUILocation());
          if (!this.running || !this.current || this.gesture !== null || !this.inside(p)) return;
          this.gesture = 'mouse';
          this.aim(p.x);
        };
        _proto.mouseUp = function mouseUp(event) {
          if (event.getButton() !== EventMouse.BUTTON_LEFT || this.gesture !== 'mouse') return;
          this.gesture = null;
          var p = this.local(event.getUILocation());
          if (this.inside(p)) {
            this.aim(p.x);
            this.release();
          }
        };
        _proto.touchStart = function touchStart(event) {
          this.suppressMouseUntil = Date.now() + 500;
          var p = this.local(event.getUILocation());
          if (!this.running || !this.current || this.gesture !== null || !this.inside(p)) return;
          this.gesture = event.getID();
          this.aim(p.x);
        };
        _proto.touchMove = function touchMove(event) {
          if (this.gesture === event.getID()) this.aim(this.local(event.getUILocation()).x);
        };
        _proto.touchEnd = function touchEnd(event) {
          this.suppressMouseUntil = Date.now() + 500;
          if (this.gesture !== event.getID()) return;
          this.gesture = null;
          var p = this.local(event.getUILocation());
          if (this.inside(p)) {
            this.aim(p.x);
            this.release();
          }
        };
        _proto.touchCancel = function touchCancel(event) {
          if (this.gesture === event.getID()) this.gesture = null;
        };
        _proto.randomLevel = function randomLevel() {
          var total = GameConfig.spawnWeights.reduce(function (sum, item) {
            return sum + item.weight;
          }, 0);
          var roll = Math.random() * total;
          for (var _iterator = _createForOfIteratorHelperLoose(GameConfig.spawnWeights), _step; !(_step = _iterator()).done;) {
            var item = _step.value;
            roll -= item.weight;
            if (roll < 0) return item.level;
          }
          return GameConfig.spawnWeights[GameConfig.spawnWeights.length - 1].level;
        };
        return DropController;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameConfig.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('getReagentConfig', getReagentConfig);
      cclegacy._RF.push({}, "81656O4pC9Hg6WNrOi/mb1w", "GameConfig", undefined);
      var reagentDefinitions = [['PCR管', 30, '#DDF5FF'], ['EP管', 37, '#CDEEFF'], ['试剂管', 45, '#BCEEEB'], ['扩增酶', 54, '#A8E4DD'], ['连接酶', 64, '#91DCD5'], ['逆转录酶', 75, '#79D1CD'], ['建库模块', 87, '#63C5C4'], ['逆转录模块', 101, '#50B7B6'], ['建库试剂盒', 116, '#4AA9AE'], ['自动化建库工作站', 132, '#4D9DB1'], ['完整解决方案', 150, '#F3B36C']];
      var REAGENT_CONFIGS = exports('REAGENT_CONFIGS', reagentDefinitions.map(function (_ref, index) {
        var name = _ref[0],
          radius = _ref[1],
          placeholderColor = _ref[2];
        var level = index + 1;
        var score = Math.pow(2, index);
        return {
          level: level,
          name: name,
          radius: radius,
          size: radius * 2,
          score: score,
          mergeScore: score,
          placeholderColor: placeholderColor,
          mass: Math.pow(radius / 30, 2),
          restitution: 0.12,
          friction: 0.45,
          spriteFrame: null
        };
      }));
      function getReagentConfig(level) {
        if (!Number.isInteger(level) || level < 1 || level > REAGENT_CONFIGS.length) {
          throw new RangeError("\u65E0\u6548\u8BD5\u5242\u7B49\u7EA7\uFF1A" + level);
        }
        return REAGENT_CONFIGS[level - 1];
      }

      /** 布局和手感参数集中管理。 */
      var GameConfig = exports('GameConfig', {
        width: 750,
        height: 1334,
        gravity: -980,
        arenaWidth: 630,
        floorY: -460,
        wallTop: 340,
        wallThickness: 20,
        spawnY: 280,
        dropCooldown: 0.55,
        wallMargin: 2,
        maxLevel: 11,
        terminalContactCooldown: 4,
        warningY: 220,
        overflowSeconds: 3,
        dropGraceSeconds: 1,
        fallingVelocityThreshold: -0.5,
        poolMaxPerLevel: 8,
        milestones: [{
          score: 500,
          text: '首单拿下！'
        }, {
          score: 1000,
          text: '状态火热！'
        }, {
          score: 2000,
          text: '重点客户突破！'
        }, {
          score: 5000,
          text: '百日目标正在靠近！'
        }, {
          score: 10000,
          text: '冲刺进行时！'
        }, {
          score: 20000,
          text: '百日冲刺，全力拿下！'
        }],
        spawnWeights: [{
          level: 1,
          weight: 30
        }, {
          level: 2,
          weight: 25
        }, {
          level: 3,
          weight: 20
        }, {
          level: 4,
          weight: 15
        }, {
          level: 5,
          weight: 10
        }],
        physics: {
          linearDamping: 0.15,
          angularDamping: 0.4,
          pixelsPerMeter: 32
        },
        text: {
          brand: '翌圣生物 · 百日冲刺',
          title: '合成大试剂',
          subtitle: '从一支 PCR 管，开启百日冲刺',
          homeSubtitle: '百日同行，把努力汇成突破',
          homeCheer: '每一次用心跟进，都在靠近下一次成交',
          start: '开始冲刺',
          instructions: '两个相同产品碰一碰，不断升级，最终合成完整解决方案！',
          homeGoal: '终极目标 · 完整解决方案',
          ready: '左右移动瞄准 · 点击或松手投放',
          reset: '重新开始',
          scorePrefix: '业绩值：',
          bestPrefix: '最佳业绩：',
          warning: '警戒线 · 停留 3 秒结束',
          gameOver: '本轮冲刺结束',
          retry: '再冲一次',
          encouragement: '每一次积累都算数\n带着信心，奔赴下一次客户沟通！',
          encouragementMid: '把专业变成信任，把跟进变成机会\n下一轮，继续突破！',
          encouragementHigh: '冲刺势不可挡！\n百日同行，向目标再进一步！',
          nextPrefix: '下一个试剂：',
          mergePrefix: '升级成功：',
          finalReached: '完整解决方案达成！',
          terminalContact: '完整解决方案 · 顶级保留',
          phase: '合成体验版',
          footer: '实验耗材 → 完整解决方案'
        },
        salesCheers: ['多一次跟进，多一分机会', '用专业赢得信任，用行动创造突破', '客户的每一份信任，都值得全力以赴', '百日同行，下一次突破就在前方']
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './DropController.ts', './ReagentManager.ts', './ScoreManager.ts', './OverflowTracker.ts', './MilestoneTracker.ts', './RoundPresentation.ts', './GameMusic.ts', './BrandVisual.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, view, ResolutionPolicy, profiler, PhysicsSystem2D, Vec2, Graphics, Color, Node, BlockInputEvents, UITransform, Label, Layers, RigidBody2D, ERigidBody2DType, BoxCollider2D, isValid, Component, GameConfig, getReagentConfig, DropController, ReagentManager, ScoreManager, OverflowTracker, MilestoneTracker, RoundPresentation, GameMusic, addBrandMotif, addBrandHeader, styleGameTitle, addBrandImage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      profiler = module.profiler;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Vec2 = module.Vec2;
      Graphics = module.Graphics;
      Color = module.Color;
      Node = module.Node;
      BlockInputEvents = module.BlockInputEvents;
      UITransform = module.UITransform;
      Label = module.Label;
      Layers = module.Layers;
      RigidBody2D = module.RigidBody2D;
      ERigidBody2DType = module.ERigidBody2DType;
      BoxCollider2D = module.BoxCollider2D;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
      getReagentConfig = module.getReagentConfig;
    }, function (module) {
      DropController = module.DropController;
    }, function (module) {
      ReagentManager = module.ReagentManager;
    }, function (module) {
      ScoreManager = module.ScoreManager;
    }, function (module) {
      OverflowTracker = module.OverflowTracker;
    }, function (module) {
      MilestoneTracker = module.MilestoneTracker;
    }, function (module) {
      RoundPresentation = module.RoundPresentation;
    }, function (module) {
      GameMusic = module.GameMusic;
    }, function (module) {
      addBrandMotif = module.addBrandMotif;
      addBrandHeader = module.addBrandHeader;
      styleGameTitle = module.styleGameTitle;
      addBrandImage = module.addBrandImage;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "a124c00RWdIkII0VniQq83v", "GameManager", undefined);
      var ccclass = _decorator.ccclass;

      /** 代码自动创建场景；输入与投放节奏由 DropController 处理。 */
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);
        function GameManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.reagentManager = null;
          _this.dropController = null;
          _this.status = null;
          _this.nextLabel = null;
          _this.arena = null;
          _this.resetButton = null;
          _this.score = new ScoreManager();
          _this.scoreLabel = null;
          _this.bestLabel = null;
          _this.overflow = new OverflowTracker(GameConfig.warningY, GameConfig.overflowSeconds, GameConfig.dropGraceSeconds, 1 / 60);
          _this.warningLabel = null;
          _this.resultPanel = null;
          _this.isGameOver = false;
          _this.hasStarted = false;
          _this.milestones = new MilestoneTracker();
          _this.presentation = null;
          _this.ultimateReached = false;
          _this.cheerLabel = null;
          _this.mergeCount = 0;
          _this.music = null;
          _this.overflowItems = [];
          _this.overflowSnapshots = new WeakMap();
          _this.collectOverflow = function (item) {
            var snapshot = _this.overflowSnapshots.get(item);
            if (!snapshot) {
              snapshot = {
                id: '',
                top: 0,
                dropped: false
              };
              _this.overflowSnapshots.set(item, snapshot);
            }
            snapshot.id = item.lifeId;
            snapshot.top = item.node.position.y + item.config.radius;
            snapshot.dropped = item.isDropped && !item.isMerging;
            snapshot.falling = item.isFalling;
            _this.overflowItems.push(snapshot);
          };
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.start = function start() {
          var _this2 = this;
          view.setDesignResolutionSize(GameConfig.width, GameConfig.height, ResolutionPolicy.SHOW_ALL);
          profiler.hideStats();
          PhysicsSystem2D.instance.enable = true;
          PhysicsSystem2D.instance.gravity = new Vec2(0, GameConfig.gravity);
          PhysicsSystem2D.instance.fixedTimeStep = 1 / 60;
          PhysicsSystem2D.instance.maxSubSteps = 1;
          this.panel('Background', 0, 0, GameConfig.width, GameConfig.height, '#FFFDF8');
          addBrandMotif(this.node, -300, 560, 140);
          addBrandMotif(this.node, 300, -560, 120);
          addBrandHeader(this.node, 595);
          styleGameTitle(this.label('Title', GameConfig.text.title, 530, 58, '#003F75'));
          this.scoreLabel = this.label('Score', '', 465, 27, '#003F75');
          this.bestLabel = this.label('BestScore', '', 425, 22, '#585757');
          this.refreshScore();
          this.nextLabel = this.label('Next', GameConfig.text.nextPrefix, 383, 23, '#585757');
          this.arena = this.panel('ArenaInput', 0, -60, GameConfig.arenaWidth, 800, '#FFFFFF');
          var warning = this.makeNode('WarningLine', 0, GameConfig.warningY, GameConfig.arenaWidth, 4).addComponent(Graphics);
          warning.strokeColor = new Color('#E57968');
          warning.lineWidth = 3;
          for (var x = -GameConfig.arenaWidth / 2 + 8; x < GameConfig.arenaWidth / 2 - 8; x += 26) {
            warning.moveTo(x, 0);
            warning.lineTo(Math.min(x + 14, GameConfig.arenaWidth / 2 - 8), 0);
          }
          warning.stroke();
          this.warningLabel = this.label('WarningText', GameConfig.text.warning, GameConfig.warningY - 25, 17, '#CD695C');
          this.wall('Floor', 0, GameConfig.floorY - GameConfig.wallThickness / 2, GameConfig.arenaWidth + 40, GameConfig.wallThickness);
          this.wall('LeftWall', -GameConfig.arenaWidth / 2 - 10, -60, 20, 800);
          this.wall('RightWall', GameConfig.arenaWidth / 2 + 10, -60, 20, 800);
          this.status = this.label('Status', GameConfig.text.ready, -493, 21, '#585757');
          this.resetButton = this.panel('ResetButton', 0, -548, 340, 64, '#FF9600');
          var buttonLabel = this.label('ResetLabel', GameConfig.text.reset, -548, 25, '#003F75');
          buttonLabel.node.parent = this.resetButton;
          buttonLabel.node.setPosition(0, 0);
          this.resetButton.on(Node.EventType.TOUCH_END, this.reset, this);
          this.cheerLabel = this.label('SalesCheer', GameConfig.salesCheers[0], -602, 21, '#009D85');
          this.reagentManager = this.node.addComponent(ReagentManager);
          this.node.on(ReagentManager.MERGED, this.onMerged, this);
          this.node.on(ReagentManager.TERMINAL_CONTACT, this.onTerminalContact, this);
          this.dropController = this.node.addComponent(DropController);
          this.dropController.initialize(function (level) {
            return _this2.reagentManager.create(level);
          }, function (level) {
            if (_this2.nextLabel) _this2.nextLabel.string = GameConfig.text.nextPrefix + getReagentConfig(level).name;
          });
          this.dropController.stop();
          this.reagentManager.clear();
          this.reagentManager.enabled = false;
          // 首页没有试剂；保留物理步进，使 Canvas 首帧适配后的静态边界同步完成。
          this.presentation = this.node.addComponent(RoundPresentation);
          this.presentation.showHome(this.score.best, function () {
            return _this2.reset();
          });
          this.music = this.node.addComponent(GameMusic);
        };
        _proto.onMerged = function onMerged(reagent) {
          if (!this.hasStarted || this.isGameOver) return;
          this.score.addMerge(reagent.level);
          this.refreshScore();
          this.mergeCount++;
          if (this.cheerLabel && this.mergeCount % 4 === 0) {
            this.cheerLabel.string = GameConfig.salesCheers[this.mergeCount / 4 % GameConfig.salesCheers.length];
          }
          for (var _iterator = _createForOfIteratorHelperLoose(this.milestones.collect(this.score.current)), _step; !(_step = _iterator()).done;) {
            var _this$presentation2;
            var message = _step.value;
            (_this$presentation2 = this.presentation) == null || _this$presentation2.announce(message);
          }
          if (reagent.level === GameConfig.maxLevel && !this.ultimateReached) {
            var _this$presentation;
            this.ultimateReached = true;
            reagent.animateMerge(true);
            (_this$presentation = this.presentation) == null || _this$presentation.announce(GameConfig.text.finalReached, true);
          }
          if (this.status) this.status.string = reagent.level === GameConfig.maxLevel ? GameConfig.text.finalReached : GameConfig.text.mergePrefix + reagent.config.name;
        };
        _proto.onTerminalContact = function onTerminalContact() {
          if (this.isGameOver) return;
          if (this.status) this.status.string = GameConfig.text.terminalContact;
        };
        _proto.refreshScore = function refreshScore() {
          if (this.scoreLabel) this.scoreLabel.string = GameConfig.text.scorePrefix + this.score.current;
          if (this.bestLabel) this.bestLabel.string = GameConfig.text.bestPrefix + this.score.best;
        };
        _proto.update = function update(dt) {
          var _this$music;
          if (!this.hasStarted || this.isGameOver || !this.reagentManager) return;
          // Tracker 将单帧计时限制为一个物理步长，避免卡顿时计时快于下落。
          this.overflowItems.length = 0;
          this.reagentManager.forEachActive(this.collectOverflow);
          var elapsed = this.overflow.update(this.overflowItems, dt);
          // Music and the visible countdown share one trigger, including drop grace and falling protection.
          var countingDown = elapsed > 0.25;
          (_this$music = this.music) == null || _this$music.setTrack(countingDown ? 'danger' : 'normal');
          var warningText = countingDown ? GameConfig.text.warning + " \xB7 " + Math.max(0, GameConfig.overflowSeconds - elapsed).toFixed(1) : GameConfig.text.warning;
          if (this.warningLabel && this.warningLabel.string !== warningText) this.warningLabel.string = warningText;
          if (elapsed >= GameConfig.overflowSeconds) this.finishRound();
        };
        _proto.finishRound = function finishRound() {
          var _this$music2, _this$presentation3, _this$dropController, _this$dropController2;
          if (this.isGameOver) return;
          this.isGameOver = true;
          (_this$music2 = this.music) == null || _this$music2.setTrack('victory', true);
          (_this$presentation3 = this.presentation) == null || _this$presentation3.clear();
          if ((_this$dropController = this.dropController) != null && _this$dropController.current) this.dropController.current.node.active = false;
          (_this$dropController2 = this.dropController) == null || _this$dropController2.stop();
          // 停止队列与物理，结算期间不会继续合成、计分或自动生成。
          if (this.reagentManager) this.reagentManager.enabled = false;
          PhysicsSystem2D.instance.enable = false;
          this.resultPanel = this.panel('ResultOverlay', 0, 0, GameConfig.width, GameConfig.height, '#FFFDF8EF');
          this.resultPanel.addComponent(BlockInputEvents);
          var card = this.panel('ResultCard', 0, 0, 620, 600, '#FFFFFF');
          card.parent = this.resultPanel;
          addBrandImage(card, 'ResultMascot', 'brand/mascot-result-heart', 0, 190, 180, 180);
          var heading = this.label('ResultTitle', GameConfig.text.gameOver, 70, 39, '#003F75');
          heading.node.parent = card;
          var result = this.label('ResultScore', "" + GameConfig.text.scorePrefix + this.score.current + "\n" + GameConfig.text.bestPrefix + this.score.best, -20, 29, '#003F75');
          result.node.getComponent(UITransform).setContentSize(580, 110);
          result.node.parent = card;
          var message = this.score.current >= 1024 ? GameConfig.text.encouragementHigh : this.score.current >= 128 ? GameConfig.text.encouragementMid : GameConfig.text.encouragement;
          var encouragement = this.label('Encouragement', message, -110, 21, '#585757');
          encouragement.enableWrapText = true;
          encouragement.overflow = Label.Overflow.SHRINK;
          encouragement.node.getComponent(UITransform).setContentSize(560, 80);
          encouragement.node.parent = card;
          var retry = this.panel('RetryButton', 0, -210, 340, 68, '#FF9600');
          retry.parent = card;
          var retryLabel = this.label('RetryLabel', GameConfig.text.retry, 0, 27, '#003F75');
          retryLabel.node.parent = retry;
          retry.on(Node.EventType.TOUCH_END, this.reset, this);
        };
        _proto.reset = function reset(event) {
          var _this$music3, _this$presentation4, _this$dropController3, _this$reagentManager, _this$dropController4;
          if (event) event.propagationStopped = true;
          this.hasStarted = true;
          (_this$music3 = this.music) == null || _this$music3.setTrack('normal');
          (_this$presentation4 = this.presentation) == null || _this$presentation4.clear();
          this.milestones.reset();
          this.ultimateReached = false;
          this.mergeCount = 0;
          if (this.cheerLabel) this.cheerLabel.string = GameConfig.salesCheers[0];
          (_this$dropController3 = this.dropController) == null || _this$dropController3.stop();
          (_this$reagentManager = this.reagentManager) == null || _this$reagentManager.clear();
          if (this.resultPanel) {
            this.resultPanel.active = false;
            this.resultPanel.destroy();
            this.resultPanel = null;
          }
          this.isGameOver = false;
          this.overflow.reset();
          if (this.warningLabel) this.warningLabel.string = GameConfig.text.warning;
          if (this.reagentManager) this.reagentManager.enabled = true;
          PhysicsSystem2D.instance.enable = true;
          this.score.reset();
          this.refreshScore();
          (_this$dropController4 = this.dropController) == null || _this$dropController4.restart();
          if (this.status) this.status.string = GameConfig.text.ready;
        };
        _proto.makeNode = function makeNode(name, x, y, width, height) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          node.parent = this.node;
          node.setPosition(x, y);
          node.addComponent(UITransform).setContentSize(width, height);
          return node;
        };
        _proto.panel = function panel(name, x, y, width, height, color) {
          var node = this.makeNode(name, x, y, width, height);
          var graphics = node.addComponent(Graphics);
          graphics.fillColor = new Color(color);
          graphics.roundRect(-width / 2, -height / 2, width, height, 10);
          graphics.fill();
          return node;
        };
        _proto.label = function label(name, text, y, size, color) {
          var node = this.makeNode(name, 0, y, 700, 70);
          var label = node.addComponent(Label);
          label.string = text;
          label.fontSize = size;
          label.lineHeight = size + 8;
          label.color = new Color(color);
          return label;
        };
        _proto.wall = function wall(name, x, y, width, height) {
          var node = this.panel(name, x, y, width, height, '#72B9CF');
          node.active = false;
          node.addComponent(RigidBody2D).type = ERigidBody2DType.Static;
          var collider = node.addComponent(BoxCollider2D);
          collider.size.set(width, height);
          collider.friction = getReagentConfig(1).friction;
          collider.restitution = getReagentConfig(1).restitution;
          node.active = true;
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(ReagentManager.MERGED, this.onMerged, this);
          this.node.off(ReagentManager.TERMINAL_CONTACT, this.onTerminalContact, this);
          // 场景退出时子节点可能已先销毁；节点自身也会清理其事件。
          if (this.resetButton && isValid(this.resetButton, true)) {
            this.resetButton.off(Node.EventType.TOUCH_END, this.reset, this);
          }
        };
        return GameManager;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMusic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, sys, Node, AudioSource, input, Input, game, Game, Layers, UITransform, Graphics, Color, Label, resources, AudioClip, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      Node = module.Node;
      AudioSource = module.AudioSource;
      input = module.input;
      Input = module.Input;
      game = module.game;
      Game = module.Game;
      Layers = module.Layers;
      UITransform = module.UITransform;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      resources = module.resources;
      AudioClip = module.AudioClip;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "77114pz1u9Nb6V0xxwOUUaT", "GameMusic", undefined);
      var ccclass = _decorator.ccclass;
      /** Two audio channels crossfade; asynchronous loads never override a newer round. */
      var GameMusic = exports('GameMusic', (_dec = ccclass('GameMusic'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameMusic, _Component);
        function GameMusic() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.track = 'normal';
          _this.muted = false;
          _this.sources = [];
          _this.gains = [0, 0];
          _this.targets = [0, 0];
          _this.active = -1;
          _this.serial = 0;
          _this.unlocked = false;
          _this.hidden = false;
          _this.button = null;
          _this.caption = null;
          _this.clips = new Map();
          return _this;
        }
        var _proto = GameMusic.prototype;
        _proto.onLoad = function onLoad() {
          try {
            this.muted = sys.localStorage.getItem('reagent-combine.music-muted.v1') === '1';
          } catch (_unused) {}
          for (var i = 0; i < 2; i++) {
            var _n = new Node("MusicChannel" + i);
            _n.parent = this.node;
            var s = _n.addComponent(AudioSource);
            s.playOnAwake = false;
            s.volume = 0;
            this.sources.push(s);
          }
          input.on(Input.EventType.TOUCH_START, this.unlock, this);
          input.on(Input.EventType.MOUSE_DOWN, this.unlock, this);
          game.on(Game.EVENT_HIDE, this.hide, this);
          game.on(Game.EVENT_SHOW, this.show, this);
          var n = this.button = new Node('MusicButton');
          n.layer = Layers.Enum.UI_2D;
          n.parent = this.node;
          n.setPosition(260, -630);
          n.addComponent(UITransform).setContentSize(160, 52);
          var g = n.addComponent(Graphics);
          g.fillColor = new Color('#FFF0D8');
          g.roundRect(-80, -26, 160, 52, 18);
          g.fill();
          var text = new Node('MusicCaption');
          text.layer = n.layer;
          text.parent = n;
          text.addComponent(UITransform).setContentSize(160, 52);
          this.caption = text.addComponent(Label);
          this.caption.fontSize = 21;
          this.caption.color = new Color('#003F75');
          this.refreshCaption();
          n.on(Node.EventType.TOUCH_END, this.toggle, this);
          this.setTrack('normal', true);
        };
        _proto.refreshCaption = function refreshCaption() {
          if (this.caption) this.caption.string = this.muted ? '音乐：关' : '音乐：开';
        };
        _proto.unlock = function unlock() {
          if (this.unlocked) return;
          this.unlocked = true;
          if (this.active >= 0 && !this.hidden && !this.muted) this.sources[this.active].play();
        };
        _proto.toggle = function toggle(event) {
          if (event) event.propagationStopped = true;
          this.unlock();
          this.muted = !this.muted;
          try {
            sys.localStorage.setItem('reagent-combine.music-muted.v1', this.muted ? '1' : '0');
          } catch (_unused2) {}
          this.refreshCaption();
          if (!this.muted && this.active >= 0 && !this.hidden && !this.sources[this.active].playing) this.sources[this.active].play();
        };
        _proto.setTrack = function setTrack(track, force) {
          var _this2 = this;
          if (force === void 0) {
            force = false;
          }
          if (!force && this.track === track) return;
          this.track = track;
          var token = ++this.serial;
          var ready = function ready(clip) {
            if (!_this2.isValid || token !== _this2.serial) return;
            var next = _this2.active === 0 ? 1 : 0;
            var s = _this2.sources[next];
            s.stop();
            s.clip = clip;
            s.loop = track !== 'victory';
            s.volume = 0;
            _this2.gains[next] = 0;
            _this2.targets = [0, 0];
            _this2.targets[next] = 0.42;
            _this2.active = next;
            if (_this2.unlocked && !_this2.hidden && !_this2.muted) s.play();
          };
          var cached = this.clips.get(track);
          if (cached) ready(cached);else resources.load("audio/" + track, AudioClip, function (err, clip) {
            if (err) {
              console.warn('Music load failed', track, err.message);
              return;
            }
            _this2.clips.set(track, clip);
            ready(clip);
          });
        };
        _proto.hide = function hide() {
          this.hidden = true;
          this.sources.forEach(function (s) {
            return s.pause();
          });
        };
        _proto.show = function show() {
          this.hidden = false;
          // A completed victory sting must not restart when returning to the app.
          if (this.unlocked && !this.muted) this.sources.forEach(function (s) {
            if (s.currentTime > 0 && (s.loop || s.currentTime < s.duration - 0.05)) s.play();
          });
        };
        _proto.update = function update(dt) {
          var _this$button;
          (_this$button = this.button) == null || _this$button.setSiblingIndex(this.node.children.length - 1);
          for (var i = 0; i < 2; i++) {
            var target = this.muted ? 0 : this.targets[i];
            var step = Math.min(dt, 0.1) * 0.42 / 0.6;
            this.gains[i] += Math.sign(target - this.gains[i]) * Math.min(Math.abs(target - this.gains[i]), step);
            this.sources[i].volume = this.gains[i];
            if (this.gains[i] === 0 && this.sources[i].playing) {
              if (this.targets[i] === 0) this.sources[i].stop();else if (this.muted) this.sources[i].pause();
            }
          }
        };
        _proto.onDestroy = function onDestroy() {
          ++this.serial;
          this.sources.forEach(function (s) {
            return s.stop();
          });
          input.off(Input.EventType.TOUCH_START, this.unlock, this);
          input.off(Input.EventType.MOUSE_DOWN, this.unlock, this);
          game.off(Game.EVENT_HIDE, this.hide, this);
          game.off(Game.EVENT_SHOW, this.show, this);
        };
        return GameMusic;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BrandVisual.ts', './DropController.ts', './GameConfig.ts', './GameManager.ts', './GameMusic.ts', './MilestoneTracker.ts', './OverflowTracker.ts', './Reagent.ts', './ReagentManager.ts', './RoundPresentation.ts', './ScoreManager.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MilestoneTracker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, GameConfig;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GameConfig = module.GameConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c2c97cpi1RPzo1g+4u6DlJs", "MilestoneTracker", undefined);

      /** 本局里程碑只反馈一次；分数回退不会撤销已达成状态。 */
      var MilestoneTracker = exports('MilestoneTracker', /*#__PURE__*/function () {
        function MilestoneTracker() {
          this.reached = new Set();
        }
        var _proto = MilestoneTracker.prototype;
        _proto.collect = function collect(score) {
          if (!Number.isFinite(score)) return [];
          var messages = [];
          for (var _iterator = _createForOfIteratorHelperLoose(GameConfig.milestones), _step; !(_step = _iterator()).done;) {
            var milestone = _step.value;
            if (score >= milestone.score && !this.reached.has(milestone.score)) {
              this.reached.add(milestone.score);
              messages.push(milestone.text);
            }
          }
          return messages;
        };
        _proto.reset = function reset() {
          this.reached.clear();
        };
        return MilestoneTracker;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OverflowTracker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8a29epD86hAI5eD6eP5J++k", "OverflowTracker", undefined);
      /** 按物品独立追踪越线时长，供 GameOver 判定调用。 */
      var OverflowTracker = exports('OverflowTracker', /*#__PURE__*/function () {
        function OverflowTracker(line, seconds, graceSeconds, maxFrameDelta) {
          if (graceSeconds === void 0) {
            graceSeconds = 1;
          }
          if (maxFrameDelta === void 0) {
            maxFrameDelta = 1 / 60;
          }
          this.durations = new Map();
          this.ages = new Map();
          this.present = new Set();
          this.limit = void 0;
          this.grace = void 0;
          this.frameLimit = void 0;
          this.line = line;
          this.limit = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
          this.grace = Number.isFinite(graceSeconds) && graceSeconds > 0 ? graceSeconds : 0;
          this.frameLimit = Number.isFinite(maxFrameDelta) && maxFrameDelta > 0 ? maxFrameDelta : 1 / 60;
        }
        var _proto = OverflowTracker.prototype;
        _proto.update = function update(items, dt) {
          var elapsed = Number.isFinite(dt) && dt > 0 ? Math.min(dt, this.frameLimit) : 0;
          var present = this.present;
          present.clear();
          var longest = 0;
          for (var _iterator = _createForOfIteratorHelperLoose(items), _step; !(_step = _iterator()).done;) {
            var _this$ages$get, _this$durations$get;
            var item = _step.value;
            present.add(item.id);
            if (!item.dropped) {
              this.durations["delete"](item.id);
              this.ages["delete"](item.id);
              continue;
            }
            var previousAge = (_this$ages$get = this.ages.get(item.id)) != null ? _this$ages$get : 0;
            var age = previousAge + elapsed;
            this.ages.set(item.id, age);
            var calculatedDanger = Math.max(0, age - this.grace) - Math.max(0, previousAge - this.grace);
            var dangerousElapsed = calculatedDanger < 1e-12 ? 0 : calculatedDanger;
            if (item.top <= this.line || item.falling) {
              this.durations["delete"](item.id);
              continue;
            }
            var total = ((_this$durations$get = this.durations.get(item.id)) != null ? _this$durations$get : 0) + dangerousElapsed;
            var duration = total >= this.limit - 1e-12 ? this.limit : Math.min(this.limit, total);
            this.durations.set(item.id, duration);
            longest = Math.max(longest, duration);
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.durations.keys()), _step2; !(_step2 = _iterator2()).done;) {
            var id = _step2.value;
            if (!present.has(id)) this.durations["delete"](id);
          }
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.ages.keys()), _step3; !(_step3 = _iterator3()).done;) {
            var _id = _step3.value;
            if (!present.has(_id)) this.ages["delete"](_id);
          }
          return longest;
        };
        _proto.reset = function reset() {
          this.durations.clear();
          this.ages.clear();
          this.present.clear();
        };
        return OverflowTracker;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Reagent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './BrandVisual.ts'], function (exports) {
  var _inheritsLoose, _createClass, cclegacy, _decorator, UITransform, Node, Layers, Sprite, Graphics, Color, Label, RigidBody2D, ERigidBody2DType, CircleCollider2D, Contact2DType, Tween, Vec3, Vec2, tween, Component, getReagentConfig, GameConfig, addBrandImage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Node = module.Node;
      Layers = module.Layers;
      Sprite = module.Sprite;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      RigidBody2D = module.RigidBody2D;
      ERigidBody2DType = module.ERigidBody2DType;
      CircleCollider2D = module.CircleCollider2D;
      Contact2DType = module.Contact2DType;
      Tween = module.Tween;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      getReagentConfig = module.getReagentConfig;
      GameConfig = module.GameConfig;
    }, function (module) {
      addBrandImage = module.addBrandImage;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "77c41GA2CZNRKY4vYXPSUZ/", "Reagent", undefined);
      var ccclass = _decorator.ccclass;

      /** 单个试剂：根节点承担物理，视觉子节点独立缩放，换图不影响合并。 */
      var Reagent = exports('Reagent', (_dec = ccclass('Reagent'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Reagent, _Component);
        function Reagent() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.level = 1;
          _this.config = void 0;
          _this.isDropped = false;
          _this.isMerging = false;
          /** 每次从池中取出都会更换，避免沿用上次投放的警戒计时。 */
          _this.lifeId = '';
          _this.onContact = null;
          _this.body = void 0;
          _this.collider = void 0;
          _this.visual = void 0;
          return _this;
        }
        var _proto = Reagent.prototype;
        _proto.initialize = function initialize(level) {
          this.level = level;
          var config = this.config = getReagentConfig(level);
          (this.node.getComponent(UITransform) || this.node.addComponent(UITransform)).setContentSize(config.size, config.size);
          this.visual = new Node('Visual');
          this.visual.layer = Layers.Enum.UI_2D;
          this.visual.parent = this.node;
          this.visual.addComponent(UITransform).setContentSize(config.size, config.size);
          if (config.spriteFrame) {
            var sprite = this.visual.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = config.spriteFrame;
          } else {
            var graphics = this.visual.addComponent(Graphics);
            graphics.fillColor = new Color('#FFFFFF');
            graphics.strokeColor = new Color(level >= 9 ? '#FF9600' : level >= 6 ? '#009D85' : '#005EAC');
            graphics.lineWidth = Math.max(2, config.radius * 0.045);
            graphics.circle(0, 0, config.radius - graphics.lineWidth / 2);
            graphics.fill();
            graphics.stroke();
            // White product cards keep original photography and printed labels intact.
            // The inset fits inside the physical circle, including rectangular photographs.
            addBrandImage(this.visual, 'ProductImage', "products/level-" + level, 0, config.radius * 0.12, config.size * 0.60, config.size * 0.64);
          }
          var labelNode = new Node('ReagentLabel');
          labelNode.layer = Layers.Enum.UI_2D;
          labelNode.parent = this.visual;
          var smallTube = level <= 2;
          labelNode.setPosition(0, -config.radius * (smallTube ? 0.48 : 0.55));
          labelNode.addComponent(UITransform).setContentSize(config.size * (smallTube ? 0.86 : 0.78), smallTube ? getReagentConfig(3).size * 0.20 : config.size * 0.20);
          var label = labelNode.addComponent(Label);
          label.string = config.name;
          // The first three tubes share typography and label height, including SHRINK's rendered size.
          label.fontSize = Math.min(22, Math.max(11, (smallTube ? getReagentConfig(3).radius : config.radius) * 0.32));
          label.lineHeight = label.fontSize + 5;
          label.isBold = false;
          label.overflow = Label.Overflow.SHRINK;
          label.enableWrapText = !smallTube;
          label.color = new Color('#123F65');
          this.body = this.node.addComponent(RigidBody2D);
          this.body.type = ERigidBody2DType.Static;
          this.body.enabledContactListener = true;
          this.body.linearDamping = GameConfig.physics.linearDamping;
          this.body.angularDamping = GameConfig.physics.angularDamping;
          this.collider = this.node.addComponent(CircleCollider2D);
          // 待投放对象完全退出碰撞；释放时才启用形状。
          this.collider.enabled = false;
          this.collider.radius = config.radius;
          var radiusMeters = config.radius / GameConfig.physics.pixelsPerMeter;
          this.collider.density = config.mass / (Math.PI * radiusMeters * radiusMeters);
          this.collider.friction = config.friction;
          this.collider.restitution = config.restitution;
          this.collider.on(Contact2DType.BEGIN_CONTACT, this.beginContact, this);
        };
        _proto.drop = function drop() {
          if (this.isDropped) return;
          this.isDropped = true;
          this.body.type = ERigidBody2DType.Dynamic;
          this.collider.enabled = true;
          this.body.wakeUp();
        };
        _proto.resetForReuse = function resetForReuse() {
          this.onContact = null;
          this.isDropped = false;
          this.isMerging = false;
          Tween.stopAllByTarget(this.visual);
          this.visual.setScale(Vec3.ONE);
          this.collider.enabled = false;
          // 引擎会写回该向量，不能传入冻结的 Vec2.ZERO 常量。
          this.body.linearVelocity = new Vec2(0, 0);
          this.body.angularVelocity = 0;
          this.body.type = ERigidBody2DType.Static;
          this.node.setRotationFromEuler(0, 0, 0);
        };
        _proto.animateMerge = function animateMerge(ultimate) {
          if (ultimate === void 0) {
            ultimate = false;
          }
          Tween.stopAllByTarget(this.visual);
          this.visual.setScale(0.6, 0.6, 1);
          var peak = ultimate ? 1.3 : 1.1;
          tween(this.visual).to(ultimate ? 0.28 : 0.14, {
            scale: new Vec3(peak, peak, 1)
          }).to(ultimate ? 0.35 : 0.12, {
            scale: Vec3.ONE
          }).start();
        };
        _proto.beginContact = function beginContact(_self, other) {
          var _this$onContact;
          var reagent = other.node.getComponent(Reagent);
          if (reagent && this.isDropped && reagent.isDropped) (_this$onContact = this.onContact) == null || _this$onContact.call(this, this, reagent);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$collider;
          this.onContact = null;
          (_this$collider = this.collider) == null || _this$collider.off(Contact2DType.BEGIN_CONTACT, this.beginContact, this);
          if (this.visual) Tween.stopAllByTarget(this.visual);
        };
        _createClass(Reagent, [{
          key: "isFalling",
          get: /** Box2D 速度单位为米/秒；仍明显向下运动时暂不判定堆积。 */
          function get() {
            return this.isDropped && this.body.linearVelocity.y < GameConfig.fallingVelocityThreshold;
          }
        }]);
        return Reagent;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReagentManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './Reagent.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, director, Director, Node, Layers, PhysicsSystem2D, isValid, Component, getReagentConfig, GameConfig, Reagent;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Director = module.Director;
      Node = module.Node;
      Layers = module.Layers;
      PhysicsSystem2D = module.PhysicsSystem2D;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      getReagentConfig = module.getReagentConfig;
      GameConfig = module.GameConfig;
    }, function (module) {
      Reagent = module.Reagent;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "b17c0fVandPJ4GK62M3wK/+", "ReagentManager", undefined);
      var ccclass = _decorator.ccclass;

      /** 碰撞回调只锁定对象并排队，统一在 Box2D 步进结束后改变刚体。 */
      var ReagentManager = exports('ReagentManager', (_dec = ccclass('ReagentManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ReagentManager, _Component);
        function ReagentManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.activeItems = new Set();
          _this.pending = [];
          _this.terminalPairs = new Set();
          _this.terminalCooldown = 0;
          _this.pendingTerminal = null;
          _this.pools = new Map();
          _this.poolRoot = null;
          _this.sequence = 0;
          _this.poolStats = {
            created: 0,
            reused: 0,
            cached: 0
          };
          return _this;
        }
        var _proto = ReagentManager.prototype;
        _proto.forEachActive = function forEachActive(visitor) {
          this.activeItems.forEach(visitor);
        };
        _proto.onEnable = function onEnable() {
          director.on(Director.EVENT_AFTER_PHYSICS, this.flushMerges, this);
        };
        _proto.onDisable = function onDisable() {
          director.off(Director.EVENT_AFTER_PHYSICS, this.flushMerges, this);
          for (var _iterator = _createForOfIteratorHelperLoose(this.pending), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              a = _step$value[0],
              b = _step$value[1];
            a.isMerging = false;
            b.isMerging = false;
          }
          this.pending.length = 0;
          this.pendingTerminal = null;
        };
        _proto.update = function update(dt) {
          this.terminalCooldown = Math.max(0, this.terminalCooldown - dt);
        };
        _proto.create = function create(level, x, y, dropped) {
          var _this$pools$get,
            _this2 = this;
          if (x === void 0) {
            x = 0;
          }
          if (y === void 0) {
            y = GameConfig.spawnY;
          }
          if (dropped === void 0) {
            dropped = false;
          }
          var config = getReagentConfig(level);
          var edge = GameConfig.arenaWidth / 2 - config.radius - GameConfig.wallMargin;
          var reagent = (_this$pools$get = this.pools.get(level)) == null ? void 0 : _this$pools$get.pop();
          if (reagent) {
            this.poolStats.reused++;
            this.poolStats.cached--;
          } else {
            var fresh = new Node('Reagent');
            fresh.active = false;
            fresh.layer = Layers.Enum.UI_2D;
            fresh.parent = this.node;
            reagent = fresh.addComponent(Reagent);
            reagent.initialize(level);
            this.poolStats.created++;
          }
          var node = reagent.node;
          node.parent = this.node;
          node.setPosition(Math.max(-edge, Math.min(edge, x)), Math.max(GameConfig.floorY + config.radius, y));
          reagent.lifeId = String(++this.sequence);
          reagent.onContact = function (a, b) {
            return _this2.requestMerge(a, b);
          };
          this.activeItems.add(reagent);
          node.active = true;
          // AFTER_PHYSICS 中创建时，变换标记会在帧末清除；现在同步，
          // 防止下一帧复用刚体的旧物理位置回写到新球。此处已退出物理步进。
          PhysicsSystem2D.instance.physicsWorld.syncSceneToPhysics();
          if (dropped) reagent.drop();
          return reagent;
        };
        _proto.requestMerge = function requestMerge(a, b) {
          if (!this.enabledInHierarchy || a === b || !this.activeItems.has(a) || !this.activeItems.has(b) || !a.isDropped || !b.isDropped || a.isMerging || b.isMerging || a.level !== b.level) return;
          if (a.level === GameConfig.maxLevel) {
            // 最高级保留两个对象，每对只反馈一次，且有全局冷却。此阶段不奖励分数。
            var key = [a.lifeId, b.lifeId].sort().join(':');
            if (this.terminalCooldown === 0 && !this.terminalPairs.has(key)) {
              this.terminalPairs.add(key);
              this.terminalCooldown = GameConfig.terminalContactCooldown;
              this.pendingTerminal = [a, b];
            }
            return;
          }
          // 同一物体同时碰到多件同级物品时，只让第一对获得锁。
          a.isMerging = true;
          b.isMerging = true;
          this.pending.push([a, b]);
        };
        _proto.flushMerges = function flushMerges() {
          var _this3 = this;
          var jobs = this.pending;
          this.pending = [];
          for (var _iterator2 = _createForOfIteratorHelperLoose(jobs), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              a = _step2$value[0],
              b = _step2$value[1];
            if (!this.activeItems.has(a) || !this.activeItems.has(b) || !isValid(a.node, true) || !isValid(b.node, true)) continue;
            var x = (a.node.position.x + b.node.position.x) / 2;
            var y = (a.node.position.y + b.node.position.y) / 2;
            var nextLevel = a.level + 1;
            this.remove(a);
            this.remove(b);
            var merged = this.create(nextLevel, x, y, true);
            merged.animateMerge();
            this.node.emit(ReagentManager.MERGED, merged);
          }
          var terminal = this.pendingTerminal;
          this.pendingTerminal = null;
          if (terminal && terminal.every(function (item) {
            return _this3.activeItems.has(item);
          })) {
            this.node.emit(ReagentManager.TERMINAL_CONTACT);
          }
        };
        _proto.remove = function remove(reagent) {
          this.activeItems["delete"](reagent);
          reagent.onContact = null;
          reagent.node.active = false;
          reagent.resetForReuse();
          var pool = this.pools.get(reagent.level);
          if (!pool) {
            pool = [];
            this.pools.set(reagent.level, pool);
          }
          if (pool.length < GameConfig.poolMaxPerLevel) {
            if (!this.poolRoot) {
              this.poolRoot = new Node('ReagentPool');
              this.poolRoot.active = false;
              this.poolRoot.parent = this.node;
            }
            reagent.node.parent = this.poolRoot;
            pool.push(reagent);
            this.poolStats.cached++;
          } else reagent.node.destroy();
        };
        _proto.clear = function clear() {
          this.pending.length = 0;
          this.pendingTerminal = null;
          this.terminalPairs.clear();
          this.terminalCooldown = 0;
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.activeItems), _step3; !(_step3 = _iterator3()).done;) {
            var reagent = _step3.value;
            if (isValid(reagent.node, true)) this.remove(reagent);
          }
          this.activeItems.clear();
        };
        _createClass(ReagentManager, [{
          key: "items",
          get: function get() {
            return Array.from(this.activeItems);
          }
        }]);
        return ReagentManager;
      }(Component), _class2.MERGED = 'reagent-merged', _class2.TERMINAL_CONTACT = 'terminal-contact', _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoundPresentation.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameConfig.ts', './BrandVisual.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, BlockInputEvents, UITransform, Label, Node, UIOpacity, Layers, Graphics, Color, Component, GameConfig, addBrandMotif, addBrandHeader, styleGameTitle, addBrandImage;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      BlockInputEvents = module.BlockInputEvents;
      UITransform = module.UITransform;
      Label = module.Label;
      Node = module.Node;
      UIOpacity = module.UIOpacity;
      Layers = module.Layers;
      Graphics = module.Graphics;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      GameConfig = module.GameConfig;
    }, function (module) {
      addBrandMotif = module.addBrandMotif;
      addBrandHeader = module.addBrandHeader;
      styleGameTitle = module.styleGameTitle;
      addBrandImage = module.addBrandImage;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "bc13bmeDsxLi6Dx0H3cH/Ns", "RoundPresentation", undefined);
      var ccclass = _decorator.ccclass;

      /** 首页与轻量反馈独立于物理；提示不拦截投放，重开时统一清理。 */
      var RoundPresentation = exports('RoundPresentation', (_dec = ccclass('RoundPresentation'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RoundPresentation, _Component);
        function RoundPresentation() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.home = null;
          _this.toast = null;
          _this.toastOpacity = null;
          _this.queue = [];
          _this.elapsed = 0;
          _this.duration = 0;
          return _this;
        }
        var _proto = RoundPresentation.prototype;
        _proto.showHome = function showHome(best, onStart) {
          var _this2 = this;
          this.clear();
          var home = this.home = this.box('Home', this.node, 0, 0, GameConfig.width, GameConfig.height, '#FFFDF8');
          home.addComponent(BlockInputEvents);
          addBrandMotif(home, -300, 550, 150);
          addBrandMotif(home, 300, -555, 130);
          addBrandHeader(home, 485);
          styleGameTitle(this.text('HomeTitle', home, GameConfig.text.title, 388, 68, '#003F75'));
          this.text('HomeSubtitle', home, GameConfig.text.homeSubtitle, 312, 30, '#585757');
          addBrandImage(home, 'HomeMascot', 'brand/mascot-home', 0, 120, 300, 300);
          this.text('HomeGoal', home, GameConfig.text.homeGoal, -75, 27, '#585757');
          var instructions = this.text('Instructions', home, GameConfig.text.instructions, -155, 26, '#585757');
          instructions.node.getComponent(UITransform).setContentSize(570, 120);
          instructions.enableWrapText = true;
          instructions.overflow = Label.Overflow.CLAMP;
          var button = this.box('StartButton', home, 0, -275, 430, 86, '#FF9600');
          this.text('StartLabel', button, GameConfig.text.start, 0, 32, '#003F75');
          button.on(Node.EventType.TOUCH_END, function () {
            if (!_this2.home) return;
            _this2.clear();
            onStart();
          });
          this.text('HomeBest', home, GameConfig.text.bestPrefix + best, -375, 25, '#585757');
          this.text('HomeCheer', home, GameConfig.text.homeCheer, -445, 24, '#009D85');
          this.text('HomeFooter', home, GameConfig.text.footer, -530, 23, '#585757');
        };
        _proto.announce = function announce(text, ultimate) {
          if (ultimate === void 0) {
            ultimate = false;
          }
          // 终极目标优先展示；普通里程碑按顺序出现。
          if (ultimate) {
            if (this.toast) {
              this.toast.active = false;
              this.toast.destroy();
              this.toast = null;
            }
            this.queue.unshift({
              text: text,
              ultimate: ultimate
            });
          } else this.queue.push({
            text: text,
            ultimate: ultimate
          });
        };
        _proto.update = function update(dt) {
          if (!this.toast && this.queue.length) {
            var item = this.queue.shift();
            this.duration = item.ultimate ? 3.2 : 1.8;
            this.elapsed = 0;
            this.toast = this.box(item.ultimate ? 'UltimateFeedback' : 'MilestoneFeedback', this.node, 0, item.ultimate ? 0 : 105, 620, item.ultimate ? 190 : 100, item.ultimate ? '#FFF0D8' : '#FFF8EC');
            this.toastOpacity = this.toast.addComponent(UIOpacity);
            addBrandImage(this.toast, 'FeedbackMascot', 'brand/mascot-heart', -245, 0, 70, 70);
            var feedback = this.text('FeedbackText', this.toast, item.text, 0, item.ultimate ? 39 : 29, '#003F75');
            feedback.node.setPosition(35, 0);
            feedback.node.getComponent(UITransform).setContentSize(470, item.ultimate ? 150 : 80);
            feedback.enableWrapText = true;
            feedback.overflow = Label.Overflow.SHRINK;
          }
          if (!this.toast) return;
          this.elapsed += dt;
          var front = this.node.children.length - 1;
          if (this.toast.getSiblingIndex() !== front) this.toast.setSiblingIndex(front);
          var fade = Math.min(1, this.elapsed / 0.18, (this.duration - this.elapsed) / 0.3);
          this.toastOpacity.opacity = Math.max(0, fade) * 255;
          var scale = 0.9 + 0.1 * Math.min(1, this.elapsed / 0.18);
          this.toast.setScale(scale, scale, 1);
          if (this.elapsed >= this.duration) {
            this.toast.active = false;
            this.toast.destroy();
            this.toast = null;
            this.toastOpacity = null;
          }
        };
        _proto.clear = function clear() {
          this.queue.length = 0;
          for (var _i = 0, _arr = [this.home, this.toast]; _i < _arr.length; _i++) {
            var node = _arr[_i];
            if (node) {
              node.active = false;
              node.destroy();
            }
          }
          this.home = null;
          this.toast = null;
          this.toastOpacity = null;
        };
        _proto.box = function box(name, parent, x, y, width, height, color) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          node.parent = parent;
          node.setPosition(x, y);
          node.addComponent(UITransform).setContentSize(width, height);
          var g = node.addComponent(Graphics);
          g.fillColor = new Color(color);
          g.roundRect(-width / 2, -height / 2, width, height, 22);
          g.fill();
          return node;
        };
        _proto.text = function text(name, parent, value, y, size, color) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          node.parent = parent;
          node.setPosition(0, y);
          node.addComponent(UITransform).setContentSize(650, 75);
          var label = node.addComponent(Label);
          label.string = value;
          label.fontSize = size;
          label.lineHeight = size + 10;
          label.color = new Color(color);
          return label;
        };
        return RoundPresentation;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreManager.ts", ['cc', './GameConfig.ts'], function (exports) {
  var cclegacy, sys, getReagentConfig;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      getReagentConfig = module.getReagentConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "19011CH2jhFCrZQYmQQ62AN", "ScoreManager", undefined);
      /** 计分与最高分持久化；不依赖场景生命周期，便于 UI 和测试复用。 */
      var ScoreManager = exports('ScoreManager', /*#__PURE__*/function () {
        function ScoreManager(storage) {
          if (storage === void 0) {
            storage = sys.localStorage;
          }
          this.current = 0;
          this.best = void 0;
          this.storage = void 0;
          this.storage = storage;
          this.best = this.loadBest();
        }
        var _proto = ScoreManager.prototype;
        _proto.addMerge = function addMerge(level) {
          this.current += getReagentConfig(level).mergeScore;
          if (this.current > this.best) {
            this.best = this.current;
            try {
              this.storage.setItem(ScoreManager.BEST_KEY, String(this.best));
            } catch (_unused) {
              // 存储不可用时仍保留本次运行中的最高分。
            }
          }
          return this.current;
        };
        _proto.reset = function reset() {
          this.current = 0;
        };
        _proto.loadBest = function loadBest() {
          try {
            var _value = this.storage.getItem(ScoreManager.BEST_KEY);
            if (_value === null || _value.trim() === '') return 0;
            var parsed = Number(_value);
            return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : 0;
          } catch (_unused2) {
            return 0;
          }
        };
        return ScoreManager;
      }());
      ScoreManager.BEST_KEY = 'reagent-combine.best.v1';
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});